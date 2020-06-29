import React, { FunctionComponent, useContext, useMemo, useState } from 'react';
import { Marker as ReactMapGLMarker, DragEvent } from 'react-map-gl';
import { css } from '@emotion/core';
import { MarkerObj } from '@logic/features/trip/marker-types';
import MarkerPoint from '../../../assets/images/marker';
import { ThemeContext } from '@ui/colors/theme-context';
import { Theme } from '@ui/colors/color-types';
import * as _ from 'lodash';
import { useStoreSelector } from '@logic/shared/store/use-store-selector';
import { loadTrips } from '@logic/features/trip/trip-thunks';
import { updateLinesByMarker } from '@utils/line-utils/update-lines-by-marker';
import { TripObj } from '@logic/features/trip/trip-types';
import { hold } from '@utils/functions/hold';
import { makeAccessibleButtonProps } from '@utils/functions/make-accessibility-props';

type Props = {
  marker: MarkerObj;
  onHover: (id?: string) => void;
  onSelect: (id: string) => void;
  selected?: boolean;
  hovered?: boolean;
};

const style = (theme: Theme, h?: boolean, s?: boolean) =>
  css({
    cursor: 'pointer',
    '& > svg': {
      width: 30,
      height: 30,
      fill: s
        ? theme.foreground.functional.selected
        : h
        ? theme.foreground.functional.hovering
        : theme.foreground.color,
      stroke: s || h ? theme.defaults.white : 'unset',
      strokeWidth: s ? 30 : h ? 10 : 0,
    },
  });

const Marker: FunctionComponent<Props> = (props) => {
  const { marker, onHover, onSelect, hovered, selected } = props;
  const [dragging, isDragging] = useState<boolean>(false);
  const theme: Theme = useContext(ThemeContext).theme;
  const {
    storeDispatch,
    selected: tripInfo,
    thunkResult: { tripsThunks },
  } = useStoreSelector(loadTrips(), (storeState) => storeState.trips);
  return useMemo(() => {
    const selectedTripId = tripInfo?.selected;
    if (!selectedTripId) return <></>;

    const trip = tripInfo?.trips.filter((t: TripObj) => t.id === selectedTripId)[0];
    if (!trip) return <></>;

    const updateMarkerPosition = (e: DragEvent) => {
      if (tripInfo?.selected) {
        const updatedMarker = _.set(marker, 'geometry.position', [+e.lngLat[0].toFixed(8), +e.lngLat[1].toFixed(8), 1]);
        storeDispatch(tripsThunks.updateMarker(selectedTripId, marker.id.value, updatedMarker));
        storeDispatch(
          tripsThunks.setGeometry(selectedTripId, undefined, updateLinesByMarker(updatedMarker, trip.geometry.lines))
        );
      }
      // hold flag change to disable click
      hold(() => isDragging(false), 0);
    };

    return (
      <ReactMapGLMarker
        latitude={marker.geometry.position[1]}
        longitude={marker.geometry.position[0]}
        offsetTop={-32}
        offsetLeft={-15}
        draggable={true}
        onDragStart={() => isDragging(true)}
        onDragEnd={updateMarkerPosition}
      >
        <div
          css={style(theme, hovered, selected)}
          onMouseLeave={() => onHover()}
          onMouseEnter={() => onHover(marker.id.value)}
          {...makeAccessibleButtonProps(() => !dragging && onSelect(marker.id.value))}
        >
          <MarkerPoint />
        </div>
      </ReactMapGLMarker>
    );
  }, [props, theme]);
};

export default Marker;
