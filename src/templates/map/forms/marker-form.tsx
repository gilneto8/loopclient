import React, { useEffect } from 'react';
import { ItemForm } from '../../../logic/features/map/map-types';
import Label from '../../../components/ui/components/simple/Label/label';
import { css } from '@emotion/core';
import * as _ from 'lodash';
import { useForm } from 'react-hook-form';
import { enumToArray } from '../../../utils/enums/enum-to-array';
import { MarkerObj, MarkerTypes } from '../../../logic/features/map/marker-types';
import { useStoreSelector } from '../../../logic/shared/store/use-store-selector';
import { loadMap } from '../../../logic/features/map/map-thunks';
import Button from "../../../components/ui/components/simple/Button/button"

type Props = {
  item: MarkerObj;
};

const style = css({
  paddingLeft: 15,
  '& > form > button': {
    marginTop: 20,
  },
});

const MarkerForm = (props: Props) => {
  const {
    storeDispatch,
    thunkResult: { mapThunks },
  } = useStoreSelector(loadMap(), () => {});
  const { reset, register, handleSubmit } = useForm<ItemForm<MarkerTypes>>({
    defaultValues: props.item.data,
  });

  useEffect(() => {
    reset(props.item.data);
  }, [props.item]);

  const onSubmit = (data: ItemForm<MarkerTypes>) => {
    const updatedItem = _.set(props.item, 'data', data);
    storeDispatch(mapThunks.updateMarker(updatedItem.id, updatedItem));
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
            {enumToArray(MarkerTypes).map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
        <Button type={'submit'}>Submit</Button>
      </form>
    </div>
  );
};

export default MarkerForm;
