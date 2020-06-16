import React, { useMemo } from 'react';
import { MapItemObj } from '@logic/features/map/map-types';
import MarkerForm from './forms/marker-form';
import { isMarker } from '@utils/functions/is-marker';
import { MarkerObj } from '@logic/features/trip/marker-types';
import { LineObj } from '@logic/features/trip/line-types';
import LineForm from './forms/line-form';
import { css } from '@emotion/core';
import * as _ from 'lodash';
import MarkerList from './components/marker-list';

type Props = {
  item: MapItemObj | undefined;
};

const style = css({
  marginTop: '1rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  flex: '1 1 auto',
  overflowX: 'hidden',
  overflowY: 'auto',
  '& > hr': {
    marginTop: '1.5rem',
  },
});

function getForm({ item }: Props): Array<() => JSX.Element> {
  let components: Array<() => JSX.Element> = [() => <MarkerList />];
  if (item) {
    if (isMarker(item)) components = _.concat(components, () => <MarkerForm item={item as MarkerObj} />);
    else components = _.concat(components, () => <LineForm item={item as LineObj} />);
  }
  return components;
}

const SidenavBody = (props: Props) => {
  const memoizedComponents = useMemo<Array<() => JSX.Element>>(() => getForm(props), [props.item]);
  return (
    <div css={style}>
      {memoizedComponents.map((Component, index, array) => (
        <React.Fragment key={index}>
          <Component />
          {index !== array.length - 1 && <hr />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SidenavBody;
