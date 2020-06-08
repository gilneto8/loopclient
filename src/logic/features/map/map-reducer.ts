import { Reducer } from 'redux';
import { Viewport } from './map-types';
import { MarkerObj } from './marker-types';
import { LineObj } from './line-types';
import {
  ADD_LINE,
  ADD_MARKER, HOVER_LINE, HOVER_MARKER,
  MapAction,
  REMOVE_LINE,
  REMOVE_MARKER,
  SELECT_LINE,
  SELECT_MARKER, UNHOVER,
  UNSELECT,
  UPDATE_LINE,
  UPDATE_MARKER,
  UPDATE_VIEWPORT
} from "./map-actions"
import * as _ from 'lodash';
import { id } from '../../../utils/functions/create-local-id';

export type MapStoreState = {
  viewport: Viewport;
  markers: Array<MarkerObj>;
  lines: Array<LineObj>;
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
  markers: [],
  lines: [],
  selected: undefined,
  hovered: undefined,
};

/* on deleting a marker, removes connecting lines (before and after) and connects previous and next marker */
function _removeLineByMarker(lines: Array<LineObj>, mId: string): Array<LineObj> {
  const _lines = _.cloneDeep(lines);
  const i_Before = _.findIndex(_lines, (l) => l.geometry.end.id === mId);
  const i_After = _.findIndex(_lines, (l) => l.geometry.start.id === mId);
  if (i_After >= 0 && i_Before >= 0) {
    const newLine = {
      id: id(),
      geometry: { start: _lines[i_Before].geometry.start, end: _lines[i_After].geometry.end },
      data: _lines[i_Before].data,
    };
    _lines.splice(i_Before, 2, newLine);
  } else if (i_After < 0) _lines.splice(i_Before, 1);
  else _lines.splice(0, 1);

  return _lines;
}

export const mapReducer: MapReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VIEWPORT:
      return { ...state, viewport: action.payload };
    case ADD_MARKER:
      return { ...state, markers: _.concat(state.markers, action.payload) };
    case ADD_LINE:
      return { ...state, lines: _.concat(state.lines, action.payload) };
    case UPDATE_MARKER:
      return { ...state, markers: _.map(state.markers, (m) => (m.id === action.payload.id ? action.payload.data : m)) };
    case UPDATE_LINE:
      return { ...state, lines: _.map(state.lines, (l) => (l.id === action.payload.id ? action.payload.data : l)) };
    case REMOVE_MARKER:
      return {
        ...state,
        markers: _.filter(state.markers, (m) => m.id !== action.payload),
        lines: _removeLineByMarker(state.lines, action.payload),
      };
    case REMOVE_LINE:
      return { ...state, lines: _.filter(state.lines, (l) => l.id !== action.payload) };
    case SELECT_MARKER:
      return { ...state, selected: _.find(state.markers, (m) => m.id === action.payload) };
    case SELECT_LINE:
      return { ...state, selected: _.find(state.lines, (l) => l.id === action.payload) };
    case UNSELECT:
      return { ...state, selected: undefined };
    case HOVER_MARKER:
      return { ...state, hovered: _.find(state.markers, (m) => m.id === action.payload) };
    case HOVER_LINE:
      return { ...state, hovered: _.find(state.lines, (l) => l.id === action.payload) };
    case UNHOVER:
      return { ...state, hovered: undefined };
    default:
      return state;
  }
};
