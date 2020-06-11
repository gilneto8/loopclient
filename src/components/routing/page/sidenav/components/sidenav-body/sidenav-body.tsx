import React, { useMemo } from 'react';
import { MapItemObj } from '../../../../../../logic/features/map/map-types';
import MarkerForm from '../../../../../../templates/map/forms/marker-form';
import { isMarker } from '../../../../../../utils/functions/is-marker';
import { MarkerObj } from '../../../../../../logic/features/trip/marker-types';
import { LineObj } from '../../../../../../logic/features/trip/line-types';
import LineForm from '../../../../../../templates/map/forms/line-form';
import { css } from '@emotion/core';
import MarkerList from './components/marker-list';

type Props = {
  item: MapItemObj | undefined;
};

function getForm({ item }: Props): () => JSX.Element {
  if (!item) return () => <MarkerList />;
  else if (isMarker(item)) return () => <MarkerForm item={item as MarkerObj} />;
  else return () => <LineForm item={item as LineObj} />;
}

const style = css({
  paddingLeft: 15,
  paddingRight: 15,
});

const SidenavBody = (props: Props) => {
  const MemoizedComponent = useMemo<() => JSX.Element>(() => getForm(props), [props.item]);
  return (
    <div css={style}>
      <MemoizedComponent />
    </div>
  );
};

export default SidenavBody;
