import React, { FunctionComponent, useMemo, useState } from 'react';
import DeckGL, { LineLayer } from 'deck.gl';
import { Viewport } from '@logic/features/map/map-types';
import { LineObj } from '@logic/features/trip/line-types';
import useTheme from '@ui/colors/theme-context';
import { Theme } from '@ui/colors/color-types';
import tinycolor from 'tinycolor2';
import { WaypointObj } from "@logic/features/trip/trip-types";
import { MarkerObj } from "@logic/features/trip/marker-types";

type Props = {
  viewport?: Viewport;
  viewMode?: boolean;
  onHover: (obj: LineObj) => void;
  onSelect: (obj: LineObj) => void;
  lines: Array<WaypointObj>;
  selected?: { ctx: string; value: string };
  hovered?: { ctx: string; value: string };
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
  const { viewMode, viewport, onHover, onSelect, hovered, selected, lines, children } = props;
  const { theme } = useTheme();
  const [isHovering, setIsHovering] = useState<boolean>(false);
  return useMemo(
    () => (
      <DeckGL
        viewState={viewport}
        controller={true}
        pickingRadius={5}
        effects={[]}
        height="100%"
        width="100%"
        getCursor={() => (isHovering ? 'pointer' : 'inherit')}
        layers={[
          new LineLayer({
            id: 'line-layer',
            data: lines,
            opacity: 0.8,
            pickable: viewMode,
            onHover: ({ object }) => {
              setIsHovering(!!object);
              onHover(object);
            },
            onClick: ({ object }) => onSelect(object),
            getSourcePosition: (d) => (d.previous() as MarkerObj).geometry.position,
            getTargetPosition: (d) => (d.next() as MarkerObj).geometry.position,
            getColor: (obj) => getColor(theme, hovered === obj.id, selected === obj.id),
            getWidth: (obj) => getWidth(hovered === obj.id, selected === obj.id),
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
    [viewport, hovered, isHovering, selected, lines, children, theme]
  );
};

export default LayerManager;
