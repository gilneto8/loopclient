import { CoordsObj, ItemForm } from './trip-types';
import * as yup from 'yup';
import { enumToArray } from '@utils/enums/enum-to-array';
import { LineObj } from "@logic/features/trip/line-types";

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
  id: string;
  order: number;
  geometry: {
    position: CoordsObj;
  };
  data: {
    previous: LineObj | null;
    next: LineObj | null;
  }
  formData: ItemForm<MarkerTypes>;
  schema: yup.InferType<typeof markerSchema>;
};
