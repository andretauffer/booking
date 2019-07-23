import React, {
  useState, useEffect, useContext
} from 'react';
import { useCookies } from 'react-cookie';

const CalWidget = () => {
  const [calendar, setCalendar] = useState([]);
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const date = new Date().toISOString().split('T')[0];
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    let uri = `/api/getCalendar/${year}/${month}`
    fetch(uri)
      .then(response => response.json())
      .then(data => {
        setCalendar(appendDeadSpace(data));
      });
  }, []);
  
  function appendDeadSpace(data) {
    const dummy = { dummy: true };
    const beginning = Array(data[0].weekday - 1).fill(dummy);
    const end = Array(7 - data.slice(-1)[0].weekday).fill(dummy);
    data.unshift(...beginning);
    data.push(...end);
    return data;
  }


  return (
    <div>
      <h3>{monthNames[month - 1]} {year}</h3>
      <div className="grid-container1">
        <div className='weekday'>M</div><div className='weekday'>T</div><div className='weekday'>W</div><div className='weekday'>T</div><div className='weekday'>F</div><div className='weekday'>S</div><div className='weekday'>S</div>
        {calendar.map((dayData, i) => {
          if (dayData.dummy) {
            return <div className="weekend" key={i}></div>
          }
          if (dayData.date > date) {
            if (dayData.availability === 1) {
              if (((i + 1) % 7 === 0 || (i - 5) % 7 === 0)) {
                return <div className="weekend" key={i}>{dayData.day}</div>
              } else {
                return <div id={dayData.id} className="notBooked" key={i}>{dayData.day}</div>
              }
            }
            if (dayData.availability === 0) {
              if (((i + 1) % 7 === 0 || (i - 5) % 7 === 0)) {
                return <div className="weekend" key={i}>{dayData.day}</div>
              } else {
                return <div className='booked' key={i}>{dayData.day}</div>
              }
            }
          } else {
            return <div className="weekend" key={i}>{dayData.day}</div>
          }
        })}
      </div>
    </div>
  );
}

export default CalWidget;