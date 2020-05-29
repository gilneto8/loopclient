import React from 'react';
import { Marker as ReactMapGLMarker } from 'react-map-gl';
const MarkerPoint = require('../../../images/marker.svg');

type MarkerProps = {
  marker: { latitude: number; longitude: number };
};
const Marker = ({ marker }: MarkerProps) => (
  <ReactMapGLMarker {...marker} offsetTop={-25} offsetLeft={-10}>
    <div onClick={() => console.log('dung')}>
      <img style={{ width: 20, height: 20 }} src={MarkerPoint} alt={'Marker Point'} />
    </div>
  </ReactMapGLMarker>
);

export default Marker;
