import React, { useMemo } from 'react';
import { MapItemObj } from '../../../../../../logic/features/map/map-types';
import MarkerForm from '../../../../../../templates/map/forms/marker-form';
import { isMarker } from '../../../../../../utils/functions/is-marker';
import { MarkerObj } from '../../../../../../logic/features/map/marker-types';
import { LineObj } from '../../../../../../logic/features/map/line-types';
import LineForm from '../../../../../../templates/map/forms/line-form';
import { css } from '@emotion/core';
import MarkerList from './components/marker-list';

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

const style = css({
  paddingLeft: 15,
  paddingRight: 15,
});

const SidenavBody = (props: Props) => {
  const memoizedType = useMemo<FormTypes>(() => filterItem(props), [props.item]);
  return (
    <div css={style}>
      {(() => {
        switch (memoizedType) {
          case FormTypes.none:
            return <MarkerList />;
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
