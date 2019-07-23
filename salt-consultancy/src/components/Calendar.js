import React, {
  useState, useEffect, useContext
} from 'react';
import { useCookies } from 'react-cookie';
import AuthContext from '../App';


const Calendar = () => {
  const [calendar, setCalendar] = useState([]);
  const [selected, setSelected] = useState([]);
  const [unbookingId, setunbookingId] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['name']);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const date = new Date().toISOString().split('T')[0];
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const andre = useContext(AuthContext)
  console.log(andre)

  useEffect(() => {
    const bookInfo = document.querySelector('.booking-info');
    bookInfo.style.display = 'none';
    if (year === 2019 && month === 1) {
      document.querySelector('#prev').style.display = 'none';
    } else {
      document.querySelector('#prev').style.display = '';
    }
    let uri = `/api/getCalendar/${year}/${month}`
    fetch(uri)
      .then(response => response.json())
      .then(data => {
        setCalendar(appendDeadSpace(data));
      });
  }, [month, cookies]);


  function appendDeadSpace(data) {
    const dummy = {dummy: true};
    const beg = Array(data[0].weekday - 1).fill(dummy);
    const end = Array(7 - data.slice(-1)[0].weekday).fill(dummy);
    data.unshift(...beg);
    data.push(...end);
    // const end = data.slice(-1)[0].weekday;
    // for (let i = 1; i < beg; i++) {
    //   data.unshift(dummy);
    // }
    // for (let i = 1; i <= (7 - end); i++) {
    //   data.push(dummy);
    // }
    return data;
  }

  const selectDays = (e, id) => {
    if (e.target.class !== 'userBook') {
      const currSelection = [...selected];
      if (currSelection.filter(el => el === id).length !== 0) {
        currSelection.splice(currSelection.indexOf(id), 1)
        e.target.className = '';
      } else {
        currSelection.push(id);
        e.target.className = 'selected'
      }
      setSelected(currSelection);
    }
    console.log(selected);
  }

  const openUnbook = (e, id) => {
    const bookInfo = document.querySelector('.booking-info');
    bookInfo.style.display = '';
    console.log(bookInfo);
    setunbookingId([id]);
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
    resetSelection()
  };

  const unbookDays = async () => {
    await fetch('/api/removeBooking', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ days: [unbookingId], user: cookies.user, month: month, year: 2019 })
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        setCalendar(appendDeadSpace(data));
        resetSelection();
        document.querySelector('.booking-info').innerHTML = '<h4>Successfully unbooked</h4>';
      });
  }


  const resetSelection = () => {
    setSelected([]);
    const selectedDivs = Array.from(document.querySelectorAll('.selected'));
    selectedDivs.map(el => {
      el.className = '';
    })
  }

  const bookDays = async () => {
    if (!cookies.user) {
      alert('You need to log in to book a time');
    }
    await fetch('/api/updateCalendar', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ days: selected, user: cookies.user, month: month, year: 2019 })
    }).then(response => response.json())
      .then(data => {
        setCalendar(appendDeadSpace(data));
        setSelected([]);
      });
  }
  return (
    <div>
      <h3>{monthNames[month - 1]} {year}</h3>
      <div className="grid-container1">
        <div className='weekday'>M</div><div className='weekday'>T</div><div className='weekday'>W</div><div className='weekday'>T</div><div className='weekday'>F</div><div className='weekday'>S</div><div className='weekday'>S</div>
        {calendar.map((dayData, i) => {
          if (dayData.dummy) {
            return <div className="weekend" key={i}></div>

            // if (((i + 1) % 7 === 0 || (i - 5) % 7 === 0)) {
            //   return <div className="weekend" key={i}></div>
            // } else {
            //   return <div key={i}></div>
            // }
          }
          if (dayData.date > date) {
            if (dayData.availability === 1) {
              if (((i + 1) % 7 === 0 || (i - 5) % 7 === 0)) {
                return <div className="weekend" key={i}>{dayData.day}</div>
              } else {
                return <div id={dayData.id} className="notBooked" onClick={(e) => selectDays(e, dayData.id)} key={i}>{dayData.day}</div>
              }
            }
            if (dayData.availability === 0) {
              if (((i + 1) % 7 === 0 || (i - 5) % 7 === 0)) {
                return <div className="weekend" key={i}>{dayData.day}</div>
              } else {
                if (dayData.thisUser) {
                  return <div id={dayData.id} onClick={(e) => openUnbook(e, dayData.id)} className="userBook" key={i}>{dayData.day}</div>
                } else {
                  return <div className='booked' key={i}>{dayData.day}</div>
                }
              }
            }
          } else {
            if (dayData.thisUser) {
              return <div className="userBook" key={i}>{dayData.day}</div>
            } else {
              return <div className="weekend" key={i}>{dayData.day}</div>
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
      <div className='booking-info'>
        <h4>Booking info:</h4>
        <p className='booking-text'>Are you sure you want to unbook?</p>
        <button onClick={(e) => unbookDays()}>Yes</button>
        <button>No</button>
      </div>
    </div>
  );
}

export default Calendar;