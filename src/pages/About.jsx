import PageHead from '../components/PageHead.jsx';

const teachers = [
  ['ER', 'Elena Ruiz', 'Director and ballet teacher. 20 years on stage and in the classroom.'],
  ['MO', 'Marcus Okoye', 'Hip hop and contemporary. Choreographer for regional touring shows.'],
  ['LP', 'Lucía Paredes', 'Salsa and bachata. Competed internationally before teaching.'],
];

export default function About() {
  return (
    <>
      <PageHead title="About the studio">Two sprung maple floors, mirrors on every wall, and teachers who remember your name.</PageHead>
      <section>
        <div className="wrap">
          <h2>Our story</h2>
          <p className="lead">Maple Floor opened in 2012 in a converted print shop. Founder Elena Ruiz wanted a studio where adults could start from zero and children could dance without competing. That idea still guides how we teach: clear technique, kind feedback, and a performance each June for anyone who wants one.</p>
          <h2 className="section-title">Our teachers</h2>
          <div className="team">
            {teachers.map(([initials, name, bio]) => (
              <article className="person" key={name}>
                <div className="avatar" aria-hidden="true">{initials}</div>
                <h3>{name}</h3><p>{bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
