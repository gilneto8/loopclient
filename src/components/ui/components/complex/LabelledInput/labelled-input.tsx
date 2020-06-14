import React, { FunctionComponent, useMemo } from 'react';
import Label from '../../simple/Label/label';
import Input from '../../simple/Input/input';
import { css } from '@emotion/core';
import { id } from '../../../../../utils/functions/create-local-id';
import * as _ from 'lodash';
import { FieldErrors } from 'react-hook-form';

type Props = {
  key?: string;
  name: string;
  refFn?: (ref: Element | null) => void;
  errors?: FieldErrors<any>;
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

const LabelledInput: FunctionComponent<Props> = (props) => {
  const { key, name, refFn, errors } = props;
  return useMemo(
    () => (
      <div css={style(props)} key={`${key || id(4)}-${name}`}>
        <Label>{_.startCase(_.toLower(name))}</Label>
        <Input name={name} refFn={refFn} errors={errors} />
      </div>
    ),
    [props]
  );
};

export default LabelledInput;
