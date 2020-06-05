import { ItemProps } from '../../logic/shared/map/map-types';
import { MarkerProps } from '../../logic/shared/map/marker-types';

export function isMarker(i: ItemProps | undefined | null): boolean {
  return !!i && !!(i as MarkerProps).geometry.position;
}
