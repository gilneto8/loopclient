import React, { FunctionComponent, useContext, useMemo } from 'react';
import { css } from '@emotion/core';
import SideNav from './sidenav/sidenav';
import { Helmet } from 'react-helmet';
import { Theme } from '../../ui/colors/color-types';
import { ThemeContext } from '../../ui/colors/theme-context';

type Props = {
  title: string;
};

const staticStyle = (theme: Theme) =>
  css({
    backgroundColor: theme.background.color,
    '& > main': {
      flex: 1,
      flexGrow: 1,
      flexFlow: 'column',
      height: '100vh !important',
    },
  });

export const Page: FunctionComponent<Props> = (props) => {
  const theme: Theme = useContext(ThemeContext).theme;
  return useMemo(
    () => (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <link
            href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <div css={staticStyle(theme)}>
          <SideNav />
          <main>{props.children}</main>
        </div>
      </>
    ),
    [props, theme]
  );
};
