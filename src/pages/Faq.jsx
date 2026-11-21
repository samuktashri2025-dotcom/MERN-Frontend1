import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import { apiRequest } from '../services/api.js';

const questions = [
  ['Do I need experience to join?', 'No. Most classes have a beginner level, and teachers adapt moves to suit you.'],
  ['What should I wear to my first class?', 'Comfortable clothes you can move in. Ballet needs soft shoes or bare feet; hip hop needs clean trainers; salsa works with smooth-soled shoes.'],
  ['Is the first class really free?', 'Yes. Sign up, choose a class from the timetable, and turn up 10 minutes early.'],
  ['How much do classes cost?', 'Single classes are $18. Packs of 10 are $150, and unlimited monthly membership is $95.'],
  ['What if I miss a class?', 'Cancel at least 12 hours ahead and your credit stays on your account for 90 days.'],
  ['Do you teach children and teenagers?', 'Yes. Little movers is for ages 4 to 7, and ballet, hip hop and contemporary have youth groups.'],
  ['Can I book private lessons or a wedding dance?', 'Yes. Use the contact form and tell us your date and the style you want.'],
];

export default function Faq() {
  const [items, setItems] = useState(questions.map(([question, answer]) => ({ question, answer })));
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    apiRequest('/faqs')
      .then(({ faqs }) => setItems(faqs))
      .catch((error) => setLoadError(`Showing saved FAQs because the live FAQ list could not be loaded: ${error.message}`));
  }, []);

  return (
    <>
      <PageHead title="Frequently asked questions">
        Can't find your answer? <Link className="head-link" to="/contact">Ask us</Link>.
      </PageHead>
      <section>
        <div className="wrap faq-list">
          {loadError && <p className="form-error" role="status">{loadError}</p>}
          {items.map(({ question, answer }) => (
            <details key={question}><summary>{question}</summary><p>{answer}</p></details>
          ))}
          {!items.length && <p>No FAQs have been published yet.</p>}
        </div>
      </section>
    </>
  );
}
