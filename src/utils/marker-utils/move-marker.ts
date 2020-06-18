import { MarkerObj } from '@logic/features/trip/marker-types';
import { LineObj } from '@logic/features/trip/line-types';

type ResultType = {
  markers: Array<MarkerObj>;
  lines: Array<LineObj>;
};

export function moveMarker(markers: Array<MarkerObj>, lines: Array<LineObj>): ResultType {
  return { markers: [], lines: [] };
}
