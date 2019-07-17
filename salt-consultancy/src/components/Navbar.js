import { Navbar, Nav } from 'react-bootstrap';
import React from 'react';
import Login from './Login';
import { LinkContainer } from 'react-router-bootstrap';

const CustomNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand><img className='logo-container' src='/img/1b8b9301-9b1d-4519-a2d0-5bf3c01e343d_200x200.png'></img></Navbar.Brand>
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