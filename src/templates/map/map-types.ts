import { MarkerProps as ReactMapGLMarkerProps, ViewportProps as ReactMapGLViewportProps } from 'react-map-gl';
import { PickInfo as DeckGLPickInfo } from '@deck.gl/core/lib/deck';

export type MarkerProps = Pick<ReactMapGLMarkerProps, 'latitude' | 'longitude'> & {
  id: string;
  name?: string;
  altitude?: number;
};

export type Viewport = Omit<ReactMapGLViewportProps, 'height' | 'width' | 'maxPitch' | 'minPitch'> & {
  maxPitch?: number;
  minPitch?: number;
};
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

export type PickInfo<T = void> = Omit<DeckGLPickInfo<any>, 'coordinate'> & {
  coordinate: [number, number] | [number, number, number];
};
