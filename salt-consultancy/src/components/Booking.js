import React from 'react';
import Calendar from './Calendar';
import Legend from './Calendar/Legend';
import { Parallax } from 'react-scroll-parallax'; 



function Booking() {
  return (
    <Parallax className="custom-class" y={[-15, 20]} tagOuter="figure">
    <div className='booking-container'>
      <h3>Salt Consultancy aims to provide you with fast help to your need of skilled developers that meet your demands. Check the calendar below for available times and book your developer today!</h3>
      <div className='legend'>
        <Legend />
      </div>
      <Calendar />
      <div className="BookingContainer">
        <br></br>
      </div>
    </div>
    </Parallax>
  )
}

export default Booking;
