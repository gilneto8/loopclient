import React from 'react';
import DeckGL, { LineLayer } from 'deck.gl';
import { v4 as uuidV4 } from 'uuid';
import { LineProps, MarkerProps, Viewport } from '../map-types';
import { applyNext } from '../../../utils/functions/reduceNext';

type Props = {
  viewport: Viewport;
  viewMode?: boolean;
  children?: React.ReactNode;
  onViewportChange: (vp: Viewport) => void;
  markers: Array<MarkerProps>;
};

const Deck = ({ viewMode, viewport, onViewportChange, markers, children }: Props) => {

  const getLines = (): Array<LineProps> => {
    return applyNext(markers, (c, n) => ({
      id: uuidV4(),
      name: c.name,
      start: [c.longitude, c.latitude, c.altitude],
      end: [n.longitude, n.latitude, n.altitude],
    }));
  };

  return (
    <DeckGL
      viewState={viewport}
      onViewStateChange={({ viewState }) => onViewportChange(viewState)}
      controller={true}
      pickingRadius={5}
      effects={[]}
      height="100%"
      width="100%"
      layers={[
        new LineLayer({
          id: 'line-layer',
          data: getLines(),
          opacity: 0.8,
          pickable: viewMode,
          onClick: console.log,
          getSourcePosition: (d) => d.start,
          getTargetPosition: (d) => d.end,
          getColor: [255, 0, 0],
          getWidth: 3,
        }),
      ]}
    >
      {children}
    </DeckGL>
  );
};

export default Deck;
