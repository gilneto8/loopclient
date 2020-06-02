import { useState } from 'react';
import * as _ from 'lodash';
import { v4 as uuidV4 } from 'uuid';
import { LineProps, MarkerProps, OnClickEventArg, Viewport } from './map-types';
import { applyNext } from '../../utils/functions/reduceNext';

const initialViewport = {
  latitude: 38.715,
  longitude: -9.139,
  zoom: 12,
  bearing: 0,
  pitch: 35,
  maxZoom: 15,
  minZoom: 3,
};

export const useMapLogic = () => {
  const [editMode, setEditMode] = useState<boolean>(true);
  const [viewport, setViewport] = useState<Viewport>(initialViewport);
  const [markers, setMarkers] = useState<Array<MarkerProps>>([]);
  const [lines, setLines] = useState<Array<LineProps>>([]);
  const [selected, setSelected] = useState<MarkerProps | null>(null);

  const switchMode = () => setEditMode(!editMode);

  const updateViewport = (vs: Viewport) => {
    setViewport(vs);
  };

  const addMarker = (p: OnClickEventArg) => {
    const [longitude, latitude] = p.lngLat;
    const marker: MarkerProps = { longitude, latitude, altitude: 1, name: 'marker', id: uuidV4() };
    const updatedMarkers = _.concat(markers, marker);
    setMarkers(updatedMarkers);
    const updatedLines = applyNext<MarkerProps, LineProps>(updatedMarkers, (c, n) => ({
      id: uuidV4(),
      name: c.name || 'line',
      start: [c.longitude, c.latitude, c.altitude],
      end: [n.longitude, n.latitude, n.altitude],
    }));
    setLines(updatedLines);
  };

  const selectMarker = (id: string) => {
    const marker = _.find(markers, (m) => m.id === id);
    if (!marker) return;
    setSelected(marker);
  };

  const closePopup = () => {
    setSelected(null);
    return;
  };

  return {
    state: {
      viewport,
      markers,
      selected,
      editMode,
      lines,
    },
    methods: {
      updateViewport,
      addMarker,
      selectMarker,
      closePopup,
      switchMode,
    },
  };
};
