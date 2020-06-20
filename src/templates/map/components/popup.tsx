import React, { useContext, useMemo, FunctionComponent } from 'react';
import { Popup as ReactMapGLPopup } from 'react-map-gl';
import { lineMidpoint } from '@utils/functions/line-midpoint';
import LineInfo from '../popups/line-info';
import MarkerInfo from '../popups/marker-info';
import { css } from '@emotion/core';
import { LineObj } from '@logic/features/trip/line-types';
import { MarkerObj } from '@logic/features/trip/marker-types';
import { Theme } from '@ui/colors/color-types';
import { ThemeContext } from '@ui/colors/theme-context';
import { useStoreSelector } from '@logic/shared/store/use-store-selector';
import { loadTrips } from '@logic/features/trip/trip-thunks';
import { findItem } from '@utils/functions/find-item';
import * as _ from 'lodash';

type Props = {
  item?: string;
};

const style = (theme: Theme) =>
  css({
    width: 250,
    backgroundColor: theme.defaults.white,
    overflowWrap: 'anywhere',
  });

const Popup: FunctionComponent<Props> = ({ item }) => {
  const { selected: tripInfo } = useStoreSelector(loadTrips(), (storeState) => storeState.trips);
  const theme: Theme = useContext(ThemeContext).theme;
  return useMemo(() => {
    if (!item) return <></>;

    const trips = tripInfo?.trips;
    const selected = tripInfo?.selected;
    if (!trips || !selected) return <></>;

    const selectedTrip = _.filter(trips, (t) => t.id === selected)[0];
    const currentItem = findItem(
      item,
      { label: 'marker', values: selectedTrip.geometry.markers },
      { label: 'line', values: selectedTrip.geometry.lines }
    );
    if (!currentItem) return <></>;
    if (currentItem.label === 'marker') {
      const marker = currentItem.item as MarkerObj;
      return (
        <ReactMapGLPopup
          tipSize={5}
          longitude={marker.geometry.position[0]}
          latitude={marker.geometry.position[1]}
          anchor="bottom"
          offsetTop={-25}
          closeButton={false}
        >
          <div css={style(theme)}>
            <MarkerInfo marker={marker} />
          </div>
        </ReactMapGLPopup>
      );
    }
    const line = currentItem.item as LineObj;
    const midpoint = lineMidpoint(line);
    return (
      <ReactMapGLPopup
        tipSize={5}
        longitude={midpoint[0]}
        latitude={midpoint[1]}
        anchor="bottom"
        offsetTop={-5}
        closeButton={false}
      >
        <div css={style(theme)}>
          <LineInfo line={line} />
        </div>
      </ReactMapGLPopup>
    );
  }, [theme, item, tripInfo?.selected]);
};

export default Popup;
