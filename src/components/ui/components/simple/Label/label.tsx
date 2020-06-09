import React, { FunctionComponent, useContext, useMemo } from "react";
import { css } from '@emotion/core';
import { Theme } from '../../../colors/color-types';
import { ThemeContext } from '../../../colors/theme-context';

// TODO remove color prop
type BorderProps = {
  thickness: [number] | [number, number] | [number, number, number, number];
  type: 'solid' | 'dashed';
  color: string;
};
type Props = {
  color?: string;
  borders?: BorderProps;
  paddings?: [number] | [number, number] | [number, number, number, number];
  margins?: [number] | [number, number] | [number, number, number, number];
  as?: 'span' | 'label';
  onClick?: (arg?: any) => void;
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

const style = (props: Props, theme: Theme) =>
  css({
    width: '100%',
    display: 'inline-flex',
    color: props.color || theme.defaults.white,
    padding: convert(props.paddings),
    margin: convert(props.margins),
    ...borders(props.borders),
    fontSize: '.75rem',
    fontWeight: 'bold',
  });

const Label: FunctionComponent<Props> = (props) => {
  const { children, as, onClick } = props;
  const theme: Theme = useContext(ThemeContext).theme;
  return useMemo(() => {
    switch (as) {
      case 'span':
        return (
          <span onClick={onClick} css={style(props, theme)}>
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
