// Internal Imports
import Vector from "../../src/Vector";
import { ArrayCheck } from "../../src/Check";
import { testForEach } from "../helpers";
import { faultyArrays, faultyBigSources } from "../helpers/faulty";

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
    testForEach("Prevents faulty values array", faultyArrays, (x) => {
      const useFaultyArray = () => new Vector(x);
      expect(useFaultyArray).toThrowError(
        ArrayCheck.CreateIsArrayError("values")
      );
    });

    testForEach("Prevents faulty value", faultyBigSources, (x) => {
      const useFaultyValue = () => new Vector([x]);
      expect(useFaultyValue).toThrowError();
    });
  });
});
