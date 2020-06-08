import { StoreThunkActionBase } from '../../shared/store/store-types';
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
import { Viewport } from './map-types';
import { MarkerObj } from './marker-types';
import { LineObj } from './line-types';
import { mapReducer } from './map-reducer';

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

  addMarker(data: MarkerObj): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: ADD_MARKER,
        payload: data,
      });
    };
  }

  addLine(data: LineObj): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: ADD_LINE,
        payload: data,
      });
    };
  }

  updateMarker(id: string, data: MarkerObj): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: UPDATE_MARKER,
        payload: { id, data },
      });
    };
  }

  updateLine(id: string, data: LineObj): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: UPDATE_LINE,
        payload: { id, data },
      });
    };
  }

  removeMarker(id: string): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: REMOVE_MARKER,
        payload: id,
      });
    };
  }

  removeLine(id: string): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: REMOVE_LINE,
        payload: id,
      });
    };
  }

  selectMarker(id: string): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: SELECT_MARKER,
        payload: id,
      });
    };
  }

  selectLine(id: string): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: SELECT_LINE,
        payload: id,
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

  hoverMarker(id: string): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: HOVER_MARKER,
        payload: id,
      });
    };
  }

  hoverLine(id: string): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: HOVER_LINE,
        payload: id,
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
