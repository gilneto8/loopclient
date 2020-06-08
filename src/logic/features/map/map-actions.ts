import { Viewport } from './map-types';
import { MarkerObj } from './marker-types';
import { LineObj } from './line-types';

export const UPDATE_VIEWPORT = 'UPDATE_VIEWPORT';
export const ADD_MARKER = 'ADD_MARKER';
export const ADD_LINE = 'ADD_LINE';
export const UPDATE_MARKER = 'UPDATE_MARKER';
export const UPDATE_LINE = 'UPDATE_LINE';
export const REMOVE_MARKER = 'REMOVE_MARKER';
export const REMOVE_LINE = 'REMOVE_LINE';
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
  | { type: typeof ADD_MARKER; payload: MarkerObj }
  | { type: typeof ADD_LINE; payload: LineObj }
  | { type: typeof UPDATE_MARKER; payload: { id: string; data: MarkerObj } }
  | { type: typeof UPDATE_LINE; payload: { id: string; data: LineObj } }
  | { type: typeof REMOVE_MARKER; payload: string }
  | { type: typeof REMOVE_LINE; payload: string }
  | { type: typeof SELECT_MARKER; payload: string }
  | { type: typeof SELECT_LINE; payload: string }
  | { type: typeof UNSELECT }
  | { type: typeof HOVER_MARKER; payload: string }
  | { type: typeof HOVER_LINE; payload: string }
  | { type: typeof UNHOVER };
