import { MarkerObj } from '@logic/features/trip/marker-types';
import { LineObj } from '@logic/features/trip/line-types';
import { DropResult } from 'react-beautiful-dnd';

type GeometryObj = {
  markers: Array<MarkerObj>;
  lines: Array<LineObj>;
};

export function moveMarker(dropResult: DropResult, geometry: GeometryObj): GeometryObj {
  console.log('move', dropResult, geometry);
  return geometry;
}
