import { StoreThunkActionBase } from '../../shared/store/store-types';
import { SIDENAV_CLOSE, SIDENAV_OPEN, SIDENAV_CLEAR, SIDENAV_UPDATE, SidenavAction } from './sidenav-actions';
import { sidenavReducer } from './sidenav-reducer';
import { MarkerObj } from '../map/marker-types';
import { LineObj } from '../map/line-types';
import { hold } from '../../../utils/functions/hold';

type SidenavThunkAction<R = void> = StoreThunkActionBase<SidenavAction, R>;

class SidenavThunks {
  // TODO
  open(data?: MarkerObj | LineObj): SidenavThunkAction {
    return async (dispatch) => {
      dispatch({
        type: SIDENAV_OPEN,
        payload: data,
      });
    };
  }

  update(data: MarkerObj | LineObj): SidenavThunkAction {
    return async (dispatch) => {
      dispatch({
        type: SIDENAV_UPDATE,
        payload: data,
      });
    };
  }

  close(): SidenavThunkAction {
    return async (dispatch) => {
      dispatch({
        type: SIDENAV_CLOSE,
      });
      hold(() => {
        dispatch({
          type: SIDENAV_CLEAR,
        });
      });
    };
  }

  clear(): SidenavThunkAction {
    return async (dispatch) => {
      dispatch({
        type: SIDENAV_CLEAR,
      });
    };
  }
}

export function loadSidenav(): SidenavThunkAction<{
  sidenavThunks: SidenavThunks;
}> {
  return (_, __, { storeManager }) => {
    storeManager.loadReducersMap({ sidenav: sidenavReducer });
    return {
      sidenavThunks: new SidenavThunks(),
    };
  };
}
