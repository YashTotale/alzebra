// External Imports
import assert from "assert";
import Big, { BigSource } from "big.js";

class Vector {
  private vector: Big[];

  constructor(values: BigSource[]) {
    assert(Array.isArray(values), "values must be an array");
    this.vector = values.map((val) => Big(val));
  }

  public getVector(toNumber: false): Big[];
  public getVector(toNumber: true): number[];
  public getVector(toNumber: boolean): (Big | number)[];
  public getVector(toNumber: boolean): (Big | number)[] {
    assert(typeof toNumber === "boolean", "toNumber must be a boolean");
    return this.vector.map((value) => (toNumber ? value.toNumber() : value));
  }

  public scale(factor: BigSource) {
    const scaleFactor = Big(factor);
    return new Vector(this.vector.map((value) => value.times(scaleFactor)));
  }

  public subtract(other: Vector): Vector {
    assert(other instanceof Vector, "other must be a Vector");
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
    const innerProductOfSelf = this.innerProduct(this);
    return innerProductOfSelf.sqrt();
  }

  public innerProduct(other: Vector): Big {
    assert(other instanceof Vector, "other must be a Vector");
    return this.vector.reduce(
      (sum, value, i) => sum.plus(value.times(other.vector[i])),
      Big(0)
    );
  }

  public projectionOnto(other: Vector): Vector {
    assert(other instanceof Vector, "other must be a Vector");
    const scaleFactor = this.innerProduct(other).div(other.innerProduct(other));
    return other.scale(scaleFactor);
  }
}

export default Vector;
