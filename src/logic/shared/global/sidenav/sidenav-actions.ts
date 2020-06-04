export const SIDENAV_OPEN = 'SIDENAV_OPEN';
export const SIDENAV_CLOSE = 'SIDENAV_CLOSE';

export type SidenavAction =
  | {
      type: typeof SIDENAV_OPEN;
      payload?: any;
    }
  | { type: typeof SIDENAV_CLOSE };
