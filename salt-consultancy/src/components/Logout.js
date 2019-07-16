import { CookiesProvider, withCookies, useCookies } from 'react-cookie';
import React, {
  Component
} from 'react';


const Logout = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['name']);
  const logOut1 = () => {
    removeCookie('user');
  }
  const user = cookies.user;
  return (
    <div className="Welcome">
      <p>Welcome {user}</p>
      <button onClick={logOut1}>Log Out</button>
    </div>
  );
}


export default Logout;
