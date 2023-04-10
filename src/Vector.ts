// External Imports
import assert from "assert";
import Big, { BigSource } from "big.js";

class Vector {
  private vector: Big[];

  constructor(values: BigSource[]) {
    assert(Array.isArray(values), "values must be an array");

    this.vector = values.map((val) => new Big(val));
  }

  public getVector(toNumber: false): Big[];
  public getVector(toNumber: true): number[];
  public getVector(toNumber: boolean): (Big | number)[] {
    return this.vector.map((value) => (toNumber ? value.toNumber() : value));
  }

  public subtract(other: Vector): Vector {
    assert(
      this.vector.length === other.vector.length,
      "Both vectors must have the same length"
    );
    const subtractedValues = this.vector.map((value, i) =>
      value.sub(other.vector[i])
    );
    return new Vector(subtractedValues);
  }

  public magnitude(): Big {
    const sumOfSquares = this.vector.reduce(
      (sumOfSquares, value) => sumOfSquares.plus(value.times(value)),
      new Big(0)
    );
    return sumOfSquares.sqrt();
  }

  public innerProduct(other: Vector) {
    return this.vector.reduce(
      (sum, value, i) => sum.plus(value.mul(other.vector[i])),
      Big(0)
    );
  }
}

export default Vector;
