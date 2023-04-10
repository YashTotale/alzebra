export type Func = (...args: any[]) => any;

export type KeysMatching<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

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
