// External Imports
import assert from "assert";
import Big from "big.js";

// Internal Imports
import Vector from "../src/Vector";
import { testForEach } from "./helpers";

describe("Vector Class", () => {
  test("Vector is a function", () => {
    expect(Vector).toBeFunction();
  });

  test("Instance of Vector is an object", () => {
    const vector = new Vector([]);

    expect(vector).toBeInstanceOf(Vector);
    expect(vector).toBeObject();
  });

  describe("Checks", () => {
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

  interface VectorInformation {
    vectorArray: number[];
    vectorInstance: Vector;
    magnitude: number;
  }
  const vectors: VectorInformation[] = [
    {
      vectorArray: [],
      vectorInstance: new Vector([]),
      magnitude: 0,
    },
    {
      vectorArray: [1],
      vectorInstance: new Vector([1]),
      magnitude: 1,
    },
    {
      vectorArray: [2, 5],
      vectorInstance: new Vector([2, 5]),
      magnitude: 5.385164807134504,
    },
    {
      vectorArray: [3, 4],
      vectorInstance: new Vector([3, 4]),
      magnitude: 5,
    },
    {
      vectorArray: [1, 2, 3],
      vectorInstance: new Vector([1, 2, 3]),
      magnitude: 3.7416573867739413,
    },
  ];
  describe("Methods", () => {
    testForEach("Magnitude", vectors, (info) => {
      expect(info.vectorInstance.magnitude(true)).toBe(info.magnitude);
    });

    testForEach("Get Vector", vectors, (info) => {
      const returnedVector = info.vectorInstance.getVector(true);
      expect(returnedVector).toEqual(info.vectorArray);
      returnedVector.push(1);
      const getAgain = info.vectorInstance.getVector(true);
      expect(returnedVector).not.toEqual(getAgain); // Checks that a copy was returned both times, not the original
    });
  });
});
