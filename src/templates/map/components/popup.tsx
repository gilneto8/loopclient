import React, { useContext, useMemo, FunctionComponent } from 'react';
import { Popup as ReactMapGLPopup } from 'react-map-gl';
import { MapItemObj } from '../../../logic/features/map/map-types';
import { lineMidpoint } from '../../../utils/functions/line-midpoint';
import LineInfo from '../popups/line-info';
import MarkerInfo from '../popups/marker-info';
import { isMarker } from '../../../utils/functions/is-marker';
import { css } from '@emotion/core';
import { LineObj } from '../../../logic/features/map/line-types';
import { MarkerObj } from '../../../logic/features/map/marker-types';
import { Theme } from '../../../components/ui/colors/color-types';
import { ThemeContext } from '../../../components/ui/colors/theme-context';

type Props = {
  item?: MapItemObj;
};

const style = (theme: Theme) => css({
  width: 250,
  backgroundColor: theme.defaults.white,
  overflowWrap: 'anywhere',
});

const Popup: FunctionComponent<Props> = ({ item }) => {
  const theme: Theme = useContext(ThemeContext).theme;
  return useMemo(() => {
    if (!item) return <></>;
    if (isMarker(item)) {
      const marker = item as MarkerObj;
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
    const line = item as LineObj;
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
  }, [theme, item]);
};

export default Popup;
