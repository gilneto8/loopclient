import React, { FunctionComponent } from 'react';
// TODO
/*import '../ui-kit/global-styles/index.scss';*/
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../globals/overrides.css';

/*
  TODO:
  inform the user that an error ocurred when the app gets an unhandled error
*/

const ContextualizedRootFrame: FunctionComponent = (props) => {
  return <>{props.children}</>;
};

export const RootFrame: FunctionComponent = ({ children }) => {
  return <ContextualizedRootFrame>{children}</ContextualizedRootFrame>;
};
