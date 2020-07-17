import React, { FunctionComponent, useMemo } from 'react';
import Marker from './marker';
import { MarkerObj } from '@logic/features/trip/marker-types';
import { WaypointObj } from "@logic/features/trip/trip-types";

type Props = {
  markers: Array<WaypointObj>;
  onHover: (id?: string) => void;
  onSelect: (id: string) => void;
  viewMode?: boolean;
  selected?: { ctx: string; value: string };
  hovered?: { ctx: string; value: string };
};
const MarkerMap: FunctionComponent<Props> = (props) => {
  const { markers, onHover, onSelect, hovered, selected, viewMode } = props;
  return useMemo(
    () => (
      <div>
        {markers.map((marker) => (
          <Marker
            key={marker.id.value}
            marker={marker as MarkerObj}
            onHover={(id) => viewMode && onHover(id)}
            onSelect={(id) => viewMode && onSelect(id)}
            selected={selected?.value === marker.id.value}
            hovered={hovered?.value === marker.id.value}
          />
        ))}
      </div>
    ),
    [props]
  );
};

export default MarkerMap;
