import { MapItemObj } from '../map/map-types';

export const SIDENAV_OPEN = 'SIDENAV_OPEN';
export const SIDENAV_UPDATE = 'SIDENAV_UPDATE';
export const SIDENAV_CLOSE = 'SIDENAV_CLOSE';
export const SIDENAV_RESET = 'SIDENAV_RESET';

export type SidenavAction =
  | {
      type: typeof SIDENAV_OPEN;
      payload?: MapItemObj;
    }
  | { type: typeof SIDENAV_UPDATE; payload: MapItemObj }
  | { type: typeof SIDENAV_CLOSE }
  | { type: typeof SIDENAV_RESET };
