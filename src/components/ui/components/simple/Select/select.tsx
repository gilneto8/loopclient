import React, { ChangeEvent, useContext, useMemo } from 'react';
import { css } from '@emotion/core';
import { Theme } from '@ui/colors/color-types';
import { ThemeContext } from '@ui/colors/theme-context';

type Props = {
  name: string;
  color?: string;
  /*paddings?: [number] | [number, number] | [number, number, number, number];*/
  margins?: [number] | [number, number] | [number, number, number, number];
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

const Select: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLSelectElement>> = React.forwardRef<
  HTMLSelectElement,
  Props
>((props, ref) => {
  const { name, onChange, options, selected } = props;
  const theme: Theme = useContext(ThemeContext).theme;
  return useMemo(
    () => (
      <select css={style(props, theme)} name={name} ref={ref} onChange={onChange} defaultValue={selected}>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    ),
    [props, theme]
  );
});

export default Select;
