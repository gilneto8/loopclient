import { MarkerProps } from './marker-types';
import { ItemForm } from './map-types';

export enum LineTypes {
  TRAIN = 'Train',
  BOAT = 'Boat',
  PLANE = 'Plane',
  PEDESTRIAN = 'Pedestrian',
}

export type LineProps = {
  id: string;
  geometry: {
    start: MarkerProps;
    end: MarkerProps;
  };
  data: ItemForm<LineTypes>;
};
