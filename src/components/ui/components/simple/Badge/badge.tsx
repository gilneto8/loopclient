import React, { FunctionComponent, useContext, useMemo } from 'react';
import { css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { ThemeContext } from '../../../colors/theme-context';
import { Theme } from '../../../colors/color-types';

type Props = {
  width?: number;
  fontSize?: number;
  enableAutoMargin?: boolean;
  removable?: boolean;
  active?: boolean;
  hovered?: boolean;
  onClick?: (arg?: any) => void;
  onRemove?: (arg?: any) => void;
  onHover?: (arg?: any) => void;
};

const _getBackgroundColor = (props: Props, theme: Theme) => {
  // indirect hovering through map
  if (props.hovered) return theme.background.functional?.hovering || theme.defaults.grey;
  if (!props.active) return theme.background.tones?.l_10 || theme.defaults.black;
  else return theme.background.functional?.selected || theme.defaults.white;
};

const _getColor = (props: Props, theme: Theme) => {
  // indirect hovering through map
  if (props.hovered) return theme.text.blend_fg || theme.defaults.grey;
  if (!props.active) return theme.text.blend_bg || theme.defaults.white;
  else return theme.text.contrast_bg || theme.defaults.black;
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
      color: theme.text.contrast_bg || theme.defaults.white,
      backgroundColor: theme.background.functional?.hovering || theme.defaults.grey,
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

const Badge: FunctionComponent<Props> = (props) => {
  const { onClick, children, removable, onRemove, onHover, active, hovered } = props;
  const theme = useContext(ThemeContext).theme;
  return useMemo(
    () => (
      <div
        css={style(props, theme)}
        onClick={onClick}
        onMouseLeave={() => onHover && onHover(false)}
        onMouseEnter={() => onHover && onHover(true)}
      >
        <span>{children}</span>
        {removable && <FontAwesomeIcon icon={faTrash} size={'sm'} color={theme.defaults.danger} onClick={onRemove} />}
      </div>
    ),
    [theme, active, hovered]
  );
};

export default Badge;
