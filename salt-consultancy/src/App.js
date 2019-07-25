import './Style/App.css';
import './Style/About.css';
import './Style/Projects.css';
import './Style/Calendar.css';
import './Style/Developers.css';
import './Style/Home.css';
import './Style/Booking.css';
import './Style/Parallax.css';
import './Style/Login.css';
import './Style/Legend.css';
import './Style/Navbar.css';
import React, { useRef } from 'react';
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import Home from './components/Home';
import About from './components/About';
import Developers from './components/Developers';
import Booking from './components/Booking';
import Projects from './components/Projects';
import CustomNavbar from './components/Navbar';
import Footing from './components/Footing'
import { ParallaxProvider } from 'react-scroll-parallax';
import { CounterProvider } from './components/Context';

function App() {

  let developersRef = useRef(null)
  let bookingRef = useRef(null)
  let projectsRef = useRef(null)
  let aboutRef = useRef(null)
  let homeRef = useRef(null)

  return (
    <CookiesProvider>
      <BrowserRouter>
          <ParallaxProvider>
            <CounterProvider>
              <div className="custNav">
                <CustomNavbar dev={developersRef} book={bookingRef} proj={projectsRef} about={aboutRef} home={homeRef} />
              </div>
              <div ref={homeRef}><Home book={bookingRef} /></div>
              <div ref={developersRef}> <Developers /> </div>
              <div ref={bookingRef}><Booking /></div>
              <div ref={projectsRef}><Projects /></div>
              <div ref={aboutRef}><About /></div>
              <Footing />
            </CounterProvider>
          </ParallaxProvider>
      </BrowserRouter>
    </CookiesProvider>

  );
}


export default App;
