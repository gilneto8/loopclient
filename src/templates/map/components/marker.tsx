import React from 'react';
import { Marker as ReactMapGLMarker } from 'react-map-gl';
import { css } from '@emotion/core';
import { MarkerObj } from '../../../logic/shared/map/marker-types';
import MarkerPoint from '../../../assets/images/marker';

type Props = {
  marker: MarkerObj;
  onHover: (id?: string) => void;
  onSelect: (id: string) => void;
  children?: React.ReactNode;
  selected?: boolean;
  hovered?: boolean;
};

const style = (h?: boolean, s?: boolean) =>
  css({
    cursor: 'pointer',
    '& > svg': {
      width: 30,
      height: 30,
      fill: s ? '#ff4949' : h ? 'firebrick' : 'darkred',
      stroke: s || h ? 'white' : 'unset',
      strokeWidth: s ? 30 : h ? 10 : 0,
    },
  });

const Marker = React.memo<Props>(({ marker, onHover, onSelect, hovered, selected }) => {
  return (
    <ReactMapGLMarker
      latitude={marker.geometry.position[1]}
      longitude={marker.geometry.position[0]}
      offsetTop={-32}
      offsetLeft={-15}
    >
      <div
        css={style(hovered, selected)}
        onMouseLeave={() => onHover()}
        onMouseEnter={() => onHover(marker.id)}
        onClick={() => onSelect(marker.id)}
      >
        <MarkerPoint />
      </div>
    </ReactMapGLMarker>
  );
});

export default Marker;
