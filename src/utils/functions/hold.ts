export function hold(f: (...args: any) => any, ms: number = 300) {
  setTimeout(() => {
    f();
  }, ms);
}
