import React from 'react';
import { Popup as ReactMapGLPopup } from 'react-map-gl';
import { ItemProps, LineProps, MarkerProps } from '../../../logic/shared/map/map-types';
import { lineMidpoint } from '../../../utils/functions/line-midpoint';
import LineInfo from '../popups/line-info';
import MarkerInfo from '../popups/marker-info';
import { isMarker } from '../../../utils/functions/is-marker';
import { css } from '@emotion/core';

type Props = {
  item: ItemProps;
};

const style = css({
  width: 250,
  backgroundColor: 'white',
  overflowWrap: 'anywhere',
});

const Popup = React.memo<Props>(({ item }: Props) => {
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
        closeButton={false}
      >
        <div css={style}>
          <MarkerInfo marker={marker} />
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
      closeButton={false}
    >
      <div css={style}>
        <LineInfo line={line} />
      </div>
    </ReactMapGLPopup>
  );
});

export default Popup;
