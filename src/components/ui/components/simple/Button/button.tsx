import React, { CSSProperties, FunctionComponent, useContext, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Theme } from "../../../colors/color-types";
import { ThemeContext } from "../../../colors/theme-context";

type Props = {
  title?: string;
  disabled?: boolean;
  filled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (evt: React.FormEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
  text?: string;
  icon?: IconProp;
};

const Button: FunctionComponent<Props> = (props) => {
  const { title, disabled, style, type, onClick, icon, text, children } = props;
  const theme: Theme = useContext(ThemeContext).theme;
  return useMemo(() => (
    <button title={title} disabled={disabled} style={style} type={type} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} />}
      {text || children}
    </button>
  ),[theme, props]);
}

export default Button;
