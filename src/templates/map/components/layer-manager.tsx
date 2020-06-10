import React, { FunctionComponent, useContext, useMemo } from 'react';
import DeckGL, { LineLayer } from 'deck.gl';
import { MapItemObj, Viewport } from '../../../logic/features/map/map-types';
import { LineObj } from '../../../logic/features/map/line-types';
import { ThemeContext } from '../../../components/ui/colors/theme-context';
import { Theme } from '../../../components/ui/colors/color-types';
import tinycolor from 'tinycolor2';

type Props = {
  viewport?: Viewport;
  viewMode?: boolean;
  onViewportChange: (vp: Viewport) => void;
  onHover: (obj: LineObj) => void;
  onSelect: (obj: LineObj) => void;
  lines: Array<LineObj>;
  selected?: MapItemObj;
  hovered?: MapItemObj;
};

function getColor(theme: Theme, hovered?: boolean, selected?: boolean): [number, number, number] {
  const sel = tinycolor(theme.foreground.functional.selected).toRgb();
  const hov = tinycolor(theme.foreground.functional.hovering).toRgb();
  const non = tinycolor(theme.foreground.color).toRgb();
  if (selected) return [sel.r, sel.g, sel.b];
  if (hovered) return [hov.r, hov.g, hov.b];
  return [non.r, non.g, non.b];
}

function getWidth(hovered?: boolean, selected?: boolean): number {
  if (selected) return 4;
  return 2;
}

const LayerManager: FunctionComponent<Props> = (props) => {
  const { viewMode, viewport, onViewportChange, onHover, onSelect, hovered, selected, lines, children } = props;
  const theme = useContext(ThemeContext).theme;
  return useMemo(
    () => (
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
            getColor: (obj) => getColor(theme, hovered?.id === obj.id, selected?.id === obj.id),
            getWidth: (obj) => getWidth(hovered?.id === obj.id, selected?.id === obj.id),
            updateTriggers: {
              getColor: [hovered, selected, theme],
              getWidth: [hovered, selected, theme],
            },
          }),
        ]}
      >
        {children}
      </DeckGL>
    ),
    [viewport, hovered, selected, lines, children, theme]
  );
};

export default LayerManager;
