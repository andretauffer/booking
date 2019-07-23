import { Navbar, Nav } from 'react-bootstrap';
import React from 'react';
import Login from './Login';
import { LinkContainer } from 'react-router-bootstrap';

const CustomNavbar = () => {
  return (
    <Navbar className="testing" bg="light" expand="lg">
    <Navbar.Brand><img className='logo-container' src='/img/consult.png'></img></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
        <LinkContainer to="/developers"><Nav.Link>Developers</Nav.Link></LinkContainer> 
        <LinkContainer to="/projects"><Nav.Link>Projects</Nav.Link></LinkContainer>
        <LinkContainer to="/booking"><Nav.Link>Booking</Nav.Link></LinkContainer>
        <LinkContainer to="/contact"><Nav.Link>Contact</Nav.Link></LinkContainer>
        <LinkContainer to="/blog"><Nav.Link>Blog</Nav.Link></LinkContainer>
        <LinkContainer to="/about"><Nav.Link>About</Nav.Link></LinkContainer>
      </Nav>
      <Login/>
    </Navbar.Collapse>
  </Navbar>
  );
}


export default CustomNavbar;