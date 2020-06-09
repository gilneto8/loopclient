import React, { FunctionComponent, useEffect, useMemo } from 'react';
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
import { loadSidenav } from '../../../logic/features/sidenav/sidenav-thunks';
import { StoreState } from '../../../logic/shared/store/store-types';

type Props = {
  item: MarkerObj;
};

const MarkerForm: FunctionComponent<Props> = ({ item }) => {
  const {
    selected,
    storeDispatch,
    thunkResult: { mapThunks },
  } = useStoreSelector(loadMap(), (state: StoreState) => state.map?.selected);
  const {
    thunkResult: { sidenavThunks },
  } = useStoreSelector(loadSidenav(), (storeState: StoreState) => storeState.sidenav?.data);
  const { reset, register, handleSubmit } = useForm<ItemForm<MarkerTypes>>({
    defaultValues: (selected as MarkerObj)?.data || item.data,
  });

  useEffect(() => {
    reset(item.data);
  }, [item, selected?.data]);

  return useMemo(() => {
    const onSubmit = (data: ItemForm<MarkerTypes>) => {
      const updatedItem = _.set(item, 'data', data);
      storeDispatch(mapThunks.updateMarker(updatedItem.id, updatedItem));
      storeDispatch(sidenavThunks.update(updatedItem));
    };

    const remove = () => {
      storeDispatch(mapThunks.removeMarker(item.id));
      storeDispatch(mapThunks.unselect());
      storeDispatch(sidenavThunks.clear());
    };
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelledInput first name={'name'} refFn={register} />
          <LabelledInput name={'description'} refFn={register} />
          <LabelledSelect last name={'type'} refFn={register} options={enumToArray(MarkerTypes)} />
          <Button type={'submit'}>{'Submit'}</Button>
          <Button onClick={remove}>{'Remove Marker'}</Button>
        </form>
      </div>
    );
  }, [item, selected, reset, register, handleSubmit]);
};

export default MarkerForm;
