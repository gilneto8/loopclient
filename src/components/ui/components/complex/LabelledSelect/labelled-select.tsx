import React, { FunctionComponent, useMemo } from "react";
import Label from '../../simple/Label/label';
import { css } from '@emotion/core';
import { id } from '../../../../../utils/functions/create-local-id';
import * as _ from 'lodash';
import Select from '../../simple/Select/select';

type Props = {
  key?: string;
  name: string;
  refFn?: (ref: Element | null) => void;
  first?: boolean;
  last?: boolean;
  options: Array<any>;
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

const LabelledSelect: FunctionComponent<Props> = (props) => {
  const { key, name, refFn, options } = props;
  return useMemo(() => (
    <div css={style(props)} key={`${key || id(4)}-${name}`}>
      <Label>{_.startCase(_.toLower(name))}</Label>
      <Select name={`${name}`} refFn={refFn} options={options} />
    </div>
  ), [props]);
};

export default LabelledSelect;
