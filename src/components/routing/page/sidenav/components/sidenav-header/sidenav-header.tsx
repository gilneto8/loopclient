import React from 'react';
import { css } from '@emotion/core';

type Props = {
  title?: string;
};

const style = css({
  height: 50,
  borderBottom: '1px solid white',
});

const SidenavHeader = React.memo<Props>((props) => {
  return <div css={style}>{/*PLACEHOLDER*/}</div>;
});

export default SidenavHeader;
