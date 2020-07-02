import { MarkerObj } from './marker-types';
import { LineObj } from './line-types';
import { TripObj } from './trip-types';

export const SELECT_TRIP = 'SELECT_TRIP';
export const ADD_TRIP = 'ADD_TRIP';
export const UPDATE_TRIP = 'UPDATE_TRIP';
export const REMOVE_TRIP = 'REMOVE_TRIP';
export const ADD_MARKER = 'ADD_MARKER';
export const ADD_LINE = 'ADD_LINE';
export const UPDATE_MARKER = 'UPDATE_MARKER';
export const UPDATE_LINE = 'UPDATE_LINE';
export const REMOVE_MARKER = 'REMOVE_MARKER';
export const REMOVE_LINE = 'REMOVE_LINE';
export const SET_GEOMETRY = 'SET_GEOMETRY';

export type TripAction =
  | { type: typeof SELECT_TRIP; payload: { id: string } }
  | { type: typeof ADD_TRIP; payload: { data: TripObj; autoSelect?: boolean } }
  | { type: typeof UPDATE_TRIP; payload: { id: string; data: TripObj } }
  | { type: typeof REMOVE_TRIP; payload: { id: string } }
  | { type: typeof ADD_MARKER; payload: { data: MarkerObj; tripId: string } }
  | { type: typeof ADD_LINE; payload: { data: LineObj; tripId: string } }
  | { type: typeof UPDATE_MARKER; payload: { tripId: string; id: string; data: MarkerObj } }
  | { type: typeof UPDATE_LINE; payload: { tripId: string; id: string; data: LineObj } }
  | { type: typeof REMOVE_MARKER; payload: { tripId: string; id: string } }
  | { type: typeof REMOVE_LINE; payload: { tripId: string; id: string } }
  | { type: typeof SET_GEOMETRY; payload: { tripId: string; markers?: Array<MarkerObj>; lines?: Array<LineObj> } };
