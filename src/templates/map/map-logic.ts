import { useState } from 'react';
import * as _ from 'lodash';
import { v4 as uuidV4 } from 'uuid';
import { ItemProps, LineProps, MarkerProps, OnClickEventArg, ViewportProps } from './map-types';

const initialViewport: ViewportProps = {
  latitude: 38.715,
  longitude: -9.139,
  zoom: 12,
  pitch: 35,
  minZoom: 3,
};

export const useMapLogic = () => {
  const [editMode, setEditMode] = useState<boolean>(true);
  const [viewport, setViewport] = useState<ViewportProps>(initialViewport);
  const [markers, setMarkers] = useState<Array<MarkerProps>>([]);
  const [lines, setLines] = useState<Array<LineProps>>([]);
  const [selected, setSelected] = useState<ItemProps>(null);
  const [hovered, setHovered] = useState<ItemProps>(null);

  const switchMode = () => setEditMode(!editMode);

  const updateViewport = (vp: ViewportProps) => {
    setViewport(vp);
  };

  const addMarker = (p: OnClickEventArg) => {
    const [longitude, latitude] = p.lngLat;
    const marker: MarkerProps = {
      geometry: { position: [longitude, latitude, 1] },
      id: uuidV4(),
    };
    const updatedMarkers = _.concat(markers, marker);
    setMarkers(updatedMarkers);
    const updatedLines =
      updatedMarkers.length === 1
        ? []
        : _.concat(lines, {
            id: uuidV4(),
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

  const hoverOnMarker = (id: string | null) => {
    if (!id) setHovered(null);
    else {
      const marker = _.find(markers, (m) => m.id === id);
      if (!marker) return;
      setHovered(marker);
    }
  };

  const hoverOnLine = (obj: LineProps) => {
    setHovered(obj);
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
      hovered,
      editMode,
      lines,
    },
    methods: {
      updateViewport,
      addMarker,
      selectMarker,
      hoverOnMarker,
      selectLine,
      hoverOnLine,
      closePopup,
      switchMode,
    },
  };
};
