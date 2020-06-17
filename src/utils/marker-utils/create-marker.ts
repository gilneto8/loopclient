import { MarkerObj, markerSchema, MarkerTypes } from '@logic/features/trip/marker-types';
import { id } from '@utils/functions/create-local-id';

export function createMarker(lng: number, lat: number, order: number): MarkerObj {
  return {
    geometry: { position: [lng, lat, 1] },
    id: id(),
    order,
    data: {
      name: 'New marker',
      description: '',
      type: MarkerTypes.POI,
    },
    schema: markerSchema,
  };
}
