import { MarkerObj } from './marker-types';
import { LineObj } from './line-types';
import * as yup from 'yup';
import { enumToArray } from '@utils/enums/enum-to-array';

export enum TripTypes {
  LEISURE = 'Leisure',
  BUSINESS = 'Business',
}

export const tripSchema = yup.object().shape<ItemForm<TripTypes>>({
  name: yup.string().required('Please define a name for this trip.'),
  description: yup.string(),
  type: yup.string().oneOf(enumToArray(TripTypes)).required(),
});

export type WaypointObj =
  | (MarkerObj & { next: () => LineObj | undefined; previous: () => LineObj | undefined })
  | (LineObj & { next: () => MarkerObj; previous: () => MarkerObj });

export type TripObj = {
  id: string;
  geometry: {
    markers: Array<MarkerObj>;
    lines: Array<LineObj>;
    waypoints: Array<WaypointObj>;
  };
  form: {
    data: ItemForm<TripTypes>;
    schema: yup.InferType<typeof tripSchema>;
  };
};

export type ItemForm<T> = {
  name: string;
  description?: string;
  type: T;
};

export type CoordsObj = [number, number, number];
