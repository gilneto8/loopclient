import { useState } from 'react';
import * as _ from 'lodash';
import { v4 as uuidV4 } from 'uuid';
import { ItemProps, OnClickEventArg, ViewportProps } from '../../logic/shared/map/map-types';
import { useStoreSelector } from '../../logic/store/use-store-selector';
import { loadSidenav } from '../../logic/shared/sidenav/sidenav-thunks';
import { MarkerProps, MarkerTypes } from '../../logic/shared/map/marker-types';
import { LineProps, LineTypes } from '../../logic/shared/map/line-types';
import { loadMap } from '../../logic/shared/map/map-thunks';

const createMarkerObj = (lng: number, lat: number): MarkerProps => ({
  geometry: { position: [lng, lat, 1] },
  id: uuidV4(),
  data: {
    name: 'New marker',
    description: '',
    type: MarkerTypes.POI,
  },
});
const createLineObj = (start: MarkerProps, end: MarkerProps): LineProps => ({
  id: uuidV4(),
  geometry: { start, end },
  data: {
    name: 'New line',
    type: LineTypes.PEDESTRIAN,
    description: '',
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
  const [hovered, setHovered] = useState<ItemProps>(null);

  const switchMode = () => setEditMode(!editMode);

  const updateViewport = async (vp: ViewportProps) => {
    storeDispatch(mapThunks.updateViewport(vp));
  };

  const addMarker = (p: OnClickEventArg) => {
    if (!map) throw new Error('No access to state management system.');

    const { markers, lines } = map;
    const marker = createMarkerObj(+p.lngLat[0].toFixed(3), +p.lngLat[1].toFixed(3));
    storeDispatch(mapThunks.addMarker(marker));
    const startMarker = lines.length === 0 ? markers[0] : lines[lines.length - 1].geometry.end;
    if (markers.length >= 1) storeDispatch(mapThunks.addLine(createLineObj(startMarker, marker)));
  };

  const selectMarker = async (id: string) => {
    const marker = _.find(map?.markers || [], (m) => m.id === id);
    if (marker) storeDispatch(sidenavThunks.open(marker));
  };

  const selectLine = async (obj: LineProps) => {
    if (obj) storeDispatch(sidenavThunks.open(obj));
  };

  const hoverOnMarker = (id: string | null) => {
    if (!id) setHovered(null);
    else {
      const marker = _.find(map?.markers || [], (m) => m.id === id);
      if (marker) setHovered(marker);
    }
  };

  const hoverOnLine = (obj: LineProps) => {
    setHovered(obj);
  };

  return {
    state: {
      viewport: map?.viewport,
      markers: map?.markers || [],
      lines: map?.lines || [],
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
