import React, { ReactNode } from 'react';
import Header from './header/header';
import { css } from '@emotion/core';

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
      <div css={staticStyle} className="d-flex flex-column vh-100">
        <Header />
        <div className="flex-grow-1 p-3">{props.children()}</div>
      </div>
    </>
  );
}
