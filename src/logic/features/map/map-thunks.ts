import { StoreThunkActionBase } from '../../shared/store/store-types';
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
import { Viewport } from './map-types';
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

  selectMarker(id: { ctx: string, value: string }): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: SELECT_MARKER,
        payload: { id },
      });
    };
  }

  selectLine(id: { ctx: string, value: string }): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: SELECT_LINE,
        payload: { id },
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

  hoverMarker(id: { ctx: string, value: string }): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: HOVER_MARKER,
        payload: { id },
      });
    };
  }

  hoverLine(id: { ctx: string, value: string }): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: HOVER_LINE,
        payload: { id },
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

  setEditMode(): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: SET_EDIT_MODE,
      });
    };
  }

  setViewMode(): MapThunkAction {
    return async (dispatch) => {
      dispatch({
        type: SET_VIEW_MODE,
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
