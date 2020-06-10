import { MarkerObj } from './marker-types';
import { ItemForm } from '../trip/trip-types';

export enum LineTypes {
  TRAIN = 'Train',
  BOAT = 'Boat',
  PLANE = 'Plane',
  PEDESTRIAN = 'Pedestrian',
}

export type LineObj = {
  id: string;
  geometry: {
    start: MarkerObj;
    end: MarkerObj;
  };
  data: ItemForm<LineTypes>;
};
