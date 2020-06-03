/**
 * Transform an array[N] into an array[N-1] by applying a function on each element based on the next.
 * @param array - the original array
 * @param func - the function to apply
 */
export function applyNext<T, V>(array: Array<T>, func: (current: T, next: T) => V): Array<V> {
  let result: Array<V> = [];
  for (let i = 0; i < array.length - 1; i++) {
    const current = array[i];
    const next = array[i + 1];
    result.push(func(current, next));
  }
  return result;
}
