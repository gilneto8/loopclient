import React, { ReactNode } from 'react';
import { css } from '@emotion/core';
import SideNav from './sidenav/sidenav';

type Props = {
  children: () => ReactNode;
  title: string;
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

export const Page = React.memo<Props>((props: Props) => {
  return (
    <>
      <div css={staticStyle}>
        <SideNav />
        <main>{props.children()}</main>
      </div>
    </>
  );
});
