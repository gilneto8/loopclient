import React, { FunctionComponent, useContext, useMemo } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { faAngleDoubleLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import z from '../../../ui/constants/z-indexes';
import SidenavHeader from './components/sidenav-header/sidenav-header';
import { useStoreSelector } from '../../../../logic/shared/store/use-store-selector';
import { loadSidenav } from '../../../../logic/features/sidenav/sidenav-thunks';
import SidenavBody from './components/sidenav-body/sidenav-body';
import { loadMap } from '../../../../logic/features/map/map-thunks';
import { ThemeContext } from '../../../ui/colors/theme-context';
import { Theme } from '../../../ui/colors/color-types';
import SidenavFooter from './components/sidenav-footer/sidenav-footer';

type Props = {
  blocking?: boolean;
};

function getStyle(isOpen: boolean, theme: Theme): SerializedStyles {
  return css({
    transition: 'all .3s',
    marginRight: 45,
    backgroundColor: theme.background.color,
    width: 300,
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
    position: 'absolute',
    left: isOpen ? 0 : -300,
    zIndex: z.SIDENAV.general.v,
    '& > *': {
      position: 'relative',
      zIndex: z.SIDENAV.entry.v,
    },
    '& > svg': {
      transition: 'all .3s',
      position: 'absolute',
      top: 15,
      left: isOpen ? 270 : 315,
      zIndex: z.SIDENAV.icon.v,
      cursor: 'pointer',
    },
    '& > #overlay': {
      transition: 'background-color 1s',
      position: 'absolute',
      backgroundColor: isOpen ? theme.defaults.black : 'transparent',
      opacity: 0.3,
      zIndex: z.PAGE.overlay.v,
      width: isOpen ? '100vw' : 0,
      height: isOpen ? '100vh' : 0,
    },
  });
}

const SideNav: FunctionComponent<Props> = ({ children, blocking }) => {
  const {
    selected,
    storeDispatch,
    thunkResult: { sidenavThunks },
  } = useStoreSelector(loadSidenav(), (storeState) => storeState.sidenav);
  const {
    thunkResult: { mapThunks },
  } = useStoreSelector(loadMap(), (storeState) => storeState.map);

  const theme = useContext(ThemeContext).theme;
  return useMemo(() => {
    const open = () => {
      storeDispatch(sidenavThunks.open());
    };

    const close = () => {
      storeDispatch(sidenavThunks.close());
      storeDispatch(mapThunks.unselect());
    };

    return (
      <div css={getStyle(selected?.open || false, theme)}>
        {blocking && <div role={'overlay'} id={'overlay'} onClick={close} />}
        <FontAwesomeIcon
          color={theme.defaults.white}
          size={'sm'}
          rotation={selected?.open ? undefined : 180}
          icon={selected?.open ? faAngleDoubleLeft : faBars}
          onClick={() => (selected?.open ? close() : open())}
        />
        <SidenavHeader />
        <SidenavBody item={selected?.data} />
        {children}
        <SidenavFooter />
      </div>
    );
  }, [theme, selected]);
};

export default SideNav;
