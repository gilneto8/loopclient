import { iterate } from './iterate';

export function id(chars: number = 6): string {
  const seed = iterate<number>(1, (n) => n * 10, chars - 1);
  return (seed + '').replace(/[018]/g, (c: any) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}
