import React, { FunctionComponent, useContext, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Theme } from '@ui/colors/color-types';
import { ThemeContext } from '@ui/colors/theme-context';
import { css, SerializedStyles } from '@emotion/core';
import { makeAccessibleButtonProps } from '@utils/functions/make-accessibility-props';

type EventProps =
  | { type: 'submit'; onClick?: (evt: React.FormEvent<HTMLButtonElement>) => void }
  | { type?: 'button' | 'reset' | undefined; onClick: (evt: React.FormEvent<HTMLButtonElement>) => void };

type Props = EventProps & {
  title?: string;
  disabled?: boolean;
  width?: number;
  text?: string;
  icon?: IconProp;
  role?: 'submit' | 'button';
  cssStyle?: SerializedStyles;
};

const style = (props: Props, theme: Theme) =>
  css({
    minWidth: '75px',
    height: '20px',
    fontWeight: 'bold',
    margin: '0 5px 0 5px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: theme.background.tones?.l_10,
    color: theme.text.blend_fg,
    cursor: 'pointer',
    '& > svg': {
      alignContent: 'center',
    }
  }, props.cssStyle);

const Button: FunctionComponent<Props> = (props) => {
  const { title, disabled, type, onClick, icon, text, children, role } = props;
  const theme: Theme = useContext(ThemeContext).theme;
  return useMemo(
    () => (
      <button
        css={style(props, theme)}
        title={title}
        disabled={disabled}
        type={type}
        {...(() => {
          if (role !== 'submit' && onClick) return { ...makeAccessibleButtonProps(onClick, role || 'button') };
          else return { role };
        })()}
      >
        {icon && <FontAwesomeIcon icon={icon} />}
        {text || children}
      </button>
    ),
    [theme, props]
  );
};

export default Button;
