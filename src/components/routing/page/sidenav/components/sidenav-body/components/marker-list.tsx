import React, { FunctionComponent, useContext, useMemo } from 'react';
import { useStoreSelector } from '../../../../../../../logic/shared/store/use-store-selector';
import { loadMap } from '../../../../../../../logic/features/map/map-thunks';
import { MarkerObj } from '../../../../../../../logic/features/trip/marker-types';
import Badge from '../../../../../../ui/components/simple/Badge/badge';
import { Theme } from '../../../../../../ui/colors/color-types';
import { ThemeContext } from '../../../../../../ui/colors/theme-context';

type Props = {};

const MarkerList: FunctionComponent<Props> = () => {
  const {
    storeDispatch,
    selected: info,
    thunkResult: { mapThunks },
  } = useStoreSelector(loadMap(), (storeState) => storeState.map);

  const theme: Theme = useContext(ThemeContext).theme;

  return useMemo(() => {
    const switchSelect = (id: string) => {
      if (info && info.selected?.id === id) storeDispatch(mapThunks.unselect());
      else storeDispatch(mapThunks.selectMarker(id));
    };

    const switchHover = (id: string, hovering: boolean) => {
      if (hovering) storeDispatch(mapThunks.hoverMarker(id));
      else storeDispatch(mapThunks.unhover());
    };

    return !info ? (
      <></>
    ) : (
      <div>
        {info.markers.map((m: MarkerObj) => (
          <Badge
            key={m.id}
            enableAutoMargin
            removable
            onRemove={() => storeDispatch(mapThunks.removeMarker(m.id))}
            onClick={() => switchSelect(m.id)}
            onHover={(h) => switchHover(m.id, h)}
            hovered={info.hovered?.id === m.id}
            active={info.selected?.id === m.id}
          >
            {m.data.name}
          </Badge>
        ))}
      </div>
    );
  }, [info?.markers, info?.selected, info?.hovered, theme]);
};

export default MarkerList;
