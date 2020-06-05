import React from 'react';
import { Marker as ReactMapGLMarker } from 'react-map-gl';
import { css } from '@emotion/core';
import { MarkerProps } from "../../../logic/shared/map/marker-types"
const MarkerPoint = require('../../../images/marker.svg');

type Props = {
  marker: MarkerProps;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  children?: React.ReactNode;
};

const style = css({
  cursor: 'pointer',
  '& > img': {
    width: 20,
    height: 20,
  },
});

const Marker = React.memo<Props>(({ marker, onHover, onSelect }) => (
  <ReactMapGLMarker
    latitude={marker.geometry.position[1]}
    longitude={marker.geometry.position[0]}
    offsetTop={-25}
    offsetLeft={-10}
  >
    <div
      css={style}
      onMouseLeave={() => onHover(null)}
      onMouseEnter={() => onHover(marker.id)}
      onClick={() => onSelect(marker.id)}
    >
      <img src={MarkerPoint} alt={'Marker Point'} />
    </div>
  </ReactMapGLMarker>
));

export default Marker;
