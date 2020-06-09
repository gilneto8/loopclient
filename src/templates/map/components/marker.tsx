import React, { FunctionComponent, useContext, useMemo } from 'react';
import { Marker as ReactMapGLMarker } from 'react-map-gl';
import { css } from '@emotion/core';
import { MarkerObj } from '../../../logic/features/map/marker-types';
import MarkerPoint from '../../../assets/images/marker';
import { ThemeContext } from '../../../components/ui/colors/theme-context';
import { Theme } from '../../../components/ui/colors/color-types';

type Props = {
  marker: MarkerObj;
  onHover: (id?: string) => void;
  onSelect: (id: string) => void;
  selected?: boolean;
  hovered?: boolean;
};

const style = (theme: Theme, h?: boolean, s?: boolean) =>
  css({
    cursor: 'pointer',
    '& > svg': {
      width: 30,
      height: 30,
      fill: s
        ? theme.foreground.functional.selected
        : h
        ? theme.foreground.functional.hovering
        : theme.foreground.color,
      stroke: s || h ? theme.defaults.white : 'unset',
      strokeWidth: s ? 30 : h ? 10 : 0,
    },
  });

const Marker: FunctionComponent<Props> = (props) => {
  const { marker, onHover, onSelect, hovered, selected } = props;
  const theme: Theme = useContext(ThemeContext).theme;
  return useMemo(
    () => (
      <ReactMapGLMarker
        latitude={marker.geometry.position[1]}
        longitude={marker.geometry.position[0]}
        offsetTop={-32}
        offsetLeft={-15}
      >
        <div
          role={'button'}
          css={style(theme, hovered, selected)}
          onMouseLeave={() => onHover()}
          onMouseEnter={() => onHover(marker.id)}
          onClick={() => onSelect(marker.id)}
        >
          <MarkerPoint />
        </div>
      </ReactMapGLMarker>
    ),
    [props]
  );
};

export default Marker;
