import React, { ChangeEvent, FunctionComponent, useContext, useMemo } from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../../colors/color-types';
import { ThemeContext } from '../../../colors/theme-context';

type Props = {
  name: string;
  color?: string;
  /*paddings?: [number] | [number, number] | [number, number, number, number];*/
  margins?: [number] | [number, number] | [number, number, number, number];
  refFn?: (ref: Element | null) => void;
  onChange?: (evt: ChangeEvent<HTMLSelectElement>) => void;
  selected?: any;
  options: Array<any>;
};

const convert = (array: Array<number> | undefined) =>
  array?.map((p, i, a) => `${p === 0 ? p : `${p}px`}${i < a.length - 1 ? ' ' : ''}`).join(' ');

const style = (props: Props, theme: Theme) =>
  css({
    width: '100%',
    padding: '0 0 2px 10px',
    margin: convert(props.margins),
    borderRadius: 10,
    border: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    textIndent: '1px',
    textOverflow: '',
    backgroundColor: theme.background.tones?.l_10,
    color: theme.text.blend_fg,
    cursor: 'pointer',
  });

const Select: FunctionComponent<Props> = (props) => {
  const { name, refFn, onChange, options } = props;
  const theme: Theme = useContext(ThemeContext).theme;
  return useMemo(
    () => (
      <select css={style(props, theme)} name={name} ref={refFn} onChange={onChange}>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    ),
    [props, theme]
  );
};

export default Select;
