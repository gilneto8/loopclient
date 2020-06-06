export function iterate<T>(seed: T, f: (arg: T) => T, times: number): T {
  let i = 0,
    accum: T = seed;
  while (i < times) {
    accum = f(accum);
    i++;
  }
  return accum;
}
