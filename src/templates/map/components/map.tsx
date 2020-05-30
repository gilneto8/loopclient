import React from 'react';
import * as _ from 'lodash';
import MapGL, { PointerEvent } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { LineLayer, ScatterplotLayer } from '@deck.gl/layers';
import { RGBAColor } from 'deck.gl';
import { MarkerProps, ViewType, DataItem } from '../map-types';

/*const data: Array<Position> = [
  { start: [8.714, 54.2638, 11582.4], end: [8.6875, 54.2501, 11582.4], name: 'SAS52H' },
  { start: [13.4383, 46.8144, 10972.8], end: [13.4149, 46.8265, 10972.8], name: 'GWI7PT' },
  { start: [-0.676, 51.7317, 3070.86], end: [-0.6567, 51.7309, 3025.14], name: 'SHT3P' },
  { start: [5.9049, 50.4579, 9349.74], end: [5.9323, 50.4528, 9250.68], name: 'BAW906N' },
  { start: [-0.1163, 51.3325, 2125.98], end: [-0.1321, 51.3312, 2125.98], name: 'BAW583' },
];*/

type Props = {
  viewState: ViewType;
  onViewStateChange: (vp: ViewType) => void;
  onClick: (e: PointerEvent) => void;
  markers: Array<MarkerProps>;
  mapStyle?: string;
  token?: string;
  children?: React.ReactNode;
};

function getColor(d: any): RGBAColor {
  const z = d.position[2];
  const r = z / 10000;
  return [255 * (1 - r * 2), 128 * r, 255 * r, 255 * (1 - r)];
}

const drawLine = (markers: Array<MarkerProps>): Array<DataItem> => {
  return markers.map((m) => ({
    from: {
      coordinates: [m.longitude, m.latitude, m.altitude || 0],
      name: 'from',
    },
    to: {
      coordinates: [m.longitude, m.latitude, m.altitude || 0],
      name: 'to',
    },
  }));
};

const Map = ({ viewState, mapStyle, onViewStateChange, onClick, token, children, markers }: Props) => (
  <MapGL
    {...viewState.viewState}
    width="100%"
    height="100%"
    mapStyle={mapStyle || 'mapbox://styles/mapbox/dark-v10'}
    onClick={onClick}
    mapboxApiAccessToken={
      token || 'pk.eyJ1IjoiZ2lsbmV0bzgiLCJhIjoiY2thczhyZjl1MHFnNTJycHJlZDExbXlscyJ9.xF668iGdzs2JB99yCW6KTg'
    } /*setting to false removes 300ms delay on click (caused by mjolnir.js)*/
    /*doubleClickZoom={true}*/
  >
    <DeckGL
      viewState={viewState.viewState}
      onViewStateChange={onViewStateChange}
      controller={true}
      pickingRadius={5}
      effects={[]}
      height="100%"
      width="100%"
      layers={[
        (() => {
          return new ScatterplotLayer({
            data: [
              {position: [-9, 38.715, 740], size: 10000}
            ],
            getPosition: d => d.position,
            getRadius: d => d.size,
            getColor,
            opacity: 0.1,
          }) /*new LineLayer<DataItem>({
            id: 'test',
            data: drawLine(markers),
            opacity: 0.8,
            getSourcePosition: (d) => d.from.coordinates,
            getTargetPosition: (d) => d.to.coordinates,
            getColor,
            getWidth: () => 3,
            pickable: true,
            onHover: (o, e) => console.log('onHover', o, e),
            onClick: (o, e) => console.log('onClick', o, e),
          });*/
        })(),

      ]}
    >
      {children}
    </DeckGL>
  </MapGL>
);

export default Map;
