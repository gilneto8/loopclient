import { LineObj } from '@logic/features/trip/line-types';
import { MarkerObj } from '@logic/features/trip/marker-types';
import * as _ from 'lodash';

export function updateLinesByMarker(marker: MarkerObj, lines: Array<LineObj>): Array<LineObj> {
  return _.map(lines, (l: LineObj) => {
    if (l.geometry.start.id.value === marker.id.value) return _.set(l, 'geometry.start', marker);
    if (l.geometry.end.id.value === marker.id.value) return _.set(l, 'geometry.end', marker);
    return l;
  });
}
