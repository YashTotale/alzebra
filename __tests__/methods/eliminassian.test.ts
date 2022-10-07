// External Imports
import { toOrdinal as numberToOrdinal } from "number-to-words";
import assert from "assert";

// Internal Imports
import Alzebra, { EliminassianResult } from "../../src/alzebra";
import { NumberMatrix, NumberVector } from "../../src/types";

interface Test {
  matrix: NumberMatrix;
  solutions: NumberVector;
  output: EliminassianResult;
  only?: boolean; // Whether only this test should run (for debugging)
}

const runner = (name: string, tests: Test[]) => {
  describe(name, () => {
    tests.forEach((t, i) => {
      const title = numberToOrdinal(i + 1);
      const testFunc = t.only ? test.only : test;
      testFunc(title, () => {
        const alzebra = new Alzebra(t.matrix);
        const expected = t.output;
        const actual = alzebra.eliminassian(t.solutions);

        expect(
          actual,
          `
          Expected — ${JSON.stringify(expected)}
          Actual   — ${JSON.stringify(actual)}
          `
        ).toEqual(t.output);
      });
    });
  });
};

describe("Checks", () => {
  test("Prevents rows from mismatching", () => {
    const mismatchRows = () =>
      new Alzebra([
        [1, 2],
        [2, 1],
      ]).eliminassian([1]);
    expect(mismatchRows).toThrowError(assert.AssertionError);
  });
});

describe("Unique Solution", () => {
  runner("Works for 1x1 matrix", [
    { matrix: [[1]], solutions: [1], output: { matrix: [[1]], vector: [1] } },
    { matrix: [[2]], solutions: [1], output: { matrix: [[1]], vector: [0.5] } },
    { matrix: [[0.5]], solutions: [1], output: { matrix: [[1]], vector: [2] } },
  ]);

  runner("Works for 2x2 matrix", [
    {
      matrix: [
        [1, 0.5],
        [2, 2],
      ],
      solutions: [1, -7.8],
      output: {
        matrix: [
          [1, 0],
          [0, 1],
        ],
        vector: [5.9, -9.8],
      },
    },
  ]);

  runner("Works for 3x2 matrix", [
    {
      matrix: [
        [1, 2],
        [2, -4],
        [3, -2],
      ],
      solutions: [4, 4, 8],
      output: {
        matrix: [
          [1, 0],
          [0, 1],
        ],
        vector: [3, 0.5],
      },
    },
  ]);

  runner("Works for 3x3 matrix", [
    {
      matrix: [
        [3, 1, -1],
        [1, -1, 1],
        [2, 1, 1],
      ],
      solutions: [1, -3, 0],
      output: {
        matrix: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ],
        vector: [-0.5, 1.75, -0.75],
      },
    },
    {
      matrix: [
        [2, 1, -3],
        [0, -2, 1],
        [0, 0, 1],
      ],
      solutions: [-10, -2, 6],
      output: {
        matrix: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ],
        vector: [2, 4, 6],
      },
    },
    {
      matrix: [
        [0, -2, 1],
        [0, 0, 1],
        [2, 1, -3],
      ],
      solutions: [-2, 6, -10],
      output: {
        matrix: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ],
        vector: [2, 4, 6],
      },
    },
    {
      matrix: [
        [0.5, 0.25, 0.25],
        [1, 0, 1],
        [0.25, 0.5, 0],
      ],
      solutions: [1.625, 3, 1.375],
      output: {
        matrix: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ],
        vector: [1.5, 2, 1.5],
      },
    },
    {
      matrix: [
        [1, 1, 0],
        [0, 1, 1],
        [2, 1, 1],
      ],
      solutions: [10, 15, 25],
      output: {
        matrix: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ],
        vector: [5, 5, 10],
      },
    },
  ]);

  runner("Works for 4x3 matrix", [
    {
      matrix: [
        [1, 2, 5],
        [1, 12, 6],
        [0, 2, 1],
        [3, 16, 16],
      ],
      solutions: [3, 1, 4, 7],
      output: {
        matrix: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ],
        vector: [-23, -0.75, 5.5],
      },
    },
  ]);

  runner("Works for 5x3 matrix", [
    {
      matrix: [
        [1, 2, 5],
        [1, 12, 6],
        [0, 2, 1],
        [3, 16, 16],
        [2, -20, 10],
      ],
      solutions: [3, 1, 4, 7, 24],
      output: {
        matrix: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ],
        vector: [-23, -0.75, 5.5],
      },
    },
  ]);
});
