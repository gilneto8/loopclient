import { StoreThunkActionBase } from '../../shared/store/store-types';
import {
  HOVER_LINE,
  HOVER_MARKER,
  MapAction,
  SELECT_LINE,
  SELECT_MARKER,
  UNHOVER,
  UNSELECT,
  UPDATE_VIEWPORT,
} from './map-actions';
import { Viewport } from './map-types';
import { mapReducer } from './map-reducer';
import { MarkerObj } from "../trip/marker-types";
import { LineObj } from "../trip/line-types";

type MapThunkAction<R = void> = StoreThunkActionBase<MapAction, R>;

class MapThunks {
  updateViewport(data: Viewport): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: UPDATE_VIEWPORT,
        payload: data,
      });
    };
  }

  selectMarker(obj: MarkerObj): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: SELECT_MARKER,
        payload: obj,
      });
    };
  }

  selectLine(obj: LineObj): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: SELECT_LINE,
        payload: obj,
      });
    };
  }

  unselect(): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: UNSELECT,
      });
    };
  }

  hoverMarker(obj: MarkerObj): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: HOVER_MARKER,
        payload: obj,
      });
    };
  }

  hoverLine(obj: LineObj): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: HOVER_LINE,
        payload: obj,
      });
    };
  }

  unhover(): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: UNHOVER,
      });
    };
  }
}

export function loadMap(): MapThunkAction<{
  mapThunks: MapThunks;
}> {
  return (_, __, { storeManager }) => {
    storeManager.loadReducersMap({ map: mapReducer });
    return {
      mapThunks: new MapThunks(),
    };
  };
}
