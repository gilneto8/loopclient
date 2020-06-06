import React from 'react';
import Label from '../../simple/Label/label';
import Input from '../../simple/Input/input';
import { css } from '@emotion/core';
import { id } from '../../../../../utils/functions/create-local-id';
import * as _ from 'lodash';

type Props = {
  key?: string;
  name: string;
  refFn?: (ref: Element | null) => void;
  first?: boolean;
  last?: boolean;
};

const style = (props: Props) =>
  css({
    ...(() => {
      if (props.first) return { marginTop: 30 };
      return {};
    })(),
    ...(() => {
      if (props.last) return { marginBottom: 30 };
      return { marginBottom: 10 };
    })(),
  });

const LabelledInput = (props: Props) => {
  const { key, name, refFn } = props;
  return (
    <div css={style(props)} key={`${key || id(4)}-${name}`}>
      <Label paddings={[20, 0, 0, 0]}>{_.startCase(_.toLower(name))}</Label>
      <Input name={`${name}`} refFn={refFn} />
    </div>
  );
};

export default LabelledInput;
