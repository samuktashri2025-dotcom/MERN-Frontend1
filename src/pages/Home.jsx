import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../services/api.js';

const styles = [
  ['Ballet', 'Posture, strength and grace. Beginner to advanced.'],
  ['Hip hop', 'Grooves, freestyle and choreography to current tracks.'],
  ['Salsa & bachata', 'Partner dancing with a social night every month.'],
  ['Contemporary', 'Floor work, release and expressive movement.'],
  ['Little movers', 'Playful classes for ages 4 to 7.'],
];

const schedule = [
  ['Monday', '6:00 pm', 'Ballet basics', 'Beginner'],
  ['Tuesday', '7:30 pm', 'Hip hop', 'All levels'],
  ['Wednesday', '5:00 pm', 'Little movers', 'Ages 4–7'],
  ['Thursday', '7:00 pm', 'Salsa & bachata', 'Beginner'],
  ['Saturday', '10:30 am', 'Contemporary', 'Intermediate'],
];

function formatClassSlot(slot) {
  const startsAt = new Date(slot.startsAt);
  return [
    new Intl.DateTimeFormat(undefined, { weekday: 'long' }).format(startsAt),
    new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(startsAt),
    slot.title,
    slot.level || 'All levels',
  ];
}

export default function Home() {
  const [displayStyles, setDisplayStyles] = useState(styles);
  const [displaySchedule, setDisplaySchedule] = useState(schedule);
  const [liveDataError, setLiveDataError] = useState('');

  useEffect(() => {
    Promise.all([apiRequest('/dance-styles'), apiRequest('/slots')])
      .then(([styleResult, slotResult]) => {
        setDisplayStyles(styleResult.danceStyles.map(({ name, description }) => [name, description]));
        setDisplaySchedule(slotResult.slots.map(formatClassSlot));
      })
      .catch((error) => {
        setLiveDataError(`Showing sample studio information because live classes and styles could not be loaded: ${error.message}`);
      });
  }, []);

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Find your <em>rhythm</em></h1>
          <p>Classes in ballet, hip hop, salsa and contemporary for ages 4 to 74. Your first class is free, and no experience is needed.</p>
          <Link className="btn" to="/signin">Book a free class</Link>
          <Link className="btn alt" to="/about">Meet the studio</Link>
        </div>
      </section>
      <section>
        <div className="wrap">
          <h2>What you can learn</h2>
          <p className="lead">Every class is small, capped at 14 dancers, so your teacher sees you.</p>
          {liveDataError && <p className="form-error" role="status">{liveDataError}</p>}
          <div className="styles">
            {displayStyles.map(([name, description]) => (
              <article className="style" key={name}>
                <h3>{name}</h3><p>{description}</p>
              </article>
            ))}
            {!displayStyles.length && <p>No dance styles are currently published.</p>}
          </div>
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <h2>Weekly timetable</h2>
          <div className="table-scroll">
            <table>
              <thead><tr><th>Day</th><th>Time</th><th>Class</th><th>Level</th></tr></thead>
              <tbody>
                {displaySchedule.map((row, index) => <tr key={`${row[0]}-${row[1]}-${index}`}>{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{cell}</td>)}</tr>)}
                {!displaySchedule.length && <tr><td colSpan="4">No classes are currently scheduled.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap">
          <h2>Dancers at home here</h2>
          <div className="stats">
            <div><b>1,200+</b>students since 2012</div>
            <div><b>14</b>dancers per class, maximum</div>
            <div><b>9</b>qualified teachers</div>
          </div>
        </div>
      </section>
    </>
  );
}
