// External Imports
import assert from "assert";
import Big, { BigSource } from "big.js";
import { Memoize } from "typescript-memoize";

// Internal Imports
import Vector from "./Vector";

class Matrix {
  private rows: Vector[];
  private numRows: number;
  private numCols: number;

  constructor(rows: Vector[]) {
    this.checkRows(rows);
    this.rows = [...rows];
    this.numRows = this.rows.length;
    this.numCols = this.rows[0].length;
  }

  private checkRows(rows: Vector[]) {
    console.log(rows, Array.isArray(rows));
    assert(Array.isArray(rows), "rows must be an array");
    assert(rows.length > 0, "rows must be have at least 1 row");
    rows.forEach((row, i) => {
      assert(row instanceof Vector, `row ${i + 1} must be a Vector`);
      const rowLength = rows[0].length;
      assert(
        row.length === rowLength,
        `row ${i + 1} does not have the correct length (${rowLength})`
      );
    });
  }
}

export default Matrix;
