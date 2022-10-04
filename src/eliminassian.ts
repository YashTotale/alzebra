// External Imports
import Big, { BigSource } from "big.js";

// Internal Imports
import { BigNumberMatrix, NumberMatrix } from "./types";

/**
 * Performs Gaussian Elimination on an NxM matrix
 */
export class Eliminassian {
  /**
   * Big Number matrix to which operations are applied (use `numbered` for number matrix)
   */
  public matrix: BigNumberMatrix;
  private colsAdded = 0;

  constructor(matrix: BigNumberMatrix) {
    this.matrix = matrix;
  }

  /**
   * Number matrix (use `matrix` for Big Number matrix)
   */
  public get numbered(): NumberMatrix {
    return Eliminassian.numMatrix(this.matrix);
  }

  private get numRows(): number {
    return this.matrix.length;
  }

  private get trueCols(): number {
    return this.matrix[0].length;
  }

  private get numCols(): number {
    return this.trueCols - 1; // Subtract 1 due to constants col
  }

  public solve = (): this => {
    this.makeSquare();
    this.forwardEliminate();
    this.backSubstitute();
    this.removeZeroRows();
    this.removeZeroCols();

    return this;
  };

  public makeSquare = (): this => {
    if (this.numRows !== this.numCols) {
      // Need to add rows
      if (this.numRows < this.numCols) {
        const toAdd = this.numCols - this.numRows;
        this.matrix.push(...Eliminassian.zeroArray2D(this.trueCols, toAdd));
      }
      // Need to add cols
      else {
        const originalNumCols = this.numCols;
        const toAdd = this.numRows - originalNumCols;
        this.matrix.forEach((row) => {
          row.splice(
            originalNumCols, // Right before constants col
            0,
            ...Eliminassian.zeroArray(toAdd)
          );
        });
        this.colsAdded = toAdd;
      }
    }

    return this;
  };

  public forwardEliminate = (): this => {
    for (let i = 0; i < this.matrix[0].length - 1; i++) {
      // If 0 ——> Swapping mechanism
      if (this.matrix[i][i].eq(0)) {
        const non_zero_index = this.matrix
          .slice(i + 1)
          .findIndex((row) => !row[i].eq(0));

        if (non_zero_index === -1) continue;
        this.swapRows(i, non_zero_index + i + 1); // Add i + 1 to index as i + 1 elements were sliced when finding index
      }

      const mainRow = this.matrix[i];

      const divideBy = mainRow[i];
      this.modifyRow(i, (value) => value.div(divideBy)); // Divide row by current diagonal value to get 1 in the diagonal

      // Loop starting below current row
      this.rowsLooper(i + 1)((row) => {
        const scaledMainRow = this.scaleRow(i, this.matrix[row][i]); // Scale main row to match this one (does not change main row)
        this.modifyRow(row, (val, col) => val.minus(scaledMainRow[col])); // Subtract scaled value from current; makes value under pivot 0
      });
    }

    return this;
  };

  public backSubstitute = (): this => {
    this.columnsLooper(this.numCols - 1, { reverse: true })((col) => {
      const mainRow = this.matrix[col];

      if (!mainRow[col].eq(0)) {
        this.rowsLooper(col - 1, { reverse: true })((row) => {
          const scaledMainRow = this.scaleRow(col, this.matrix[row][col]); // Scale main row to match this one (does not change main row)
          this.modifyRow(row, (val, col) => val.minus(scaledMainRow[col])); // Subtract scaled value from current; makes value above pivot 0
        });
      }
    });

    return this;
  };

  public removeZeroRows = (): this => {
    const emptyRows: number[] = [];

    this.rowsLooper(0)((row) => {
      const hasNonZero = this.matrix[row].find((val) => !val.eq(0));
      if (!hasNonZero) emptyRows.push(row - emptyRows.length); // Subtract number of empties that will be removed before this one
    });

    emptyRows.forEach((row) => this.matrix.splice(row, 1));
    return this;
  };

  private removeZeroCols = (): this => {
    const originalNumCols = this.numCols;

    if (this.colsAdded) {
      this.rowsLooper(0)((row) => {
        this.matrix[row].splice(
          originalNumCols - this.colsAdded,
          this.colsAdded
        );
      });
    }

    return this;
  };

  private rowsLooper = (
    startingRow: number,
    options: { reverse?: boolean } = { reverse: false }
  ) => {
    return (func: (row: number) => void): void => {
      for (
        let row = startingRow;
        options?.reverse ? row >= 0 : row < this.matrix.length;
        options?.reverse ? row-- : row++
      ) {
        func(row);
      }
    };
  };

  private columnsLooper = (
    startingCol: number,
    options: { reverse?: boolean } = { reverse: false }
  ) => {
    return (func: (col: number) => void): void => {
      for (
        let col = startingCol;
        options?.reverse ? col >= 0 : col < this.matrix[0].length;
        options?.reverse ? col-- : col++
      ) {
        func(col);
      }
    };
  };

  private swapRows = (i: number, j: number): void => {
    const old_row_j = this.matrix[j];
    this.matrix[j] = this.matrix[i];
    this.matrix[i] = old_row_j;
  };

  private scaleRow = (row: number, scale: BigSource): Big[] => {
    return this.matrix[row].map((value) => value.mul(scale));
  };

  private modifyRow = (
    row: number,
    changer: (value: Big, column: number) => Big
  ): void => {
    this.matrix[row].forEach(
      (value, column, rowArr) => (rowArr[column] = changer(value, column))
    );
  };

  private static numMatrix = (matrix: BigNumberMatrix): NumberMatrix => {
    return matrix.map((row) => row.map((val) => val.toNumber() + 0)); // Add 0 to avoid -0
  };

  private static zeroArray = (length: number): Big[] => {
    return [...new Array(length).fill(new Big(0))];
  };

  private static zeroArray2D = (length: number, height: number): Big[][] => {
    return new Array(height).fill(Eliminassian.zeroArray(length));
  };
}
