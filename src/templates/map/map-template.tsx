import React, { FunctionComponent } from 'react';
import { Page } from '@routing/page/page';
import { useMapLogic } from './map-logic';
import Popup from './components/popup';
import Map from './components/map';
import LayerManager from './components/layer-manager';
import MarkerMap from './components/marker-map';

type Props = {};

const MapTemplate: FunctionComponent<Props> = () => {
  const { state, methods } = useMapLogic();
  return (
    <Page title={'Map'}>
      <>
        <Map
          editMode={state.editMode}
          viewport={state.viewport}
          onViewportChange={methods.updateViewport}
          onClick={methods.addMarker}
        >
          <LayerManager
            viewMode={!state.editMode}
            viewport={state.viewport}
            onSelect={methods.selectLine}
            onHover={methods.hoverOnLine}
            lines={state.lines}
            selected={state.selected}
            hovered={state.hovered}
          >
            <MarkerMap
              viewMode={!state.editMode}
              markers={state.markers}
              onHover={methods.hoverOnMarker}
              onSelect={methods.selectMarker}
              selected={state.selected}
              hovered={state.hovered}
            />
            {!!state.hovered && <Popup itemId={state.hovered} />}
          </LayerManager>
        </Map>
      </>
    </Page>
  );
};

export default MapTemplate;
