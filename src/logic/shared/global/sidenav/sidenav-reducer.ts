import { Reducer } from 'react';
import { SIDENAV_CLOSE, SIDENAV_OPEN, SidenavAction } from './sidenav-actions';

// TODO
export type SidenavStoreState = {
  open: boolean;
  data?: any;
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
        data: action.payload,
      };
    case SIDENAV_CLOSE:
      return {
        open: false,
      };
    default:
      return state;
  }
};
