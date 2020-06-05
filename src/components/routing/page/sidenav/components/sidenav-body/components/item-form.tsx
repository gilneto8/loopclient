import React, { useEffect } from 'react';
import {
  LineProps,
  LineTypes,
  MarkerProps,
  MarkerTypes,
  ItemForm as ItemFormType,
} from '../../../../../../../logic/shared/map/map-types';
import Label from '../../../../../../ui/components/Label/label';
import * as _ from 'lodash';
import { css } from '@emotion/core';
import { useForm } from 'react-hook-form';
import { enumToArray } from '../../../../../../../utils/enums/enum-to-array';
import { isMarker } from '../../../../../../../utils/functions/is-marker';

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
  const { reset, register, handleSubmit } = useForm<ItemFormType<MarkerTypes | LineTypes>>({
    defaultValues: props.item.data,
  });

  useEffect(() => {
    reset(props.item.data);
  }, [props.item]);

  const onSubmit = (data: ItemFormType<MarkerTypes | LineTypes>) => {
    console.log(data);
  };

  return (
    <div css={style}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div css={style} key={'name'}>
          <Label paddings={[20, 0, 0, 0]}>{'Name'}</Label>
          <input name={'name'} ref={register} />
        </div>
        <div css={style} key={'description'}>
          <Label paddings={[20, 0, 0, 0]}>{'Description'}</Label>
          <input name={'description'} ref={register} />
        </div>
        <div css={style} key={'type'}>
          <Label paddings={[20, 0, 0, 0]}>{'Type'}</Label>
          <select name={'type'} ref={register}>
            {enumToArray(isMarker(props.item) ? MarkerTypes : LineTypes).map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
        <input type={'submit'} />
      </form>
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
