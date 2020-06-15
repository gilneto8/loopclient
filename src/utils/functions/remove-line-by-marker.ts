import { LineObj, lineSchema } from '@logic/features/trip/line-types';
import * as _ from 'lodash';
import { id } from './create-local-id';

/* on deleting a marker, removes connecting lines (before and after) and connects previous and next marker */
export function _removeLineByMarker(lines: Array<LineObj>, mId: string): Array<LineObj> {
  const _lines = _.cloneDeep(lines);
  const i_Before = _.findIndex(_lines, (l) => l.geometry.end.id === mId);
  const i_After = _.findIndex(_lines, (l) => l.geometry.start.id === mId);
  if (i_After >= 0 && i_Before >= 0) {
    const newLine = {
      id: id(),
      geometry: { start: _lines[i_Before].geometry.start, end: _lines[i_After].geometry.end },
      data: _lines[i_Before].data,
      schema: lineSchema,
    };
    _lines.splice(i_Before, 2, newLine);
  } else if (i_After < 0) _lines.splice(i_Before, 1);
  else _lines.splice(0, 1);

  return _lines;
}
