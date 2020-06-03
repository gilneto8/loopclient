import React, { ReactNode, useState } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { faAngleDoubleLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import z from '../../../ui/constants/z-indexes';

type Props = {
  children?: ReactNode;
};

function getStyle({ visible }: any): SerializedStyles {
  return css({
    transition: 'all .3s',
    backgroundColor: '#142430',
    width: visible ? 300 : 0,
    height: '100%',
    position: 'absolute',
    left: 0,
    zIndex: z.SIDENAV.general.v,
    '& > svg': {
      transition: 'all .3s',
      position: 'relative',
      top: 15,
      left: visible ? 265 : 15,
      zIndex: z.SIDENAV.icon.v,
      cursor: 'pointer',
    },
  });
}

const SideNav = ({ children }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <div css={getStyle({ visible })}>
        <FontAwesomeIcon
          color={'white'}
          size={'lg'}
          rotation={visible ? undefined : 180}
          icon={visible ? faAngleDoubleLeft : faBars}
          onClick={() => setVisible(!visible)}
        />
        {children}
      </div>
    </>
  );
};

export default SideNav;
