// External Imports
import assert from "assert";

// Internal Imports
import GramSchmidt from "../../src/GramSchmidt";
import { testForEach } from "../helpers";
import { faultyArrays, faultyBooleans, faultyVectors } from "../helpers/faulty";

describe("GramSchmidt Class", () => {
  test("GramSchmidt is a function", () => {
    expect(GramSchmidt).toBeFunction();
  });

  test("Instance of GramSchmidt is an object", () => {
    const vector = new GramSchmidt([], true);

    expect(vector).toBeInstanceOf(GramSchmidt);
    expect(vector).toBeObject();
  });

  describe("Constructor", () => {
    testForEach("Prevents faulty vectors array", faultyArrays, (x) => {
      const useFaultyArray = () => new GramSchmidt(x, true);
      expect(useFaultyArray).toThrowError(assert.AssertionError);
    });

    testForEach("Prevents faulty vector", faultyVectors, (x) => {
      const useFaultyValue = () => new GramSchmidt([x], true);
      expect(useFaultyValue).toThrowError(assert.AssertionError);
    });

    testForEach("Prevents faulty removeZeroVectors", faultyBooleans, (x) => {
      const useFaultyValue = () => new GramSchmidt([], x);
      expect(useFaultyValue).toThrowError(assert.AssertionError);
    });
  });
});
