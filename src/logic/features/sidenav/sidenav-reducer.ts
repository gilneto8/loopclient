import { Reducer } from 'redux';
import { SIDENAV_CLOSE, SIDENAV_OPEN, SIDENAV_RESET, SIDENAV_UPDATE, SidenavAction } from './sidenav-actions';
import { MapItemObj } from '../map/map-types';

export type SidenavStoreState = {
  open: boolean;
  data?: MapItemObj;
};

export type SidenavReducer = Reducer<SidenavStoreState, SidenavAction>;

const initialState: SidenavStoreState = {
  open: false,
};

export const sidenavReducer: SidenavReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIDENAV_OPEN:
      return {
        ...state,
        open: true,
        data: action.payload || state.data,
      };
    case SIDENAV_CLOSE:
      return {
        ...state,
        open: false,
      };
    case SIDENAV_RESET:
      return {
        ...state,
        data: null,
      };
    case SIDENAV_UPDATE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
