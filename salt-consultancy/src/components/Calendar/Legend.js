import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const Legend = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['name']);
  const [loggedIn, setLoggedIn] = useState(cookies.user ? true : false);

  if (loggedIn) {
    return (
      <div>
        <div className='legend-container'>
          <div className='available-legend'></div>
          <p>Available</p>
          <div className='booked-legend'></div>
          <p>Booked</p>
          <div className='weekend-legend'></div>
          <p>Unavailable</p>
          <div className='users-legend'></div>
          <p>My bookings</p>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div className='legend-container'>
        <div className='available-legend'></div>
          <p>Available</p>
          <div className='booked-legend'></div>
          <p>Booked</p>
          <div className='weekend-legend'></div>
          <p>Unavailable</p>
        </div>
      </div>
    )
  }
}

export default Legend;
