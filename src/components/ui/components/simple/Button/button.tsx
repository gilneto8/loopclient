import React, { FunctionComponent, useContext, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Theme } from "../../../colors/color-types";
import { ThemeContext } from "../../../colors/theme-context";
import { css } from "@emotion/core";

type Props = {
  title?: string;
  disabled?: boolean;
  filled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (evt: React.FormEvent<HTMLButtonElement>) => void;
  text?: string;
  icon?: IconProp;
};

const style = (props: Props, theme: Theme) => css({
  minWidth: '75px',
  height: '20px',
  fontWeight: 'bold',
  margin: '0 5px 0 5px',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: theme.background.tones?.l_10,
  color: theme.text.blend_fg,
  cursor: 'pointer',
})

const Button: FunctionComponent<Props> = (props) => {
  const { title, disabled, type, onClick, icon, text, children } = props;
  const theme: Theme = useContext(ThemeContext).theme;
  return useMemo(() => (
    <button css={style(props, theme)} title={title} disabled={disabled} type={type} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} />}
      {text || children}
    </button>
  ),[theme, props]);
}

export default Button;
