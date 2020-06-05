import { StoreThunkActionBase } from '../../../store/store-types';
import { SIDENAV_CLOSE, SIDENAV_OPEN, SIDENAV_UPDATE, SidenavAction } from './sidenav-actions';
import { sidenavReducer } from './sidenav-reducer';
import { MarkerProps } from '../../map/marker-types';
import { LineProps } from '../../map/line-types';

type SidenavThunkAction<R = void> = StoreThunkActionBase<SidenavAction, R>;

class SidenavThunks {
  // TODO
  open(data?: MarkerProps | LineProps): SidenavThunkAction {
    return async (dispatch) => {
      dispatch({
        type: SIDENAV_OPEN,
        payload: data,
      });
    };
  }

  update(data: MarkerProps | LineProps): SidenavThunkAction {
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
