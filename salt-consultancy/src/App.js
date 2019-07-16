import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { CookiesProvider, withCookies, useCookies } from 'react-cookie';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Developers from './components/Developers';
import Booking from './components/Booking';
import Projects from './components/Projects';
import Login from './components/Login';
import Blog from './components/Blog';
import Logout from './components/Logout';


function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
      <Logout/>
        <header className="App-header">
          <h1>
            Salt Consultancy
        </h1>
          <h3>JavaScript Full-Stack Developers for You!</h3>
        </header>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/developers">Developers</Link>
            </li>
            <li>
              <Link to="/booking">Booking</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
          <hr />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/contact" component={Contact} />
          <Route path="/developers" component={Developers} />
          <Route path="/booking" component={Booking} />
          <Route path="/projects" component={Projects} />
          <Route path="/blog" component={Blog} />
        </div>
      </BrowserRouter>
    </CookiesProvider>

  );
}


export default App;
