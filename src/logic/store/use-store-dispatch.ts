import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { StoreThunkDispatchBase } from './store-types';

export function useStoreDispatch() {
  const storeDispatch = useDispatch<StoreThunkDispatchBase<AnyAction>>();

  return { storeDispatch };
}
