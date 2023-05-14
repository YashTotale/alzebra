// External Imports
import assert from "assert";
import Big, { BigSource } from "big.js";

// Internal Imports
import Vector from "./Vector";

export type CheckObject<T> = Record<string, T>;

class Check {
  private static decoupleObject = <T>(object: CheckObject<T>): [string, T] => {
    const entry = Object.entries(object)[0];
    return [entry[0], entry[1]];
  };

  protected static createNamedChecker = <T, Args extends any[] = any[]>(
    checker: (name: string, value: T, ...args: Args) => void
  ) => {
    return (object: CheckObject<T>, ...args: Args) => {
      const [name, value] = this.decoupleObject(object);
      checker(name, value, ...args);
    };
  };
}

export class NumberCheck extends Check {
  public static CreateIsNumberError = (name: string) =>
    `${name} must be a number`;
  public static isNumber = this.createNamedChecker<number>((name, num) => {
    assert(typeof num === "number", this.CreateIsNumberError(name));
  });

  public static CreateIsNumberOrUndefinedError = (name: string) =>
    `${name} must be a number or undefined`;
  public static isNumberOrUndefined = this.createNamedChecker<
    number | undefined
  >((name, num) => {
    assert(
      num === undefined || typeof num === "number",
      this.CreateIsNumberOrUndefinedError(name)
    );
  });

  public static CreateIsEqualToError = (name: string, equalTo: number) =>
    `${name} must be equal to ${equalTo}`;
  public static isEqualTo = this.createNamedChecker<number, [number]>(
    (name, num, equalTo) => {
      assert(num === equalTo, this.CreateIsEqualToError(name, equalTo));
    }
  );

  public static CreateIsLessThanError = (name: string, lessThan: number) =>
    `${name} must be less than ${lessThan}`;
  public static isLessThan = this.createNamedChecker<number, [number]>(
    (name, num, lessThan) => {
      assert(num < lessThan, this.CreateIsLessThanError(name, lessThan));
    }
  );

  public static CreateIsLessThanOrEqualToError = (
    name: string,
    lessThanOrEqualTo: number
  ) => `${name} must be less than or equal to ${lessThanOrEqualTo}`;
  public static isLessThanOrEqualTo = this.createNamedChecker<number, [number]>(
    (name, num, lessThanOrEqualTo) => {
      assert(
        num <= lessThanOrEqualTo,
        this.CreateIsLessThanOrEqualToError(name, lessThanOrEqualTo)
      );
    }
  );

  public static CreateIsGreaterThanError = (
    name: string,
    greaterThan: number
  ) => `${name} must be greater than ${greaterThan}`;
  public static isGreaterThan = this.createNamedChecker<number, [number]>(
    (name, num, greaterThan) => {
      assert(
        num > greaterThan,
        this.CreateIsGreaterThanError(name, greaterThan)
      );
    }
  );

  public static CreateIsGreaterThanOrEqualToError = (
    name: string,
    greaterThanOrEqualTo: number
  ) => `${name} must be greater than or equal to ${greaterThanOrEqualTo}`;
  public static isGreaterThanOrEqualTo = this.createNamedChecker<
    number,
    [number]
  >((name, num, greaterThanOrEqualTo) => {
    assert(
      num >= greaterThanOrEqualTo,
      this.CreateIsGreaterThanOrEqualToError(name, greaterThanOrEqualTo)
    );
  });
}

export class ObjectCheck extends Check {
  public static CreateIsObjectError = (name: string) =>
    `${name} must be an object`;
  public static isObject = this.createNamedChecker<Record<any, any>>(
    (name, object) => {
      assert(
        typeof object === "object" && object !== null,
        this.CreateIsObjectError(name)
      );
    }
  );
}

export class ArrayCheck extends Check {
  public static CreateIsArrayError = (name: string) =>
    `${name} must be an array`;
  public static isArray = this.createNamedChecker<any[]>((name, arr) => {
    assert(Array.isArray(arr), this.CreateIsArrayError(name));
  });

  public static CreateLengthGreaterThanError = (
    name: string,
    greaterThan: number
  ) => NumberCheck.CreateIsGreaterThanError(`${name} length`, greaterThan);
  public static lengthGreaterThan = this.createNamedChecker<any[], [number]>(
    (name, arr, greaterThan) => {
      const newName = `${name} length`;
      NumberCheck.isGreaterThan({ [newName]: arr.length }, greaterThan);
    }
  );
}

export class VectorCheck extends Check {
  public static CreateIsVectorError = (name: string) =>
    `${name} must be a Vector`;
  public static isVector = this.createNamedChecker<Vector>((name, vector) => {
    assert(vector instanceof Vector, this.CreateIsVectorError(name));
  });

  public static CreateNotSameLengthError = () =>
    "Both vectors must have the same length";
  public static isSameLengthAs = (vector1: Vector, vector2: Vector) => {
    assert(vector1.length === vector2.length, this.CreateNotSameLengthError());
  };

  public static CreateLengthEqualToError = (
    name: string,
    greaterThan: number
  ) => NumberCheck.CreateIsEqualToError(`${name} length`, greaterThan);
  public static lengthEqualTo = this.createNamedChecker<Vector, [number]>(
    (name, vector, greaterThan) => {
      const newName = `${name} length`;
      NumberCheck.isEqualTo({ [newName]: vector.length }, greaterThan);
    }
  );
}

export class BigSourceCheck extends Check {
  public static CreateIsBigSourceError = (name: string) =>
    `${name} must be a string, number, or Big`;
  public static isBigSource = this.createNamedChecker<BigSource>(
    (name, bigSource) => {
      assert(
        typeof bigSource === "string" ||
          typeof bigSource === "number" ||
          bigSource instanceof Big,
        this.CreateIsBigSourceError(name)
      );
    }
  );
}
