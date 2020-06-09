import React from 'react';
import { css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { ThemeConsumer } from '../../../colors/theme-context';
import { Theme } from "../../../colors/color-types"

type Props = {
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  activeBackgroundColor?: string;
  width?: number;
  fontSize?: number;
  enableAutoMargin?: boolean;
  children?: any;
  removable?: boolean;
  active?: boolean;
  hovered?: boolean;
  onClick?: (arg?: any) => void;
  onRemove?: (arg?: any) => void;
  onHover?: (arg?: any) => void;
};

const _getBackgroundColor = (props: Props, theme: Theme) => {
  // indirect hovering through map
  if (props.hovered) return props.hoverBackgroundColor || 'grey';
  if (!props.active) return props.backgroundColor || 'black';
  else return props.activeBackgroundColor || 'white';
};

const _getColor = (props: Props, theme: Theme) => {
  // indirect hovering through map
  if (props.hovered) return props.hoverColor || 'white';
  if (!props.active) return props.color || 'white';
  else return props.activeColor || 'black';
};

const style = (props: Props, theme: Theme) =>
  css({
    transition: 'all .3s',
    position: 'relative',
    width: `${props.width || 100}%`,
    height: '1.5rem',
    lineHeight: '1.5rem',
    margin: props.enableAutoMargin ? '0.625rem 0' : 0,
    borderRadius: '10px',
    display: 'inline-flex',
    backgroundColor: _getBackgroundColor(props, theme),
    color: _getColor(props, theme),
    fontSize: props.fontSize || '1rem',
    cursor: 'pointer',
    '&:hover': {
      color: props.hoverColor || theme.defaults.white,
      backgroundColor: props.hoverBackgroundColor || theme.defaults.grey,
    },
    '& > span': {
      paddingLeft: 35,
    },
    '& > svg': {
      position: 'absolute',
      right: 10,
      top: 5,
    },
  });

const Badge = (props: Props) => {
  const { onClick, children, removable, onRemove, onHover } = props;
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div
          css={style(props, theme)}
          onClick={onClick}
          onMouseLeave={() => onHover && onHover(false)}
          onMouseEnter={() => onHover && onHover(true)}
        >
          <span>{children}</span>
          {removable && <FontAwesomeIcon icon={faTrash} size={'sm'} color={'red'} onClick={onRemove} />}
        </div>
      )}
    </ThemeConsumer>
  );
};

export default Badge;
