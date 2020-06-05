import React from 'react';
import { MarkerProps } from '../../../logic/shared/map/map-types';
import Label from '../../../components/ui/components/Label/label';
import * as _ from 'lodash';
import { css } from '@emotion/core';

type Props = {
  marker: MarkerProps;
};

const style = css({});

const MarkerInfo = (props: Props) => {
  return (
    <div css={style}>
      {Object.keys(props.marker.data).map((key, index) => (
        <div key={index}>
          <Label color={'black'} paddings={[20, 30, 0, 0]}>
            {_.startCase(_.toLower(key))}
          </Label>
          <span>{_.get(props.marker.data, key)}</span>
        </div>
      ))}
    </div>
  );
};

export default MarkerInfo;
