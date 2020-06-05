import React from 'react';
import { LineProps, MarkerProps } from '../../../../../../../logic/shared/map/map-types';
import Label from '../../../../../../ui/components/Label/label';
import * as _ from 'lodash';
import { css } from '@emotion/core';

type Props = {
  item: LineProps | MarkerProps;
};

const style = css({
  paddingLeft: 15,
  '& > span': {
    color: 'lightgrey',
  },
});

const ItemForm = (props: Props) => {
  return (
    <div css={style}>
      {props.item &&
        Object.keys(props.item.data).map((key, index) => (
          <div css={style} key={index}>
            <Label paddings={[20, 0, 0, 0]}>{_.startCase(_.toLower(key))}</Label>
            <span>{_.get(props.item.data, key)}</span>
          </div>
        ))}
    </div>
  );
};

export default ItemForm;

/*
  const { register, handleSubmit, errors } = useForm<LineForm | MarkerForm>({
    defaultValues: props.item?.data || undefined,
  });
  const onSubmit = (data: LineForm | MarkerForm) => {
    console.log(data);
  };
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name={'name'} ref={register({ required: true })}>
            {errors.name && <span>{'Please specify a name.'}</span>}
          </input>
          <select name={'type'} ref={register({ required: true })}>
            <option value={LineTypes.PLANE}>{'By plane'}</option>
            <option value={LineTypes.PEDESTRIAN}>{'By foot'}</option>
            <option value={LineTypes.BOAT}>{'By boat'}</option>
            <option value={LineTypes.TRAIN}>{'By train'}</option>
          </select>
          <input name={'description'} ref={register} />
          <input type={'submit'} />
        </form>*/
