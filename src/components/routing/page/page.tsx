import React from 'react';
import { css } from '@emotion/core';
import SideNav from './sidenav/sidenav';
import { Helmet } from 'react-helmet';

type Props = {
  title: string;
  children?: React.ReactNode;
};

const staticStyle = css({
  backgroundColor: '#1a2d3b',
  '& > main': {
    flex: 1,
    flexGrow: 1,
    flexFlow: 'column',
    height: '100vh !important',
  },
});

export const Page = React.memo<Props>((props) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div css={staticStyle}>
        <SideNav />
        <main>{props.children}</main>
      </div>
    </>
  );
});
