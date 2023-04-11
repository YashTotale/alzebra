import Vector from "../../src/Vector";

export const vectorsShouldEqual = (vector1: Vector, vector2: Vector) => {
  expect(vector1.getNumVector()).toEqual(vector2.getNumVector());
};

export const vectorsShouldNotEqual = (vector1: Vector, vector2: Vector) => {
  expect(vector1.getNumVector()).not.toEqual(vector2.getNumVector());
};
