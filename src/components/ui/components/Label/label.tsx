import React from 'react';
import { css } from '@emotion/core';

type BorderProps = {
  thickness: [number] | [number, number] | [number, number, number, number];
  type: 'solid' | 'dashed';
  color: string;
};
type Props = {
  children?: any;
  color?: string;
  borders?: BorderProps;
  paddings?: [number] | [number, number] | [number, number, number, number];
  margins?: [number] | [number, number] | [number, number, number, number];
};

const convert = (array: Array<number> | undefined) =>
  array?.map((p, i, a) => `${p === 0 ? p : `${p}px`}${i < a.length - 1 ? ' ' : ''}`).join(' ');

const borders = (bs: BorderProps | undefined) => {
  if (!bs) return null;
  switch (bs.thickness.length) {
    case 1:
      return { border: `${bs.thickness[0]}px ${bs.type} ${bs.color}` };
    case 2:
      return {
        borderTop: `${bs.thickness[0]}px ${bs.type} ${bs.color}`,
        borderBottom: `${bs.thickness[0]}px ${bs.type} ${bs.color}`,
        borderLeft: `${bs.thickness[1]}px ${bs.type} ${bs.color}`,
        borderRight: `${bs.thickness[1]}px ${bs.type} ${bs.color}`,
      };
    default:
    case 4:
      return {
        borderTop: `${bs.thickness[0]}px ${bs.type} ${bs.color}`,
        borderRight: `${bs.thickness[1]}px ${bs.type} ${bs.color}`,
        borderBottom: `${bs.thickness[2]}px ${bs.type} ${bs.color}`,
        borderLeft: `${bs.thickness[3]}px ${bs.type} ${bs.color}`,
      };
  }
};

const style = (props: Props) =>
  css({
    width: '100%',
    color: props.color || 'white',
    padding: convert(props.paddings),
    margin: convert(props.margins),
    ...borders(props.borders),
    fontSize: 14,
    fontWeight: 'bold',
  });

const Label = (props: Props) => {
  const { children } = props;
  return <label css={style(props)}>{children}</label>;
};

export default Label;
