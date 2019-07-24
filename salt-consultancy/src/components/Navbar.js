import { Navbar, Nav } from 'react-bootstrap';
import React, { useRef } from 'react';
import Login from './Login';
import { LinkContainer } from 'react-router-bootstrap';


const scrollToRef = (ref) => {
  window.scrollTo(0, ref.current.offsetTop)
}



const CustomNavbar = (props) => {


  return (
    <Navbar className="bg-transparent" bg="light" expand="lg">
    <Navbar.Brand><img className='logo-container' src='/img/consult.png'></img></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
        <Nav.Link onClick={() => scrollToRef(props.dev)}>Developers</Nav.Link>
        <Nav.Link onClick={() => scrollToRef(props.book)}>Projects</Nav.Link>
        <LinkContainer to="/booking"><Nav.Link>Booking</Nav.Link></LinkContainer>
        <LinkContainer to="/contact"><Nav.Link>Contact</Nav.Link></LinkContainer>
        <LinkContainer to="/about"><Nav.Link>About</Nav.Link></LinkContainer>
      </Nav>
      <Login/>
    </Navbar.Collapse>
  </Navbar>
  );
}


export default CustomNavbar;