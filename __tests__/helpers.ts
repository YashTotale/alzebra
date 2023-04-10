import { BigSource } from "big.js";

export type Func = (...args: any[]) => any;

export type KeysMatching<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

// @ts-expect-error Forcing faulty arrays
export const faultyArrays: Array<any>[] = ["faulty", 123, true, {}, () => null];

// @ts-expect-error Forcing faulty big sources
export const faultyBigSources: BigSource[] = [true, {}, "faulty", () => null];

export const testForEach = <T>(
  name: string,
  iterable: Iterable<T>,
  fn: (x: T) => void
) =>
  test(name, () => {
    for (const x of iterable) {
      fn(x);
    }
  });
