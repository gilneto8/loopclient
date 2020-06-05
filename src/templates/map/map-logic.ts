import { useState } from 'react';
import * as _ from 'lodash';
import { v4 as uuidV4 } from 'uuid';
import { ItemProps, OnClickEventArg, ViewportProps } from '../../logic/shared/map/map-types';
import { useStoreSelector } from '../../logic/store/use-store-selector';
import { loadSidenav } from '../../logic/shared/global/sidenav/sidenav-thunks';
import { MarkerProps, MarkerTypes } from '../../logic/shared/map/marker-types';
import { LineProps, LineTypes } from '../../logic/shared/map/line-types';
import { loadMap } from '../../logic/shared/map/map-thunks';

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
  const [lines, setLines] = useState<Array<LineProps>>(map?.lines || []);
  const [hovered, setHovered] = useState<ItemProps>(null);

  const switchMode = () => setEditMode(!editMode);

  const updateViewport = async (vp: ViewportProps) => {
    storeDispatch(mapThunks.updateViewport(vp));
  };

  const addMarker = (p: OnClickEventArg) => {
    if (!map) throw new Error('No access to state management system.');

    const { markers, lines } = map;
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
    storeDispatch(mapThunks.addMarker(marker));
    const startMarker = lines.length === 0 ? markers[0] : lines[lines.length - 1].geometry.end;
    if (markers.length >= 1)
      storeDispatch(
        mapThunks.addLine({
          id: uuidV4(),
          geometry: {
            start: startMarker,
            end: marker,
          },
          data: {
            name: `New line (${startMarker?.data.name}, ${marker.data.name})`,
            type: LineTypes.PEDESTRIAN,
            description: 'Placeholder...',
          },
        })
      );
  };

  const selectMarker = async (id: string) => {
    const marker = _.find(map?.markers || [], (m) => m.id === id);
    if (!marker) return;
    storeDispatch(sidenavThunks.open(marker));
  };

  const selectLine = async (obj: LineProps) => {
    if (obj) storeDispatch(sidenavThunks.open(obj));
  };

  const hoverOnMarker = (id: string | null) => {
    if (!id) setHovered(null);
    else {
      const marker = _.find(map?.markers || [], (m) => m.id === id);
      if (!marker) return;
      setHovered(marker);
    }
  };

  const hoverOnLine = (obj: LineProps) => {
    setHovered(obj);
  };

  return {
    state: {
      viewport: map?.viewport,
      markers: map?.markers || [],
      hovered,
      editMode,
      lines: map?.lines || [],
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
