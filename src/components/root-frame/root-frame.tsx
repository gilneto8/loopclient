import React, { FunctionComponent, useState } from 'react';
import { createStoreManager } from '../../logic/store/creates-store-manager';
import { Provider } from 'react-redux';

/*
  TODO:
  inform the user that an error ocurred when the app gets an unhandled error
*/

const ContextualizedRootFrame: FunctionComponent = (props) => {
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
