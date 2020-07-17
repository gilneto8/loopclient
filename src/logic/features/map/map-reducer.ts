import { Reducer } from 'redux';
import { Viewport } from './map-types';
import {
  HOVER_LINE,
  HOVER_MARKER,
  MapAction,
  SELECT_LINE,
  SELECT_MARKER,
  SET_EDIT_MODE,
  SET_VIEW_MODE,
  UNHOVER,
  UNSELECT,
  UPDATE_VIEWPORT,
} from './map-actions';

export type MapStoreState = {
  viewport: Viewport;
  editMode: boolean;
  selected?: { ctx: string; value: string };
  hovered?: { ctx: string; value: string };
};

export type MapReducer = Reducer<MapStoreState, MapAction>;

const initialState: MapStoreState = {
  viewport: {
    latitude: 38.715,
    longitude: -9.139,
    zoom: 12,
    pitch: 35,
    minZoom: 3,
  },
  editMode: true,
  selected: undefined,
  hovered: undefined,
};

export const mapReducer: MapReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VIEWPORT:
      return { ...state, viewport: action.payload };
    case SELECT_MARKER:
      return { ...state, selected: { ctx: 'marker', value: action.payload.id } };
    case SELECT_LINE:
      return { ...state, selected: action.payload.id };
    case UNSELECT:
      return { ...state, selected: undefined };
    case HOVER_MARKER:
      return { ...state, hovered: { ctx: 'marker', value: action.payload.id } };
    case HOVER_LINE:
      return { ...state, hovered: { ctx: 'line', value: action.payload.id } };
    case UNHOVER:
      return { ...state, hovered: undefined };
    case SET_EDIT_MODE:
      return { ...state, editMode: true };
    case SET_VIEW_MODE:
      return { ...state, editMode: false };
    default:
      return state;
  }
};
