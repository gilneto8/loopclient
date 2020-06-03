// TODO https://stackoverflow.com/questions/60482018/make-a-sidebar-from-react-bootstrap
// TODO https://www.gatsbyjs.org/packages/gatsby-theme-elements/
import React, { useState } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as _ from 'lodash';

type Props = {};

function getStyle({ visible }: any): SerializedStyles {
  return css({
    transition: 'width 0.3s',
    backgroundColor: '#142430',
    width: visible ? 300 : 50,
    height: '100%',
    position: 'absolute',
    left: 0,
    zIndex: 1040,
    '& > svg': {
      transition: 'all 0.3s',
      position: 'relative',
      top: 20,
      left: visible ? 285 : 35,
      zIndex: 1041,
      cursor: 'pointer',
    },
  });
}

const SideNav = (props: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <div css={getStyle({ visible })}>
        <FontAwesomeIcon
          color={'white'}
          size={'2x'}
          rotation={visible ? undefined : 180}
          icon={faArrowCircleLeft}
          onClick={() => setVisible(!visible)}
        />
      </div>
    </>
  );
};

export default SideNav;
