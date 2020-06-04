import { useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { StoreState, StoreThunkActionBase } from './store-types';
import { useStoreDispatch } from './use-store-dispatch';

export function useStoreSelector<RLAction extends StoreThunkActionBase<AnyAction, any>, TSelected>(
  reducerLoadingThunk: RLAction,
  selector: (storeState: StoreState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): {
  storeDispatch: ReturnType<typeof useStoreDispatch>['storeDispatch'];
  selected: TSelected;
  thunkResult: ReturnType<RLAction>;
} {
  const { storeDispatch } = useStoreDispatch();

  const thunkResult = storeDispatch(reducerLoadingThunk);

  const selected = useSelector<StoreState, TSelected>(selector, equalityFn);

  return {
    storeDispatch,
    thunkResult,
    selected,
  };
}
