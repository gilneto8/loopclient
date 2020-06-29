import React, { FunctionComponent, useContext, useMemo } from 'react';
import { css } from '@emotion/core';
import { Theme } from '@ui/colors/color-types';
import { ThemeContext } from '@ui/colors/theme-context';
import { makeAccessibleButtonProps } from '@utils/functions/make-accessibility-props';

type Props = {
  color?: string;
  /*paddings?: [number] | [number, number] | [number, number, number, number];*/
  margins?: [number] | [number, number] | [number, number, number, number];
  as?: 'span' | 'label';
  onClick?: (arg?: any) => void;
};

const convert = (array: Array<number> | undefined) =>
  array?.map((p, i, a) => `${p === 0 ? p : `${p}px`}${i < a.length - 1 ? ' ' : ''}`).join(' ');

const style = (props: Props, theme: Theme) =>
  css({
    width: '100%',
    display: 'inline-flex',
    color: props.color || theme.defaults.white,
    padding: '0 0 5px 10px',
    margin: convert(props.margins),
    borderRadius: 10,
    border: 'none',
  });

const Label: FunctionComponent<Props> = (props) => {
  const { children, as, onClick } = props;
  const theme: Theme = useContext(ThemeContext).theme;
  return useMemo(() => {
    switch (as) {
      case 'span':
        return (
          <span
            css={style(props, theme)}
            {...(() => {
              if (!!onClick) return { ...makeAccessibleButtonProps(onClick) };
              return {};
            })()}
          >
            {children}
          </span>
        );
      case 'label':
      default:
        return <label css={style(props, theme)}>{children}</label>;
    }
  }, [children, as, theme]);
};

export default Label;
