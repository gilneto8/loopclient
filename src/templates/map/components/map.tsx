import React from 'react';
import MapGL, { PointerEvent } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { Viewport } from '../map-types';
import { GeoJsonLayer } from 'deck.gl';

type Props = {
  viewport: Viewport;
  onViewportChange: (vp: Viewport) => void;
  onClick: (e: PointerEvent) => void;
  mapStyle?: string;
  token?: string;
  children?: React.ReactNode;
};

const Map = ({ viewport, mapStyle, onViewportChange, token }: Props) => {
  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle={mapStyle || 'mapbox://styles/mapbox/dark-v9'}
      /*onClick={onClick}*/
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
          new GeoJsonLayer({
            id: 'geojson-layer',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [
                  [
                    [-67.13734351262877, 45.137451890638886],
                    [-66.96466, 44.8097],
                    [-68.03252, 44.3252],
                    [-69.06, 43.98],
                    [-70.11617, 43.68405],
                    [-70.64573401557249, 43.090083319667144],
                    [-70.75102474636725, 43.08003225358635],
                    [-70.79761105007827, 43.21973948828747],
                    [-70.98176001655037, 43.36789581966826],
                    [-70.94416541205806, 43.46633942318431],
                    [-71.08482, 45.3052400000002],
                    [-70.6600225491012, 45.46022288673396],
                    [-70.30495378282376, 45.914794623389355],
                    [-70.00014034695016, 46.69317088478567],
                    [-69.23708614772835, 47.44777598732787],
                    [-68.90478084987546, 47.184794623394396],
                    [-68.23430497910454, 47.35462921812177],
                    [-67.79035274928509, 47.066248887716995],
                    [-67.79141211614706, 45.702585354182816],
                    [-67.13734351262877, 45.137451890638886],
                  ],
                ],
              },
            },
            lineWidthScale: 4,
            opacity: 0.4,
            filled: true,
            stroked: true,
            lineWidth: 2,
            lineColor: [255, 0, 0],
            lineWidthMinPixels: 2,
            wireframe: true,
            getLineColor: (f) => [255, 0, 0],
            getFillColor: (f) => [255, 0, 0, 0],
            pickable: true,
            onHover: (info) => console.log('Hovered:', info),
            onClick: (info) => console.log('Clicked:', info),
          }),
        ]}
      />
    </MapGL>
  );
};

export default Map;
