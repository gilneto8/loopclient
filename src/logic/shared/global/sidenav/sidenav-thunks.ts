import { StoreThunkActionBase } from '../../../store/store-types';
import { SIDENAV_CLOSE, SIDENAV_OPEN, SidenavAction } from './sidenav-actions';
import { sidenavReducer } from "./sidenav-reducer"

type SidenavThunkAction<R = void> = StoreThunkActionBase<SidenavAction, R>;

class SidenavThunks {
  // TODO
  open(data?: any): SidenavThunkAction {
    return async (dispatch) => {
      dispatch({
        type: SIDENAV_OPEN,
        payload: data,
      });
    };
  }

  close(): SidenavThunkAction {
    return async (dispatch) => {
      dispatch({
        type: SIDENAV_CLOSE,
      });
    };
  }
}

export function loadSidenav(): SidenavThunkAction<{
  sidenavThunks: SidenavThunks;
}> {
  return (_, __dirname, { storeManager }) => {
    storeManager.loadReducersMap({ sidenav: sidenavReducer });
    return {
      sidenavThunks: new SidenavThunks(),
    };
  };
}
