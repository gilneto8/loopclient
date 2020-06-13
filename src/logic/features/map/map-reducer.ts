import { Reducer } from 'redux';
import { Viewport } from './map-types';
import { MarkerObj } from '../trip/marker-types';
import { LineObj } from '../trip/line-types';
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
  selected?: MarkerObj | LineObj;
  hovered?: MarkerObj | LineObj;
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
  editMode: false,
  selected: undefined,
  hovered: undefined,
};

export const mapReducer: MapReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VIEWPORT:
      return { ...state, viewport: action.payload };
    case SELECT_MARKER:
      return { ...state, selected: action.payload };
    case SELECT_LINE:
      return { ...state, selected: action.payload };
    case UNSELECT:
      return { ...state, selected: undefined };
    case HOVER_MARKER:
      return { ...state, hovered: action.payload };
    case HOVER_LINE:
      return { ...state, hovered: action.payload };
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
