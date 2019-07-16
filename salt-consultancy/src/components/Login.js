import React, { useState} from 'react';
import { useCookies } from 'react-cookie';


const Login = props => {
  const [cookies, setCookie, removeCookie] = useCookies(['name']);
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const handleChangeUsername = e => {
    setUsername(e.target.value);
  }

  const handleChangePassword = e => {
    setPassword(e.target.value);
  }

  const handleSubmit = event => {
    fetch('/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password})
    }).then(response => response.json())
    .then(data => {
      if(data.login) {
        setCookie('user', data.name);
        window.location = '/';
      }
      if(!data.login) {
        console.log(data.status);
      }
    });
    
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      Username:
        <input
        type="text"
        onChange={handleChangeUsername}
      />
      Password:
        <input
        type="password"
        onChange={handleChangePassword}
      />
      <button type="submit">Login</button>
    </form>
  );
}


export default Login;
