import { MarkerObj } from './marker-types';
import { LineObj } from './line-types';

export enum TripTypes {
  LEISURE = 'Leisure',
  BUSINESS = 'Business',
}

export type TripObj = {
  id: string;
  geometry: {
    markers: Array<MarkerObj>;
    lines: Array<LineObj>;
  };
  data: ItemForm<TripTypes>;
};

export type ItemForm<T> = {
  name: string;
  description: string;
  type: T;
};

export type CoordsObj = [number, number, number];
