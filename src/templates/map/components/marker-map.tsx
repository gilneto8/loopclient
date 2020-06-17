import React, { FunctionComponent, useMemo } from 'react';
import Marker from './marker';
import { MarkerObj } from "@logic/features/trip/marker-types";
import { MapItemObj } from "@logic/features/map/map-types";
import { isMarker } from "@utils/marker-utils/is-marker";

type Props = {
  markers: Array<MarkerObj>;
  onHover: (id?: string) => void;
  onSelect: (id: string) => void;
  viewMode?: boolean;
  selected?: MapItemObj;
  hovered?: MapItemObj;
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
            selected={isMarker(selected) && (selected as MarkerObj).id === marker.id}
            hovered={isMarker(hovered) && (hovered as MarkerObj).id === marker.id}
          />
        ))}
      </div>
    ),
    [props]
  );
};

export default MarkerMap;
