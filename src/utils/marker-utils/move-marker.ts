import { DropResult } from 'react-beautiful-dnd';
import { WaypointObj } from '@logic/features/trip/trip-types';

export function moveMarker(dropResult: DropResult, geometry: Array<WaypointObj>): Array<WaypointObj> {
  /*const sourceMarker = _.find(geometry.markers, (m) => m.id === dropResult.draggableId);
  if (!sourceMarker) return geometry;
  if (!dropResult.destination) return geometry;
  const destinationMarker = geometry.markers[dropResult.destination.index];

  const newMarkers: Array<MarkerObj> = _.chain(geometry.markers)
    .map((m) => {
      if (m.id === sourceMarker.id) return { ...m, order: destinationMarker.order };
      if (sourceMarker.order < destinationMarker.order && m.order <= destinationMarker.order)
        return { ...m, order: m.order - 1 };
      if (sourceMarker.order > destinationMarker.order && m.order >= destinationMarker.order)
        return { ...m, order: m.order + 1 };
      return m;
    })
    .sortBy('order')
    .value();
  const newGeometry: GeometryObj = { markers: newMarkers, lines: geometry.lines };
  console.log('geometry', geometry.markers);
  console.log('newGeometry', newGeometry.markers);*/
  return geometry;
}
