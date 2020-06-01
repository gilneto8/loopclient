import React from 'react';
import MapGL from 'react-map-gl';
import DeckGL, { LineLayer } from 'deck.gl';
import { v4 as uuidV4 } from 'uuid';
import { LineProps, MarkerProps, OnClickEventArg, Viewport } from '../map-types';
import { applyNext } from '../../../utils/functions/reduceNext';

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
  const getLines = (): Array<LineProps> => {
    return applyNext(markers, (c, n) => ({
      id: uuidV4(),
      name: c.name,
      start: [c.longitude, c.latitude, c.altitude],
      end: [n.longitude, n.latitude, n.altitude],
    }));
  };

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
            data: getLines(),
            opacity: 0.8,
            pickable: true,
            getSourcePosition: (d) => d.start,
            getTargetPosition: (d) => d.end,
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
