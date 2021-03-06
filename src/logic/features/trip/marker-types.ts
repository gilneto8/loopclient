import { CoordsObj, ItemForm } from './trip-types';
import * as yup from 'yup';
import { enumToArray } from '@utils/enums/enum-to-array';

export enum MarkerTypes {
  HOTEL = 'Hotel',
  SIGHTSEEING = 'Sightseeing',
  POI = 'Point of Interest',
  TRANSPORT = 'Transportation',
}

export const markerSchema = yup.object().shape<ItemForm<MarkerTypes>>({
  name: yup.string().required('Please define a name for this point.'),
  description: yup.string(),
  type: yup.string().oneOf(enumToArray(MarkerTypes)).required(),
});

export type MarkerObj = {
  id: { ctx: 'marker'; value: string };
  order: number;
  geometry: {
    position: CoordsObj;
  };
  form: {
    data: ItemForm<MarkerTypes>;
    schema: yup.InferType<typeof markerSchema>;
  };
};
