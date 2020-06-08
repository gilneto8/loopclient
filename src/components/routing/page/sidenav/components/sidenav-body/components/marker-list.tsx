import React from 'react';
import { useStoreSelector } from '../../../../../../../logic/shared/store/use-store-selector';
import { loadMap } from '../../../../../../../logic/features/map/map-thunks';
import { MarkerObj } from '../../../../../../../logic/features/map/marker-types';
import Badge from '../../../../../../ui/components/simple/Badge/badge';

type Props = {};

const MarkerList = React.memo((props: Props) => {
  const {
    storeDispatch,
    selected: info,
    thunkResult: { mapThunks },
  } = useStoreSelector(loadMap(), (storeState) => storeState.map);

  const switchSelect = (id: string) => {
    if (info && info.selected?.id === id) storeDispatch(mapThunks.unselect());
    else storeDispatch(mapThunks.selectMarker(id));
  };

  const switchHover = (id: string, hovering: boolean) => {
    if (hovering) storeDispatch(mapThunks.hoverMarker(id));
    else storeDispatch(mapThunks.unhover());
  };

  return (
    <div>
      {info?.markers.map((m: MarkerObj) => (
        <Badge
          key={m.id}
          enableAutoMargin
          removable
          onRemove={() => storeDispatch(mapThunks.removeMarker(m.id))}
          onClick={() => switchSelect(m.id)}
          onHover={(h) => switchHover(m.id, h)}
          hovered={info?.hovered?.id === m.id}
          active={info?.selected?.id === m.id}
        >
          {m.data.name}
        </Badge>
      ))}
    </div>
  );
});

export default MarkerList;
