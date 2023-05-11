// External Imports
import assert from "assert";

// Internal Imports
import Vector from "./Vector";

interface GramSchmidtOptions {
  extendBasisTo?: number;
}

/**
 * Given an array of vectors (a_1 ... a_n), performs orthonormalization and returns (q_1 ... q_n)
 */
class GramSchmidt {
  public static defaultOptions: GramSchmidtOptions = {};

  private aVectors: Vector[];
  private vectorLengths: number;
  private qVectors: Vector[];

  constructor(vectors: Vector[]) {
    this.checkVectors(vectors);
    this.aVectors = [...vectors];
    this.vectorLengths = this.aVectors[0].length;
    this.qVectors = this.getQVectors(this.aVectors, []);
  }

  public solve(options?: GramSchmidtOptions): Vector[] {
    if (options !== undefined) {
      this.checkOptions(options);
    } else {
      options = GramSchmidt.defaultOptions;
    }

    const newQVectors = this.extendBasis(options);
    return newQVectors;
  }

  private getQVectors(aVectors: Vector[], existingQVectors): Vector[] {
    return aVectors.reduce((prevQVectors, aVector) => {
      const nextQVector = this.getQVector(aVector, prevQVectors).normalize();
      if (nextQVector.isZero) {
        return prevQVectors;
      }
      return [...prevQVectors, nextQVector];
    }, existingQVectors);
  }

  private getQVector(aVector: Vector, prevQVectors: Vector[]): Vector {
    return prevQVectors.reduce((resultSoFar, prevQVector) => {
      return resultSoFar.subtract(aVector.projectionOnto(prevQVector));
    }, aVector);
  }

  private extendBasis(options: GramSchmidtOptions): Vector[] {
    const extendTo = options.extendBasisTo;
    if (extendTo !== undefined && this.qVectors.length < extendTo) {
      const basis = Vector.standardBasisVectors(extendTo);
      return this.getQVectors(basis, this.qVectors);
    }
    return this.qVectors;
  }

  private checkVectors(vectors: Vector[]): void {
    assert(Array.isArray(vectors), "vectors must be an array");
    assert(vectors.length > 0, "vectors must have at least 1 vector");
    vectors.forEach((vector, i) => {
      assert(vector instanceof Vector, `vector ${i + 1} must be a Vector`);
      const vectorLength = vectors[0].length;
      assert(
        vector.length === vectorLength,
        `vector ${i + 1} does not have the correct length (${vectorLength})`
      );
    });
  }

  private checkOptions(options: GramSchmidtOptions): void {
    assert(
      typeof options === "object" && options !== null,
      "options must be an object"
    );
    const { extendBasisTo } = options;
    assert(
      extendBasisTo === undefined || typeof extendBasisTo === "number",
      "extendBasisTo must be a number or undefined"
    );
    if (extendBasisTo !== undefined) {
      assert(
        extendBasisTo > 0 && extendBasisTo <= this.vectorLengths,
        `extendBasisTo must be greater than 0 and less than the vector lengths (${this.vectorLengths})`
      );
    }
  }
}

export default GramSchmidt;
