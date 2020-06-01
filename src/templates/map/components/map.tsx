import React, { useEffect } from 'react';
import * as _ from 'lodash';
import MapGL from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { MarkerProps, PickInfo, Viewport } from '../map-types';
import { LineLayer } from 'deck.gl';

type Props = {
  viewport: Viewport;
  onViewportChange: (vp: Viewport) => void;
  onClick: (p: PickInfo<any>, e: MouseEvent) => void;
  mapStyle?: string;
  token?: string;
  markers: Array<MarkerProps>;
  children?: React.ReactNode;
};

const Map = ({ viewport, mapStyle, onViewportChange, onClick, token, markers, children }: Props) => {

  useEffect(() => {
    document.getElementById('map-wrapper')?.addEventListener('contextmenu', (e) => e.preventDefault());
  }, []);

  return (
    <div id={'map-wrapper'}>
      <DeckGL
        viewState={viewport}
        onViewStateChange={({ viewState }) => onViewportChange(viewState)}
        onClick={(p, e) => {
          const coordinates = p.coordinate as Array<number>;
          onClick(_.set(p, 'coordinate', [coordinates[0], coordinates[1]]) as PickInfo, e);
        }}
        controller={true}
        pickingRadius={5}
        effects={[]}
        height="100%"
        width="100%"
        layers={[
          new LineLayer({
            id: 'line-layer',
            data: [
              { sourcePosition: [-9.1704, 38.7698, 1], targetPosition: [-9.1353, 38.8312, 1], name: '1' },
              { sourcePosition: [-9.1353, 38.8312, 1], targetPosition: [-9.1943, 38.4302, 1], name: '1' },
              { sourcePosition: [-9.1943, 38.4302, 1], targetPosition: [-9.2309, 38.4923, 1], name: '1' },
            ],
            opacity: 0.8,
            pickable: true,
            getColor: [255, 0, 0, 1],
            getWidth: 8,
          }),
        ]}
      >
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
          {children}
        </MapGL>
      </DeckGL>
    </div>
  );
};

export default Map;
