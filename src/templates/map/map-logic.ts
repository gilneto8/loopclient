import { useState } from 'react';
import * as _ from 'lodash';
import {
  MarkerProps as ReactMapGLMarkerProps,
  PointerEvent,
  ViewportProps as ReactMapGLViewportProps,
} from 'react-map-gl';
import { v4 as uuidV4 } from 'uuid';

export type MarkerProps = Pick<ReactMapGLMarkerProps, 'latitude' | 'longitude'> & { id: string };
type ViewportProps = Omit<ReactMapGLViewportProps, 'width' | 'height'>;

export const useMapLogic = () => {
  const token = 'pk.eyJ1IjoiZ2lsbmV0bzgiLCJhIjoiY2thczhyZjl1MHFnNTJycHJlZDExbXlscyJ9.xF668iGdzs2JB99yCW6KTg';

  const [viewport, setViewport] = useState<ViewportProps>({
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
  });
  const [markers, setMarkers] = useState<ReadonlyArray<MarkerProps>>([]);
  const [selected, setSelected] = useState<MarkerProps | null>(null);

  const updateViewport = (vp: ViewportProps) => {
    setViewport(vp);
  };

  const addMarker = ({ lngLat: [longitude, latitude] }: PointerEvent) => {
    const marker: MarkerProps = { longitude, latitude, id: uuidV4() };
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
      token,
      viewport,
      markers,
      doubleClickZoom: true, // setting to false removes 300ms delay (caused by mjolnir.js)
      selected,
    },
    methods: {
      updateViewport,
      addMarker,
      selectMarker,
    },
  };
};
