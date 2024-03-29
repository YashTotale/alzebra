// External Imports
import Big from "big.js";

// Internal Imports
import Vector from "../../src/Vector";
import { NumberCheck, VectorCheck } from "../../src/Check";
import { vectorsShouldEqual } from "./helpers";
import { testForEach } from "../helpers";
import {
  faultyBigSources,
  faultyNumbers,
  faultyVectors,
} from "../helpers/faulty";

describe("Instance Methods", () => {
  describe("Get Vector", () => {
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
  });

  describe("Get Value", () => {
    const emptyVector = new Vector([]);

    testForEach("Prevents faulty position", faultyNumbers, (x) => {
      const useFaultyBigPosition = () => emptyVector.getBigValue(x);
      const useFaultyNumPosition = () => emptyVector.getNumValue(x);
      expect(useFaultyBigPosition).toThrowError(
        NumberCheck.CreateIsNumberError("position")
      );
      expect(useFaultyNumPosition).toThrowError(
        NumberCheck.CreateIsNumberError("position")
      );
    });

    test("Prevents negative position", () => {
      const useNegativeBigPosition = () => emptyVector.getBigValue(-1);
      const useNegativeNumPosition = () => emptyVector.getNumValue(-1);
      expect(useNegativeBigPosition).toThrowError(
        NumberCheck.CreateIsGreaterThanOrEqualToError("position", 0)
      );
      expect(useNegativeNumPosition).toThrowError(
        NumberCheck.CreateIsGreaterThanOrEqualToError("position", 0)
      );
    });

    test("Prevents position equal to length", () => {
      const useBigPositionEqualToLength = () => emptyVector.getNumValue(0);
      const useNumPositionEqualToLength = () => emptyVector.getBigValue(0);
      expect(useBigPositionEqualToLength).toThrowError(
        NumberCheck.CreateIsLessThanError("position", 0)
      );
      expect(useNumPositionEqualToLength).toThrowError(
        NumberCheck.CreateIsLessThanError("position", 0)
      );
    });

    test("Prevents position greater than length", () => {
      const useBigPositionGreaterThanLength = () => emptyVector.getNumValue(1);
      const useNumPositionGreaterThanLength = () => emptyVector.getBigValue(1);
      expect(useBigPositionGreaterThanLength).toThrowError(
        NumberCheck.CreateIsLessThanError("position", 0)
      );
      expect(useNumPositionGreaterThanLength).toThrowError(
        NumberCheck.CreateIsLessThanError("position", 0)
      );
    });

    test("Get Big Value", () => {
      const array = [Big(1), Big(2), Big(3)];
      const vector = new Vector(array);

      const returnedValue = vector.getBigValue(2);
      expect(returnedValue).toEqual(Big(3));
    });

    test("Get Num Value", () => {
      const array = [1, 2, 3];
      const vector = new Vector(array);

      const returnedValue = vector.getNumValue(0);
      expect(returnedValue).toEqual(1);
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
      expect(useFaultyVector).toThrowError(
        VectorCheck.CreateIsVectorError("other")
      );
    });

    test("Prevents different length vector", () => {
      const vector1 = new Vector([1, 2, 3]);
      const vector2 = new Vector([1, 2]);

      const doFaultySubtract = () => vector1.subtract(vector2);
      expect(doFaultySubtract).toThrowError(
        VectorCheck.CreateNotSameLengthError()
      );
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
      expect(useFaultyVector).toThrowError(
        VectorCheck.CreateIsVectorError("other")
      );
    });

    test("Prevents different length vector", () => {
      const vector1 = new Vector([1, 2]);
      const vector2 = new Vector([1, 2, 3]);
      const useDifferentLengthVector = () => vector1.innerProduct(vector2);
      expect(useDifferentLengthVector).toThrowError(
        VectorCheck.CreateNotSameLengthError()
      );
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
      expect(useFaultyVector).toThrowError(
        VectorCheck.CreateIsVectorError("other")
      );
    });

    test("Prevents different length vector", () => {
      const vector1 = new Vector([1, 2]);
      const vector2 = new Vector([1, 2, 3]);
      const useDifferentLengthVector = () => vector1.projectionOnto(vector2);
      expect(useDifferentLengthVector).toThrowError(
        VectorCheck.CreateNotSameLengthError()
      );
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

  test("Length", () => {
    const vector = new Vector([0, 0, 2]);
    expect(vector.length).toBe(3);
  });
});

describe("Static Methods", () => {
  describe("Standard Basis Vectors", () => {
    testForEach("Prevents faulty dimension", faultyNumbers, (x) => {
      const useFaultyDimension = () => Vector.standardBasisVectors(x);
      expect(useFaultyDimension).toThrowError(
        NumberCheck.CreateIsNumberError("dimension")
      );
    });

    test("Prevents non-positive dimension", () => {
      const useNegativeDimension = () => Vector.standardBasisVectors(-1);
      const useZeroDimension = () => Vector.standardBasisVectors(0);
      expect(useNegativeDimension).toThrowError(
        NumberCheck.CreateIsGreaterThanError("dimension", 0)
      );
      expect(useZeroDimension).toThrowError(
        NumberCheck.CreateIsGreaterThanError("dimension", 0)
      );
    });

    test("Works", () => {
      const expected = [
        new Vector([1, 0, 0]),
        new Vector([0, 1, 0]),
        new Vector([0, 0, 1]),
      ];

      const result = Vector.standardBasisVectors(3);
      result.forEach((resultVector, i) => {
        const expectedVector = expected[i];
        vectorsShouldEqual(resultVector, expectedVector);
      });
    });
  });
});
