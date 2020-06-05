import { ItemProps } from '../../map/map-types';

export const SIDENAV_OPEN = 'SIDENAV_OPEN';
export const SIDENAV_UPDATE = 'SIDENAV_UPDATE';
export const SIDENAV_CLOSE = 'SIDENAV_CLOSE';

export type SidenavAction =
  | {
      type: typeof SIDENAV_OPEN;
      payload?: ItemProps;
    }
  | { type: typeof SIDENAV_UPDATE; payload: ItemProps }
  | { type: typeof SIDENAV_CLOSE };
