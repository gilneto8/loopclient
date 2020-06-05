import { PointerEvent } from 'react-map-gl';
import { MarkerProps } from "./marker-types"
import { LineProps } from "./line-types"

export type ViewportProps = {
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

export type ItemProps = MarkerProps | LineProps | null;

export type OnClickEventArg = PointerEvent;
