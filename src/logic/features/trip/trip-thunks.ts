import { StoreThunkActionBase } from '../../shared/store/store-types';
import {
  ADD_TRIP,
  UPDATE_TRIP,
  REMOVE_TRIP,
  ADD_LINE,
  ADD_MARKER,
  TripAction,
  REMOVE_LINE,
  REMOVE_MARKER,
  UPDATE_LINE,
  UPDATE_MARKER,
} from './trip-actions';
import { MarkerObj } from "./marker-types";
import { LineObj } from "./line-types";
import { tripReducer } from './trip-reducer';
import { TripObj } from './trip-types';

type TripThunkAction<R = void> = StoreThunkActionBase<TripAction, R>;

class TripThunks {
  addTrip(data: TripObj): TripThunkAction {
    return async (dispatch) => {
      dispatch({
        type: ADD_TRIP,
        payload: data,
      });
    };
  }

  updateTrip(id: string, data: TripObj): TripThunkAction {
    return async (dispatch) => {
      dispatch({
        type: UPDATE_TRIP,
        payload: { id, data },
      });
    };
  }

  removeTrip(id: string): TripThunkAction {
    return async (dispatch) => {
      dispatch({
        type: REMOVE_TRIP,
        payload: id,
      });
    };
  }

  addMarker(tripId: string, data: MarkerObj): TripThunkAction {
    return async (dispatch) => {
      dispatch({
        type: ADD_MARKER,
        payload: { tripId, data },
      });
    };
  }

  addLine(tripId: string, data: LineObj): TripThunkAction {
    return async (dispatch) => {
      dispatch({
        type: ADD_LINE,
        payload: { tripId, data },
      });
    };
  }

  updateMarker(tripId: string, id: string, data: MarkerObj): TripThunkAction {
    return async (dispatch) => {
      dispatch({
        type: UPDATE_MARKER,
        payload: { tripId, id, data },
      });
    };
  }

  updateLine(tripId: string, id: string, data: LineObj): TripThunkAction {
    return async (dispatch) => {
      dispatch({
        type: UPDATE_LINE,
        payload: { tripId, id, data },
      });
    };
  }

  removeMarker(tripId: string, id: string): TripThunkAction {
    return async (dispatch) => {
      dispatch({
        type: REMOVE_MARKER,
        payload: { tripId, id },
      });
    };
  }

  removeLine(tripId: string, id: string): TripThunkAction {
    return async (dispatch) => {
      dispatch({
        type: REMOVE_LINE,
        payload: { tripId, id },
      });
    };
  }
}

export function loadTrip(): TripThunkAction<{
  tripThunks: TripThunks;
}> {
  return (_, __, { storeManager }) => {
    storeManager.loadReducersMap({ trip: tripReducer });
    return {
      tripThunks: new TripThunks(),
    };
  };
}