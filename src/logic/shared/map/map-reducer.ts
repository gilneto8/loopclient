import { Reducer } from 'redux';
import { ViewportProps } from './map-types';
import { MarkerProps } from './marker-types';
import { LineProps } from './line-types';
import {
  ADD_LINE,
  ADD_MARKER,
  MapAction,
  REMOVE_LINE,
  REMOVE_MARKER, UPDATE_LINE,
  UPDATE_MARKER,
  UPDATE_VIEWPORT
} from "./map-actions"
import * as _ from 'lodash';

export type MapStoreState = {
  viewport: ViewportProps;
  markers: Array<MarkerProps>;
  lines: Array<LineProps>;
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
  markers: [],
  lines: [],
};

export const mapReducer: MapReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VIEWPORT:
      return { ...state, viewport: action.payload };
    case ADD_MARKER:
      return { ...state, markers: _.concat(state.markers, action.payload) };
    case UPDATE_MARKER:
      return { ...state, markers: _.map(state.markers, (m) => (m.id === action.payload.id ? action.payload.data : m)) };
    case REMOVE_MARKER:
      return { ...state, markers: _.filter(state.markers, (m) => m.id === action.payload) };
    case ADD_LINE:
      return { ...state, lines: _.concat(state.lines, action.payload) };
    case UPDATE_LINE:
      return { ...state, lines: _.map(state.lines, (m) => (m.id === action.payload.id ? action.payload.data : m)) };
    case REMOVE_LINE:
      return { ...state, lines: _.filter(state.lines, (m) => m.id === action.payload) };
  }
};
