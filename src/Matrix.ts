// External Imports
import assert from "assert";

// Internal Imports
import Vector from "./Vector";

class Matrix {
  private rows: Vector[];

  constructor(rows: Vector[]) {
    this.checkRows(rows);
    this.rows = [...rows];
  }

  public get numRows() {
    return this.rows.length;
  }

  public get numCols() {
    return this.rows[0].length;
  }

  public get isSquare() {
    return this.numRows === this.numCols;
  }

  private checkRows(rows: Vector[]) {
    console.log(rows, Array.isArray(rows));
    assert(Array.isArray(rows), "rows must be an array");
    assert(rows.length > 0, "rows must have at least 1 row");
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
