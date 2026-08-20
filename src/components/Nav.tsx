import { NavLink } from 'react-router-dom';
import type { Ref } from 'react';
import './Nav.css';

const links = [
  { to: '/', label: 'home' },
  { to: '/about', label: 'about' },
  { to: '/projects', label: 'projects' },
  { to: '/experience', label: 'experience' },
  // { to: '/writing', label: 'writing' },
];

export function Nav({ ref }: { ref?: Ref<HTMLElement> }) {
  return (
    <nav className="nav section" ref={ref} aria-label="primary">
      <ul className="nav__list">
        {links.map(({ to, label }) => (
          <li key={to}>
            {/* active route holds a permanent inverted state, so current
                location stays legible without relying on hover */}
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                isActive
                  ? 'nav__link invert-hover invert-hover--inverse'
                  : 'nav__link invert-hover'
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
