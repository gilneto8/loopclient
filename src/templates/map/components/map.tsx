import React, { FunctionComponent, useMemo } from 'react';
import MapGL from 'react-map-gl';
import { OnClickEvent, Viewport } from '@logic/features/map/map-types';

type Props = {
  viewport: Viewport | undefined;
  mapStyle?: string;
  token?: string;
  editMode?: boolean;
  onClick: (p: OnClickEvent) => void;
};

const Map: FunctionComponent<Props> = (props) => {
  const { viewport, mapStyle, editMode, onClick, token, children } = props;
  return useMemo(
    () => (
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle={mapStyle || 'mapbox://styles/mapbox/dark-v9'}
        onClick={(e) => editMode && onClick(e)}
        mapboxApiAccessToken={
          token || 'pk.eyJ1IjoiZ2lsbmV0bzgiLCJhIjoiY2thczhyZjl1MHFnNTJycHJlZDExbXlscyJ9.xF668iGdzs2JB99yCW6KTg'
        } /*setting to false removes 300ms delay on click (caused by mjolnir.js)*/
        /*doubleClickZoom={true}*/
      >
        {children}
      </MapGL>
    ),
    [viewport, mapStyle, editMode, children]
  );
};

export default Map;
