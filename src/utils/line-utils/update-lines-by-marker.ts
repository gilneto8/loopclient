import { MarkerObj } from '@logic/features/trip/marker-types';
import * as _ from 'lodash';
import { WaypointObj } from '@logic/features/trip/trip-types';

export function updateLinesByMarker(marker: MarkerObj, waypoints: Array<WaypointObj>): Array<WaypointObj> {
  return _.map(waypoints, (w: WaypointObj) => {
    if (w.id.ctx !== 'line') return w;
    if ((w.previous() as MarkerObj)?.id.value === marker.id.value) return _.set(w, 'previous', () => marker);
    if ((w.next() as MarkerObj)?.id.value === marker.id.value) return _.set(w, 'next', () => marker);
    return w;
  });
}
