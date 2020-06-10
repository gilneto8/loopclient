import { MapItemObj } from '../../logic/features/map/map-types';
import { MarkerObj } from '../../logic/features/trip/marker-types';

export function isMarker(i: MapItemObj | undefined | null): boolean {
  return !!i && !!(i as MarkerObj).geometry.position;
}
