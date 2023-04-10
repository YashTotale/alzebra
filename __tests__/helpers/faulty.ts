// External Imports
import { BigSource } from "big.js";

// Internal Imports
import Vector from "../../src/Vector";

export const faultyArrays = [
  "faulty",
  123,
  true,
  null,
  {},
  () => null,
] as Array<any>[];

export const faultyVectors = [
  "faulty",
  123,
  true,
  null,
  [],
  {},
  () => null,
] as Vector[];

export const faultyBigSources = [
  true,
  {},
  "faulty",
  null,
  () => null,
] as BigSource[];
