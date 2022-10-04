// External Imports
import assert from "assert";

// Internal Imports
import { Func, KeysMatching } from "./helpers";
import Alzebra from "../src/alzebra";

describe("Alzebra", () => {
  test("Alzebra is a function", () => {
    expect(Alzebra).toBeFunction();
  });

  test("Instance of Alzebra is an object", () => {
    const el = new Alzebra([[]]);

    expect(el).toBeInstanceOf(Alzebra);
    expect(el).toBeObject();
  });

  describe("Checks", () => {
    test("Prevents non-array matrix", () => {
      // @ts-expect-error Forcing a faulty matrix value
      const createEmpty = () => new Alzebra("faulty");
      expect(createEmpty).toThrowError(assert.AssertionError);
    });

    test("Prevents empty matrix", () => {
      const createEmpty = () => new Alzebra([]);
      expect(createEmpty).toThrowError(assert.AssertionError);
    });

    test("Prevents non-array rows", () => {
      const createNonArrayRows = () =>
        new Alzebra([
          [],
          // @ts-expect-error Forcing a faulty row value
          "qdqwd",
          // @ts-expect-error Forcing a faulty row value
          0,
        ]);
      expect(createNonArrayRows).toThrowError(assert.AssertionError);
    });

    test("Prevents non-number values", () => {
      const createNonNumberValues = () =>
        new Alzebra([
          // @ts-expect-error Forcing a faulty value
          [2, 5, "dwqqwdqwd"],
        ]);
      expect(createNonNumberValues).toThrowError(assert.AssertionError);
    });

    test("Prevents non-equal rows", () => {
      const createFaulty = () =>
        new Alzebra([
          [1, 1, 2],
          [1, 3],
          [1, 2, 2],
        ]);
      expect(createFaulty).toThrowError(assert.AssertionError);
    });
  });

  test("Matrix variable is accurate", () => {
    expect(new Alzebra([[]]).matrix).toStrictEqual([[]]);
  });

  describe("Methods", () => {
    const el = new Alzebra([[]]);

    const isFunc = (name: KeysMatching<typeof el, Func>) => {
      test(name, () => {
        expect(el[name]).toBeFunction();
      });
    };

    isFunc("eliminassian");
  });
});
