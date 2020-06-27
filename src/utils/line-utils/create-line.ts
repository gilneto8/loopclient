import { MarkerObj } from '@logic/features/trip/marker-types';
import { id } from '@utils/functions/create-local-id';
import { LineObj, lineSchema, LineTypes } from '@logic/features/trip/line-types';

export function createLine(start: MarkerObj, end: MarkerObj): LineObj {
  return {
    id: {ctx: 'line', value: id()},
    geometry: { start, end },
    formData: {
      name: 'New line',
      description: '',
      type: LineTypes.PEDESTRIAN,
    },
    schema: lineSchema,
  };
}
