import React, { useMemo } from 'react';
import { MapItemObj } from '../../../../../../logic/shared/map/map-types';
import MarkerForm from './components/marker-form';
import { isMarker } from '../../../../../../utils/functions/is-marker';
import { MarkerObj } from '../../../../../../logic/shared/map/marker-types';
import { LineObj } from '../../../../../../logic/shared/map/line-types';
import LineForm from './components/line-form';

type Props = {
  item: MapItemObj | undefined;
};

enum FormTypes {
  none,
  marker,
  line,
}

function filterItem({ item }: Props): FormTypes {
  if (!item) return FormTypes.none;
  else {
    if (isMarker(item)) return FormTypes.marker;
    else return FormTypes.line;
  }
}

const SidenavBody = (props: Props) => {
  const memoizedType = useMemo<FormTypes>(() => filterItem(props), [props.item]);
  return (
    <div>
      {(() => {
        switch (memoizedType) {
          case FormTypes.none:
            return <></>;
          case FormTypes.marker:
            return <MarkerForm item={props.item as MarkerObj} />;
          case FormTypes.line:
          default:
            return <LineForm item={props.item as LineObj} />;
        }
      })()}
    </div>
  );
};

export default SidenavBody;
