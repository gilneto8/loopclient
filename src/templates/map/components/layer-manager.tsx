import React from 'react';
import DeckGL, { LineLayer } from 'deck.gl';
import { LineProps, ViewportProps } from '../../../logic/shared/map/map-types';

type Props = {
  viewport: ViewportProps;
  viewMode?: boolean;
  children?: React.ReactNode;
  onViewportChange: (vp: ViewportProps) => void;
  onHover: (obj: LineProps) => void;
  onSelect: (obj: LineProps) => void;
  lines: Array<LineProps>;
};

const LayerManager = React.memo<Props>(
  ({ viewMode, viewport, onViewportChange, onHover, onSelect, lines, children }) => {
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
            onHover: ({ object }) => onHover(object),
            onClick: ({ object }) => onSelect(object),
            getSourcePosition: (d) => d.geometry.start.geometry.position,
            getTargetPosition: (d) => d.geometry.end.geometry.position,
            getColor: [233, 0, 0],
            getWidth: 2,
          }),
        ]}
      >
        {children}
      </DeckGL>
    );
  }
);

export default LayerManager;
