import React, { FunctionComponent, useContext, useMemo } from 'react';
import { useStoreSelector } from '@logic/shared/store/use-store-selector';
import { loadMap } from '@logic/features/map/map-thunks';
import { MarkerObj } from '@logic/features/trip/marker-types';
import Badge from '@ui/components/simple/Badge/badge';
import { Theme } from '@ui/colors/color-types';
import { ThemeContext } from '@ui/colors/theme-context';
import { loadTrips } from '@logic/features/trip/trip-thunks';
import { loadSidenav } from '@logic/features/sidenav/sidenav-thunks';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { moveMarker } from '@utils/marker-utils/move-marker';

type Props = {};

const MarkerList: FunctionComponent<Props> = () => {
  const {
    storeDispatch,
    selected: mapInfo,
    thunkResult: { mapThunks },
  } = useStoreSelector(loadMap(), (store) => store.map);
  const {
    selected: tripInfo,
    thunkResult: { tripsThunks },
  } = useStoreSelector(loadTrips(), (store) => store.trips);
  const {
    selected: data,
    thunkResult: { sidenavThunks },
  } = useStoreSelector(loadSidenav(), (store) => store.sidenav?.data);

  const theme: Theme = useContext(ThemeContext).theme;

  const selectedTrip = tripInfo?.trips.filter((t) => t.id === tripInfo?.selected)[0];

  return useMemo(() => {
    const switchOrder = (result: DropResult) => {
      if (!selectedTrip) return;
      const { markers, lines } = moveMarker(result, selectedTrip.geometry);
      storeDispatch(tripsThunks.setGeometry(selectedTrip.id, markers, lines));
    };

    const switchSelect = (obj: MarkerObj) => {
      if (mapInfo && mapInfo.selected === obj.id) {
        storeDispatch(mapThunks.unselect());
        storeDispatch(sidenavThunks.clear());
      } else {
        storeDispatch(mapThunks.selectMarker(obj.id));
        storeDispatch(sidenavThunks.update(obj));
      }
    };

    const switchHover = (obj: MarkerObj, hovering: boolean) => {
      if (hovering) storeDispatch(mapThunks.hoverMarker(obj.id));
      else storeDispatch(mapThunks.unhover());
    };

    return !mapInfo || !tripInfo ? (
      <></>
    ) : (
      <DragDropContext onDragEnd={switchOrder}>
        <Droppable droppableId={'marker-list'}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              /*style={getListStyle(snapshot.isDraggingOver)}*/
            >
              {selectedTrip?.geometry.markers.map((m: MarkerObj, index) => (
                <Draggable isDragDisabled={true} key={m.id.value} draggableId={m.id.value} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      /*style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}*/
                    >
                      <Badge
                        enableAutoMargin
                        removable
                        onRemove={() => storeDispatch(tripsThunks.removeMarker(tripInfo?.selected, m.id.value))}
                        onClick={() => switchSelect(m)}
                        onHover={(h) => switchHover(m, h)}
                        hovered={mapInfo.hovered === m.id}
                        active={mapInfo.selected === m.id}
                      >
                        {m.formData.name}
                      </Badge>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }, [selectedTrip?.geometry.markers, data, mapInfo?.selected, mapInfo?.hovered, theme]);
};

export default MarkerList;
