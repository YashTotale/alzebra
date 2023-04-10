// External Imports
import Big from "big.js";
import assert from "assert";

// Internal Imports
import Vector from "../../src/Vector";
import { testForEach } from "../helpers";
import {
  faultyBigSources,
  faultyBooleans,
  faultyVectors,
} from "../helpers/faulty";

describe("Methods", () => {
  describe("Get Vector", () => {
    testForEach("Prevents faulty toNumber", faultyBooleans, (x) => {
      const vector = new Vector([]);
      const useFaultyToNumber = () => vector.getVector(x);
      expect(useFaultyToNumber).toThrowError(assert.AssertionError);
    });

    test("toNumber is true", () => {
      const array = [1, 2, 3];
      const vector = new Vector(array);

      const returnedArray = vector.getVector(true);
      expect(returnedArray).toEqual(array);

      returnedArray.push(1);
      const returnedArrayAgain = vector.getVector(true);

      // Checks that a copy was returned both times, not the original
      expect(returnedArray).not.toEqual(returnedArrayAgain);
    });

    test("toNumber is false", () => {
      const array = [Big(1), Big(2), Big(3)];
      const vector = new Vector(array);

      const returnedArray = vector.getVector(false);
      expect(returnedArray).toEqual(array);

      returnedArray.push(Big(1));
      const returnedArrayAgain = vector.getVector(false);

      // Checks that a copy was returned both times, not the original
      expect(returnedArray).not.toEqual(returnedArrayAgain);
    });
  });

  describe("Scale", () => {
    testForEach("Prevents faulty factor", faultyBigSources, (x) => {
      const vector = new Vector([]);
      const useFaultyFactor = () => vector.scale(x);
      expect(useFaultyFactor).toThrowError();
    });

    test("Works", () => {
      const vector = new Vector([1, 2, -3]);
      const scaled = new Vector([3, 6, -9]);
      expect(vector.scale(3)).toEqual(scaled);
    });
  });

  describe("Subtract", () => {
    testForEach("Prevents faulty vector", faultyVectors, (x) => {
      const vector = new Vector([]);
      const useFaultyVector = () => vector.subtract(x);
      expect(useFaultyVector).toThrowError();
    });

    test("Checks for same length", () => {
      const vector1 = new Vector([1, 2, 3]);
      const vector2 = new Vector([1, 2]);

      const doFaultySubtract = () => vector1.subtract(vector2);
      expect(doFaultySubtract).toThrowError(assert.AssertionError);
    });

    test("Works", () => {
      const vector1 = new Vector([3, 2, 1]);
      const vector2 = new Vector([1, 2, 3]);
      const subtracted = new Vector([2, 0, -2]);
      expect(vector1.subtract(vector2)).toEqual(subtracted);
    });
  });

  test("Magnitude", () => {
    const vector = new Vector([3, 4]);
    expect(vector.magnitude()).toEqual(Big(5));
  });

  describe("Normalize", () => {
    test("Zero Vector", () => {
      const vector = new Vector([0, 0]);
      expect(vector.normalize()).toEqual(vector);
    });

    test("Non-zero Vector", () => {
      const vector = new Vector([3, 4]);
      const normalizedVector = new Vector([
        Big(3).div(Big(5)),
        Big(4).div(Big(5)),
      ]);
      expect(vector.normalize()).toEqual(normalizedVector);
    });
  });

  describe("Inner Product", () => {
    testForEach("Prevents faulty vector", faultyVectors, (x) => {
      const vector = new Vector([]);
      const useFaultyVector = () => vector.innerProduct(x);
      expect(useFaultyVector).toThrowError();
    });

    test("Works", () => {
      const vector1 = new Vector([3, 4]);
      const vector2 = new Vector([4, 7]);
      expect(vector1.innerProduct(vector2)).toEqual(Big(40));
    });
  });

  describe("Projection Onto", () => {
    testForEach("Prevents faulty vector", faultyVectors, (x) => {
      const vector = new Vector([]);
      const useFaultyVector = () => vector.projectionOnto(x);
      expect(useFaultyVector).toThrowError();
    });

    test("Works", () => {
      const vector1 = new Vector([3, 1]);
      const vector2 = new Vector([4, 2]);
      const projectionOfOneOntoTwo = new Vector([
        Big(14).div(Big(5)),
        Big(7).div(Big(5)),
      ]);
      expect(vector1.projectionOnto(vector2)).toEqual(projectionOfOneOntoTwo);
    });
  });

  describe("Is Zero Vector", () => {
    test("Is", () => {
      const vector = new Vector([0, 0]);
      expect(vector.isZeroVector()).toBeTrue();
    });

    test("Is Not", () => {
      const vector = new Vector([0, 0, 2]);
      expect(vector.isZeroVector()).toBeFalse();
    });
  });
});
