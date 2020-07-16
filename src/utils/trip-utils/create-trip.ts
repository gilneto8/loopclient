import { id } from '@utils/functions/create-local-id';
import { TripObj, tripSchema, TripTypes } from '@logic/features/trip/trip-types';

export function createTrip(name?: string): TripObj {
  const _id = id();
  return {
    id: _id,
    geometry: { markers: [], lines: [], waypoints: [] },
    form: {
      data: {
        name: name ?? `New Trip #${_id}`,
        description: '',
        type: TripTypes.LEISURE,
      },
      schema: tripSchema,
    },
  };
}
