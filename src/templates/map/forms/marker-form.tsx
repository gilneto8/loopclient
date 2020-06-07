import React, { useEffect } from 'react';
import { ItemForm } from '../../../logic/features/map/map-types';
import * as _ from 'lodash';
import { useForm } from 'react-hook-form';
import { enumToArray } from '../../../utils/enums/enum-to-array';
import { MarkerObj, MarkerTypes } from '../../../logic/features/map/marker-types';
import { useStoreSelector } from '../../../logic/shared/store/use-store-selector';
import { loadMap } from '../../../logic/features/map/map-thunks';
import Button from '../../../components/ui/components/simple/Button/button';
import LabelledInput from '../../../components/ui/components/complex/LabelledInput/labelled-input';
import LabelledSelect from '../../../components/ui/components/complex/LabelledSelect/labelled-select';

type Props = {
  item: MarkerObj;
};

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelledInput first name={'name'} refFn={register} />
        <LabelledInput name={'description'} refFn={register} />
        <LabelledSelect last name={'type'} refFn={register} options={enumToArray(MarkerTypes)} />
        <Button type={'submit'}>{'Submit'}</Button>
      </form>
    </div>
  );
};

export default MarkerForm;
