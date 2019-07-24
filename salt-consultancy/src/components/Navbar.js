import { Navbar, Nav } from 'react-bootstrap';
import React, { useRef } from 'react';
import Login from './Login';
import { LinkContainer } from 'react-router-bootstrap';


export const scrollToRef = (ref) => {
  // window.scrollTo(0, ref.current.offsetTop)
  window.scrollTo({
    top: ref.current.offsetTop,
    left: 0,
    behavior: 'smooth'
  })
}



const CustomNavbar = (props) => {


  return (
    <Navbar className="bg-transparent" bg="light" expand="lg">
    {/* <Navbar.Brand><img className='logo-container' src='/img/consult.png'></img></Navbar.Brand> */}
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link onClick={() => scrollToRef(props.home)}>Home</Nav.Link>
        <Nav.Link onClick={() => scrollToRef(props.dev)}>Developers</Nav.Link>
        <Nav.Link onClick={() => scrollToRef(props.book)}>Booking</Nav.Link>
        <Nav.Link onClick={() => scrollToRef(props.proj)}>Projects</Nav.Link>
        <Nav.Link onClick={() => scrollToRef(props.about)}>About</Nav.Link>
      </Nav>
      <Login/>
    </Navbar.Collapse>
  </Navbar>
  );
}


export default CustomNavbar;