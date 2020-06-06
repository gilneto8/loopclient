import React, { CSSProperties } from 'react';

type ButtonProps = {
  title?: string;
  disabled?: boolean;
  filled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick: (evt: React.FormEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
  text?: string;
  children?: React.ReactNode[] | string;
};

function Button(props: ButtonProps) {
  return (
    <button
      title={props.title}
      disabled={props.disabled}
      style={props.style}
      type={props.type}
      onClick={props.onClick}
    >
      {/*{props.icon &&
      <FontAwesomeIcon icon={props.icon} />
      }*/}
      {props.text || props.children}
    </button>
  );
}

export default Button;
