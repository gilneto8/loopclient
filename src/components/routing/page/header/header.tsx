import React, { FunctionComponent } from 'react';
import { navigate } from 'gatsby';
import { Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { MAP_ROUTES } from '../../../../templates/map/map-routes';
import { css } from '@emotion/core';

const staticStyle = css({
  backgroundColor: '#142430'
});

const Header: FunctionComponent<any> = () => (
  <div css={staticStyle}>
    <header className="sticky-top header">
      <Navbar variant="dark">
        <div className="container d-print-inline-flex justify-content-center">
          <Nav.Link>
            <FontAwesomeIcon color={'white'} size={'2x'} icon={faMap} onClick={() => navigate(MAP_ROUTES.getHref())} />
          </Nav.Link>
        </div>
      </Navbar>
    </header>
  </div>
);

export default Header;
