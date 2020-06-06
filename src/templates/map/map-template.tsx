import React, { CSSProperties } from 'react';
import { Page } from '../../components/routing/page/page';
import { useMapLogic } from './map-logic';
import Popup from './components/popup';
import Map from './components/map';
import LayerManager from './components/layer-manager';
import MarkerList from './components/marker-list';
import Button from '../../components/ui/components/simple/Button/button';
import z from '../../components/ui/constants/z-indexes';

const style: CSSProperties = {
  position: 'absolute',
  backgroundColor: 'black',
  color: 'white',
  top: 15,
  right: 15,
  zIndex: z.MAP.general.v,
};

type Props = {};

const MapTemplate = React.memo<Props>(() => {
  const { state, methods } = useMapLogic();
  return (
    <Page title={'Map'}>
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
            selected={state.selected}
            hovered={state.hovered}
          >
            <MarkerList
              viewMode={!state.editMode}
              markers={state.markers}
              onHover={methods.hoverOnMarker}
              onSelect={methods.selectMarker}
              selected={state.selected}
              hovered={state.hovered}
            />
            <Popup item={state.hovered} />
          </LayerManager>
        </Map>
      </>
    </Page>
  );
});

export default MapTemplate;
