import React, { ReactNode, useState } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { faAngleDoubleLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import z from '../../../ui/constants/z-indexes';
import Header from './components/header/header';

type Props = {
  blocking?: boolean;
  children?: ReactNode;
};

function getStyle(isOpen: boolean): SerializedStyles {
  return css({
    transition: 'all .3s',
    paddingRight: 45,
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
      transition: 'left .3s',
      position: 'absolute',
      top: 15,
      left: isOpen ? 265 : 315,
      zIndex: z.SIDENAV.icon.v,
      cursor: 'pointer',
    },
    '& > #overlay': {
      transition: 'background-color .5s',
      position: 'absolute',
      backgroundColor: isOpen ? 'black' : 'transparent',
      opacity: 0.2,
      zIndex: z.PAGE.overlay.v,
      width: isOpen ? '100vw' : 0,
      height: isOpen ? '100vh' : 0,
    },
  });
}

const SideNav = ({ children, blocking }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div css={getStyle(isOpen || false)}>
      {blocking && <div id={'overlay'} onClick={() => setIsOpen(false)} />}
      <FontAwesomeIcon
        color={'white'}
        size={'lg'}
        rotation={isOpen ? undefined : 180}
        icon={isOpen ? faAngleDoubleLeft : faBars}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Header />
      {children}
    </div>
  );
};

export default SideNav;
