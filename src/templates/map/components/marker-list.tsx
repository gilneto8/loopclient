import React from 'react';
import Marker from './marker';
import { MarkerProps } from '../../../logic/shared/map/marker-types';

type Props = {
  markers: Array<MarkerProps>;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  viewMode?: boolean;
};
const MarkerList = React.memo<Props>(({ markers, onHover, onSelect, viewMode }) => {
  return (
    <div>
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          marker={marker}
          onHover={(id) => viewMode && onHover(id)}
          onSelect={(id) => viewMode && onSelect(id)}
        />
      ))}
    </div>
  );
});

export default MarkerList;
