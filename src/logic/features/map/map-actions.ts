import { Viewport } from './map-types';
import { MarkerObj } from "../trip/marker-types";
import { LineObj } from "../trip/line-types";

export const UPDATE_VIEWPORT = 'UPDATE_VIEWPORT';
export const SELECT_MARKER = 'SELECT_MARKER';
export const SELECT_LINE = 'SELECT_LINE';
export const UNSELECT = 'UNSELECT';
export const HOVER_MARKER = 'HOVER_MARKER';
export const HOVER_LINE = 'HOVER_LINES';
export const UNHOVER = 'UNHOVER';

export type MapAction =
  | {
      type: typeof UPDATE_VIEWPORT;
      payload: Viewport;
    }
  | { type: typeof SELECT_MARKER; payload: MarkerObj }
  | { type: typeof SELECT_LINE; payload: LineObj }
  | { type: typeof UNSELECT }
  | { type: typeof HOVER_MARKER; payload: MarkerObj }
  | { type: typeof HOVER_LINE; payload: LineObj }
  | { type: typeof UNHOVER };
