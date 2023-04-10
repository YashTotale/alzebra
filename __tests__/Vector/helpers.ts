import Vector from "../../src/Vector";

export const vectorsShouldEqual = (vector1: Vector, vector2: Vector) => {
  expect(vector1.getVector(true)).toEqual(vector2.getVector(true));
};

export const vectorsShouldNotEqual = (vector1: Vector, vector2: Vector) => {
  expect(vector1.getVector(true)).not.toEqual(vector2.getVector(true));
};
