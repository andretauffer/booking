import React from 'react';

export default function Legend () {
  return (
    <div className='legend-container'>
      <div>
        <div className='booked-legend'></div>
        <div>Booked</div>
      </div>
      <div>
        <div className='weekend-legend'></div>
        <div>Unavailable</div>
      </div>
    </div>
  )
}