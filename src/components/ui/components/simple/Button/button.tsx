import React, { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type ButtonProps = {
  title?: string;
  disabled?: boolean;
  filled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (evt: React.FormEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
  text?: string;
  children?: React.ReactNode[] | string;
  icon?: IconProp;
};

function Button(props: ButtonProps) {
  const { title, disabled, style, type, onClick, icon, text, children } = props;
  return (
    <button title={title} disabled={disabled} style={style} type={type} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} />}
      {text || children}
    </button>
  );
}

export default Button;
