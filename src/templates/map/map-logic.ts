import { useState } from 'react';
import * as _ from 'lodash';
import { v4 as uuidV4 } from 'uuid';
import { ItemProps, LineProps, LineTypes, MarkerProps, MarkerTypes, OnClickEventArg, ViewportProps } from './map-types';

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
  const [viewport, setViewport] = useState<ViewportProps>(initialViewport);
  const [markers, setMarkers] = useState<Array<MarkerProps>>([]);
  const [lines, setLines] = useState<Array<LineProps>>([]);
  const [selected, setSelected] = useState<ItemProps>(null);

  const switchMode = () => setEditMode(!editMode);

  const updateViewport = (vp: ViewportProps) => {
    setViewport(vp);
  };

  const addMarker = (p: OnClickEventArg) => {
    const [longitude, latitude] = p.lngLat;
    const marker: MarkerProps = {
      geometry: { position: [longitude, latitude, 1] },
      name: 'marker',
      type: MarkerTypes.POI,
      id: uuidV4(),
    };
    const updatedMarkers = _.concat(markers, marker);
    setMarkers(updatedMarkers);
    const updatedLines =
      updatedMarkers.length === 1
        ? []
        : _.concat(lines, {
            id: uuidV4(),
            name: 'line',
            type: Math.random() > 0.5 ? LineTypes.PEDESTRIAN : LineTypes.PLANE,
            geometry: {
              start: lines.length === 0 ? markers[0] : lines[lines.length - 1].geometry.end,
              end: marker,
            },
          });
    setLines(updatedLines);
  };

  const selectMarker = (id: string) => {
    const marker = _.find(markers, (m) => m.id === id);
    if (!marker) return;
    setSelected(marker);
  };

  const selectLine = (obj: LineProps) => {
    setSelected(obj);
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
      selectLine,
      closePopup,
      switchMode,
    },
  };
};
