import React, { ChangeEvent, useMemo } from 'react';
import Label from '../../simple/Label/label';
import { css } from '@emotion/core';
import * as _ from 'lodash';
import Select from '../../simple/Select/select';
import { FieldErrors } from 'react-hook-form';

type Props = {
  key?: string;
  name: string;
  onChange?: (evt: ChangeEvent<HTMLSelectElement>) => void;
  errors?: FieldErrors<any>;
  first?: boolean;
  last?: boolean;
  options: Array<any>;
  selected?: any;
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

const LabelledSelect: React.ForwardRefExoticComponent<
  Props & React.RefAttributes<HTMLSelectElement>
> = React.forwardRef<HTMLSelectElement, Props>((props, ref) => {
  const { key, name, onChange, options, selected, errors } = props;
  return useMemo(
    () => (
      <div css={style(props)} key={`${key || 'labelled-select'}-${name}`}>
        <Label>{_.startCase(_.toLower(name))}</Label>
        <Select name={`${name}`} ref={ref} options={options} onChange={onChange} selected={selected}/>
        {errors && errors[name] && <p>{errors[name].message}</p>}
      </div>
    ),
    [props]
  );
});

export default LabelledSelect;
