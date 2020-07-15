import React, { ChangeEvent, FunctionComponent, useEffect, useMemo, useState } from 'react';
import { ItemForm } from '@logic/features/trip/trip-types';
import { useForm } from 'react-hook-form';
import { set, get } from 'lodash';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useTheme  from '@ui/colors/theme-context';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { css } from '@emotion/core';

type Props = {
  item: MarkerObj;
};

const formStyle = css({
  position: 'relative',
  '& > svg': {
    position: 'absolute',
    top: '-15px',
    right: 0,
    minWidth: 'unset',
    width: '20px !important',
    padding: 0,
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

const MarkerForm: FunctionComponent<Props> = ({ item }) => {
  const [changed, setChanged] = useState<boolean>(false);

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

  const theme = useTheme().theme;

  useEffect(() => {
    reset(item.formData);
  }, [item]);

  return useMemo(() => {
    const unselect = () => {
      storeDispatch(mapThunks.unselect());
      storeDispatch(sidenavThunks.clear());
    };

    const onSubmit = (data: ItemForm<MarkerTypes>) => {
      if (selectedTrip) {
        const updatedItem = set(item, 'formData', data);
        storeDispatch(tripsThunks.updateMarker(selectedTrip, updatedItem.id.value, updatedItem));
        storeDispatch(sidenavThunks.update(updatedItem));
      }
    };

    const remove = () => {
      if (selectedTrip) {
        storeDispatch(tripsThunks.removeMarker(selectedTrip, item.id.value));
        unselect();
      }
    };
    return (
      <div css={formStyle}>
        <FontAwesomeIcon color={theme.defaults.white} size={'1x'} icon={faTimes} onClick={unselect} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          onChange={(e: ChangeEvent<HTMLFormElement>) =>
            setChanged(changed || e.target.value !== get(item.formData, e.target.name))
          }
        >
          <LabelledInput first name={'name'} ref={register} errors={errors} />
          <LabelledInput name={'description'} ref={register} errors={errors} />
          <LabelledSelect
            last
            name={'type'}
            ref={register}
            options={enumToArray(MarkerTypes)}
            selected={item.formData.type}
          />
          <Button disabled={!changed} type={'submit'}>
            {'Submit'}
          </Button>
          <Button type={'button'} onClick={remove}>
            {'Remove Marker'}
          </Button>
        </form>
      </div>
    );
  }, [item, reset, changed, register, handleSubmit, errors, theme]);
};

export default MarkerForm;
