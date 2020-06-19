import { MarkerObj } from '@logic/features/trip/marker-types';
import { LineObj } from '@logic/features/trip/line-types';
import { DropResult } from 'react-beautiful-dnd';
import * as _ from 'lodash';

type GeometryObj = {
  markers: Array<MarkerObj>;
  lines: Array<LineObj>;
};

export function moveMarker(dropResult: DropResult, geometry: GeometryObj): GeometryObj {
  if (!dropResult.destination) return geometry;
  const sourceMarker = _.find(geometry.markers, (m) => m.id === dropResult.draggableId);
  const destinationMarker = geometry.markers[dropResult.destination.index];
  console.log('move...', sourceMarker);
  console.log('to', destinationMarker);
  console.log('on', geometry);
  return geometry;
}
