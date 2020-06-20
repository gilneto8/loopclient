import * as _ from 'lodash';

export function findItem(
  itemId: string,
  ...arrays: Array<{ label: string; values: Array<any> }>
) {
  let found: { label: string; item: any } | null = null;
  for (let i = 0 ; i < arrays.length; i++) {
    const array = arrays[i];
    const result = _.filter(array.values, (elem) => elem.id === itemId);
    if (result.length > 0) {
      found = {
        label: array.label,
        item: result[0],
      };
      break;
    }
  }
  return found;
}
