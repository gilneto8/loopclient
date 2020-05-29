import React, { FunctionComponent } from 'react';
import { navigate } from 'gatsby';
import { Nav, Navbar } from 'react-bootstrap';
import { INDEX_ROUTE } from '../../../../templates/index/index-routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMap } from '@fortawesome/free-solid-svg-icons';
import './header-styles.scss';
import { MAP_ROUTES } from '../../../../templates/map/map-routes';

const Header: FunctionComponent<any> = (props) => (
  <>
    <header className="sticky-top header">
      <Navbar variant="dark">
        <div className="container d-print-inline-flex">
          <Nav.Link className="">
            <FontAwesomeIcon size={'2x'} icon={faHome} onClick={() => navigate(INDEX_ROUTE.getHref())} />
          </Nav.Link>
          <Nav.Link className="">
            <FontAwesomeIcon size={'2x'} icon={faMap} onClick={() => navigate(MAP_ROUTES.getHref())} />
          </Nav.Link>
        </div>
      </Navbar>
    </header>
  </>
);

export default Header;
