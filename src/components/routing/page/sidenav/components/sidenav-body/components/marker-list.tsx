import React, { useMemo } from 'react';
import { css } from '@emotion/core';
import { useStoreSelector } from '../../../../../../../logic/shared/store/use-store-selector';
import { loadMap } from '../../../../../../../logic/features/map/map-thunks';
import { MarkerObj } from '../../../../../../../logic/features/map/marker-types';
import Label from '../../../../../../ui/components/simple/Label/label';

type Props = {};

const MarkerList = React.memo((props: Props) => {
  const {
    selected: markers,
    thunkResult: { mapThunks },
  } = useStoreSelector(loadMap(), (storeState) => storeState.map?.markers);
  return (
    <div>
      {markers?.map((m: MarkerObj) => (
        <Label key={m.id}>{m.data.name}</Label>
      ))}
    </div>
  );
});

export default MarkerList;
