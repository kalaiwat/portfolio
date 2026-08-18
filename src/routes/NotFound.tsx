import { Link } from 'react-router-dom';
import './page.css';

export function NotFound() {
  return (
    <section className="page section">
      <h1 className="page__title">404</h1>
      <p className="page__prose">nothing here.</p>
      <Link className="page__back invert-hover" to="/">
        ← home
      </Link>
    </section>
  );
}
