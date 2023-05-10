// External Imports
import assert from "assert";

// Internal Imports
import Vector from "../../src/Vector";
import Matrix from "../../src/Matrix";
import { testForEach } from "../helpers";
import { faultyArrays, faultyVectors } from "../helpers/faulty";

describe("Matrix Class", () => {
  test("Matrix is a function", () => {
    expect(Matrix).toBeFunction();
  });

  test("Instance of Matrix is an object", () => {
    const vector = new Matrix([new Vector([1, 2, 3])]);

    expect(vector).toBeInstanceOf(Matrix);
    expect(vector).toBeObject();
  });

  describe("Constructor", () => {
    testForEach("Prevents faulty rows array", faultyArrays, (x) => {
      const useFaultyArray = () => new Matrix(x);
      expect(useFaultyArray).toThrowError(assert.AssertionError);
    });

    test("Prevents empty rows array", () => {
      const useEmptyArray = () => new Matrix([]);
      expect(useEmptyArray).toThrowError(assert.AssertionError);
    });

    testForEach("Prevents non-vector rows", faultyVectors, (x) => {
      const useNonVectorRow = () => new Matrix([x]);
      expect(useNonVectorRow).toThrowError(assert.AssertionError);
    });

    test("Prevents different length rows", () => {
      const useDifferentLengthRows = () =>
        new Matrix([new Vector([1]), new Vector([1, 2])]);
      expect(useDifferentLengthRows).toThrowError(assert.AssertionError);
    });
  });
});
