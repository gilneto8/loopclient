import { AnyAction, applyMiddleware, combineReducers, createStore as createReduxStore, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { Store, StoreManager, StoreReducersMap, StoreState } from './store-types';

class StoreManagerImpl implements StoreManager {
  public store: Store;
  public reducersMap: StoreReducersMap;

  constructor() {
    this.reducersMap = {};

    this.store = createReduxStore(
      (state: StoreState = {}) => {
        return state;
      },
      composeWithDevTools({
        /*
          Redux Devtools hot reload causes some bugs due to its state recomputation.
          The tradeoff of disabling Redux Devtools hot reload support is that if you change a reducer,
          you'll lose all Redux Devtools action and state history.
        */
        shouldHotReload: false,
      })(applyMiddleware(thunk.withExtraArgument({ storeManager: this })))
    );
  }

  combineInternalReducersMap() {
    const combinedReducer = combineReducers(this.reducersMap) as Reducer<StoreState, AnyAction>;

    const rootReducer = (stateArg: StoreState, action: AnyAction) => {
      let state: StoreState | undefined = stateArg;

      if (action.type === 'change to object LOG_OUT') {
        // TODO
        state = undefined;
      }

      return combinedReducer(state, action);
    };

    return rootReducer as Reducer<StoreState, AnyAction>;
  }

  loadReducersMap(map: Partial<StoreReducersMap>) {
    let thereAreChangesToMerge = false;
    let changes: Partial<StoreReducersMap> = {};

    Object.keys(map).forEach((keyArg) => {
      const key = keyArg as keyof StoreReducersMap;

      const reducer = map[key];

      if (!reducer) return;
      else if (reducer === this.reducersMap[key]) return;

      thereAreChangesToMerge = true;

      changes[key] = reducer as any;
    });

    if (thereAreChangesToMerge) {
      this.reducersMap = {
        ...this.reducersMap,
        ...changes,
      };

      this.store.replaceReducer(this.combineInternalReducersMap());
    }
  }
}

export function createStoreManager() {
  return new StoreManagerImpl();
}
