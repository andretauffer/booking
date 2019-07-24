import React, {
  useState, useEffect, useContext
} from 'react';
import { useCookies } from 'react-cookie';
import AuthContext from '../App';
import { CounterContext } from './Context';


const Calendar = () => {
  const [calendar, setCalendar] = useState([]);
  const [selected, setSelected] = useState([]);
  const [unbookingId, setunbookingId] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['name']);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [bookState, setBookState] = useState(0)
  const date = new Date().toISOString().split('T')[0];
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const andre = useContext(AuthContext);
  let bookingText = '';
  const { state, dispatch } = useContext(CounterContext);


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
  }, [month, cookies, state, bookState]);

  const appendDeadSpace = data => {
    const dummy = { dummy: true };
    const beginning = Array(data[0].weekday - 1).fill(dummy);
    const end = Array(7 - data.slice(-1)[0].weekday).fill(dummy);
    data.unshift(...beginning);
    data.push(...end);
    return data;
  }

  const selectDays = (e, id) => {
    if (e.target.className !== 'userBook') {
      const currSelection = [...selected];
      if (currSelection.filter(el => el === id).length > 0) {
        currSelection.splice(currSelection.indexOf(id), 1)
        e.target.className = 'notBooked';
      } else {
        currSelection.push(id);
        e.target.className = 'selected'
      }
      setSelected(currSelection);
    }
    setBookState(1);
  }

  const openConfirmation = (booking, id) => {
    const bookText = document.querySelector('.booking-text');
    const bookInfo = document.querySelector('.booking-info');
    if(!booking) {
      bookText.innerText = 'Do you want to unbook?';
      setunbookingId(id);
      setBookState(0);
    } else {
      let textaaa = '';
      selected.forEach(id => {
        calendar.forEach(day => {
          if(day.id === id) {
            textaaa += `<br>${day.date}</br>`;
          }
        })
        
      });
      bookText.innerHTML = `
      <p>Booked days: ${textaaa}</p>
      <p>Cost of booking: ${selected.length * 1500} SEK ex taxes</p>
      <p>Do you want to book?</p>`;
      console.log(selected);
    }
      bookInfo.style.display = '';
  }

  const resetSelection = () => {
    setSelected([]);
    const selectedDivs = Array.from(document.querySelectorAll('.selected'));
    selectedDivs.map(el => {
      el.className = 'notBooked';
    })
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

  const bookDays = async () => {
    const bookInfo = document.querySelector('.booking-info');
    const bookText = document.querySelector('.booking-text');
    // if (!state.count) {
    //   alert('You need to log in to book a time');
    // }
    if(bookState) {
      let uri = '/api/updateCalendar';
      serverReq(uri, selected);
      bookText.innerText = 'Booking successful!'
    } else {
      let uri = '/api/removeBooking';
      serverReq(uri, [unbookingId]);
      bookText.innerText = 'Unbooking successful!'
    }
    setTimeout(() => {
      bookInfo.style.display = 'none';
    }, 1000);
  }

  const serverReq = async (uri, days) => {
    console.log(uri);
    console.log(days);
    await fetch(uri, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ days: days, user: cookies.user, month: month, year: year })
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
                  return <div id={dayData.id} onClick={(e) => openConfirmation(0, dayData.id)} className="userBook" key={i}>{dayData.day}</div>
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
        <button onClick={() => openConfirmation(1)}>Book now</button>
      </div>
      <div className='booking-info'>
        <h4>Booking info:</h4>
        <p className='booking-text'></p>
        <button onClick={(e) => bookDays()}>Yes</button>
        <button>No</button>
      </div>
    </div>
  );
}

export default Calendar;