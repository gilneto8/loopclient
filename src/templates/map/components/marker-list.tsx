import React from 'react';
import Marker from './marker';
import { MarkerProps } from '../map-types';

type Props = {
  markers: Array<MarkerProps>;
  onSelect: (id: string) => void;
  viewMode?: boolean;
};
const MarkerList = ({ markers, onSelect, viewMode }: Props) => {
  return (
    <div>
      {markers.map((marker) => (
        <Marker key={marker.id} marker={marker} onSelect={(id) => viewMode && onSelect(id)} />
      ))}
    </div>
  );
};

export default MarkerList;
