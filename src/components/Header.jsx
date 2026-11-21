import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link className="logo" to="/" onClick={closeMenu}>
          Maple Floor<span> Dance</span>
        </Link>
        <button
          className="burger"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        <nav aria-label="Main navigation">
          <ul id="main-menu" className={menuOpen ? 'menu open' : 'menu'}>
            {links.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/login"
                className={location.pathname === '/login' ? 'active' : undefined}
                onClick={closeMenu}
              >
                Log in
              </NavLink>
            </li>
            <li>
              <NavLink className="btn-nav" to="/signin" onClick={closeMenu}>
                Sign up
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
