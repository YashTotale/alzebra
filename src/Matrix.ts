// Internal Imports
import Vector from "./Vector";
import { ArrayCheck, VectorCheck } from "./Check";

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
    ArrayCheck.isArray({ rows });
    ArrayCheck.lengthGreaterThan({ rows }, 0);
    rows.forEach((row, i) => {
      const name = `row ${i}`;
      VectorCheck.isVector({ [name]: row });
      const rowLength = rows[0].length;
      VectorCheck.lengthEqualTo({ [name]: row }, rowLength);
    });
  }
}

export default Matrix;
