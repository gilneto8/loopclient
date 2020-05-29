import React from 'react';
import { Page } from '../../components/routing/page/page';
import Map from 'react-map-gl';
import { useMapLogic } from './map-logic';
import Marker from './components/marker';
import Popup from "./components/popup"

const MapTemplate = (): JSX.Element => {
  const logic = useMapLogic();
  return (
    <Page title={'Second Page'}>
      {() => (
        <>
          <Map
            {...logic.state.viewport}
            width="100%"
            height="100%"
            mapStyle={'mapbox://styles/mapbox/dark-v10'}
            onViewportChange={logic.methods.updateViewport}
            onClick={logic.methods.addMarker}
            mapboxApiAccessToken={logic.state.token}
            doubleClickZoom={logic.state.doubleClickZoom}
          >
            {logic.state.markers.map((marker, index) => (
              <Marker key={index} marker={marker} onSelect={logic.methods.selectMarker} />
            ))}
            {logic.state.selected && (
              <Popup marker={logic.state.selected} onClose={logic.methods.selectMarker}>
                TEST CRL
              </Popup>
            )}
          </Map>
        </>
      )}
    </Page>
  );
};

export default MapTemplate;
