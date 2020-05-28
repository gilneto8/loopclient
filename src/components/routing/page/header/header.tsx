import React, { FunctionComponent } from 'react';
import { navigate } from 'gatsby';
import { Nav, Navbar } from 'react-bootstrap';
import { INDEX_ROUTE } from '../../index-routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import './header-styles.scss';

const Header: FunctionComponent<any> = (props) => (
  <>
    <header className="sticky-top header">
      <Navbar variant="dark">
        <div className="container">
          <Navbar.Brand>
            <Nav.Link className="border-muted-light">
              <FontAwesomeIcon size={'2x'} icon={faHome} onClick={() => navigate(INDEX_ROUTE.getHref())} />
            </Nav.Link>
          </Navbar.Brand>
        </div>
      </Navbar>
    </header>
  </>
);

export default Header;
