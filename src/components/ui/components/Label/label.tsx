import React from 'react';
import { css } from '@emotion/core';

type Props = {
  children?: any;
  color?: string;
  borders?: [number] | [number, number] | [number, number, number, number];
  paddings?: [number] | [number, number] | [number, number, number, number];
  margins?: [number] | [number, number] | [number, number, number, number];
};

const convert = (array: Array<number> | undefined) =>
  array?.map((p, i, a) => `${p === 0 ? p : `${p}px`}${i < a.length - 1 ? ' ' : ''}`).join(' ');

const style = (props: Props) =>
  css({
    width: '100%',
    color: props.color || 'white',
    padding: convert(props.paddings),
    margin: convert(props.margins),
    fontSize: 14,
    fontWeight: 'bold'
  });

const Label = (props: Props) => {
  const { children } = props;
  return <label css={style(props)}>{children}</label>;
};

export default Label;
