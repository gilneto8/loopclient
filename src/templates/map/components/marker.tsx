import React from 'react';
import { Marker as ReactMapGLMarker } from 'react-map-gl';
import { css } from '@emotion/core';
import { MarkerProps } from '../../../logic/shared/map/marker-types';
import MarkerPoint from '../../../images/marker';
/*const MarkerPoint = require('../../../images/marker.svg');*/

type Props = {
  marker: MarkerProps;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  children?: React.ReactNode;
  selected?: boolean;
  hovered?: boolean;
};

const style = (h: boolean | undefined, s: boolean | undefined) =>
  css({
    cursor: 'pointer',
    '& > svg': {
      width: 20,
      height: 20,
      fill: s ? '#ff4949' : h ? 'firebrick' : 'darkred',
    },
  });

const Marker = React.memo<Props>(({ marker, onHover, onSelect, hovered, selected }) => {
  return (
    <ReactMapGLMarker
      latitude={marker.geometry.position[1]}
      longitude={marker.geometry.position[0]}
      offsetTop={-25}
      offsetLeft={-10}
    >
      <div
        css={style(hovered, selected)}
        onMouseLeave={() => onHover(null)}
        onMouseEnter={() => onHover(marker.id)}
        onClick={() => onSelect(marker.id)}
      >
        <MarkerPoint />
      </div>
    </ReactMapGLMarker>
  );
});

export default Marker;
