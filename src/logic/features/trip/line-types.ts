import { MarkerObj } from './marker-types';
import { ItemForm } from './trip-types';
import * as yup from 'yup';
import { enumToArray } from '@utils/enums/enum-to-array';

export enum LineTypes {
  TRAIN = 'Train',
  BOAT = 'Boat',
  PLANE = 'Plane',
  PEDESTRIAN = 'Pedestrian',
}

export const lineSchema = yup.object().shape<ItemForm<LineTypes>>({
  name: yup.string().required('Please define a name for this point.'),
  description: yup.string(),
  type: yup.string().oneOf(enumToArray(LineTypes)).required(),
});

export type LineObj = {
  id: { ctx: 'line'; value: string };
  geometry: {
    start: MarkerObj;
    end: MarkerObj;
  };
  form: {
    data: ItemForm<LineTypes>;
    schema: yup.InferType<typeof lineSchema>;
  };
};
