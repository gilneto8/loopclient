import React, { FunctionComponent, useContext, useMemo } from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../../colors/color-types';
import { ThemeContext } from '../../../colors/theme-context';

type Props = {
  name: string;
  color?: string;
  /*paddings?: [number] | [number, number] | [number, number, number, number];*/
  margins?: [number] | [number, number] | [number, number, number, number];
  refFn?: (ref: Element | null) => void;
  placeholder?: string;
};

const convert = (array: Array<number> | undefined) =>
  array?.map((p, i, a) => `${p === 0 ? p : `${p}px`}${i < a.length - 1 ? ' ' : ''}`).join(' ');

const style = (props: Props, theme: Theme) =>
  css({
    width: 'calc(100% - .5rem)',
    color: theme.text.blend_fg,
    padding: '0 0 0 10px',
    margin: convert(props.margins),
    borderRadius: 10,
    border: 'none',
    backgroundColor: theme.background.tones?.l_10,
  });

const Input: FunctionComponent<Props> = (props) => {
  const { name, refFn, placeholder } = props;
  const theme: Theme = useContext(ThemeContext).theme;
  return useMemo(() => <input name={name} css={style(props, theme)} ref={refFn} placeholder={placeholder} />, [
    theme,
    props,
  ]);
};

export default Input;
