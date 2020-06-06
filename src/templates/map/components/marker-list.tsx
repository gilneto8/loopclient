import React from 'react';
import Marker from './marker';
import { MarkerObj } from '../../../logic/shared/map/marker-types';
import { MapItemObj } from '../../../logic/shared/map/map-types';
import { isMarker } from '../../../utils/functions/is-marker';

type Props = {
  markers: Array<MarkerObj>;
  onHover: (id?: string) => void;
  onSelect: (id: string) => void;
  viewMode?: boolean;
  selected?: MapItemObj;
  hovered?: MapItemObj;
};
const MarkerList = React.memo<Props>(({ markers, onHover, onSelect, hovered, selected, viewMode }) => {
  return (
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
  );
});

export default MarkerList;
