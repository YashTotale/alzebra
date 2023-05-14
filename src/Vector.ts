// External Imports
import Big, { BigSource } from "big.js";
import { Memoize } from "typescript-memoize";

// Internal Imports
import { ArrayCheck, BigSourceCheck, NumberCheck, VectorCheck } from "./Check";

class Vector {
  private vector: Big[];

  constructor(values: BigSource[]) {
    this.checkValues(values);
    this.vector = values.map((val) => Big(val));
  }

  public getBigVector(): Big[] {
    return [...this.vector];
  }

  public getNumVector(): number[] {
    return this.vector.map(Vector.bigToNumber);
  }

  @Memoize()
  public getBigValue(position: number): Big {
    this.checkPosition(position);
    return this.vector[position];
  }

  @Memoize()
  public getNumValue(position: number): number {
    this.checkPosition(position);
    return Vector.bigToNumber(this.vector[position]);
  }

  @Memoize()
  public scale(factor: BigSource) {
    BigSourceCheck.isBigSource({ factor });
    const scaleFactor = Big(factor);
    return new Vector(this.vector.map((value) => value.times(scaleFactor)));
  }

  @Memoize((v: Vector) => JSON.stringify(v))
  public subtract(other: Vector): Vector {
    VectorCheck.isVector({ other });
    VectorCheck.isSameLengthAs(this, other);
    const subtractedValues = this.vector.map((value, i) => {
      return value.sub(other.vector[i]);
    });
    return new Vector(subtractedValues);
  }

  @Memoize()
  public magnitude(): Big {
    const innerProductOfSelf = this.innerProduct(this);
    return innerProductOfSelf.sqrt();
  }

  @Memoize()
  public normalize(): Vector {
    const magnitude = this.magnitude();
    if (magnitude.eq(0)) {
      return this;
    } else {
      return this.scale(Big(1).div(this.magnitude()));
    }
  }

  @Memoize((v: Vector) => JSON.stringify(v))
  public innerProduct(other: Vector): Big {
    VectorCheck.isVector({ other });
    VectorCheck.isSameLengthAs(this, other);
    return this.vector.reduce((sum, value, i) => {
      return sum.plus(value.times(other.vector[i]));
    }, Big(0));
  }

  @Memoize((v: Vector) => JSON.stringify(v))
  public projectionOnto(other: Vector): Vector {
    VectorCheck.isVector({ other });
    VectorCheck.isSameLengthAs(this, other);
    const scaleFactor = this.innerProduct(other).div(other.innerProduct(other));
    return other.scale(scaleFactor);
  }

  @Memoize((v: Vector) => v.toString())
  public equals(other: Vector): boolean {
    VectorCheck.isVector({ other });
    if (other.vector.length !== this.vector.length) return false;
    return this.vector.every((value, i) => {
      const otherValue = other.vector[i];
      return Vector.bigToNumber(value) === Vector.bigToNumber(otherValue);
    });
  }

  public toJSON(): number[] {
    return this.getNumVector();
  }

  @Memoize()
  public toString(): string {
    return JSON.stringify(this.toJSON());
  }

  @Memoize()
  public get isZero(): boolean {
    return this.vector.every((value) => Vector.bigToNumber(value) === 0);
  }

  @Memoize()
  public get length(): number {
    return this.vector.length;
  }

  private checkValues(values: BigSource[]) {
    ArrayCheck.isArray({ values });
    values.forEach((value, i) => {
      BigSourceCheck.isBigSource({ [`value ${i}`]: value });
    });
  }

  @Memoize()
  private checkPosition(position: number) {
    NumberCheck.isNumber({ position });
    NumberCheck.isGreaterThanOrEqualTo({ position }, 0);
    NumberCheck.isLessThan({ position }, this.vector.length);
  }

  public static standardBasisVectors(dimension: number): Vector[] {
    NumberCheck.isNumber({ dimension });
    NumberCheck.isGreaterThan({ dimension }, 0);
    const zeroVector = new Array(dimension).fill(0);
    return zeroVector.map((x, i) => {
      zeroVector[i] = 1; // Temporarily change 0 to 1 to make it a standard basis vector
      const basisVector = new Vector(zeroVector);
      zeroVector[i] = 0;
      return basisVector;
    });
  }

  private static bigToNumber(big: Big) {
    return big.round(3).toNumber() + 0; // Add 0 to avoid -0
  }
}

export default Vector;
