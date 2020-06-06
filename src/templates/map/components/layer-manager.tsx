import React from 'react';
import DeckGL, { LineLayer } from 'deck.gl';
import { MapItemObj, Viewport } from '../../../logic/features/map/map-types';
import { LineObj } from '../../../logic/features/map/line-types';

type Props = {
  viewport?: Viewport;
  viewMode?: boolean;
  children?: React.ReactNode;
  onViewportChange: (vp: Viewport) => void;
  onHover: (obj: LineObj) => void;
  onSelect: (obj: LineObj) => void;
  lines: Array<LineObj>;
  selected?: MapItemObj;
  hovered?: MapItemObj;
};

function getColor(hovered?: boolean, selected?: boolean): [number, number, number] {
  if (selected) return [255, 73, 73];
  if (hovered) return [178, 34, 34];
  return [139, 0, 0];
}

function getWidth(hovered?: boolean, selected?: boolean): number {
  if (selected) return 4;
  return 2;
}

const LayerManager = React.memo<Props>(
  ({ viewMode, viewport, onViewportChange, onHover, onSelect, hovered, selected, lines, children }) => {
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
            getColor: (obj) => getColor(hovered?.id === obj.id, selected?.id === obj.id),
            getWidth: (obj) => getWidth(hovered?.id === obj.id, selected?.id === obj.id),
            updateTriggers: {
              getColor: [hovered, selected],
              getWidth: [hovered, selected],
            },
          }),
        ]}
      >
        {children}
      </DeckGL>
    );
  }
);

export default LayerManager;
