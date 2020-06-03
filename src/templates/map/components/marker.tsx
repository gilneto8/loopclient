import React from 'react';
import { Marker as ReactMapGLMarker } from 'react-map-gl';
import { MarkerProps } from '../map-types';
const MarkerPoint = require('../../../images/marker.svg');

type Props = {
  marker: MarkerProps;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  children?: React.ReactNode;
};
const Marker = ({ marker, onHover, onSelect }: Props) => (
  <ReactMapGLMarker
    latitude={marker.geometry.position[1]}
    longitude={marker.geometry.position[0]}
    offsetTop={-25}
    offsetLeft={-10}
  >
    <div onMouseLeave={() => onHover(null)} onMouseEnter={() => onHover(marker.id)} onClick={() => onSelect(marker.id)}>
      <img style={{ width: 20, height: 20 }} src={MarkerPoint} alt={'Marker Point'} />
    </div>
  </ReactMapGLMarker>
);

export default Marker;
