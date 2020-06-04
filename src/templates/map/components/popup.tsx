import React from 'react';
import { Popup as ReactMapGLPopup } from 'react-map-gl';
import { ItemProps, LineProps, MarkerProps } from '../../../logic/shared/map/map-types';
import { lineMidpoint } from '../../../utils/functions/line-midpoint';
import LineForm from '../forms/line-form';
import MarkerForm from '../forms/marker-form';

type Props = {
  item: ItemProps;
  onClose: () => void;
};

function isMarker(i: ItemProps): boolean {
  return !!i && !!(i as MarkerProps).geometry.position;
}

const Popup = React.memo<Props>(({ item, onClose }: Props) => {
  if (!item) return <></>;
  if (isMarker(item)) {
    const marker = item as MarkerProps;
    return (
      <ReactMapGLPopup
        tipSize={5}
        longitude={marker.geometry.position[0]}
        latitude={marker.geometry.position[1]}
        anchor="bottom"
        offsetTop={-25}
        onClose={onClose}
        closeOnClick={false}
        captureClick
        captureDoubleClick
      >
        <div style={{ width: 250, height: 100, backgroundColor: 'white' }}>
          <MarkerForm marker={marker} />
        </div>
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
      closeOnClick={false}
      captureClick
      captureDoubleClick
    >
      <div style={{ width: 250, height: 100, backgroundColor: 'white' }}>
        <LineForm line={line} />
      </div>
    </ReactMapGLPopup>
  );
});

export default Popup;
