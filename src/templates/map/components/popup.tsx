import React from 'react';
import { Popup as ReactMapGLPopup } from 'react-map-gl';
import { ItemProps, LineProps, MarkerProps } from "../map-types"
import { lineMidpoint } from '../../../utils/functions/lineMidpoint';

type Props = {
  item: ItemProps;
  onClose: () => void;
};
const Popup = ({ item, onClose }: Props) => {
  const isItemMarker = (i: ItemProps): boolean => !!i && !!(i as MarkerProps).longitude;

  if (!item) return <></>;
  if (isItemMarker(item)) {
    const marker = item as MarkerProps;
    return (
      <ReactMapGLPopup
        tipSize={5}
        longitude={marker.longitude}
        latitude={marker.latitude}
        anchor="bottom"
        offsetTop={-25}
        onClose={onClose}
      >
        <div style={{ width: 100, height: 100, backgroundColor: 'white' }}>{marker.name || 'Untitled'}</div>
      </ReactMapGLPopup>
    );
  }
  const line = item as LineProps;
  const midpoint = lineMidpoint(line);
  return (
    <ReactMapGLPopup
      tipSize={5}
      longitude={midpoint[0]}
      latitude={midpoint[1]}
      anchor="bottom"
      offsetTop={-5}
      onClose={onClose}
    >
      <div style={{ width: 100, height: 100, backgroundColor: 'white' }}>{line.name || 'Untitled'}</div>
    </ReactMapGLPopup>
  );
};

export default Popup;
