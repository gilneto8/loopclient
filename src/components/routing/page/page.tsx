import React  from 'react';
import { css } from '@emotion/core';
import SideNav from './sidenav/sidenav';

type Props = {
  title: string;
  children?: React.ReactNode;
  focusOnClick?: boolean;
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
      <div css={staticStyle}>
        <SideNav />
        <main>{props.children}</main>
      </div>
    </>
  );
});
