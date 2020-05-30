import { MarkerProps as ReactMapGLMarkerProps, ViewportProps as ReactMapGLViewportProps } from 'react-map-gl';

export type MarkerProps = Pick<ReactMapGLMarkerProps, 'latitude' | 'longitude'> & {
  id: string;
  name?: string;
  altitude?: number;
};

export type Viewport = Omit<ReactMapGLViewportProps, 'width' | 'height'>;
export type ViewType = {
  viewState: Viewport;
  interactionState: {
    inTransition?: boolean | undefined;
    isDragging?: boolean | undefined;
    isPanning?: boolean | undefined;
    isRotating?: boolean | undefined;
    isZooming?: boolean | undefined;
  };
  oldViewState: Viewport | null;
};

export type Position = {
  start: [number, number, number];
  end: [number, number, number];
  name: string;
};

export type DataItem = {
  inbound?: number;
  outbound?: number;
  from: {
    name: string;
    coordinates: [number, number, number | 0];
  };
  to: {
    name: string;
    coordinates: [number, number, number | 0];
  };
  onClick?: (arg?: any) => void;
};
