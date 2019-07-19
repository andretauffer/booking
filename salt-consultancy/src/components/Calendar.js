import React, {
  useState, useEffect
} from 'react';

const Calendar = () => {
  const [calendar, setCalendar] = useState([]);
  const [selected, setSelected] = useState([]);
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
    for (let i = 1; i < val; i++) {
      res.push({ dummy: true })
    }
    return res;
  }
  const appendEnd = (val) => {
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

  const selectDays = (e, id) => {
    const currSelection = [...selected];
    if(currSelection.filter(el => el === id).length !== 0) {
      currSelection.splice(currSelection.indexOf(id), 1)
      e.target.className = '';
    } else {
      currSelection.push(id);
      e.target.className = 'selected'
    }
      setSelected(currSelection);
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
      body: JSON.stringify({ days: selected, user: 4, month: month, year: 2019 })
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
        <div className='weekday'>M</div><div className='weekday'>T</div><div className='weekday'>W</div><div className='weekday'>T</div><div className='weekday'>F</div><div className='weekday'>S</div><div className='weekday'>S</div>
        {calendar.map((dayData, i) => {
          if (dayData.dummy) {
            if (((i + 1) % 7 === 0 || (i - 5) % 7 === 0)) {
              return <div className="weekend" key={i}></div>
            } else {
              return <div key={i}></div>
            }
          }
          if (dayData.availability === 1) {
            if (((i + 1) % 7 === 0 || (i - 5) % 7 === 0)) {
              return <div className="weekend" key={i}>{dayData.day}</div>
            } else {
              return <div id={dayData.id} onClick={(e) => selectDays(e, dayData.id)} key={i}>{dayData.day}</div>
            }
          }
          if (dayData.availability === 0) {
            if (((i + 1) % 7 === 0 || (i - 5) % 7 === 0)) {
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