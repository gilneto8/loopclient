import React from 'react';
import Marker from './marker';
import { MarkerProps } from '../../../logic/shared/map/marker-types';
import { ItemProps } from '../../../logic/shared/map/map-types';
import { isMarker } from '../../../utils/functions/is-marker';

type Props = {
  markers: Array<MarkerProps>;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  viewMode?: boolean;
  selected?: ItemProps;
  hovered?: ItemProps;
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
          selected={isMarker(selected) && (selected as MarkerProps).id === marker.id}
          hovered={isMarker(hovered) && (hovered as MarkerProps).id === marker.id}
        />
      ))}
    </div>
  );
});

export default MarkerList;
