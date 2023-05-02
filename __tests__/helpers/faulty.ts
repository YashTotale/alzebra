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

export const faultyNumbers = [
  "faulty",
  true,
  null,
  [],
  {},
  () => null,
] as number[];

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

export const faultyBigSourceArrays = faultyArrays.concat(
  faultyBigSources.map((faulty) => [faulty])
) as BigSource[][];
