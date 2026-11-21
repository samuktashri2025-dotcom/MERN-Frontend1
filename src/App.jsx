import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Faq from './pages/Faq.jsx';
import Login from './pages/Login.jsx';
import SignIn from './pages/SignIn.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Legal from './pages/Legal.jsx';

const pageTitles = {
  '/': 'Dance School Management | Maple Floor Dance School',
  '/about': 'About | Maple Floor Dance School',
  '/contact': 'Contact | Maple Floor Dance School',
  '/faq': 'FAQ | Maple Floor Dance School',
  '/login': 'Log in | Maple Floor Dance School',
  '/signin': 'Sign up | Maple Floor Dance School',
  '/forgot-password': 'Reset password | Maple Floor Dance School',
  '/reset-password': 'Choose a new password | Maple Floor Dance School',
  '/terms': 'Terms | Maple Floor Dance School',
  '/privacy': 'Privacy | Maple Floor Dance School',
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = pageTitles[pathname] || 'Page not found | Maple Floor Dance School';
  }, [pathname]);

  return null;
}

function NotFound() {
  return (
    <section className="wrap not-found">
      <h1>We couldn't find that page</h1>
      <p>Try heading back to the studio home page.</p>
      <Link className="btn" to="/">Go home</Link>
    </section>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/terms" element={<Legal type="terms" />} />
          <Route path="/privacy" element={<Legal type="privacy" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
