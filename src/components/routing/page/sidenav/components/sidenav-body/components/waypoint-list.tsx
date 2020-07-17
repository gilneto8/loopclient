import React, { FunctionComponent, useMemo } from 'react';
import { useStoreSelector } from '@logic/shared/store/use-store-selector';
import { loadMap } from '@logic/features/map/map-thunks';
import Badge from '@ui/components/simple/Badge/badge';
import { Theme } from '@ui/colors/color-types';
import useTheme from '@ui/colors/theme-context';
import { loadTrips } from '@logic/features/trip/trip-thunks';
import { loadSidenav } from '@logic/features/sidenav/sidenav-thunks';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { moveMarker } from '@utils/marker-utils/move-marker';
import { WaypointObj } from '@logic/features/trip/trip-types';

type Props = {};

const WaypointList: FunctionComponent<Props> = () => {
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

  const theme: Theme = useTheme().theme;

  const selectedTrip = tripInfo?.trips.filter((t) => t.id === tripInfo?.selected)[0];

  return useMemo(() => {
    const switchOrder = (result: DropResult) => {
      if (!selectedTrip) return;
      const waypoints = moveMarker(result, selectedTrip.geometry.waypoints);
      storeDispatch(tripsThunks.setGeometry(selectedTrip.id, waypoints));
    };

    const switchSelect = (obj: WaypointObj) => {
      if (mapInfo?.selected && mapInfo.selected.value === obj.id.value) {
        storeDispatch(mapThunks.unselect());
        storeDispatch(sidenavThunks.clear());
      } else {
        storeDispatch(mapThunks.selectMarker(obj.id.value));
        storeDispatch(sidenavThunks.update(obj));
      }
      storeDispatch(mapThunks.setViewMode());
    };

    const switchHover = (obj: WaypointObj, hovering: boolean) => {
      if (hovering)
        storeDispatch(
          obj.id.ctx === 'marker' ? mapThunks.hoverMarker(obj.id.value) : mapThunks.hoverLine(obj.id.value)
        );
      else storeDispatch(mapThunks.unhover());
    };

    const remove = (obj: WaypointObj) => {
      if (tripInfo) storeDispatch(tripsThunks.removeMarker(tripInfo.selected, obj.id.value));
      storeDispatch(mapThunks.unselect());
      storeDispatch(sidenavThunks.clear());
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
              {selectedTrip?.geometry.waypoints.map((w: WaypointObj, index) => (
                <Draggable isDragDisabled={true} key={w.id.value} draggableId={w.id.value} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      /*style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}*/
                    >
                      <Badge
                        enableAutoMargin
                        removable={w.id.ctx !== 'line'}
                        onRemove={() => remove(w)}
                        onClick={() => switchSelect(w)}
                        onHover={(h) => switchHover(w, h)}
                        hovered={mapInfo.hovered?.value === w.id.value}
                        active={mapInfo.selected?.value === w.id.value}
                      >
                        {w.form.data.name}
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
  }, [selectedTrip?.geometry.waypoints, data, mapInfo?.selected, mapInfo?.hovered, theme]);
};

export default WaypointList;
