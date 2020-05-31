import React from 'react';
import * as _ from 'lodash';
import MapGL, { PointerEvent } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { ViewType } from '../map-types';

type Props = {
  viewState: ViewType;
  onViewStateChange: (vp: ViewType) => void;
  onClick: (e: PointerEvent) => void;
  mapStyle?: string;
  token?: string;
  children?: React.ReactNode;
};

const Map = ({ viewState, mapStyle, onViewStateChange, onClick, token, children }: Props) => {
  return (
    <MapGL
      {...viewState.viewState}
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
        viewState={viewState.viewState}
        onViewStateChange={onViewStateChange}
        controller={true}
        pickingRadius={5}
        effects={[]}
        height="100%"
        width="100%"
        layers={[]}
      >
        {children}
      </DeckGL>
    </MapGL>
  );
};

export default Map;
