import { ItemProps, MarkerProps } from "../../logic/shared/map/map-types"

export function isMarker(i: ItemProps | undefined | null): boolean {
  return !!i && !!(i as MarkerProps).geometry.position;
}