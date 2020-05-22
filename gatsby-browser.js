/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React, { useEffect, useState } from 'react';

const RootWrapper = (props) => {
  const [state, replaceState] = useState({
    RootFrame: require('./src/components/root-frame/root-frame').RootFrame,
  });

  useEffect(() => {
    module.hot &&
    module.hot.accept(['./src/components/root-frame/root-frame'], function () {
      replaceState({
        RootFrame: require('./src/components/root-frame/root-frame').RootFrame,
      });
    });
  }, []);

  const RootFrame = state.RootFrame;

  return <RootFrame>{props.children}</RootFrame>;
};

export const wrapRootElement = ({ element, props }) => <RootWrapper {...props}>{element}</RootWrapper>;
