import { MarkerObj } from '@logic/features/trip/marker-types';
import { LineObj } from '@logic/features/trip/line-types';
import { DropResult } from 'react-beautiful-dnd';
import * as _ from 'lodash';

type GeometryObj = {
  markers: Array<MarkerObj>;
  lines: Array<LineObj>;
};

export function moveMarker(dropResult: DropResult, geometry: GeometryObj): GeometryObj {
  const sourceMarker = _.find(geometry.markers, (m) => m.id === dropResult.draggableId);
  if (!sourceMarker) return geometry;
  if (!dropResult.destination) return geometry;
  const destinationMarker = geometry.markers[dropResult.destination.index];

  let newMarkers: Array<MarkerObj>;
  if (sourceMarker.order > destinationMarker.order) {
    newMarkers = _.map(geometry.markers, (m) => {
      if (m.order > destinationMarker.order) return { ...m, order: m.order - 1 };
      if (m.id === destinationMarker.id) return { ...m, order: destinationMarker.order };
      return m;
    });
  } else
    newMarkers = _.map(geometry.markers, (m) => {
      if (m.order < destinationMarker.order) return { ...m, order: m.order + 1 };
      if (m.id === destinationMarker.id) return { ...m, order: destinationMarker.order };
      return m;
    });
  const newGeometry: GeometryObj = { markers: newMarkers, lines: geometry.lines };
  console.log('geometry', geometry.markers);
  console.log('newGeometry', newGeometry.markers);
  return newGeometry;
}
