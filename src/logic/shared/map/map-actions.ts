import { ViewportProps } from './map-types';
import { MarkerProps } from './marker-types';
import { LineProps } from './line-types';

export const UPDATE_VIEWPORT = 'UPDATE_VIEWPORT';
export const ADD_MARKER = 'ADD_MARKER';
export const REMOVE_MARKER = 'REMOVE_MARKER';
export const UPDATE_MARKER = 'UPDATE_MARKER';
export const SELECT_MARKER = 'SELECT_MARKER';
export const ADD_LINE = 'ADD_LINE';
export const REMOVE_LINE = 'REMOVE_LINE';
export const UPDATE_LINE = 'UPDATE_LINE';
export const SELECT_LINE = 'SELECT_LINE';
export const UNSELECT = 'UNSELECT';

export type MapAction =
  | {
      type: typeof UPDATE_VIEWPORT;
      payload: ViewportProps;
    }
  | { type: typeof ADD_MARKER; payload: MarkerProps }
  | { type: typeof REMOVE_MARKER; payload: string }
  | { type: typeof UPDATE_MARKER; payload: { id: string; data: MarkerProps } }
  | { type: typeof SELECT_MARKER; payload: string }
  | { type: typeof ADD_LINE; payload: LineProps }
  | { type: typeof REMOVE_LINE; payload: string }
  | { type: typeof UPDATE_LINE; payload: { id: string; data: LineProps } }
  | { type: typeof SELECT_LINE; payload: string }
  | { type: typeof UNSELECT };
