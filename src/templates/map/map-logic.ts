import { useState } from 'react';
import * as _ from 'lodash';
import { v4 as uuidV4 } from 'uuid';
import { MarkerProps, ViewType } from "./map-types"
import { PointerEvent } from 'react-map-gl'

const initialViewport = {
  latitude: 38.715,
  longitude: -9.139,
  zoom: 12,
  bearing: 0,
  pitch: 0,
  altitude: 100,
  maxZoom: 15,
  minZoom: 3,
  maxPitch: 60,
  minPitch: 0,
};

export const useMapLogic = () => {
  const [view, setView] = useState<ViewType>({
    viewState: initialViewport,
    interactionState: {},
    oldViewState: null,
  });
  const [markers, setMarkers] = useState<Array<MarkerProps>>([]);
  const [selected, setSelected] = useState<MarkerProps | null>(null);

  const updateView = (vs: ViewType) => {
    setView(vs);
  };

  const addMarker = ({ lngLat: [longitude, latitude] }: PointerEvent) => {
    const marker: MarkerProps = { longitude, latitude, altitude: 0, name: '', id: uuidV4() };
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
      view,
      markers,
      selected,
    },
    methods: {
      updateView,
      addMarker,
      selectMarker,
    },
  };
};
