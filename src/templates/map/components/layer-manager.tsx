import React from 'react';
import DeckGL, { LineLayer } from 'deck.gl';
import { LineProps, Viewport } from '../map-types';

type Props = {
  viewport: Viewport;
  viewMode?: boolean;
  children?: React.ReactNode;
  onViewportChange: (vp: Viewport) => void;
  lines: Array<LineProps>;
};

const LayerManager = ({ viewMode, viewport, onViewportChange, lines, children }: Props) => {

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
          data: lines,
          opacity: 0.8,
          pickable: viewMode,
          onClick: (e) => console.log(e),
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

export default LayerManager;
