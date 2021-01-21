import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// enums for nav bar to view own list or full schedule
const VIEW_ENUMS = {
  VIEW_OWN: true,
  VIEW_ALL: false,
};

// interval betweeen time rows
const minuteInterval = 60;

// list of all times to be displayed in table
const times = (() => {
  const hoursAndMinutes = [];

  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += minuteInterval) {
      hoursAndMinutes.push({ hours: i, minutes: j });
    }
  }

  return hoursAndMinutes;
})();

const Schedule = ({ animeList }) => {
  // true = view own list, false = view all currently airing
  const [viewList, setViewList] = useState(VIEW_ENUMS.VIEW_OWN);
  const [scheduleData, setScheduleData] = useState();

  // fetch schedule data from jikan on mount
  useEffect(() => {
    fetch('https://api.jikan.moe/v3/schedule')
      .then((response) => response.json())
      .then((response) => {
        setScheduleData(response);
      });
  }, []);

  const Nav = () => {
    return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            to="#title"
            className={
              viewList === VIEW_ENUMS.VIEW_OWN ? 'nav-link active' : 'nav-link'
            }
            onClick={() => setViewList(VIEW_ENUMS.VIEW_OWN)}
          >
            Own List
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="#title"
            className={
              viewList === VIEW_ENUMS.VIEW_ALL ? 'nav-link active' : 'nav-link'
            }
            onClick={() => setViewList(VIEW_ENUMS.VIEW_ALL)}
          >
            All Airing
          </Link>
        </li>
      </ul>
    );
  };

  const Header = () => {
    return (
      <thead>
        <tr>
          <th scope="col">Time (UTC)</th>
          <th scope="col">Monday</th>
          <th scope="col">Tuesday</th>
          <th scope="col">Wednesday</th>
          <th scope="col">Thursday</th>
          <th scope="col">Friday</th>
          <th scope="col">Saturday</th>
          <th scope="col">Sunday</th>
        </tr>
      </thead>
    );
  };

  // returns range of items for item interval
  function filteredList(dayList, hours, minutes) {
    const filtered = dayList.filter((val) => {
      const animeDate = new Date(val.airing_start);
      return (
        animeDate.getUTCHours() === hours &&
        animeDate.getUTCMinutes() >= minutes &&
        animeDate.getUTCMinutes() < minutes + minuteInterval
      );
    });

    return filtered.map((val, index) => {
      return (
        <Link to={`/anime/${val.mal_id}`}>
          {val.title + (index < filtered.length - 1 ? ', ' : '')}
        </Link>
      );
    });
  }

  const Body = () => {
    let monday, tuesday, wednesday, thursday, friday, saturday, sunday;

    if (viewList === VIEW_ENUMS.VIEW_ALL) {
      if (scheduleData) {
        ({
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
          sunday,
        } = scheduleData);

        return (
          <tbody>
            {times.map((val, index) => {
              return (
                <tr key={index}>
                  <th scope="row">
                    {String(val.hours).padStart(2, '0') +
                      ':' +
                      String(val.minutes).padStart(2, '0')}
                  </th>
                  <td>
                    {scheduleData
                      ? filteredList(monday, val.hours, val.minutes)
                      : null}
                  </td>
                  <td>
                    {scheduleData
                      ? filteredList(tuesday, val.hours, val.minutes)
                      : null}
                  </td>
                  <td>
                    {scheduleData
                      ? filteredList(wednesday, val.hours, val.minutes)
                      : null}
                  </td>
                  <td>
                    {scheduleData
                      ? filteredList(thursday, val.hours, val.minutes)
                      : null}
                  </td>
                  <td>
                    {scheduleData
                      ? filteredList(friday, val.hours, val.minutes)
                      : null}
                  </td>
                  <td>
                    {scheduleData
                      ? filteredList(saturday, val.hours, val.minutes)
                      : null}
                  </td>
                  <td>
                    {scheduleData
                      ? filteredList(sunday, val.hours, val.minutes)
                      : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        );
      } else {
        return (
          <p className="text-danger">
            Something went wrong with fetching the data!
          </p>
        );
      }
    } else if (viewList === VIEW_ENUMS.VIEW_OWN) {
      return null;
    }
  };

  const Table = () => {
    if (!animeList && viewList === VIEW_ENUMS.VIEW_OWN) {
      return (
        <p className="mt-2">
          Please log with your MyAnimeList account if you want to see your
          personalized schedule!
        </p>
      );
    }
    return (
      <table className="table">
        <Header />
        <Body />
      </table>
    );
  };

  return (
    <div>
      <h1 id="title">Schedule</h1>
      <Nav />
      <Table />
    </div>
  );
};

export default Schedule;
