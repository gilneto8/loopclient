import React, { FunctionComponent, useState } from 'react';
import { createStoreManager } from '@logic/shared/store/creates-store-manager';
import { Provider } from 'react-redux';
import { useStoreDispatch } from '@logic/shared/store/use-store-dispatch';
import { loadSidenav } from '@logic/features/sidenav/sidenav-thunks';
import { loadMap } from '@logic/features/map/map-thunks';
import ThemeFactory from '@ui/colors/theme-factory';
import { ThemeProvider } from '@ui/colors/theme-context';

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
  const theme = ThemeFactory.getTheme();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ContextualizedRootFrame>{children}</ContextualizedRootFrame>
      </ThemeProvider>
    </Provider>
  );
};
