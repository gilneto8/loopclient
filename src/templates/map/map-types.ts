import {
  MarkerProps as ReactMapGLMarkerProps,
  ViewportProps as ReactMapGLViewportProps,
  PointerEvent,
} from 'react-map-gl';

export type MarkerProps = Pick<ReactMapGLMarkerProps, 'latitude' | 'longitude'> & {
  id: string;
  name?: string;
  altitude?: number;
};

export type Viewport = Omit<ReactMapGLViewportProps, 'altitude' | 'height' | 'width' | 'maxPitch' | 'minPitch'> & {
  maxPitch?: number;
  minPitch?: number;
};

export type OnClickEventArg = PointerEvent;
