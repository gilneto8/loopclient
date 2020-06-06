export function hold(f: (...args: any) => any,) {
  setTimeout(() => {
    f();
  }, 300);
}
