import React from 'react';
import { css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

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
  onClick?: (arg?: any) => void;
  children?: any;
  active?: boolean;
  removable?: boolean;
  onRemove?: (arg?: any) => void;
};

const style = (props: Props) =>
  css({
    transition: 'all .3s',
    position: 'relative',
    width: `${props.width || 100}%`,
    height: '1.5rem',
    lineHeight: '1.5rem',
    margin: props.enableAutoMargin ? '0.625rem 0' : 0,
    borderRadius: '10px',
    display: 'inline-flex',
    backgroundColor: !props.active ? props.backgroundColor || 'black' : props.activeBackgroundColor || 'white',
    color: !props.active ? props.color || 'white' : props.activeColor || 'black',
    fontSize: props.fontSize || '1rem',
    cursor: 'pointer',
    '&:hover': {
      color: props.hoverColor || 'white',
      backgroundColor: props.hoverBackgroundColor || 'grey',
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
  const { onClick, children, removable, onRemove } = props;
  return (
    <div css={style(props)} onClick={onClick}>
      <span>{children}</span>
      {removable && <FontAwesomeIcon icon={faTrash} size={'sm'} color={'red'} onClick={onRemove} />}
    </div>
  );
};

export default Badge;
