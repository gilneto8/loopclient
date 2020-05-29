import { useState } from 'react';
import { ViewportProps } from 'react-map-gl';

export const useMapLogic = () => {
  const token = 'pk.eyJ1IjoiZ2lsbmV0bzgiLCJhIjoiY2thczhyZjl1MHFnNTJycHJlZDExbXlscyJ9.xF668iGdzs2JB99yCW6KTg';
  const [viewport, setViewport] = useState<Partial<ViewportProps>>({
    latitude: 38.715,
    longitude: -9.139,
    zoom: 12,
    bearing: 0,
    pitch: 0,
    altitude: 100,
    maxZoom: 15,
    minZoom: 3,
    maxPitch: 60,
    minPitch: 0
  });

  const updateViewport = (vp: ViewportProps) => {
    /*console.log(vp);*/
    setViewport(vp);
  }

  return {
    state: {
      token,
      viewport
    },
    methods: {
      updateViewport,
    }
  }
};
