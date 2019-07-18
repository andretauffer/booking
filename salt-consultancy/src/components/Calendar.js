import React, {
  useState, useEffect
} from 'react';

const Calendar = () => {
  const [calendar, setCalendar] = useState([]);
  const [booked, setBooked] = useState([]);

  useEffect(() => {
    fetch('/api/getCalendar')
      .then(response => response.json())
      .then(data => {
        data.sort(compare);
        setCalendar(data);
      });
  }, []);

  const compare = (a, b) => {
    let order = parseInt(a.day) < parseInt(b.day) ? -1 : 1;
    return order;
  }

  const book = (e, date) => {
    e.target.className = e.target.className === 'selected' ? '' : 'selected'; 
    const a = [...booked];
    a.indexOf(date) === -1 ? a.push(date) : a.splice(a.indexOf(date), 1);
    setBooked(a);
  }

  const bookDays = async () => {
    await fetch('/db/updateCalendar', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booked)
    }).then(response => response.json())
      .then(data => {
        data.sort(compare);
        setCalendar(data);
      });
  }

  return (
    <div>
      <div className="grid-container">
        <div className='weekday'>Monday</div><div className='weekday'>Tuesday</div><div className='weekday'>Wednesday</div><div className='weekday'>Thursday</div><div className='weekday'>Friday</div><div className='weekday'>Saturday</div><div className='weekday'>Sunday</div>
        {calendar.map((date, i) => {
          if (date.availability === 1) {
            return <div onClick={(e) => book(e, date.day)} key={i}>{date.day}</div>
          }
          if (date.availability === 0) {
            return <div className='booked' key={i}>{date.day}</div>
          }
        })
        }
      </div>
      <button onClick={() => bookDays()}>Book now</button>
    </div>
  );
}



export default Calendar;