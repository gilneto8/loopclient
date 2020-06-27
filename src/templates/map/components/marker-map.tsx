import React, { FunctionComponent, useMemo } from 'react';
import Marker from './marker';
import { MarkerObj } from '@logic/features/trip/marker-types';

type Props = {
  markers: Array<MarkerObj>;
  onHover: (id?: { ctx: string; value: string }) => void;
  onSelect: (id: { ctx: string; value: string }) => void;
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
            marker={marker}
            onHover={(id) => viewMode && id && onHover({ ctx: 'marker', value: id })}
            onSelect={(id) => viewMode && onSelect({ ctx: 'marker', value: id })}
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
