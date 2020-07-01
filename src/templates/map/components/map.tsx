import React, { FunctionComponent, useContext, useMemo } from 'react';
import MapGL from 'react-map-gl';
import { OnClickEvent, Viewport } from '@logic/features/map/map-types';
import { Theme } from '@ui/colors/color-types';
import { ThemeContext } from '@ui/colors/theme-context';

type Props = {
  viewport: Viewport | undefined;
  onViewportChange: (vp: Viewport) => void;
  token?: string;
  editMode?: boolean;
  onClick: (p: OnClickEvent) => void;
};

const Map: FunctionComponent<Props> = (props) => {
  const { viewport, onViewportChange, editMode, onClick, token, children } = props;
  const theme: Theme = useContext(ThemeContext).theme;
  return useMemo(
    () => (
      <MapGL
        {...viewport}
        onViewportChange={(viewport) => onViewportChange(viewport)}
        width="100%"
        height="100%"
        mapStyle={theme.extras.mapUrl}
        onClick={(e) => editMode && onClick(e)}
        mapboxApiAccessToken={
          token || 'pk.eyJ1IjoiZ2lsbmV0bzgiLCJhIjoiY2thczhyZjl1MHFnNTJycHJlZDExbXlscyJ9.xF668iGdzs2JB99yCW6KTg'
        } /*setting to false removes 300ms delay on click (caused by mjolnir.js)*/
        /*doubleClickZoom={true}*/
      >
        {children}
      </MapGL>
    ),
    [viewport, editMode, children, theme]
  );
};

export default Map;
