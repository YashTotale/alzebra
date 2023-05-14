// Internal Imports
import Vector from "./Vector";
import { ArrayCheck, NumberCheck, ObjectCheck, VectorCheck } from "./Check";

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
    ArrayCheck.isArray({ vectors });
    ArrayCheck.lengthGreaterThan({ vectors }, 0);
    vectors.forEach((vector, i) => {
      const name = `vector ${i}`;
      VectorCheck.isVector({ [name]: vector });
      const vectorLength = vectors[0].length;
      VectorCheck.lengthEqualTo({ [name]: vector }, vectorLength);
    });
  }

  private checkOptions(options: GramSchmidtOptions): void {
    ObjectCheck.isObject({ options });
    const { extendBasisTo } = options;
    NumberCheck.isNumberOrUndefined({ extendBasisTo });
    if (extendBasisTo !== undefined) {
      NumberCheck.isGreaterThan({ extendBasisTo }, 0);
      NumberCheck.isLessThanOrEqualTo({ extendBasisTo }, this.vectorLengths);
    }
  }
}

export default GramSchmidt;
