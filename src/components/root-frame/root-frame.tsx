import React, { FunctionComponent, useState } from 'react';
import { createStoreManager } from '../../logic/shared/store/creates-store-manager';
import { Provider } from 'react-redux';
import { useStoreDispatch } from '../../logic/shared/store/use-store-dispatch';
import { loadSidenav } from '../../logic/features/sidenav/sidenav-thunks';
import { loadMap } from '../../logic/features/map/map-thunks';

/*
  TODO:
  inform the user that an error ocurred when the app gets an unhandled error
*/

const ContextualizedRootFrame: FunctionComponent = (props) => {
  const { storeDispatch } = useStoreDispatch();
  storeDispatch(loadSidenav());
  storeDispatch(loadMap());
  return <>{props.children}</>;
};

export const RootFrame: FunctionComponent = ({ children }) => {
  const [storeManager] = useState(() => createStoreManager());
  const store = storeManager.store;

  return (
    <Provider store={store}>
      <ContextualizedRootFrame>{children}</ContextualizedRootFrame>
    </Provider>
  );
};
