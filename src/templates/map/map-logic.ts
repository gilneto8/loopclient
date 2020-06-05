import { useState } from 'react';
import * as _ from 'lodash';
import { v4 as uuidV4 } from 'uuid';
import { ItemProps, OnClickEventArg, ViewportProps } from '../../logic/shared/map/map-types';
import { useStoreSelector } from '../../logic/store/use-store-selector';
import { loadSidenav } from '../../logic/shared/global/sidenav/sidenav-thunks';
import { MarkerProps, MarkerTypes } from '../../logic/shared/map/marker-types';
import { LineProps } from '../../logic/shared/map/line-types';
import { loadMap } from '../../logic/shared/map/map-thunks';

export const useMapLogic = () => {
  const {
    storeDispatch,
    thunkResult: { sidenavThunks },
  } = useStoreSelector(loadSidenav(), () => {});
  const {
    selected: mapReducerInfo,
    thunkResult: { mapThunks },
  } = useStoreSelector(loadMap(), (storeState) => storeState.map);

  const [editMode, setEditMode] = useState<boolean>(true);
  const [lines, setLines] = useState<Array<LineProps>>(mapReducerInfo?.lines || []);
  const [selected, setSelected] = useState<ItemProps>(null);
  const [hovered, setHovered] = useState<ItemProps>(null);

  const __updateSidenavData = async (item: MarkerProps | LineProps) => {
    storeDispatch(sidenavThunks.open(item));
  };

  const __updateViewport = async (vp: ViewportProps) => {
    storeDispatch(mapThunks.updateViewport(vp));
  };

  const __addMarker = async (data: MarkerProps) => {
    storeDispatch(mapThunks.addMarker(data));
  };

  const switchMode = () => setEditMode(!editMode);

  const updateViewport = async (vp: ViewportProps) => {
    await __updateViewport(vp);
  };

  const addMarker = async (p: OnClickEventArg) => {
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
    await __addMarker(marker);
  };

  /*
  const addLine = async (p: OnClickEventArg) => {
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
  }*/

  const selectMarker = async (id: string) => {
    const marker = _.find(mapReducerInfo?.markers || [], (m) => m.id === id);
    if (!marker) return;
    setSelected(marker);
    await __updateSidenavData(marker);
  };

  const selectLine = async (obj: LineProps) => {
    setSelected(obj);
    if (obj) await __updateSidenavData(obj);
  };

  const hoverOnMarker = (id: string | null) => {
    if (!id) setHovered(null);
    else {
      const marker = _.find(mapReducerInfo?.markers || [], (m) => m.id === id);
      if (!marker) return;
      setHovered(marker);
    }
  };

  const hoverOnLine = (obj: LineProps) => {
    setHovered(obj);
  };

  return {
    state: {
      viewport: mapReducerInfo?.viewport,
      markers: mapReducerInfo?.markers || [],
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
