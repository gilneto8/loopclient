import { MapItemObj } from '../../logic/shared/map/map-types';
import { MarkerObj } from '../../logic/shared/map/marker-types';

export function isMarker(i: MapItemObj | undefined | null): boolean {
  return !!i && !!(i as MarkerObj).geometry.position;
}
