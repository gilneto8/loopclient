import React from 'react';
import { Page } from '../../components/routing/page/page';
import ReactMapGL from 'react-map-gl';
import { useMapLogic } from './map-logic';

const MapTemplate = (): JSX.Element => {
  const logic = useMapLogic();
  return (
    <Page title={'Second Page'}>
      {() => (
        <>
          <ReactMapGL
            {...logic.state.viewport}
            width="100%"
            height="100%"
            mapStyle={'mapbox://styles/mapbox/dark-v10'}
            onViewportChange={logic.methods.updateViewport}
            mapboxApiAccessToken={logic.state.token}
          />
        </>
      )}
    </Page>
  );
};

export default MapTemplate;
