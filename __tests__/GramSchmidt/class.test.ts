// External Imports
import assert from "assert";

// Internal Imports
import GramSchmidt from "../../src/GramSchmidt";
import { testForEach } from "../helpers";
import { faultyArrays, faultyVectors } from "../helpers/faulty";
import Vector from "../../src/Vector";

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
      expect(useFaultyArray).toThrowError(assert.AssertionError);
    });

    testForEach("Prevents faulty vector", faultyVectors, (x) => {
      const useFaultyValue = () => new GramSchmidt([x]);
      expect(useFaultyValue).toThrowError(assert.AssertionError);
    });

    test("Prevents different length rows", () => {
      const useDifferentLengthVectors = () =>
        new GramSchmidt([new Vector([1]), new Vector([1, 2])]);
      expect(useDifferentLengthVectors).toThrowError(assert.AssertionError);
    });
  });
});
