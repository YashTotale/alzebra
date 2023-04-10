// External Imports
import { BigSource } from "big.js";

// Internal Imports
import Vector from "../../src/Vector";

export const faultyBooleans = [
  "faulty",
  123,
  null,
  [],
  {},
  () => null,
] as boolean[];

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
  "faulty",
  true,
  null,
  [],
  {},
  () => null,
] as BigSource[];
