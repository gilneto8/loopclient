import React from 'react';
import DeckGL, { LineLayer } from 'deck.gl';
import { ItemProps, ViewportProps } from '../../../logic/shared/map/map-types';
import { LineProps } from '../../../logic/shared/map/line-types';

type Props = {
  viewport: ViewportProps | undefined;
  viewMode?: boolean;
  children?: React.ReactNode;
  onViewportChange: (vp: ViewportProps) => void;
  onHover: (obj: LineProps) => void;
  onSelect: (obj: LineProps) => void;
  lines: Array<LineProps>;
  selected: ItemProps;
  hovered: ItemProps;
};

function getColor(hovered: boolean | undefined, selected: boolean | undefined): [number, number, number] {
  if (selected) return [255, 73, 73];
  if (hovered) return [178, 34, 34];
  return [139, 0, 0];
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
            getWidth: 2,
            updateTriggers: {
              getColor: [hovered, selected]
            }
          }),
        ]}
      >
        {children}
      </DeckGL>
    );
  }
);

export default LayerManager;
