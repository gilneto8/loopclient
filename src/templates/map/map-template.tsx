import React from 'react';
import { Page } from '../../components/routing/page/page';
import { useMapLogic } from './map-logic';
import Popup from './components/popup';
import Map from './components/map';
import Deck from './components/deck';
import MarkerList from './components/marker-list';
import Button from '../../components/ui/components/Button/button';

const MapTemplate = (): JSX.Element => {
  const { state, methods } = useMapLogic();
  return (
    <Page title={'Map'}>
      {() => (
        <>
          <Button onClick={methods.switchMode}>{'Editing - ' + state.editMode}</Button>
          <Map editMode={state.editMode} viewport={state.viewport} onClick={methods.addMarker}>
            <Deck
              viewMode={!state.editMode}
              viewport={state.viewport}
              onViewportChange={methods.updateViewport}
              markers={state.markers}
            >
              <MarkerList viewMode={!state.editMode} markers={state.markers} onSelect={methods.selectMarker} />
              <Popup marker={state.selected} onClose={methods.closePopup} />
            </Deck>
          </Map>
        </>
      )}
    </Page>
  );
};

export default MapTemplate;
