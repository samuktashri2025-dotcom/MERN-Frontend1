import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest, setAuthToken } from '../services/api.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(mode, values) {
  const errors = {};
  if (mode === 'signup' && !values.name.trim()) errors.name = 'Enter your name.';
  if (!values.email.trim()) errors.email = 'Enter your email.';
  else if (!emailPattern.test(values.email)) errors.email = 'Enter a valid email address.';
  if (mode === 'login' && !values.password) errors.password = 'Enter your password.';
  if (mode === 'signup') {
    if (values.password.length < 8) errors.password = 'Use at least 8 characters.';
    if (values.confirmPassword !== values.password) errors.confirmPassword = 'Passwords do not match.';
    if (!values.terms) errors.terms = 'Accept the terms to continue.';
  }
  return errors;
}

const config = {
  login: {
    title: 'Log in',
    subtitle: 'Welcome back. Manage your bookings and classes.',
    endpoint: '/auth/login',
    button: 'Log in',
    success: 'You are logged in.',
  },
  signup: {
    title: 'Create your account',
    subtitle: 'Sign up to book your free first class.',
    endpoint: '/auth/register',
    button: 'Create account',
    success: 'Your account has been created.',
  },
  forgot: {
    title: 'Reset your password',
    subtitle: "Enter your email and we'll send you a reset link.",
    endpoint: '/auth/forgot-password',
    button: 'Send reset link',
    success: 'If an account exists for that email, a reset link is on its way.',
  },
};

export default function AuthForm({ mode }) {
  const settings = config[mode];
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    style: 'Ballet',
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function update(event) {
    const { name, value, checked, type } = event.target;
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setMessage('');
  }

  async function submit(event) {
    event.preventDefault();
    const nextErrors = validate(mode, values);
    setErrors(nextErrors);
    setMessage('');
    if (Object.keys(nextErrors).length) return;

    const payload = {
      email: values.email.trim(),
      ...(mode === 'login' && { password: values.password }),
      ...(mode === 'signup' && {
        name: values.name.trim(),
        password: values.password,
        classInterest: values.style,
      }),
    };

    setIsSubmitting(true);
    try {
      const result = await apiRequest(settings.endpoint, { method: 'POST', body: payload });
      if (result.token) setAuthToken(result.token);
      setMessage(settings.success);
      if (mode !== 'forgot') {
        setValues((current) => ({
          ...current,
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          terms: false,
        }));
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const passwordType = showPassword ? 'text' : 'password';

  return (
    <div className="wrap">
      <form className="form-card" onSubmit={submit} noValidate>
        <h1>{settings.title}</h1>
        <p className="sub">{settings.subtitle}</p>

        {mode === 'signup' && (
          <>
            <label htmlFor="auth-name">Full name</label>
            <input id="auth-name" name="name" autoComplete="name" value={values.name} onChange={update} aria-invalid={Boolean(errors.name)} />
            <ErrorText>{errors.name}</ErrorText>
          </>
        )}

        <label htmlFor="auth-email">Email</label>
        <input id="auth-email" name="email" type="email" autoComplete="email" value={values.email} onChange={update} aria-invalid={Boolean(errors.email)} />
        <ErrorText>{errors.email}</ErrorText>

        {mode === 'signup' && (
          <>
            <label htmlFor="auth-style">Class you're most interested in</label>
            <select id="auth-style" name="style" value={values.style} onChange={update}>
              <option>Ballet</option>
              <option>Hip hop</option>
              <option>Salsa &amp; bachata</option>
              <option>Contemporary</option>
              <option>Little movers</option>
            </select>
          </>
        )}

        {mode !== 'forgot' && (
          <>
            <label htmlFor="auth-password">{mode === 'signup' ? 'Password (8+ characters)' : 'Password'}</label>
            <div className="pw">
              <input
                id="auth-password"
                name="password"
                type={passwordType}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                value={values.password}
                onChange={update}
                aria-invalid={Boolean(errors.password)}
              />
              <button type="button" onClick={() => setShowPassword((show) => !show)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <ErrorText>{errors.password}</ErrorText>
          </>
        )}

        {mode === 'signup' && (
          <>
            <label htmlFor="auth-confirm-password">Confirm password</label>
            <input id="auth-confirm-password" name="confirmPassword" type="password" autoComplete="new-password" value={values.confirmPassword} onChange={update} aria-invalid={Boolean(errors.confirmPassword)} />
            <ErrorText>{errors.confirmPassword}</ErrorText>
            <label className="check">
              <input type="checkbox" name="terms" checked={values.terms} onChange={update} aria-invalid={Boolean(errors.terms)} />
              <span>I agree to the <Link to="/terms">Terms and Conditions</Link> and <Link to="/privacy">Privacy Policy</Link>.</span>
            </label>
            <ErrorText>{errors.terms}</ErrorText>
          </>
        )}

        <button className="btn form-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Please wait…' : settings.button}
        </button>
        {message && <div className={message === settings.success ? 'msg show' : 'form-error'} role="status">{message}</div>}

        <p className="links">
          {mode === 'login' && (
            <>
              <Link to="/forgot-password">Forgot your password?</Link><br />
              New here? <Link to="/signin">Create an account</Link>
            </>
          )}
          {mode === 'signup' && <>Already registered? <Link to="/login">Log in</Link></>}
          {mode === 'forgot' && <Link to="/login">Back to log in</Link>}
        </p>
      </form>
    </div>
  );
}

function ErrorText({ children }) {
  return <div className="err" role="alert">{children}</div>;
}
