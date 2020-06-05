import { PointerEvent } from 'react-map-gl';

export type ViewportProps = {
  latitude: number;
  longitude: number;
  zoom: number;
  minZoom?: number;
  maxZoom?: number;
  pitch: number;
  maxPitch?: number;
  minPitch?: number;
};

export enum MarkerTypes {
  HOTEL = 'Hotel',
  SIGHTSEEING = 'Sightseeing',
  POI = 'Point of Interest',
  TRANSPORT = 'Transportation',
}

export enum LineTypes {
  TRAIN = 'Train',
  BOAT = 'Boat',
  PLANE = 'Plane',
  PEDESTRIAN = 'Pedestrian',
}

export type ItemForm<T> = {
  name: string;
  description: string;
  type: T;
};

export type MarkerProps = {
  id: string;
  geometry: {
    position: [number, number, number];
  };
  data: ItemForm<MarkerTypes>;
};

export type LineProps = {
  id: string;
  geometry: {
    start: MarkerProps;
    end: MarkerProps;
  };
  data: ItemForm<LineTypes>;
};

export type ItemProps = MarkerProps | LineProps | null;

export type OnClickEventArg = PointerEvent;
