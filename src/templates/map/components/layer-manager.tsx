import React from 'react';
import DeckGL, { LineLayer } from 'deck.gl';
import { LineProps, LineTypes, ViewportProps } from '../map-types';

type Props = {
  viewport: ViewportProps;
  viewMode?: boolean;
  children?: React.ReactNode;
  onViewportChange: (vp: ViewportProps) => void;
  onSelect: (obj: LineProps) => void;
  lines: Array<LineProps>;
};

const LayerManager = ({ viewMode, viewport, onViewportChange, onSelect, lines, children }: Props) => {
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
          onClick: ({ object }) => onSelect(object),
          getSourcePosition: (d) => d.geometry.start.geometry.position,
          getTargetPosition: (d) => d.geometry.end.geometry.position,
          getColor: (d) => {
            switch (d.type) {
              case LineTypes.PEDESTRIAN:
                return [233, 0, 0];
              case LineTypes.PLANE:
                return [0, 200, 200];
              default:
                return [213, 0, 123];
            }
          },
          getWidth: 2,
        }),
      ]}
    >
      {children}
    </DeckGL>
  );
};

export default LayerManager;
