import {
  ViewportProps as ReactMapGLViewportProps,
  PointerEvent,
} from 'react-map-gl';

export type ViewportProps = Omit<ReactMapGLViewportProps, 'altitude' | 'height' | 'width' | 'maxPitch' | 'minPitch'> & {
  maxPitch?: number;
  minPitch?: number;
};

export type MarkerProps = {
  id: string;
  name: string;
  geometry: {
    position: [number, number, number];
  };
  data?: {}
};

export type LineProps = {
  id: string;
  name: string;
  geometry: {
    start: MarkerProps;
    end: MarkerProps;
  };
  data?: {}
};

export type ItemProps = MarkerProps | LineProps | null;

export type OnClickEventArg = PointerEvent;
