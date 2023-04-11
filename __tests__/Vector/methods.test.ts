// External Imports
import Big from "big.js";
import assert from "assert";

// Internal Imports
import Vector from "../../src/Vector";
import { vectorsShouldEqual } from "./helpers";
import { testForEach } from "../helpers";
import {
  faultyBigSources,
  faultyBooleans,
  faultyNumbers,
  faultyVectors,
} from "../helpers/faulty";

describe("Methods", () => {
  test("Get Big Vector", () => {
    const array = [Big(1), Big(2), Big(3)];
    const vector = new Vector(array);

    const returnedArray = vector.getBigVector();
    expect(returnedArray).toEqual(array);

    returnedArray.push(Big(1));
    const returnedArrayAgain = vector.getBigVector();

    // Checks that a copy was returned both times, not the original
    expect(returnedArray).not.toEqual(returnedArrayAgain);
  });

  test("Get Num Vector", () => {
    const array = [1, 2, 3];
    const vector = new Vector(array);

    const returnedArray = vector.getNumVector();
    expect(returnedArray).toEqual(array);

    returnedArray.push(1);
    const returnedArrayAgain = vector.getNumVector();

    // Checks that a copy was returned both times, not the original
    expect(returnedArray).not.toEqual(returnedArrayAgain);
  });

  describe("Get Value", () => {
    testForEach("Prevents faulty position", faultyNumbers, (x) => {
      const vector = new Vector([]);
      const useFaultyPosition = () => vector.getValue(x, true);
      expect(useFaultyPosition).toThrowError(assert.AssertionError);
    });

    test("Prevents negative position", () => {
      const vector = new Vector([]);
      const useNegativePosition = () => vector.getValue(-1, true);
      expect(useNegativePosition).toThrowError(assert.AssertionError);
    });

    test("Prevents position greater than or equal to length", () => {
      const vector = new Vector([]);
      const usePositionEqualToLength = () => vector.getValue(0, true);
      const usePositionGreaterThanLength = () => vector.getValue(1, true);
      expect(usePositionEqualToLength).toThrowError(assert.AssertionError);
      expect(usePositionGreaterThanLength).toThrowError(assert.AssertionError);
    });

    testForEach("Prevents faulty toNumber", faultyBooleans, (x) => {
      const vector = new Vector([1]);
      const useFaultyToNumber = () => vector.getValue(0, x);
      expect(useFaultyToNumber).toThrowError(assert.AssertionError);
    });

    test("toNumber is true", () => {
      const array = [1, 2, 3];
      const vector = new Vector(array);

      const returnedValue = vector.getValue(0, true);
      expect(returnedValue).toEqual(1);
    });

    test("toNumber is false", () => {
      const array = [Big(1), Big(2), Big(3)];
      const vector = new Vector(array);

      const returnedValue = vector.getValue(2, false);
      expect(returnedValue).toEqual(Big(3));
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
      vectorsShouldEqual(vector.scale(3), scaled);
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
      vectorsShouldEqual(vector1.subtract(vector2), subtracted);
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
      vectorsShouldEqual(vector.normalize(), normalizedVector);
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
      vectorsShouldEqual(
        vector1.projectionOnto(vector2),
        projectionOfOneOntoTwo
      );
    });
  });

  describe("Is Zero", () => {
    test("Is", () => {
      const vector = new Vector([0, 0]);
      expect(vector.isZero).toBeTrue();
    });

    test("Is Not", () => {
      const vector = new Vector([0, 0, 2]);
      expect(vector.isZero).toBeFalse();
    });
  });

  describe("Equals", () => {
    describe("Not Equal", () => {
      test("Different Length", () => {
        const vector1 = new Vector([3, 1]);
        const vector2 = new Vector([4, 2, 4]);
        expect(vector1.equals(vector2)).toBeFalse();
      });

      test("Different Values", () => {
        const vector1 = new Vector([4, 2, 5]);
        const vector2 = new Vector([4, 2, 4]);
        expect(vector1.equals(vector2)).toBeFalse();
      });
    });

    test("Equal", () => {
      const vector1 = new Vector([4, 2, 5.2]);
      const vector2 = new Vector([4, 2, 5.2]);
      expect(vector1.equals(vector2)).toBeTrue();
    });
  });

  test("toJSON", () => {
    const vector = new Vector([1.6262, 9.00000001, -10]);
    expect(vector.toJSON()).toEqual([1.626, 9, -10]);
  });

  test("toString", () => {
    const vector = new Vector([1.6262, 9.00000001, -10]);
    expect(vector.toString()).toEqual("[1.626,9,-10]");
  });
});
