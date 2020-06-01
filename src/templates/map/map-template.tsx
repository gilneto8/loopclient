import React from 'react';
import { Page } from '../../components/routing/page/page';
import { useMapLogic } from './map-logic';
import Marker from './components/marker';
import Popup from './components/popup';
import Map from './components/map';

const MapTemplate = (): JSX.Element => {
  const logic = useMapLogic();
  return (
    <Page title={'Map'}>
      {() => (
        <>
          <Map
            viewport={logic.state.viewport}
            onViewportChange={logic.methods.updateViewport}
            onClick={logic.methods.addMarker}
          >
            {logic.state.markers.map((marker, index) => (
              <Marker key={index} marker={marker} onSelect={logic.methods.selectMarker} />
            ))}
            <Popup marker={logic.state.selected} onClose={logic.methods.selectMarker}>
              {logic.state.selected?.name}
            </Popup>
          </Map>
        </>
      )}
    </Page>
  );
};

export default MapTemplate;
