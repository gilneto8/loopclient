import React, { useEffect, useState } from 'react';
import { ItemForm as ItemFormType } from '../../../../../../../logic/shared/map/map-types';
import Label from '../../../../../../ui/components/Label/label';
import { css } from '@emotion/core';
import * as _ from 'lodash';
import { useForm } from 'react-hook-form';
import { enumToArray } from '../../../../../../../utils/enums/enum-to-array';
import { isMarker } from '../../../../../../../utils/functions/is-marker';
import { MarkerProps, MarkerTypes } from '../../../../../../../logic/shared/map/marker-types';
import { LineProps, LineTypes } from '../../../../../../../logic/shared/map/line-types';
import { useStoreSelector } from '../../../../../../../logic/store/use-store-selector';
import { loadMap } from '../../../../../../../logic/shared/map/map-thunks';

type Props = {
  item: LineProps | MarkerProps;
};

const style = css({
  paddingLeft: 15,
  '& > form > input': {
    marginTop: 20,
  },
});

const ItemForm = (props: Props) => {
  const [_isMarker, _setIsMarker] = useState<boolean>(false);
  const {
    storeDispatch,
    thunkResult: { mapThunks },
  } = useStoreSelector(loadMap(), () => {});
  const { reset, register, handleSubmit } = useForm<ItemFormType<MarkerTypes | LineTypes>>({
    defaultValues: props.item.data,
  });

  useEffect(() => {
    _setIsMarker(isMarker(props.item));
  }, []);

  useEffect(() => {
    reset(props.item.data);
  }, [props.item]);

  const onSubmit = (data: ItemFormType<MarkerTypes | LineTypes>) => {
    const updatedItem = _.set(props.item, 'data', data);
    storeDispatch(
      _isMarker
        ? mapThunks.updateMarker(updatedItem.id, updatedItem as MarkerProps)
        : mapThunks.updateLine(updatedItem.id, updatedItem as LineProps)
    );
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
            {enumToArray(_isMarker ? MarkerTypes : LineTypes).map((val) => (
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
