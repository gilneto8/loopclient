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

  const removeMarker = (id: string) => {
    storeDispatch(mapThunks.removeMarker(id));
  };

  return (
    <div>
      {info?.markers.map((m: MarkerObj) => (
        <Badge
          active={info?.selected?.id === m.id}
          key={m.id}
          onClick={() => switchSelect(m.id)}
          enableAutoMargin
          removable
          onRemove={() => removeMarker(m.id)}
        >
          {m.data.name}
        </Badge>
      ))}
    </div>
  );
});

export default MarkerList;
