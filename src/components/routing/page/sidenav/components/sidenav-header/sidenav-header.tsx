import React, { FunctionComponent, useContext, useMemo } from 'react';
import { css } from '@emotion/core';
import { ThemeContext } from '../../../../../ui/colors/theme-context';
import { Theme } from '../../../../../ui/colors/color-types';
import { useStoreSelector } from '../../../../../../logic/shared/store/use-store-selector';
import LabelledSelect from '../../../../../ui/components/complex/LabelledSelect/labelled-select';
import { loadTrips } from '../../../../../../logic/features/trip/trip-thunks';

type Props = {
  title?: string;
};

const style = (theme: Theme) =>
  css({
    height: 50,
    paddingLeft: 15,
    paddingRight: 45,
    borderBottom: `1px solid ${theme.defaults.white}`,
  });

const SidenavHeader: FunctionComponent<Props> = (props) => {
  const theme = useContext(ThemeContext).theme;
  const {
    storeDispatch,
    selected: tripInfo,
    thunkResult: { tripsThunks },
  } = useStoreSelector(loadTrips(), (storeState) => storeState.trips);
  return useMemo(
    () => (
      <div css={style(theme)}>
        <LabelledSelect
          name={'Trips'}
          options={tripInfo?.trips.map((t) => t.id) || []}
          onChange={(e) => {
            storeDispatch(tripsThunks.selectTrip(e.target.value));
          }}
        />
      </div>
    ),
    [theme]
  );
};

export default SidenavHeader;
