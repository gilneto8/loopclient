import React, { ReactNode } from 'react';
import { css } from '@emotion/core';
import SideNav from './sidenav/sidenav';

type Props = {
  children: () => ReactNode;
  title: string;
};

const staticStyle = css({
  backgroundColor: '#1a2d3b',
});

export function Page(props: Props): JSX.Element {
  return (
    <>
      <div css={staticStyle}>
        <SideNav />
        <main className="d-flex flex-column vh-100 flex-grow-1">{props.children()}</main>
      </div>
    </>
  );
}
