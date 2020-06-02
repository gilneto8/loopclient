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

export type MarkerForm = {
  name: string;
  type: MarkerTypes;
  description?: string;
}

export type MarkerProps = {
  id: string;
  geometry: {
    position: [number, number, number];
  };
  data?: MarkerForm;
};

export type LineForm = {
  name: string;
  type: LineTypes;
  description?: string;
};

export type LineProps = {
  id: string;
  geometry: {
    start: MarkerProps;
    end: MarkerProps;
  };
  data?: LineForm;
};

export type ItemProps = MarkerProps | LineProps | null;

export type OnClickEventArg = PointerEvent;
