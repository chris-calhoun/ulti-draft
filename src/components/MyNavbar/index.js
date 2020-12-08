import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
import Auth from '../Auth';

export default function MyNavbar(props) {
  const { authed } = props;
  // console.warn(authed);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link className="navbar-brand" to='/'>ulti.draft</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <Link className="nav-link" to='/'>Home</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to='/leagues'>Leagues</Link>
            </NavItem>
          </Nav>
          <Auth authed={authed}/>
          </Collapse>
      </Navbar>
    </div>
  );
}
