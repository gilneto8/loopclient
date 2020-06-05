import { ItemForm } from "./map-types"



export enum MarkerTypes {
  HOTEL = 'Hotel',
  SIGHTSEEING = 'Sightseeing',
  POI = 'Point of Interest',
  TRANSPORT = 'Transportation',
}

export type MarkerProps = {
  id: string;
  geometry: {
    position: [number, number, number];
  };
  data: ItemForm<MarkerTypes>;
};