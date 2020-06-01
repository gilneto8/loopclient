import { useState } from 'react';
import * as _ from 'lodash';
import { v4 as uuidV4 } from 'uuid';
import { MarkerProps, Viewport } from "./map-types"
import { PointerEvent } from 'react-map-gl'

const initialViewport = {
  latitude: 38.715,
  longitude: -9.139,
  zoom: 12,
  bearing: 0,
  pitch: 35,
  altitude: 100,
  maxZoom: 15,
  minZoom: 3,
};

export const useMapLogic = () => {
  const [viewport, setViewport] = useState<Viewport>(initialViewport);
  const [markers, setMarkers] = useState<Array<MarkerProps>>([]);
  const [selected, setSelected] = useState<MarkerProps | null>(null);

  const updateViewport = (vs: Viewport) => {
    setViewport(vs);
  };

  const addMarker = ({ lngLat: [longitude, latitude] }: PointerEvent) => {
    const marker: MarkerProps = { longitude, latitude, altitude: 1, name: '', id: uuidV4() };
    setMarkers(_.concat(markers, marker));
  };

  const selectMarker = (id: string | null = null) => {
    if (!id) {
      setSelected(null);
      return;
    }
    const marker = _.find(markers, (m) => m.id === id);
    if (!marker) return;
    setSelected(marker);
  };

  return {
    state: {
      viewport,
      markers,
      selected,
    },
    methods: {
      updateViewport,
      addMarker,
      selectMarker,
    },
  };
};
