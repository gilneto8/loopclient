import { useState } from 'react';
import * as _ from 'lodash';
import { OnClickEvent, Viewport } from '../../logic/features/map/map-types';
import { useStoreSelector } from '../../logic/shared/store/use-store-selector';
import { loadSidenav } from '../../logic/features/sidenav/sidenav-thunks';
import { MarkerObj, MarkerTypes } from '../../logic/features/trip/marker-types';
import { LineObj, LineTypes } from '../../logic/features/trip/line-types';
import { loadMap } from '../../logic/features/map/map-thunks';
import { id } from '../../utils/functions/create-local-id';
import { loadTrips } from '../../logic/features/trip/trip-thunks';

const createMarkerObj = (lng: number, lat: number): MarkerObj => ({
  geometry: { position: [lng, lat, 1] },
  id: id(),
  data: {
    name: 'New marker',
    description: '',
    type: MarkerTypes.POI,
  },
});
const createLineObj = (start: MarkerObj, end: MarkerObj): LineObj => ({
  id: id(),
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
  const {
    selected: { selected: trip },
    thunkResult: { tripsThunks },
  } = useStoreSelector(loadTrips(), (storeState) => storeState.trips);

  const [editMode, setEditMode] = useState<boolean>(false);

  const switchMode = () => {
    setEditMode(!editMode);
    storeDispatch(mapThunks.unselect());
  };

  const updateViewport = async (vp: Viewport) => {
    storeDispatch(mapThunks.updateViewport(vp));
  };

  const addMarker = (p: OnClickEvent) => {
    if (!map || !trip) throw new Error('No access to state management system.');

    const { markers, lines } = trip.geometry;
    const marker = createMarkerObj(+p.lngLat[0].toFixed(3), +p.lngLat[1].toFixed(3));
    storeDispatch(tripsThunks.addMarker(trip.id, marker));
    const startMarker = lines.length === 0 ? markers[0] : lines[lines.length - 1].geometry.end;
    if (markers.length >= 1) storeDispatch(tripsThunks.addLine(trip.id, createLineObj(startMarker, marker)));
  };

  const selectMarker = async (id: string) => {
    if (!map || !trip) throw new Error('No access to state management system.');

    const { markers } = trip.geometry;

    const marker = _.find(markers || [], (m) => m.id === id);
    if (marker) {
      storeDispatch(sidenavThunks.open(marker));
      storeDispatch(mapThunks.selectMarker(marker));
    }
  };

  const selectLine = async (obj: LineObj) => {
    if (obj) {
      storeDispatch(sidenavThunks.open(obj));
      storeDispatch(mapThunks.selectLine(obj));
    }
  };

  const hoverOnMarker = (id?: string) => {
    if (!id) {
      storeDispatch(mapThunks.unhover());
      return;
    }
    if (!map || !trip) throw new Error('No access to state management system.');

    const { markers } = trip.geometry;

    const marker = _.find(markers || [], (m) => m.id === id);
    if (marker) storeDispatch(mapThunks.hoverMarker(marker));
  };

  const hoverOnLine = (obj: LineObj) => {
    if (obj === undefined) storeDispatch(mapThunks.unhover());
    else storeDispatch(mapThunks.hoverLine(obj));
  };

  console.log('m', trip.geometry.markers);
  console.log('l', trip.geometry.lines);
  return {
    state: {
      viewport: map?.viewport,
      markers: trip.geometry.markers || [],
      lines: trip.geometry.lines || [],
      selected: map?.selected,
      hovered: map?.hovered,
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
