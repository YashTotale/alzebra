// External Imports
import Big from "big.js";

// Internal Imports
import Vector from "../../src/Vector";
import GramSchmidt from "../../src/GramSchmidt";
import { testForEach } from "../helpers";
import { faultyNumbers, faultyObjects } from "../helpers/faulty";
import { vectorsShouldEqual } from "../Vector/helpers";

describe("Methods", () => {
  describe("Solve", () => {
    const vectors = [
      new Vector([3, 4, 0]),
      new Vector([4, 3, 0]),
      new Vector([4, 3, 0]),
    ];
    const solution = [
      new Vector([Big(3).div(Big(5)), Big(4).div(Big(5)), 0]),
      new Vector([Big(4).div(Big(5)), Big(-3).div(Big(5)), 0]),
    ];
    const extended = [...solution, new Vector([0, 0, 1])];
    const gramSchmidt = new GramSchmidt(vectors);

    testForEach("Prevents faulty options", faultyObjects, (x) => {
      const useFaultyOptions = () => gramSchmidt.solve(x);
      expect(useFaultyOptions).toThrowError();
    });

    testForEach("Prevents faulty extendBasisTo", faultyNumbers, (x) => {
      const useFaultyExtendBasisTo = () =>
        gramSchmidt.solve({ extendBasisTo: x });
      expect(useFaultyExtendBasisTo).toThrowError();
    });

    test("Prevents out of range extendBasisTo", () => {
      const useNegativeExtend = () => gramSchmidt.solve({ extendBasisTo: -1 });
      const useZeroExtend = () => gramSchmidt.solve({ extendBasisTo: 0 });
      const useLargeExtend = () => gramSchmidt.solve({ extendBasisTo: 4 });
      expect(useNegativeExtend).toThrowError();
      expect(useZeroExtend).toThrowError();
      expect(useLargeExtend).toThrowError();
    });

    test("Without extending basis", () => {
      const result = new GramSchmidt(vectors).solve();
      result.forEach((resultVector, i) => {
        const expectedVector = solution[i];
        vectorsShouldEqual(resultVector, expectedVector);
      });
    });

    test("With extending basis", () => {
      const result = new GramSchmidt(vectors).solve({ extendBasisTo: 3 });
      result.forEach((resultVector, i) => {
        const expectedVector = extended[i];
        vectorsShouldEqual(resultVector, expectedVector);
      });
    });
  });
});
