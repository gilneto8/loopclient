import { Reducer } from 'redux';
import {
  ADD_LINE,
  ADD_MARKER,
  ADD_TRIP,
  REMOVE_LINE,
  REMOVE_MARKER,
  REMOVE_TRIP,
  SELECT_TRIP,
  SET_GEOMETRY,
  TripAction,
  UPDATE_LINE,
  UPDATE_MARKER,
  UPDATE_TRIP,
} from './trip-actions';
import * as _ from 'lodash';
import { TripObj, WaypointObj } from './trip-types';
import { createTrip } from '@utils/trip-utils/create-trip';
import { createLine } from '@utils/line-utils/create-line';

export type TripStoreState = {
  trips: Array<TripObj>;
  selected: string;
};

export type TripsReducer = Reducer<TripStoreState, TripAction>;

const defaultTrip_1 = createTrip('New Trip 1');

const initialState: TripStoreState = {
  trips: [defaultTrip_1],
  selected: defaultTrip_1.id,
};

export const tripsReducer: TripsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_TRIP:
      return { ...state, selected: action.payload.id };
    case ADD_TRIP:
      return {
        ...state,
        trips: _.concat(state.trips, action.payload.data),
        selected: action.payload.autoSelect ? action.payload.data.id : state.selected,
      };
    case UPDATE_TRIP:
      return { ...state, trips: _.map(state.trips, (t) => (t.id === action.payload.id ? action.payload.data : t)) };
    case REMOVE_TRIP:
      return { ...state, trips: _.filter(state.trips, (t) => t.id !== action.payload.id) };
    case ADD_MARKER:
      const line = createLine();
      return {
        ...state,
        trips: _.map(state.trips, (t) => {
          if (t.id !== action.payload.tripId) return t;
          const { waypoints } = t.geometry;
          const last = waypoints[waypoints.length - 1];
          return {
            ...t,
            geometry: {
              ...t.geometry,
              waypoints: [
                ...(() => {
                  if (waypoints.length > 0)
                    return [
                      ..._.slice(waypoints, 0, waypoints.length > 0 ? waypoints.length - 1 : 0),
                      { ...last, next: () => line } as WaypointObj,
                      { ...line, previous: () => last, next: () => action.payload.data } as WaypointObj,
                    ];
                  return [];
                })(),
                { ...action.payload.data, previous: () => line, next: () => undefined } as WaypointObj,
              ],
            },
          };
        }),
      };
    case ADD_LINE:
      return state; /*{
        ...state,
        trips: _.map(state.trips, (t) => {
          if (t.id !== action.payload.tripId) return t;
          return _.set(t, 'geometry.lines', _.concat(t.geometry.lines, action.payload.data));
        }),
      };*/
    case UPDATE_MARKER:
      return {
        ...state,
        trips: _.map(state.trips, (t) => {
          if (t.id !== action.payload.tripId) return t;
          return _.set(
            t,
            'geometry.waypoints',
            _.map(t.geometry.waypoints, (w) => (w.id.value === action.payload.id ? action.payload.data : w))
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
            'geometry.waypoints',
            _.map(t.geometry.waypoints, (w) => (w.id.value === action.payload.id ? action.payload.data : w))
          );
        }),
      };
    case REMOVE_MARKER:
      return state; /*{
        ...state,
        trips: _.map(state.trips, (t) => {
          if (t.id !== action.payload.tripId) return t;
          return {
            ...t,
            geometry: {
              ...t.geometry,
              markers: _.filter(t.geometry.markers, (m) => m.id.value !== action.payload.id),
              lines: removeLineByMarker(t.geometry.lines, action.payload.id),
            },
          };
        }),
      };*/
    case REMOVE_LINE:
      return state; /*{
        ...state,
        trips: _.map(state.trips, (t) => {
          if (t.id !== action.payload.tripId) return t;
          return _.set(
            t,
            'geometry.lines',
            _.filter(t.geometry.lines, (l) => l.id.value !== action.payload.id)
          );
        }),
      };*/
    case SET_GEOMETRY:
      return {
        ...state,
        trips: _.map(state.trips, (t) => {
          if (t.id !== action.payload.tripId) return t;
          return {
            ...t,
            geometry: {
              ...t.geometry,
              waypoints: action.payload.waypoints,
            },
          };
        }),
      };
    default:
      return state;
  }
};
