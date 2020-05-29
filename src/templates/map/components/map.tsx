import React from 'react';
import ReactMapGL, { PointerEvent } from 'react-map-gl';
import { ViewportProps } from '../map-logic';

type Props = {
  viewport: ViewportProps;
  onViewportChange: (vp: ViewportProps) => void;
  onClick: (e: PointerEvent) => void;
  mapStyle?: string;
  token?: string;
  children?: React.ReactNode;
};

const Map = ({ viewport, mapStyle, onViewportChange, onClick, children }: Props) => (
  <ReactMapGL
    {...viewport}
    width="100%"
    height="100%"
    mapStyle={mapStyle || 'mapbox://styles/mapbox/dark-v10'}
    onViewportChange={onViewportChange}
    onClick={onClick}
    mapboxApiAccessToken={'pk.eyJ1IjoiZ2lsbmV0bzgiLCJhIjoiY2thczhyZjl1MHFnNTJycHJlZDExbXlscyJ9.xF668iGdzs2JB99yCW6KTg'}
    doubleClickZoom={true /*setting to false removes 300ms delay (caused by mjolnir.js)*/}
  >
    {children}
  </ReactMapGL>
);

export default Map;
