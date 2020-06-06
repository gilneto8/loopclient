import { PointerEvent } from 'react-map-gl';
import { MarkerObj } from './marker-types';
import { LineObj } from './line-types';

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

export type ItemForm<T> = {
  name: string;
  description: string;
  type: T;
};

export type CoordsObj = [number, number, number];

export type MapItemObj = MarkerObj | LineObj;

export type OnClickEvent = PointerEvent;
