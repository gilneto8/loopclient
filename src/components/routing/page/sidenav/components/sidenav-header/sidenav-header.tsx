import React, { FunctionComponent, useContext, useMemo } from 'react';
import { css } from '@emotion/core';
import { ThemeContext } from '../../../../../ui/colors/theme-context';
import { Theme } from '../../../../../ui/colors/color-types';

type Props = {
  title?: string;
};

const style = (theme: Theme) =>
  css({
    height: 50,
    borderBottom: `1px solid ${theme.defaults.white}`,
  });

const SidenavHeader: FunctionComponent<Props> = (props) => {
  const { title } = props;
  const theme = useContext(ThemeContext).theme;
  return useMemo(() => <div css={style(theme)}>{/*PLACEHOLDER*/}</div>, [title, theme]);
};

export default SidenavHeader;
