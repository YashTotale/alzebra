// External Imports
import assert from "assert";
import Big from "big.js";

// Internal Imports
import { Eliminassian } from "./eliminassian";
import {
  BigNumberMatrix,
  BigNumberVector,
  NumberMatrix,
  NumberVector,
} from "./types";

export type EliminassianResult = {
  matrix: NumberMatrix;
  result: NumberVector;
};

export class Alzebra {
  /**
   * Big Number matrix to which operations are applied
   */
  public matrix: BigNumberMatrix;

  constructor(matrix: NumberMatrix) {
    assert(Array.isArray(matrix), "Matrix must be an array");

    const rowError = Alzebra.checkMatrixRows(matrix);
    assert(rowError === null, rowError as string);

    this.matrix = Alzebra.bigNumMatrix(matrix);
  }

  public eliminassian(result: NumberVector): EliminassianResult {
    assert(
      this.matrix.length === result.length,
      "The number of values in the result vector must equal the number of rows in the Alzebra matrix"
    );

    const matrixCopy = Alzebra.copyBigMatrix(this.matrix);
    const bigResult = Alzebra.bigNumVector(result);

    for (let i = 0; i < bigResult.length; i++) {
      matrixCopy[i].push(bigResult[i]);
    }

    const solvedMatrix = new Eliminassian(matrixCopy).solve().numbered;
    const solvedResult = solvedMatrix.map(
      (row) => row.splice(row.length - 1)[0]
    );

    return {
      matrix: solvedMatrix,
      result: solvedResult,
    };
  }

  private static checkMatrixRows = (matrix: NumberMatrix): string | null => {
    if (!matrix.length) return "Matrix must have at least 1 row";

    const rowLength = matrix[0].length;

    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i];

      if (!Array.isArray(row)) return "Matrix rows must be arrays";
      if (!row.every((v) => typeof v === "number"))
        return "Matrix rows must only contain numbers";
      if (row.length !== rowLength) return "Matrix rows must have equal length";
    }

    return null;
  };

  private static bigNumVector = (vector: NumberVector): BigNumberVector => {
    return vector.map((val) => new Big(val));
  };

  private static bigNumMatrix = (matrix: NumberMatrix): BigNumberMatrix => {
    return matrix.map(Alzebra.bigNumVector);
  };

  public static copyBigMatrix = (matrix: BigNumberMatrix): BigNumberMatrix => {
    return matrix.map((row) => row.map((val) => new Big(val)));
  };
}

export default Alzebra;
