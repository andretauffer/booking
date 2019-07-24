import React, { useState, useReducer } from 'react';
import { useCookies } from 'react-cookie';
import { CounterContext } from './Context';
import { useContext } from 'react';

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['name']);
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [loggedIn, setLoggedIn] = useState(cookies.user ? true : false);
  const [user, setUser] = useState();
  const { state, dispatch } = useContext(CounterContext);
  
  
  const handleChangeUsername = e => {
    setUsername(e.target.value);
  }

  const handleChangePassword = e => {
    setPassword(e.target.value);
  }

  const logOut = () => {
    dispatch({type: "logout"});
    removeCookie('user');
    setLoggedIn(false);
    setUsername();
    setPassword();
  }
 
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    }).then(response => response.json())
      .then(data => {
        if (data.login) {
          dispatch({type: "login"});
          setCookie('user', data.id);
          setUser(data.name);
          setLoggedIn(true);
        }
        if (!data.login) {
          // setUser('');
          console.log(data.status);
        }
      });
  }

  if (loggedIn) {
    return (
      <div className="Welcome">
        <p>Welcome {user}</p>
        <button onClick={logOut}>Log Out</button>
      </div>

    );
  }
  else {
    return (
      <div className="Welcome">
        <form onSubmit={handleSubmit}>
          Username: 
        <input
            type="text"
            placeholder="Username"
            onChange={handleChangeUsername}
          />
          Password: 
        <input
            type="password"
            placeholder="Password"
            onChange={handleChangePassword}
          />
          <button type="submit">Login</button>
        </form>
      </div>


    );
  }
}
export default Login;


