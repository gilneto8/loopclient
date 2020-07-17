import { MarkerObj, markerSchema, MarkerTypes } from '@logic/features/trip/marker-types';
import { id } from '@utils/functions/create-local-id';

export function createMarker(lng: number, lat: number): MarkerObj {
  return {
    id: { ctx: 'marker', value: id() },
    geometry: { position: [lng, lat, 1] },
    form: {
      data: {
        name: 'New marker',
        description: '',
        type: MarkerTypes.POI,
      },
      schema: markerSchema,
    },
  };
}
