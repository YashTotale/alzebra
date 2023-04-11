// External Imports
import assert from "assert";

// Internal Imports
import Vector from "./Vector";

/**
 * Given an array of vectors (a_1 ... a_n), performs orthonormalization and returns (q_1 ... q_n)
 */
class GramSchmidt {
  private aVectors: Vector[];
  private qVectors: Vector[];
  private removeZeroVectors: boolean;
  private hasBeenSolved: boolean;

  constructor(vectors: Vector[], removeZeroVectors: boolean) {
    assert(Array.isArray(vectors), "vectors must be an array");
    assert(vectors.every((vector) => vector instanceof Vector));
    assert(
      typeof removeZeroVectors === "boolean",
      "removeZeroVectors must be an boolean"
    );
    this.aVectors = [...vectors]; // Create a copy to keep it immutable
    this.removeZeroVectors = removeZeroVectors;
  }

  public solve() {
    if (!this.hasBeenSolved) {
      this.qVectors = this.getQVectors();
      this.hasBeenSolved = true;
    }
    return this.qVectors;
  }

  private getQVectors() {
    return this.aVectors.reduce((prevQVectors, aVector) => {
      const nextQVector = this.getQVector(aVector, prevQVectors).normalize();
      if (this.removeZeroVectors && nextQVector.isZeroVector()) {
        return prevQVectors;
      }
      return [...prevQVectors, nextQVector];
    }, []);
  }

  private getQVector(aVector: Vector, prevQVectors: Vector[]): Vector {
    return prevQVectors.reduce((resultSoFar, prevQVector) => {
      return resultSoFar.subtract(aVector.projectionOnto(prevQVector));
    }, aVector);
  }
}

export default GramSchmidt;
