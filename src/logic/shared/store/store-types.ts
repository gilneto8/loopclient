import { AnyAction, Store as StoreBase } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { SidenavReducer } from '../../features/sidenav/sidenav-reducer';
import { MapReducer } from '../../features/map/map-reducer';

export type StoreReducersMap = {
  sidenav?: SidenavReducer;
  map?: MapReducer;
};

export type StoreState = {
  [K in keyof StoreReducersMap]: ReturnType<NonNullable<StoreReducersMap[K]>> | undefined;
};

export type Store = StoreBase<StoreState, AnyAction> & {
  dispatch: ThunkDispatch<StoreState, StoreThunkExtraArgument, AnyAction>;
};

export interface StoreManager {
  store: Store;
  loadReducersMap(map: Partial<StoreReducersMap>): void;
}

type StoreThunkExtraArgument = {
  storeManager: StoreManager;
};

export type StoreThunkDispatchBase<Action extends AnyAction> = ThunkDispatch<
  StoreState,
  StoreThunkExtraArgument,
  Action
>;

export type StoreThunkActionBase<Action extends AnyAction, R = void> = ThunkAction<
  R,
  StoreState,
  StoreThunkExtraArgument,
  Action
>;

export type ThunkGroup<
  T extends {
    [key: string]: (...args: any[]) => ThunkAction<any, StoreState, StoreThunkExtraArgument, AnyAction>;
  }
> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => ReturnType<T[K]>;
};
