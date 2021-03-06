import React from 'react';
import { LineObj } from '@logic/features/trip/line-types';
import Label from '@ui/components/simple/Label/label';
import * as _ from 'lodash';
import { css } from '@emotion/core';

type Props = {
  line: LineObj;
};

const style = css({});

const LineInfo = (props: Props) => {
  return (
    <div css={style}>
      {Object.keys(props.line.form.data).map((key, index) => (
        <div key={index}>
          <Label color={'black'}>{_.startCase(_.toLower(key))}</Label>
          <span>{_.get(props.line.form.data, key)}</span>
        </div>
      ))}
    </div>
  );
};

export default LineInfo;
