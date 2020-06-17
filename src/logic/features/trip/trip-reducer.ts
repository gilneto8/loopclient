import { Reducer } from 'redux';
import {
  ADD_LINE,
  ADD_MARKER,
  ADD_TRIP,
  REMOVE_LINE,
  REMOVE_MARKER,
  REMOVE_TRIP,
  SELECT_TRIP,
  TripAction,
  UPDATE_LINE,
  UPDATE_MARKER,
  UPDATE_TRIP,
} from './trip-actions';
import * as _ from 'lodash';
import { TripObj, TripTypes } from './trip-types';
import { _removeLineByMarker } from '@utils/line-utils/remove-line-by-marker';

export type TripStoreState = {
  trips: Array<TripObj>;
  selected: string;
};

export type TripsReducer = Reducer<TripStoreState, TripAction>;

const defaultTrip_1 = {
  id: 'trip-1',
  data: { name: 'Untitled trip 1', type: TripTypes.LEISURE, description: '' },
  geometry: { lines: [], markers: [] },
};
const defaultTrip_2 = {
  id: 'trip-2',
  data: { name: 'Untitled trip 2', type: TripTypes.LEISURE, description: '' },
  geometry: { lines: [], markers: [] },
};
const initialState: TripStoreState = {
  trips: [defaultTrip_1, defaultTrip_2],
  selected: defaultTrip_1.id,
};

export const tripsReducer: TripsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_TRIP:
      return { ...state, selected: action.payload };
    case ADD_TRIP:
      return { ...state, trips: _.concat(state.trips, action.payload) };
    case UPDATE_TRIP:
      return { ...state, trips: _.map(state.trips, (t) => (t.id === action.payload.id ? action.payload.data : t)) };
    case REMOVE_TRIP:
      return { ...state, trips: _.filter(state.trips, (t) => t.id !== action.payload) };
    case ADD_MARKER:
      return {
        ...state,
        trips: _.map(state.trips, (t) => {
          if (t.id !== action.payload.tripId) return t;
          return _.set(t, 'geometry.markers', _.concat(t.geometry.markers, action.payload.data));
        }),
      };
    case ADD_LINE:
      return {
        ...state,
        trips: _.map(state.trips, (t) => {
          if (t.id !== action.payload.tripId) return t;
          return _.set(t, 'geometry.lines', _.concat(t.geometry.lines, action.payload.data));
        }),
      };
    case UPDATE_MARKER:
      return {
        ...state,
        trips: _.map(state.trips, (t) => {
          if (t.id !== action.payload.tripId) return t;
          return _.set(
            t,
            'geometry.markers',
            _.map(t.geometry.markers, (m) => (m.id === action.payload.id ? action.payload.data : m))
          );
        }),
      };
    case UPDATE_LINE:
      return {
        ...state,
        trips: _.map(state.trips, (t) => {
          if (t.id !== action.payload.tripId) return t;
          return _.set(
            t,
            'geometry.lines',
            _.map(t.geometry.lines, (l) => (l.id === action.payload.id ? action.payload.data : l))
          );
        }),
      };
    case REMOVE_MARKER:
      return {
        ...state,
        trips: _.map(state.trips, (t) => {
          if (t.id !== action.payload.tripId) return t;
          return {
            ...t,
            geometry: {
              markers: _.filter(t.geometry.markers, (m) => m.id !== action.payload.id),
              lines: _removeLineByMarker(t.geometry.lines, action.payload.id),
            },
          };
        }),
      };
    case REMOVE_LINE:
      return {
        ...state,
        trips: _.map(state.trips, (t) => {
          if (t.id !== action.payload.tripId) return t;
          return _.set(
            t,
            'geometry.lines',
            _.filter(t.geometry.lines, (l) => l.id !== action.payload.id)
          );
        }),
      };
    default:
      return state;
  }
};
