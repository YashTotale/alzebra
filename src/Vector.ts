// External Imports
import assert from "assert";
import Big, { BigSource } from "big.js";

class Vector {
  private vector: Big[];
  private isZero: boolean | undefined; // For caching the result of isZeroVector

  constructor(values: BigSource[]) {
    assert(Array.isArray(values), "values must be an array");
    this.vector = values.map((val) => Big(val));
  }

  public getVector(toNumber: false): Big[];
  public getVector(toNumber: true): number[];
  public getVector(toNumber: boolean): (Big | number)[];
  public getVector(toNumber: boolean): (Big | number)[] {
    assert(typeof toNumber === "boolean", "toNumber must be a boolean");
    return this.vector.map((value) =>
      toNumber ? Vector.bigToNumber(value) : value
    );
  }

  public getValue(position: number, toNumber: false): Big;
  public getValue(position: number, toNumber: true): number;
  public getValue(position: number, toNumber: boolean): Big | number;
  public getValue(position: number, toNumber: boolean): Big | number {
    assert(typeof position === "number", "position must be a number");
    assert(position >= 0, "position must be greater than or equal to 0");
    assert(
      position < this.vector.length,
      `position must be less than vector length (${this.vector.length})`
    );
    assert(typeof toNumber === "boolean", "toNumber must be a boolean");
    const value = this.vector[position];
    return toNumber ? Vector.bigToNumber(value) : value;
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
    const subtractedValues = this.vector.map((value, i) => {
      return value.sub(other.vector[i]);
    });
    return new Vector(subtractedValues);
  }

  public magnitude(): Big {
    const innerProductOfSelf = this.innerProduct(this);
    return innerProductOfSelf.sqrt();
  }

  public normalize(): Vector {
    const magnitude = this.magnitude();
    if (magnitude.eq(0)) {
      return this;
    } else {
      return this.scale(Big(1).div(this.magnitude()));
    }
  }

  public innerProduct(other: Vector): Big {
    assert(other instanceof Vector, "other must be a Vector");
    return this.vector.reduce((sum, value, i) => {
      return sum.plus(value.times(other.vector[i]));
    }, Big(0));
  }

  public projectionOnto(other: Vector): Vector {
    assert(other instanceof Vector, "other must be a Vector");
    const scaleFactor = this.innerProduct(other).div(other.innerProduct(other));
    return other.scale(scaleFactor);
  }

  public isZeroVector(): boolean {
    if (typeof this.isZero !== "boolean") {
      this.isZero = this.vector.every(
        (value) => Vector.bigToNumber(value) === 0
      );
    }
    return this.isZero;
  }

  public equals(other: Vector): boolean {
    assert(other instanceof Vector, "other must be a Vector");
    if (other.vector.length !== this.vector.length) return false;
    return this.vector.every((value, i) => {
      const otherValue = other.vector[i];
      return value.eq(otherValue);
    });
  }

  public toJSON(): number[] {
    return this.getVector(true);
  }

  public toString(): string {
    return JSON.stringify(this.toJSON());
  }

  private static bigToNumber(big: Big) {
    return big.round(3).toNumber() + 0; // Add 0 to avoid -0
  }
}

export default Vector;
