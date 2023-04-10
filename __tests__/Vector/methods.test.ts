// External Imports
import Big from "big.js";

// Internal Imports
import Vector from "../../src/Vector";

describe("Methods", () => {
  test("Get Vector", () => {
    const numArray = [1, 2, 3];
    const bigNumArray = [Big(1), Big(2), Big(3)];
    const vector = new Vector(numArray);

    const returnedNumArray = vector.getVector(true);
    const returnedBigNumArray = vector.getVector(false);
    expect(returnedNumArray).toEqual(numArray);
    expect(returnedBigNumArray).toEqual(bigNumArray);

    returnedNumArray.push(1);
    returnedBigNumArray.push(Big(1));
    const numArrayAgain = vector.getVector(true);
    const bigNumArrayAgain = vector.getVector(false);

    // Checks that a copy was returned both times, not the original
    expect(returnedNumArray).not.toEqual(numArrayAgain);
    expect(returnedBigNumArray).not.toEqual(bigNumArrayAgain);
  });

  test("Magnitude", () => {
    const array = [3, 4];
    const vector = new Vector(array);

    expect(vector.magnitude(true)).toBe(5);
  });
});
