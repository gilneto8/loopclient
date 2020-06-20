import React from 'react';
import { MarkerObj } from '@logic/features/trip/marker-types';
import Label from '@ui/components/simple/Label/label';
import * as _ from 'lodash';
import { css } from '@emotion/core';

type Props = {
  marker: MarkerObj;
};

const style = css({});

const MarkerInfo = (props: Props) => {
  return (
    <div css={style}>
      {Object.keys(props.marker.data).map((key, index) => (
        <div key={index}>
          <Label color={'black'}>{_.startCase(_.toLower(key))}</Label>
          <span>{_.get(props.marker.data, key)}</span>
        </div>
      ))}
    </div>
  );
};

export default MarkerInfo;
