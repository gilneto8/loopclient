import { ViewportProps as ReactMapGLViewportProps, PointerEvent } from 'react-map-gl';

export type ViewportProps = Omit<ReactMapGLViewportProps, 'altitude' | 'height' | 'width' | 'maxPitch' | 'minPitch'> & {
  maxPitch?: number;
  minPitch?: number;
};

export enum MarkerTypes {
  HOTEL = 'hotel',
  SIGHTSEEING = 'sightseeing',
  POI = 'poi',
  TRANSPORT = 'transport',
}

export enum LineTypes {
  TRAIN = 'train',
  BOAT = 'boat',
  PLANE = 'plane',
  PEDESTRIAN = 'pedestrian',
}

export type MarkerProps = {
  id: string;
  name: string;
  type: MarkerTypes;
  geometry: {
    position: [number, number, number];
  };
  data?: {};
};

export type LineProps = {
  id: string;
  name: string;
  type: LineTypes;
  geometry: {
    start: MarkerProps;
    end: MarkerProps;
  };
  data?: {};
};

export type ItemProps = MarkerProps | LineProps | null;

export type OnClickEventArg = PointerEvent;
