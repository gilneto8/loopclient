import { useEffect, useState } from 'react';
import * as _ from 'lodash';
import { OnClickEvent, Viewport } from '@logic/features/map/map-types';
import { useStoreSelector } from '@logic/shared/store/use-store-selector';
import { loadSidenav } from '@logic/features/sidenav/sidenav-thunks';
import { LineObj } from '@logic/features/trip/line-types';
import { loadMap } from '@logic/features/map/map-thunks';
import { loadTrips } from '@logic/features/trip/trip-thunks';
import { TripObj } from '@logic/features/trip/trip-types';
import { createMarker } from "@utils/marker-utils/create-marker";
import { createLine } from "@utils/line-utils/create-line";

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

  // TODO update for previous/next logic
  const addMarker = (p: OnClickEvent) => {
    const { markers, lines } = selectedTrip.geometry;
    const marker = createMarker(+p.lngLat[0].toFixed(8), +p.lngLat[1].toFixed(8), markers.length);
    storeDispatch(tripsThunks.addMarker(selectedTrip.id, marker));
    const startMarker = lines.length === 0 ? markers[0] : lines[lines.length - 1].geometry.end;
    if (markers.length >= 1) storeDispatch(tripsThunks.addLine(selectedTrip.id, createLine(startMarker, marker)));
  };

  const selectMarker = async (id: string) => {
    const { markers } = selectedTrip.geometry;

    console.log(id);
    const marker = _.find(markers || [], (m) => m.id.value === id);
    if (marker) {
      if (!mapInfo.selected) {
        storeDispatch(sidenavThunks.open(marker));
        storeDispatch(mapThunks.selectMarker(id));
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
        storeDispatch(mapThunks.selectLine(obj.id));
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
    const marker = _.find(markers || [], (m) => m.id.value === id);
    if (marker) storeDispatch(mapThunks.hoverMarker(id));
  };

  const hoverOnLine = (obj: LineObj) => {
    if (obj === undefined) storeDispatch(mapThunks.unhover());
    else storeDispatch(mapThunks.hoverLine(obj.id));
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
