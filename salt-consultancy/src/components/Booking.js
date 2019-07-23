import React from 'react';
import Calendar from './Calendar';
import Legend from './Calendar/Legend';



function Booking() {
  return (
    <div>
      <div className='legend'>
        <Legend />
      </div>
      <Calendar />
      <div className="BookingContainer">
        <br></br>
      </div>
    </div>
  )
}

export default Booking;
