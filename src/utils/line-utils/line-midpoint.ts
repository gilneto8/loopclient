import { WaypointObj } from '@logic/features/trip/trip-types';
import { MarkerObj } from '@logic/features/trip/marker-types';

export function lineMidpoint(line: WaypointObj): [number, number] {
  const lng_a = (line.previous() as MarkerObj)?.geometry.position[0];
  const lng_b = (line.next() as MarkerObj)?.geometry.position[0];
  const lat_a = (line.previous() as MarkerObj)?.geometry.position[1];
  const lat_b = (line.next() as MarkerObj)?.geometry.position[1];

  const lng = (lng_a + lng_b) / 2;
  const lat = (lat_a + lat_b) / 2;
  return [lng, lat];
}
