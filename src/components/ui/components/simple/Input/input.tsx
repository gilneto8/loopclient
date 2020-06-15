import React, { useContext, useMemo } from 'react';
import { css } from '@emotion/core';
import { Theme } from '../../../colors/color-types';
import { ThemeContext } from '../../../colors/theme-context';
import { FieldErrors } from 'react-hook-form';

type Props = {
  name: string;
  color?: string;
  errors?: FieldErrors<any>;
  margins?: [number] | [number, number] | [number, number, number, number];
  placeholder?: string;
};

const convert = (array: Array<number> | undefined) =>
  array?.map((p, i, a) => `${p === 0 ? p : `${p}px`}${i < a.length - 1 ? ' ' : ''}`).join(' ');

const inputCss = (props: Props, theme: Theme) =>
  css({
    width: 'calc(100% - .5rem)',
    color: theme.text.blend_fg,
    padding: '0 0 0 10px',
    margin: convert(props.margins),
    borderRadius: 10,
    border: props.errors && props.errors[props.name] ? `1px solid ${theme.defaults.danger}` : 'none',
    backgroundColor: theme.background.tones?.l_10,
  });

const spanCss = (props: Props, theme: Theme) =>
  css({
    margin: 0,
    paddingLeft: 10,
    color: theme.defaults.danger,
  });

const Input: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLInputElement>> = React.forwardRef<
  HTMLInputElement,
  Props
>((props, ref) => {
  const { name, placeholder, errors } = props;
  const theme: Theme = useContext(ThemeContext).theme;
  return useMemo(
    () => (
      <>
        <input
          aria-invalid={errors && errors[name]}
          name={name}
          css={inputCss(props, theme)}
          ref={ref}
          placeholder={placeholder}
        />
        {errors && errors[name] && (
          <p css={spanCss(props, theme)} role={'alert'} style={{ display: errors && errors[name] ? 'block' : 'none' }}>
            {errors[name].message}
          </p>
        )}
      </>
    ),
    [theme, props, ref]
  );
});

export default Input;
