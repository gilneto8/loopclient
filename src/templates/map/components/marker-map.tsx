import React, { FunctionComponent, useMemo } from 'react';
import Marker from './marker';
import { MarkerObj } from "@logic/features/trip/marker-types";
import { isMarker } from "@utils/marker-utils/is-marker";

type Props = {
  markers: Array<MarkerObj>;
  onHover: (id?: string) => void;
  onSelect: (id: string) => void;
  viewMode?: boolean;
  selected?: string;
  hovered?: string;
};
const MarkerMap: FunctionComponent<Props> = (props) => {
  const { markers, onHover, onSelect, hovered, selected, viewMode } = props;
  return useMemo(
    () => (
      <div>
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            marker={marker}
            onHover={(id) => viewMode && onHover(id)}
            onSelect={(id) => viewMode && onSelect(id)}
            selected={selected === marker.id}
            hovered={hovered === marker.id}
          />
        ))}
      </div>
    ),
    [props]
  );
};

export default MarkerMap;
