import React from 'react';
import MapGL from 'react-map-gl';
import DeckGL, { LineLayer } from 'deck.gl';
import { MarkerProps, OnClickEventArg, Viewport } from '../map-types';
import { Position3D } from "@deck.gl/core/utils/positions"

type Props = {
  viewport: Viewport;
  onViewportChange: (vp: Viewport) => void;
  onClick: (p: OnClickEventArg) => void;
  mapStyle?: string;
  token?: string;
  markers: Array<MarkerProps>;
  children?: React.ReactNode;
};

const Map = ({ viewport, mapStyle, onViewportChange, onClick, token, markers, children }: Props) => {
  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle={mapStyle || 'mapbox://styles/mapbox/dark-v9'}
      onClick={onClick}
      mapboxApiAccessToken={
        token || 'pk.eyJ1IjoiZ2lsbmV0bzgiLCJhIjoiY2thczhyZjl1MHFnNTJycHJlZDExbXlscyJ9.xF668iGdzs2JB99yCW6KTg'
      } /*setting to false removes 300ms delay on click (caused by mjolnir.js)*/
      /*doubleClickZoom={true}*/
    >
      <DeckGL
        viewState={viewport}
        onViewStateChange={({ viewState }) => onViewportChange(viewState)}
        controller={true}
        pickingRadius={5}
        effects={[]}
        height="100%"
        width="100%"
        layers={[
          new LineLayer({
            id: 'line-layer',
            data: [
              { start: [-9.1704, 38.7698, 1], end: [-9.1353, 38.8312, 1], name: '1' },
              { start: [-9.1353, 38.8312, 1], end: [-9.1943, 38.4302, 1], name: '2' },
              { start: [-9.1943, 38.4302, 1], end: [-9.2309, 38.4923, 1], name: '3' },
            ],
            opacity: 0.8,
            pickable: true,
            getSourcePosition: (d) => d.start as Position3D,
            getTargetPosition: (d) => d.end as Position3D,
            getColor: [255, 0, 0],
            getWidth: 3,
          }),
        ]}
      >
        {children}
      </DeckGL>
    </MapGL>
  );
};

export default Map;
