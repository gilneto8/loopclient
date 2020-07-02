import { id } from '@utils/functions/create-local-id';
import { TripObj, TripTypes } from '@logic/features/trip/trip-types';
import { lineSchema } from '@logic/features/trip/line-types';

export function createTrip(name?: string): TripObj {
  const _id = id();
  return {
    id: _id,
    geometry: { markers: [], lines: [] },
    formData: {
      name: name ?? `New Trip #${_id}`,
      description: '',
      type: TripTypes.LEISURE,
    },
    schema: lineSchema,
  };
}
