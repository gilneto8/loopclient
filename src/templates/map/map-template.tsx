import React, { CSSProperties } from 'react';
import { Page } from '../../components/routing/page/page';
import { useMapLogic } from './map-logic';
import Popup from './components/popup';
import Map from './components/map';
import LayerManager from './components/layer-manager';
import MarkerList from './components/marker-list';
import Button from '../../components/ui/components/Button/button';

const style: CSSProperties = {
  position: 'absolute',
  backgroundColor: 'black',
  color: 'white',
  top: 70,
  left: 15,
  zIndex: 1030,
};

const MapTemplate = (): JSX.Element => {
  const { state, methods } = useMapLogic();
  return (
    <Page title={'Map'}>
      {() => (
        <>
          <Button style={style} onClick={methods.switchMode}>
            {'Editing - ' + state.editMode}
          </Button>
          <Map editMode={state.editMode} viewport={state.viewport} onClick={methods.addMarker}>
            <LayerManager
              viewMode={!state.editMode}
              viewport={state.viewport}
              onViewportChange={methods.updateViewport}
              onSelect={methods.selectLine}
              onHover={methods.hoverOnLine}
              lines={state.lines}
            >
              <MarkerList
                viewMode={!state.editMode}
                markers={state.markers}
                onHover={methods.hoverOnMarker}
                onSelect={methods.selectMarker}
              />
              <Popup item={state.selected || state.hovered} onClose={methods.closePopup} />
            </LayerManager>
          </Map>
        </>
      )}
    </Page>
  );
};

export default MapTemplate;
