import React from 'react';
import { Marker as ReactMapGLMarker } from 'react-map-gl';
import { MarkerProps } from '../map-logic';
const MarkerPoint = require('../../../images/marker.svg');

type Props = {
  marker: MarkerProps;
  onSelect: (id: string) => void;
};
const Marker = ({ marker, onSelect }: Props) => (
  <ReactMapGLMarker {...marker} offsetTop={-25} offsetLeft={-10}>
    <div onClick={() => onSelect(marker.id)}>
      <img style={{ width: 20, height: 20 }} src={MarkerPoint} alt={'Marker Point'} />
    </div>
  </ReactMapGLMarker>
);

export default Marker;
