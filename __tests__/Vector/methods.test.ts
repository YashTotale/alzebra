// External Imports
import Big from "big.js";
import assert from "assert";

// Internal Imports
import Vector from "../../src/Vector";

describe("Methods", () => {
  describe("Get Vector", () => {
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

  describe("Subtract", () => {
    test("Checks for same length", () => {
      const vector1 = new Vector([1, 2, 3]);
      const vector2 = new Vector([1, 2]);

      const doFaultySubtract = () => vector1.subtract(vector2);
      expect(doFaultySubtract).toThrowError(assert.AssertionError);
    });

    const vector1 = new Vector([3, 2, 1]);
    const vector2 = new Vector([1, 2, 3]);
    const subtracted = new Vector([2, 0, -2]);
    expect(vector1.subtract(vector2)).toEqual(subtracted);
  });

  test("Magnitude", () => {
    const array = [3, 4];
    const vector = new Vector(array);

    expect(vector.magnitude()).toEqual(Big(5));
  });

  test("Inner Product", () => {
    const vector1 = new Vector([3, 4]);
    const vector2 = new Vector([4, 7]);

    expect(vector1.innerProduct(vector2)).toEqual(Big(40));
  });
});
