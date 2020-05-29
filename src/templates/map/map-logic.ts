import { useState } from 'react';
import * as _ from 'lodash';
import {
  MarkerProps as ReactMapGLMarkerProps,
  PointerEvent,
  ViewportProps as ReactMapGLViewportProps,
} from 'react-map-gl';

type MarkerProps = Pick<ReactMapGLMarkerProps, 'latitude' | 'longitude'>;
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

  const updateViewport = (vp: ViewportProps) => {
    setViewport(vp);
  };

  const addMarker = ({ lngLat: [longitude, latitude] }: PointerEvent) => {
    setMarkers(_.concat(markers, { longitude, latitude }));
  };

  return {
    state: {
      token,
      viewport,
      markers,
      doubleClickZoom: true, // setting to false removes 300ms delay (caused by mjolnir.js)
    },
    methods: {
      updateViewport,
      addMarker,
    },
  };
};
