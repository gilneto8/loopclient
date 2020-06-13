import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { ItemForm } from '../../../../../../../logic/features/trip/trip-types';
import * as _ from 'lodash';
import { useForm } from 'react-hook-form';
import { enumToArray } from '../../../../../../../utils/enums/enum-to-array';
import { MarkerObj, MarkerTypes } from '../../../../../../../logic/features/trip/marker-types';
import { useStoreSelector } from '../../../../../../../logic/shared/store/use-store-selector';
import { loadMap } from '../../../../../../../logic/features/map/map-thunks';
import Button from '../../../../../../ui/components/simple/Button/button';
import LabelledInput from '../../../../../../ui/components/complex/LabelledInput/labelled-input';
import LabelledSelect from '../../../../../../ui/components/complex/LabelledSelect/labelled-select';
import { loadSidenav } from '../../../../../../../logic/features/sidenav/sidenav-thunks';
import { StoreState } from '../../../../../../../logic/shared/store/store-types';
import { loadTrips } from '../../../../../../../logic/features/trip/trip-thunks';

type Props = {
  item: MarkerObj;
};

const MarkerForm: FunctionComponent<Props> = ({ item }) => {
  const {
    selected: selectedPoint,
    storeDispatch,
    thunkResult: { mapThunks },
  } = useStoreSelector(loadMap(), (state: StoreState) => state.map?.selected);
  const {
    thunkResult: { sidenavThunks },
  } = useStoreSelector(loadSidenav(), () => {});
  const {
    selected: selectedTrip,
    thunkResult: { tripsThunks },
  } = useStoreSelector(loadTrips(), (state: StoreState) => state.trips?.selected);
  const { reset, register, handleSubmit } = useForm<ItemForm<MarkerTypes>>({
    defaultValues: (selectedPoint as MarkerObj)?.data || item.data,
  });

  useEffect(() => {
    reset(item.data);
  }, [item, selectedPoint?.data]);

  return useMemo(() => {
    const onSubmit = (data: ItemForm<MarkerTypes>) => {
      if (selectedTrip) {
        const updatedItem = _.set(item, 'data', data);
        storeDispatch(tripsThunks.updateMarker(selectedTrip, updatedItem.id, updatedItem));
        storeDispatch(sidenavThunks.update(updatedItem));
      }
    };

    const remove = () => {
      if (selectedTrip) {
        storeDispatch(tripsThunks.removeMarker(selectedTrip, item.id));
        storeDispatch(mapThunks.unselect());
        storeDispatch(sidenavThunks.clear());
      }
    };
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelledInput first name={'name'} refFn={register} />
          <LabelledInput name={'description'} refFn={register} />
          <LabelledSelect last name={'type'} refFn={register} options={enumToArray(MarkerTypes)} />
          <Button type={'submit'}>{'Submit'}</Button>
          <Button type={'button'} onClick={remove}>
            {'Remove Marker'}
          </Button>
        </form>
      </div>
    );
  }, [item, selectedPoint, reset, register, handleSubmit]);
};

export default MarkerForm;
