import React from 'react';
import './App.css';
import './Calendar.css';
import './Developers.css';
import './Home.css';
import './components/Calendar/Legend.css';
import { BrowserRouter, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Developers from './components/Developers';
import Booking from './components/Booking';
import Projects from './components/Projects';
import Blog from './components/Blog';
import CustomNavbar from './components/Navbar';

export const AuthContext = React.createContext({
  user: null,
  isAuthenticated: null,
  currentMonth: [new Date().getMonth() + 1, new Date().getFullYear()]
});



function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
      <AuthContext.Provider>
      <CustomNavbar/>
        <header className="App-header">
          <h1>Salt Consultancy</h1>
        </header>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/developers" component={Developers} />
          <Route path="/booking" component={Booking} />
          <Route path="/projects" component={Projects} />
          <Route path="/blog" component={Blog} />
        </div>
        </AuthContext.Provider>
      </BrowserRouter>
    </CookiesProvider>

  );
}


export default App;
