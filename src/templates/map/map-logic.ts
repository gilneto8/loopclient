import { useState } from 'react';
import * as _ from 'lodash';
import { v4 as uuidV4 } from 'uuid';
import {
  ItemProps,
  LineProps,
  LineTypes,
  MarkerProps,
  MarkerTypes,
  OnClickEventArg,
  ViewportProps,
} from '../../logic/shared/map/map-types';
import { useStoreSelector } from '../../logic/store/use-store-selector';
import { loadSidenav } from '../../logic/shared/global/sidenav/sidenav-thunks';

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

  const {
    storeDispatch,
    thunkResult: { sidenavThunks },
  } = useStoreSelector(loadSidenav(), (storeState) => storeState.sidenav);

  const __updateSidenavData = async (item: ItemProps) => {
    storeDispatch(sidenavThunks.open(item));
  };

  const switchMode = () => setEditMode(!editMode);

  const updateViewport = (vp: ViewportProps) => {
    setViewport(vp);
  };

  const addMarker = (p: OnClickEventArg) => {
    const [longitude, latitude] = p.lngLat;
    const lng = +longitude.toFixed(3),
      lat = +latitude.toFixed(3);
    const marker: MarkerProps = {
      geometry: { position: [lng, lat, 1] },
      id: uuidV4(),
      data: {
        name: `New marker (${lng},${lat})`,
        description: 'Placeholder...',
        type: MarkerTypes.POI,
      },
    };
    const updatedMarkers = _.concat(markers, marker);
    setMarkers(updatedMarkers);
    const startMarker = lines.length === 0 ? markers[0] : lines[lines.length - 1].geometry.end;
    const updatedLines =
      updatedMarkers.length === 1
        ? []
        : _.concat(lines, {
            id: uuidV4(),
            geometry: {
              start: startMarker,
              end: marker,
            },
            data: {
              name: `New line (${startMarker.data.name}, ${marker.data.name})`,
              type: LineTypes.PEDESTRIAN,
              description: 'Placeholder...',
            },
          });
    setLines(updatedLines);
  };

  const selectMarker = async (id: string) => {
    const marker = _.find(markers, (m) => m.id === id);
    if (!marker) return;
    setSelected(marker);
    await __updateSidenavData(marker);
  };

  const selectLine = async (obj: LineProps) => {
    setSelected(obj);
    await __updateSidenavData(obj);
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
      switchMode,
    },
  };
};
