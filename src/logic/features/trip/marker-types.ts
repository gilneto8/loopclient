import { CoordsObj, ItemForm } from '../trip/trip-types';

export enum MarkerTypes {
  HOTEL = 'Hotel',
  SIGHTSEEING = 'Sightseeing',
  POI = 'Point of Interest',
  TRANSPORT = 'Transportation',
}

export type MarkerObj = {
  id: string;
  geometry: {
    position: CoordsObj;
  };
  data: ItemForm<MarkerTypes>;
};
