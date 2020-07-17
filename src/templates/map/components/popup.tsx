import React, { useContext, useMemo, FunctionComponent } from 'react';
import { Popup as ReactMapGLPopup } from 'react-map-gl';
import { lineMidpoint } from '@utils/line-utils/line-midpoint';
import LineInfo from '../popups/line-info';
import MarkerInfo from '../popups/marker-info';
import { css } from '@emotion/core';
import { MarkerObj } from '@logic/features/trip/marker-types';
import { Theme } from '@ui/colors/color-types';
import { ThemeContext } from '@ui/colors/theme-context';
import { useStoreSelector } from '@logic/shared/store/use-store-selector';
import { loadTrips } from '@logic/features/trip/trip-thunks';
import * as _ from 'lodash';
import { WaypointObj } from '@logic/features/trip/trip-types';
import { LineObj } from '@logic/features/trip/line-types';

type Props = {
  itemId?: { ctx: string; value: string };
};

const style = (theme: Theme) =>
  css({
    width: 250,
    backgroundColor: theme.defaults.white,
    overflowWrap: 'anywhere',
  });

const Popup: FunctionComponent<Props> = ({ itemId }) => {
  const { selected: tripInfo } = useStoreSelector(loadTrips(), (storeState) => storeState.trips);
  const theme: Theme = useContext(ThemeContext).theme;
  return useMemo(() => {
    if (!itemId) return <></>;

    const trips = tripInfo?.trips;
    const selected = tripInfo?.selected;
    if (!trips || !selected) return <></>;

    const selectedTrip = _.filter(trips, (t) => t.id === selected)[0];
    if (itemId.ctx === 'marker') {
      const marker = selectedTrip.geometry.waypoints.filter(
        (w: WaypointObj) => w.id.value === itemId.value
      )[0] as MarkerObj;
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
    const line = selectedTrip.geometry.waypoints.filter((w: WaypointObj) => w.id.value === itemId.value)[0];
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
          <LineInfo line={line as LineObj} />
        </div>
      </ReactMapGLPopup>
    );
  }, [theme, itemId, tripInfo?.selected]);
};

export default Popup;
