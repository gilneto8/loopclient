import { LineObj } from '../../logic/features/trip/line-types';

export function lineMidpoint(line: LineObj): [number, number] {
  const lng_a = line.geometry.start.geometry.position[0];
  const lng_b = line.geometry.end.geometry.position[0];
  const lat_a = line.geometry.start.geometry.position[1];
  const lat_b = line.geometry.end.geometry.position[1];

  const lng = (lng_a + lng_b) / 2;
  const lat = (lat_a + lat_b) / 2;
  return [lng, lat];
}
