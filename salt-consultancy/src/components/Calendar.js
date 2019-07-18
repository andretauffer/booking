import React, {
  useState, useEffect
} from 'react';

const Calendar = () => {
  const [calendar, setCalendar] = useState([]);
  const [booked, setBooked] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    if (year === 2019 && month === 1) {
      document.querySelector('#prev').style.display = 'none';
    } else {
      document.querySelector('#prev').style.display = '';
    }
    let uri = `/api/getCalendar/${year}/${month}`
    fetch(uri)
      .then(response => response.json())
      .then(data => {
        data.sort(compare);
        const apa = appendBeginning(data[0].weekday)
        data.unshift(...apa);
        const apa1 = appendEnd((data.length % 7) + 1)
        data.push(...apa1);
        setCalendar(data);
      });
  }, [month]);

  const appendBeginning = (val) => {
    const res = [];
    for (let i = 0; i < val; i++) {
      res.push({ dummy: true })
    }
    return res;
  }
  const appendEnd = (val) => {
    // console.log(val);
    const res = [];
    val = 7 - val;
    for (let i = 0; i <= val; i++) {
      res.push({ dummy: true })
    }
    return res;
  }

  const compare = (a, b) => {
    let order = parseInt(a.day) < parseInt(b.day) ? -1 : 1;
    return order;
  }

  const book = (e, dayData) => {
    e.target.className = e.target.className === 'selected' ? '' : 'selected';
    const a = [...booked];
    if (a.length === 0) a.push(dayData);
    else {
      let exist = 0;
      a.forEach((day, i) => {
        if (day.id === dayData.id) exist = i;
      })
      exist === 0 ? a.push(dayData) : a.splice(exist, 1);
    }
    setBooked(a);
  }

  const changeMonth = val => {
    let newMonth = month + val;
    if (newMonth > 12) {
      newMonth = 1;
      setYear(year + 1);
    }
    if (newMonth === 0) {
      newMonth = 12;
      setYear(year - 1);
    }
    setMonth(newMonth);
  };


  const bookDays = async () => {
    await fetch('/api/updateCalendar', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ days: booked, user: 4, month: month, year: 2019 })
    }).then(response => response.json())
      .then(data => {
        data.sort(compare);
        const apa = appendBeginning(data[0].weekday)
        data.unshift(...apa);
        const apa1 = appendEnd((data.length % 7) + 1)
        data.push(...apa1);
        setCalendar(data);
      });
  }
  return (
    <div>
      <h3>{monthNames[month - 1]} {year}</h3>
      <div className="grid-container1">
        <div className='weekday'>Monday</div><div className='weekday'>Tuesday</div><div className='weekday'>Wednesday</div><div className='weekday'>Thursday</div><div className='weekday'>Friday</div><div className='weekday'>Saturday</div><div className='weekday'>Sunday</div>
        {calendar.map((dayData, i) => {
          if (dayData.dummy) {
            if (((i+1) % 7 === 0 || (i - 5) % 7 === 0)) {
              return <div className="weekend" key={i}></div>
            } else {
            return <div key={i}></div>
            }
          }
          if (dayData.availability === 1) {
            if (((i+1) % 7 === 0 || (i - 5) % 7 === 0)) {
              return <div className="weekend" key={i}>{dayData.day}</div>
            } else {
              return <div onClick={(e) => book(e, dayData)} key={i}>{dayData.day}</div>
            }
          }
          if (dayData.availability === 0) {
            if (((i+1) % 7 === 0 || (i - 5) % 7 === 0)) {
              return <div className="weekend" key={i}>{dayData.day}</div>
            } else {
              return <div className='booked' key={i}>{dayData.day}</div>
            }
          }
        })}
      </div>
      <div className="buttons">
        <div>
          <button id="prev" onClick={() => changeMonth(-1)}>Previous month</button>
          <button onClick={() => changeMonth(1)}>Next month</button>
        </div>
        <button onClick={() => bookDays()}>Book now</button>
      </div>
    </div>
  );
}



export default Calendar;