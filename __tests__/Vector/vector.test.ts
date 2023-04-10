// External Imports
import assert from "assert";

// Internal Imports
import Vector from "../../src/Vector";
import { testForEach } from "../helpers";

describe("Vector Class", () => {
  test("Vector is a function", () => {
    expect(Vector).toBeFunction();
  });

  test("Instance of Vector is an object", () => {
    const vector = new Vector([]);

    expect(vector).toBeInstanceOf(Vector);
    expect(vector).toBeObject();
  });

  describe("Constructor", () => {
    const faultyArrays = ["faulty", 123, true, {}, () => null];
    testForEach("Prevents faulty arrays", faultyArrays, (x) => {
      // @ts-expect-error Forcing faulty array
      const createFaultyArray = () => new Vector(x);
      expect(createFaultyArray).toThrowError(assert.AssertionError);
    });

    const faultyValues = [true, {}, "faulty", () => null];
    testForEach("Prevents faulty values", faultyValues, (x) => {
      // @ts-expect-error Forcing faulty value
      const createFaultyValue = () => new Vector([x]);
      expect(createFaultyValue).toThrowError();
    });
  });
});
