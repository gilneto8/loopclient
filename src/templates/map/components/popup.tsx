import React from 'react';
import { Popup as ReactMapGLPopup } from 'react-map-gl';
import { MarkerProps } from '../map-logic';

type Props = {
  marker: MarkerProps;
  onClose: () => void;
  children: React.ReactNode;
};
const Popup = ({ marker, onClose, children }: Props) => (
  <ReactMapGLPopup
    tipSize={5}
    longitude={marker.longitude}
    latitude={marker.latitude}
    anchor="bottom"
    offsetTop={-25}
    onClose={onClose}
  >
    <div style={{ width: 100, height: 100, backgroundColor: 'white' }}>{children}</div>
  </ReactMapGLPopup>
);

export default Popup;
