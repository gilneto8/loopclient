import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { ItemForm } from '@logic/features/trip/trip-types';
import * as _ from 'lodash';
import { useForm } from 'react-hook-form';
import { enumToArray } from '@utils/enums/enum-to-array';
import { MarkerObj, MarkerTypes } from '@logic/features/trip/marker-types';
import { useStoreSelector } from '@logic/shared/store/use-store-selector';
import { loadMap } from '@logic/features/map/map-thunks';
import Button from '@ui/components/simple/Button/button';
import LabelledInput from '@ui/components/complex/LabelledInput/labelled-input';
import LabelledSelect from '@ui/components/complex/LabelledSelect/labelled-select';
import { loadSidenav } from '@logic/features/sidenav/sidenav-thunks';
import { StoreState } from '@logic/shared/store/store-types';
import { loadTrips } from '@logic/features/trip/trip-thunks';

type Props = {
  item: MarkerObj;
};

const MarkerForm: FunctionComponent<Props> = ({ item }) => {
  const {
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

  const { reset, register, handleSubmit, errors } = useForm<ItemForm<MarkerTypes>>({
    defaultValues: item.formData,
    validationSchema: item.schema,
    validateCriteriaMode: 'all',
  });

  useEffect(() => {
    reset(item.formData);
  }, [item]);

  return useMemo(() => {
    const onSubmit = (data: ItemForm<MarkerTypes>) => {
      if (selectedTrip) {
        const updatedItem = _.set(item, 'formData', data);
        storeDispatch(tripsThunks.updateMarker(selectedTrip, updatedItem.id.value, updatedItem));
        storeDispatch(sidenavThunks.update(updatedItem));
      }
    };

    const remove = () => {
      if (selectedTrip) {
        storeDispatch(tripsThunks.removeMarker(selectedTrip, item.id.value));
        storeDispatch(mapThunks.unselect());
        storeDispatch(sidenavThunks.clear());
      }
    };
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelledInput first name={'name'} ref={register} errors={errors} />
          <LabelledInput name={'description'} ref={register} errors={errors} />
          <LabelledSelect last name={'type'} ref={register} options={enumToArray(MarkerTypes)} />
          <Button type={'submit'}>{'Submit'}</Button>
          <Button type={'button'} onClick={remove}>
            {'Remove Marker'}
          </Button>
        </form>
      </div>
    );
  }, [item, reset, register, handleSubmit, errors]);
};

export default MarkerForm;
