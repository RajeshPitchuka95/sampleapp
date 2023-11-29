import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from "reactstrap";

const Header = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand>Sample App</NavbarBrand>
        <NavbarToggler />
        <Collapse navbar className="justify-content-end">
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>
                Home
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/about" className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}>
                About
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/contact" className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'}>
                Contact
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
