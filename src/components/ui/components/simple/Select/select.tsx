import React, { FunctionComponent, useContext, useMemo } from "react";
import { css } from '@emotion/core';
import { Theme } from "../../../colors/color-types";
import { ThemeContext } from "../../../colors/theme-context";

// TODO remove color prop
type BorderProps = {
  thickness: number;
  type: 'solid' | 'dashed';
  color: string;
};
type Props = {
  name: string;
  color?: string;
  border?: BorderProps;
  paddings?: [number] | [number, number] | [number, number, number, number];
  margins?: [number] | [number, number] | [number, number, number, number];
  refFn?: (ref: Element | null) => void;
  selected?: any;
  options: Array<any>;
};

const convert = (array: Array<number> | undefined) =>
  array?.map((p, i, a) => `${p === 0 ? p : `${p}px`}${i < a.length - 1 ? ' ' : ''}`).join(' ');

const border = (bs: BorderProps | undefined) => {
  if (!bs) return null;
  return { border: `${bs.thickness}px ${bs.type} ${bs.color}` };
};

const style = (props: Props, theme: Theme) =>
  css({
    width: '100%',
    color: props.color || theme.defaults.black,
    padding: convert(props.paddings),
    margin: convert(props.margins),
    ...border(props.border),
    fontSize: '.75rem',
  });

const Select: FunctionComponent<Props> = (props) => {
  const { name, refFn, options } = props;
  const theme: Theme = useContext(ThemeContext).theme;
  return useMemo(() => (
    <select css={style(props, theme)} name={name} ref={refFn}>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  ), [props, theme]);
};

export default Select;
