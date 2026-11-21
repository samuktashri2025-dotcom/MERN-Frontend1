import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { apiRequest } from '../services/api.js';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setMessage('');
    if (password.length < 8) {
      setMessage('Use at least 8 characters.');
      return;
    }
    setSubmitting(true);
    try {
      const result = await apiRequest('/auth/reset-password', {
        method: 'POST',
        body: { token, password },
      });
      setMessage(result.message);
      setSuccess(true);
    } catch (error) {
      setMessage(error.message);
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="wrap">
      <form className="form-card" onSubmit={submit}>
        <h1>Choose a new password</h1>
        <p className="sub">Enter a new password to finish resetting your account.</p>
        <label htmlFor="reset-password">New password</label>
        <input
          id="reset-password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="btn form-submit" type="submit" disabled={submitting || !token}>
          {submitting ? 'Please wait…' : 'Reset password'}
        </button>
        {message && <div className={success ? 'msg show' : 'form-error'} role="status">{message}</div>}
        {!token && <div className="form-error" role="alert">This reset link is invalid or incomplete.</div>}
        <p className="links"><Link to="/login">Back to log in</Link></p>
      </form>
    </div>
  );
}
