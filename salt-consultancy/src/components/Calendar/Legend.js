import React, { useState, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { CounterContext } from '../Context';



const Legend = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['name']);
  const [loggedIn, setLoggedIn] = useState(cookies.user ? true : false);
  const { state, dispatch } = useContext(CounterContext);

  useEffect(() => {
  }, [state.count]);

  if (state.count || cookies.user) {
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