import { EnumBase } from './enum-types';

export function enumToArray<T extends EnumBase>(arg: T): Array<T[keyof T]> {
  return (Object.values(arg) as any) as Array<T[keyof T]>;
}
