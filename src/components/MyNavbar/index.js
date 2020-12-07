import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';

export default function MyNavbar() {
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
          </Collapse>
      </Navbar>
    </div>
  );
}
