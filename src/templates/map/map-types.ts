import {
  MarkerProps as ReactMapGLMarkerProps,
  ViewportProps as ReactMapGLViewportProps,
  PointerEvent,
} from 'react-map-gl';
import { Position3D } from '@deck.gl/core/utils/positions';

export type Viewport = Omit<ReactMapGLViewportProps, 'altitude' | 'height' | 'width' | 'maxPitch' | 'minPitch'> & {
  maxPitch?: number;
  minPitch?: number;
};

export type MarkerProps = Pick<ReactMapGLMarkerProps, 'latitude' | 'longitude'> & {
  id: string;
  name: string;
  altitude: number;
};

export type LineProps = {
  id: string;
  name?: string;
  start: Position3D;
  end: Position3D;
};

export type OnClickEventArg = PointerEvent;
