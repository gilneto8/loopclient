import React from 'react';
import Marker from './marker';
import { MarkerProps } from '../../../logic/shared/map/map-types';

type Props = {
  markers: Array<MarkerProps>;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  viewMode?: boolean;
};
const MarkerList = ({ markers, onHover, onSelect, viewMode }: Props) => {
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
};

export default MarkerList;
