import { PointerEvent } from 'react-map-gl';
import { MarkerObj } from '../trip/marker-types';
import { LineObj } from '../trip/line-types';

export type Viewport = {
  latitude: number;
  longitude: number;
  zoom: number;
  minZoom?: number;
  maxZoom?: number;
  pitch: number;
  maxPitch?: number;
  minPitch?: number;
};

export type OnClickEvent = PointerEvent;

export type MapItemObj = MarkerObj | LineObj;
