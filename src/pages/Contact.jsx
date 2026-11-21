import { useState } from 'react';
import PageHead from '../components/PageHead.jsx';
import { apiRequest } from '../services/api.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = 'Enter your name.';
    if (!values.email.trim()) nextErrors.email = 'Enter your email.';
    else if (!emailPattern.test(values.email)) nextErrors.email = 'Enter a valid email address.';
    if (values.message.trim().length < 10) nextErrors.message = 'Write at least 10 characters.';
    setErrors(nextErrors);
    setMessage('');
    if (Object.keys(nextErrors).length) return;

    setSending(true);
    try {
      await apiRequest('/contact', { method: 'POST', body: values });
      setMessage('Thanks. We have your message and will reply by email soon.');
      form.reset();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <PageHead title="Contact us">Questions about classes, pricing or private lessons? We reply within one working day.</PageHead>
      <div className="wrap">
        <form className="form-card wide" onSubmit={submit} noValidate>
          <div className="row">
            <div>
              <label htmlFor="contact-name">Full name</label>
              <input id="contact-name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} />
              <ErrorText>{errors.name}</ErrorText>
            </div>
            <div>
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} />
              <ErrorText>{errors.email}</ErrorText>
            </div>
          </div>
          <label htmlFor="contact-topic">Topic</label>
          <select id="contact-topic" name="topic">
            <option>Class enquiry</option><option>Pricing</option><option>Private lessons</option><option>Something else</option>
          </select>
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" aria-invalid={Boolean(errors.message)} />
          <ErrorText>{errors.message}</ErrorText>
          <button className="btn form-submit" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send message'}</button>
          {message && <div className={message.startsWith('Thanks.') ? 'msg show' : 'form-error'} role="status">{message}</div>}
          <p className="links">Studio: 12 Maple Street · Open Mon–Sat, 9 am–9 pm<br />hello@maplefloordance.example · (555) 010-2030</p>
        </form>
      </div>
    </>
  );
}

function ErrorText({ children }) {
  return <div className="err" role="alert">{children}</div>;
}
