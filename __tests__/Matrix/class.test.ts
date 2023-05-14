// Internal Imports
import Vector from "../../src/Vector";
import Matrix from "../../src/Matrix";
import { ArrayCheck, VectorCheck } from "../../src/Check";
import { testForEach } from "../helpers";
import { faultyArrays, faultyVectors } from "../helpers/faulty";

describe("Matrix Class", () => {
  test("Matrix is a function", () => {
    expect(Matrix).toBeFunction();
  });

  test("Instance of Matrix is an object", () => {
    const matrix = new Matrix([new Vector([1, 2, 3])]);

    expect(matrix).toBeInstanceOf(Matrix);
    expect(matrix).toBeObject();
  });

  describe("Constructor", () => {
    testForEach("Prevents faulty rows array", faultyArrays, (x) => {
      const useFaultyArray = () => new Matrix(x);
      expect(useFaultyArray).toThrowError(
        ArrayCheck.CreateIsArrayError("rows")
      );
    });

    test("Prevents empty rows array", () => {
      const useEmptyArray = () => new Matrix([]);
      expect(useEmptyArray).toThrowError(
        ArrayCheck.CreateLengthGreaterThanError("rows", 0)
      );
    });

    testForEach("Prevents non-vector rows", faultyVectors, (x) => {
      const useNonVectorRow = () => new Matrix([x]);
      expect(useNonVectorRow).toThrowError(
        VectorCheck.CreateIsVectorError("row 0")
      );
    });

    test("Prevents different length rows", () => {
      const useDifferentLengthRows = () =>
        new Matrix([new Vector([1]), new Vector([1, 2])]);
      expect(useDifferentLengthRows).toThrowError(
        VectorCheck.CreateLengthEqualToError("row 1", 1)
      );
    });
  });
});
