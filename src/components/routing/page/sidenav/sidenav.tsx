import React, { useMemo } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { faAngleDoubleLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import z from '../../../ui/constants/z-indexes';
import SidenavHeader from './components/sidenav-header/sidenav-header';
import { useStoreSelector } from '../../../../logic/store/use-store-selector';
import { loadSidenav } from '../../../../logic/shared/sidenav/sidenav-thunks';
import SidenavBody from './components/sidenav-body/sidenav-body';
import { loadMap } from '../../../../logic/shared/map/map-thunks';

type Props = {
  blocking?: boolean;
};

function getStyle(isOpen: boolean): SerializedStyles {
  return css({
    transition: 'all .3s',
    marginRight: 45,
    backgroundColor: '#142430',
    width: 300,
    height: '100%',
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
      backgroundColor: isOpen ? 'black' : 'transparent',
      opacity: 0.3,
      zIndex: z.PAGE.overlay.v,
      width: isOpen ? '100vw' : 0,
      height: isOpen ? '100vh' : 0,
    },
  });
}

const SideNav = React.memo<Props>(({ children, blocking }) => {
  const {
    selected,
    storeDispatch,
    thunkResult: { sidenavThunks },
  } = useStoreSelector(loadSidenav(), (storeState) => storeState.sidenav);
  const {
    thunkResult: { mapThunks },
  } = useStoreSelector(loadMap(), (storeState) => storeState.map);

  const memoizedStyle = useMemo(() => getStyle(selected?.open || false), [selected]);

  const open = () => {
    storeDispatch(sidenavThunks.open());
  };

  const close = () => {
    storeDispatch(sidenavThunks.close());
    storeDispatch(mapThunks.unselect());
  };

  return (
    <div css={memoizedStyle}>
      {blocking && <div id={'overlay'} onClick={close} />}
      <FontAwesomeIcon
        color={'white'}
        size={'sm'}
        rotation={selected?.open ? undefined : 180}
        icon={selected?.open ? faAngleDoubleLeft : faBars}
        onClick={() => (selected?.open ? close() : open())}
      />
      <SidenavHeader />
      <SidenavBody item={selected?.data} />
      {children}
    </div>
  );
});

export default SideNav;
