import React, { FunctionComponent, useContext, useMemo } from 'react';
import { css } from '@emotion/core';
import { ThemeContext } from '@ui/colors/theme-context';
import { Theme } from '@ui/colors/color-types';
import { useStoreSelector } from '@logic/shared/store/use-store-selector';
import LabelledSelect from '@ui/components/complex/LabelledSelect/labelled-select';
import { loadTrips } from '@logic/features/trip/trip-thunks';
import { loadMap } from '@logic/features/map/map-thunks';
import { loadSidenav } from '@logic/features/sidenav/sidenav-thunks';
import Button from '@ui/components/simple/Button/button';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { createTrip } from '@utils/trip-utils/create-trip';

type Props = {
  title?: string;
};

const style = (theme: Theme) =>
  css({
    height: 65,
    paddingLeft: 15,
    paddingRight: 85,
    marginTop: 10,
    borderBottom: `1px solid ${theme.defaults.white}`,
  });

const addTripStyle = css({
  position: 'absolute',
  top: '25px',
  right: '45px',
  minWidth: 'unset',
  width: '20px !important',
  padding: 0,
});

const SidenavHeader: FunctionComponent<Props> = () => {
  const theme = useContext(ThemeContext).theme;
  const {
    storeDispatch,
    selected: tripInfo,
    thunkResult: { tripsThunks },
  } = useStoreSelector(loadTrips(), (storeState) => storeState.trips);
  const {
    thunkResult: { mapThunks },
  } = useStoreSelector(loadMap(), () => {});
  const {
    thunkResult: { sidenavThunks },
  } = useStoreSelector(loadSidenav(), () => {});
  return useMemo(() => {
    const selectTrip = (id: string) => {
      storeDispatch(tripsThunks.selectTrip(id));
      storeDispatch(mapThunks.unselect());
      storeDispatch(sidenavThunks.clear());
    };

    const addTrip = () => {
      const trip = createTrip();
      storeDispatch(tripsThunks.addTrip(trip, true));
    };

    return (
      <div css={style(theme)}>
        <LabelledSelect
          name={'Trips'}
          selected={tripInfo?.selected}
          options={tripInfo?.trips.map((t) => t.formData.name) || []}
          onChange={(e) => selectTrip(e.target.value)}
        />
        <Button cssStyle={addTripStyle} icon={faPlus} onClick={addTrip} />
      </div>
    );
  }, [tripInfo, theme]);
};

export default SidenavHeader;
