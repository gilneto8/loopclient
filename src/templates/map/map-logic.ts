import { useEffect, useState } from 'react';
import * as _ from 'lodash';
import { OnClickEvent, Viewport } from '../../logic/features/map/map-types';
import { useStoreSelector } from '../../logic/shared/store/use-store-selector';
import { loadSidenav } from '../../logic/features/sidenav/sidenav-thunks';
import { MarkerObj, MarkerTypes } from '../../logic/features/trip/marker-types';
import { LineObj, LineTypes } from '../../logic/features/trip/line-types';
import { loadMap } from '../../logic/features/map/map-thunks';
import { id } from '../../utils/functions/create-local-id';
import { loadTrips } from '../../logic/features/trip/trip-thunks';
import { TripObj } from '../../logic/features/trip/trip-types';

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
    selected: mapInfo,
    thunkResult: { mapThunks },
  } = useStoreSelector(loadMap(), (storeState) => storeState.map);

  const {
    selected: tripInfo,
    thunkResult: { tripsThunks },
  } = useStoreSelector(loadTrips(), (storeState) => storeState.trips);

  if (!tripInfo || !mapInfo) throw new Error('Could not access state management information.');

  const [selectedTrip, setSelectedTrip] = useState<TripObj>(
    tripInfo.trips.filter((t) => t.id === tripInfo.selected)[0]
  );

  useEffect(() => {
    setSelectedTrip(tripInfo.trips.filter((t) => t.id === tripInfo.selected)[0]);
  }, [tripInfo]);

  const updateViewport = async (vp: Viewport) => {
    storeDispatch(mapThunks.updateViewport(vp));
  };

  const addMarker = (p: OnClickEvent) => {
    const { markers, lines } = selectedTrip.geometry;
    const marker = createMarkerObj(+p.lngLat[0].toFixed(3), +p.lngLat[1].toFixed(3));
    storeDispatch(tripsThunks.addMarker(selectedTrip.id, marker));
    const startMarker = lines.length === 0 ? markers[0] : lines[lines.length - 1].geometry.end;
    if (markers.length >= 1) storeDispatch(tripsThunks.addLine(selectedTrip.id, createLineObj(startMarker, marker)));
  };

  const selectMarker = async (id: string) => {
    const { markers } = selectedTrip.geometry;

    const marker = _.find(markers || [], (m) => m.id === id);
    if (marker) {
      if (!mapInfo.selected) {
        storeDispatch(sidenavThunks.open(marker));
        storeDispatch(mapThunks.selectMarker(marker));
      } else {
        storeDispatch(mapThunks.unselect());
        storeDispatch(sidenavThunks.clear());
      }
    }
  };

  const selectLine = async (obj: LineObj) => {
    if (obj) {
      if (!mapInfo.selected) {
        storeDispatch(sidenavThunks.open(obj));
        storeDispatch(mapThunks.selectLine(obj));
      } else {
        storeDispatch(mapThunks.unselect());
        storeDispatch(sidenavThunks.clear());
      }
    }
  };

  const hoverOnMarker = (id?: string) => {
    if (!id) {
      storeDispatch(mapThunks.unhover());
      return;
    }
    const { markers } = selectedTrip.geometry;
    const marker = _.find(markers || [], (m) => m.id === id);
    if (marker) storeDispatch(mapThunks.hoverMarker(marker));
  };

  const hoverOnLine = (obj: LineObj) => {
    if (obj === undefined) storeDispatch(mapThunks.unhover());
    else storeDispatch(mapThunks.hoverLine(obj));
  };

  return {
    state: {
      viewport: mapInfo.viewport,
      markers: selectedTrip?.geometry.markers || [],
      lines: selectedTrip?.geometry.lines || [],
      selected: mapInfo.selected,
      hovered: mapInfo.hovered,
      editMode: mapInfo.editMode,
    },
    methods: {
      updateViewport,
      addMarker,
      selectMarker,
      hoverOnMarker,
      selectLine,
      hoverOnLine,
    },
  };
};
