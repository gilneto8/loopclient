import React, { ChangeEvent, useContext, useMemo } from 'react';
import { css } from '@emotion/core';
import { Theme } from '@ui/colors/color-types';
import { ThemeContext } from '@ui/colors/theme-context';
import get from 'lodash/get';

type Props = {
  name: string;
  color?: string;
  /*paddings?: [number] | [number, number] | [number, number, number, number];*/
  margins?: [number] | [number, number] | [number, number, number, number];
  onChange?: (evt: ChangeEvent<HTMLSelectElement>) => void;
  selected?: any;
  options: Array<any>;
  labelField?: string;
  valueField?: string;
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
  const { name, onChange, options, selected, labelField, valueField } = props;
  const theme: Theme = useContext(ThemeContext).theme;
  return useMemo(() => {
    return (
      <select css={style(props, theme)} name={name} ref={ref} onChange={onChange} value={selected}>
        {options.map((opt, i) =>
          labelField && valueField ? (
            <option key={i} value={get(opt, valueField)}>
              {get(opt, labelField)}
            </option>
          ) : (
            <option key={i} value={opt}>
              {opt}
            </option>
          )
        )}
      </select>
    );
  }, [props, theme]);
});

export default Select;
