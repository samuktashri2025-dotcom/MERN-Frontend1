import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <div>© 2026 Maple Floor Dance School<br />12 Maple Street</div>
        <ul>
          <li><Link to="/terms">Terms and conditions</Link></li>
          <li><Link to="/privacy">Privacy policy</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </footer>
  );
}
