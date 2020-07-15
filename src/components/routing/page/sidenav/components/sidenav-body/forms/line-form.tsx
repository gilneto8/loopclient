import React, { ChangeEvent, FunctionComponent, useEffect, useMemo, useState } from 'react';
import { ItemForm } from '@logic/features/trip/trip-types';
import { set, get } from 'lodash';
import { useForm } from 'react-hook-form';
import { enumToArray } from '@utils/enums/enum-to-array';
import { LineObj, LineTypes } from '@logic/features/trip/line-types';
import { useStoreSelector } from '@logic/shared/store/use-store-selector';
import { loadMap } from '@logic/features/map/map-thunks';
import Button from '@ui/components/simple/Button/button';
import LabelledInput from '@ui/components/complex/LabelledInput/labelled-input';
import LabelledSelect from '@ui/components/complex/LabelledSelect/labelled-select';
import { loadSidenav } from '@logic/features/sidenav/sidenav-thunks';
import { StoreState } from '@logic/shared/store/store-types';
import { loadTrips } from '@logic/features/trip/trip-thunks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import useTheme from '@ui/colors/theme-context';
import { css } from '@emotion/core';

type Props = {
  item: LineObj;
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

const LineForm: FunctionComponent<Props> = ({ item }) => {
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

  const { reset, register, handleSubmit, errors } = useForm<ItemForm<LineTypes>>({
    defaultValues: item.data.form,
    validationSchema: item.data.schema,
    validateCriteriaMode: 'all',
  });

  const { theme } = useTheme();

  useEffect(() => {
    reset(item.data.form);
  }, [item]);

  return useMemo(() => {
    const unselect = () => {
      storeDispatch(mapThunks.unselect());
      storeDispatch(sidenavThunks.clear());
    };

    const onSubmit = (data: ItemForm<LineTypes>) => {
      if (selectedTrip) {
        const updatedItem = set(item, 'data.form', data);
        storeDispatch(tripsThunks.updateLine(selectedTrip, updatedItem.id.value, updatedItem));
        storeDispatch(sidenavThunks.update(updatedItem));
      }
    };

    const remove = () => {
      if (selectedTrip) {
        storeDispatch(tripsThunks.removeLine(selectedTrip, item.id.value));
        unselect();
      }
    };
    return (
      <div css={formStyle}>
        <FontAwesomeIcon color={theme.defaults.white} size={'1x'} icon={faTimes} onClick={unselect} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          onChange={(e: ChangeEvent<HTMLFormElement>) =>
            setChanged(changed || e.target.value !== get(item.data.form, e.target.name))
          }
        >
          <LabelledInput first name={'name'} ref={register} errors={errors} />
          <LabelledInput name={'description'} ref={register} errors={errors} />
          <LabelledSelect last name={'type'} ref={register} options={enumToArray(LineTypes)} errors={errors} />
          <Button disabled={!changed} type={'submit'}>
            {'Submit'}
          </Button>
          <Button type={'button'} onClick={remove}>
            {'Remove Line'}
          </Button>
        </form>
      </div>
    );
  }, [item, reset, changed, register, handleSubmit, errors]);
};

export default LineForm;
