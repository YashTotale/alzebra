// External Imports
import Big from "big.js";

// Internal Imports
import { vectorsShouldEqual } from "../Vector/helpers";
import Vector from "../../src/Vector";
import GramSchmidt from "../../src/GramSchmidt";

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
      new Vector([0, 0, 0]),
    ];

    test("removeZeroVectors is false", () => {
      const result = new GramSchmidt(vectors, false).solve();
      const expected = solution; // Keep the 0 vector at the end
      result.forEach((resultVector, i) => {
        const expectedVector = expected[i];
        vectorsShouldEqual(resultVector, expectedVector);
      });
    });

    test("removeZeroVectors is true", () => {
      const result = new GramSchmidt(vectors, true).solve();
      const expected = solution.slice(0, -1); // Remove the 0 vector at the end
      result.forEach((resultVector, i) => {
        const expectedVector = expected[i];
        vectorsShouldEqual(resultVector, expectedVector);
      });
    });
  });
});
