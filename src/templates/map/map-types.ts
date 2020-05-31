import { MarkerProps as ReactMapGLMarkerProps, ViewportProps as ReactMapGLViewportProps } from 'react-map-gl';

export type MarkerProps = Pick<ReactMapGLMarkerProps, 'latitude' | 'longitude'> & {
  id: string;
  name?: string;
  altitude?: number;
};

export type Viewport = Partial<ReactMapGLViewportProps>;
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
