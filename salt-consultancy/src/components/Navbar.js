import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Form, FormControl, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import Login from './Login';
import { BrowserRouter, Route, Link } from "react-router-dom";

const CustomNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand>Salt Consultancy</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link><Link to="/">Home</Link></Nav.Link>
        <Nav.Link><Link to="/developers">Developers</Link></Nav.Link>
        <Nav.Link><Link to="/projects">Projects</Link></Nav.Link>
        <Nav.Link><Link to="/booking">Booking</Link></Nav.Link>
        <Nav.Link><Link to="/contact">Contact</Link></Nav.Link>
        <Nav.Link><Link to="/blog">Blog</Link></Nav.Link>
        <Nav.Link><Link to="/about">About</Link></Nav.Link>
      </Nav>
      <Login/>
    </Navbar.Collapse>
  </Navbar>
  );
}


export default CustomNavbar;