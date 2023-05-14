// Internal Imports
import GramSchmidt from "../../src/GramSchmidt";
import Vector from "../../src/Vector";
import { ArrayCheck, VectorCheck } from "../../src/Check";
import { testForEach } from "../helpers";
import { faultyArrays, faultyVectors } from "../helpers/faulty";

describe("GramSchmidt Class", () => {
  test("GramSchmidt is a function", () => {
    expect(GramSchmidt).toBeFunction();
  });

  test("Instance of GramSchmidt is an object", () => {
    const vector = new GramSchmidt([new Vector([])]);

    expect(vector).toBeInstanceOf(GramSchmidt);
    expect(vector).toBeObject();
  });

  describe("Constructor", () => {
    testForEach("Prevents faulty vectors array", faultyArrays, (x) => {
      const useFaultyArray = () => new GramSchmidt(x);
      expect(useFaultyArray).toThrowError(
        ArrayCheck.CreateIsArrayError("vectors")
      );
    });

    testForEach("Prevents faulty vector", faultyVectors, (x) => {
      const useFaultyValue = () => new GramSchmidt([x]);
      expect(useFaultyValue).toThrowError(
        VectorCheck.CreateIsVectorError("vector 0")
      );
    });

    test("Prevents different length rows", () => {
      const useDifferentLengthVectors = () =>
        new GramSchmidt([new Vector([1]), new Vector([1, 2])]);
      expect(useDifferentLengthVectors).toThrowError(
        VectorCheck.CreateLengthEqualToError("vector 1", 1)
      );
    });
  });
});
