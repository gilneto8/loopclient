import React, { FunctionComponent, useContext, useMemo } from 'react';
import { useStoreSelector } from '../../../../../../../logic/shared/store/use-store-selector';
import { loadMap } from '../../../../../../../logic/features/map/map-thunks';
import { MarkerObj } from '../../../../../../../logic/features/trip/marker-types';
import Badge from '../../../../../../ui/components/simple/Badge/badge';
import { Theme } from '../../../../../../ui/colors/color-types';
import { ThemeContext } from '../../../../../../ui/colors/theme-context';
import { loadTrips } from '../../../../../../../logic/features/trip/trip-thunks';

type Props = {};

const MarkerList: FunctionComponent<Props> = () => {
  const {
    storeDispatch,
    selected: mapInfo,
    thunkResult: { mapThunks },
  } = useStoreSelector(loadMap(), (storeState) => storeState.map);
  const {
    selected: tripsInfo,
    thunkResult: { tripsThunks },
  } = useStoreSelector(loadTrips(), (storeState) => storeState.trips);

  const theme: Theme = useContext(ThemeContext).theme;

  const selectedTrip = tripsInfo?.selected;

  return useMemo(() => {
    const switchSelect = (obj: MarkerObj) => {
      if (mapInfo && mapInfo.selected?.id === obj.id) storeDispatch(mapThunks.unselect());
      else storeDispatch(mapThunks.selectMarker(obj));
    };

    const switchHover = (obj: MarkerObj, hovering: boolean) => {
      if (hovering) storeDispatch(mapThunks.hoverMarker(obj));
      else storeDispatch(mapThunks.unhover());
    };

    return !mapInfo || !tripsInfo ? (
      <></>
    ) : (
      <div>
        {selectedTrip?.geometry.markers.map((m: MarkerObj) => (
          <Badge
            key={m.id}
            enableAutoMargin
            removable
            onRemove={() => storeDispatch(tripsThunks.removeMarker(tripsInfo?.selected.id, m.id))}
            onClick={() => switchSelect(m)}
            onHover={(h) => switchHover(m, h)}
            hovered={mapInfo.hovered?.id === m.id}
            active={mapInfo.selected?.id === m.id}
          >
            {m.data.name}
          </Badge>
        ))}
      </div>
    );
  }, [selectedTrip?.geometry.markers, mapInfo?.selected, mapInfo?.hovered, theme]);
};

export default MarkerList;
