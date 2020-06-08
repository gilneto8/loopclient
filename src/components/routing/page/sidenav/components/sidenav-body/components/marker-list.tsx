import React from 'react';
import { useStoreSelector } from '../../../../../../../logic/shared/store/use-store-selector';
import { loadMap } from '../../../../../../../logic/features/map/map-thunks';
import { MarkerObj } from '../../../../../../../logic/features/map/marker-types';
import Label from '../../../../../../ui/components/simple/Label/label';

type Props = {};

const MarkerList = React.memo((props: Props) => {
  const {
    storeDispatch,
    selected: markers,
    thunkResult: { mapThunks },
  } = useStoreSelector(loadMap(), (storeState) => storeState.map?.markers);
  return (
    <div>
      {markers?.map((m: MarkerObj) => (
        <Label as="span" key={m.id} onClick={() => storeDispatch(mapThunks.selectMarker(m.id))}>
          {m.data.name}
        </Label>
      ))}
    </div>
  );
});

export default MarkerList;
