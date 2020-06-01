import React from 'react';
import { Popup as ReactMapGLPopup } from 'react-map-gl';
import { MarkerProps } from '../map-types';

type Props = {
  marker: MarkerProps | null;
  onClose: () => void;
};
const Popup = ({ marker, onClose }: Props) => {
  if (!marker) return <></>;
  return (
    <ReactMapGLPopup
      tipSize={5}
      longitude={marker.longitude}
      latitude={marker.latitude}
      anchor="bottom"
      offsetTop={-25}
      onClose={onClose}
    >
      <div style={{ width: 100, height: 100, backgroundColor: 'white' }}>{marker?.name || 'Untitled'}</div>
    </ReactMapGLPopup>
  );
};

export default Popup;
