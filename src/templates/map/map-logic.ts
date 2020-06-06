import { useState } from 'react';
import * as _ from 'lodash';
import { MapItemObj, OnClickEvent, Viewport } from '../../logic/features/map/map-types';
import { useStoreSelector } from '../../logic/shared/store/use-store-selector';
import { loadSidenav } from '../../logic/features/sidenav/sidenav-thunks';
import { MarkerObj, MarkerTypes } from '../../logic/features/map/marker-types';
import { LineObj, LineTypes } from '../../logic/features/map/line-types';
import { loadMap } from '../../logic/features/map/map-thunks';
import { id } from "../../utils/functions/create-local-id"

const createMarkerObj = (lng: number, lat: number): MarkerObj => ({
  geometry: { position: [lng, lat, 1] },
  id: id(10),
  data: {
    name: 'New marker',
    description: '',
    type: MarkerTypes.POI,
  },
});
const createLineObj = (start: MarkerObj, end: MarkerObj): LineObj => ({
  id: id(10),
  geometry: { start, end },
  data: {
    name: 'New line',
    description: '',
    type: LineTypes.PEDESTRIAN,
  },
});

export const useMapLogic = () => {
  const {
    storeDispatch,
    thunkResult: { sidenavThunks },
  } = useStoreSelector(loadSidenav(), () => {});
  const {
    selected: map,
    thunkResult: { mapThunks },
  } = useStoreSelector(loadMap(), (storeState) => storeState.map);

  const [editMode, setEditMode] = useState<boolean>(true);
  const [hovered, setHovered] = useState<MapItemObj | undefined>(undefined);

  const switchMode = () => {
    setEditMode(!editMode);
    storeDispatch(mapThunks.unselect());
  };

  const updateViewport = async (vp: Viewport) => {
    storeDispatch(mapThunks.updateViewport(vp));
  };

  const addMarker = (p: OnClickEvent) => {
    if (!map) throw new Error('No access to state management system.');

    const { markers, lines } = map;
    const marker = createMarkerObj(+p.lngLat[0].toFixed(3), +p.lngLat[1].toFixed(3));
    storeDispatch(mapThunks.addMarker(marker));
    const startMarker = lines.length === 0 ? markers[0] : lines[lines.length - 1].geometry.end;
    if (markers.length >= 1) storeDispatch(mapThunks.addLine(createLineObj(startMarker, marker)));
  };

  const selectMarker = async (id: string) => {
    const marker = _.find(map?.markers || [], (m) => m.id === id);
    if (marker) {
      storeDispatch(sidenavThunks.open(marker));
      storeDispatch(mapThunks.selectMarker(marker.id));
    }
  };

  const selectLine = async (obj: LineObj) => {
    if (obj) {
      storeDispatch(sidenavThunks.open(obj));
      storeDispatch(mapThunks.selectLine(obj.id));
    }
  };

  const hoverOnMarker = (id?: string) => {
    if (!id) setHovered(undefined);
    else {
      const marker = _.find(map?.markers || [], (m) => m.id === id);
      if (marker) setHovered(marker);
    }
  };

  const hoverOnLine = (obj: LineObj) => {
    setHovered(obj);
  };

  return {
    state: {
      viewport: map?.viewport,
      markers: map?.markers || [],
      lines: map?.lines || [],
      selected: map?.selected,
      hovered,
      editMode,
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
