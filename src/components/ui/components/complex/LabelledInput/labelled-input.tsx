import React, { useMemo } from 'react';
import Label from '../../simple/Label/label';
import Input from '../../simple/Input/input';
import { css } from '@emotion/core';
import * as _ from 'lodash';
import { FieldErrors } from 'react-hook-form';

type Props = {
  key?: string;
  name: string;
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

const LabelledInput: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLInputElement>> = React.forwardRef<
  HTMLInputElement,
  Props
>((props, ref) => {
  const { key, name, errors } = props;
  return useMemo(
    () => (
      <div css={style(props)} key={`${key || 'labelled-input'}-${name}`}>
        <Label>{_.startCase(_.toLower(name))}</Label>
        <Input name={name} ref={ref} errors={errors} />
      </div>
    ),
    [props, ref]
  );
});

export default LabelledInput;
