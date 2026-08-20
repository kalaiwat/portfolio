import type { Ref } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const contacts = [
  { label: 'kareem.alaiwat@gmail.com', href: 'mailto:kareem.alaiwat@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/kalaiwat' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kareem-alaiwat-21a62a306',
  },
];

/** on a /projects/:slug or /experience/:slug detail page, the footer's first
    slot becomes a back link to that section's index instead of a contact */
function getBackLink(pathname: string) {
  if (/^\/projects\/[^/]+/.test(pathname)) {
    return { label: '← all projects', to: '/projects' };
  }
  if (/^\/experience\/[^/]+/.test(pathname)) {
    return { label: '← all experience', to: '/experience' };
  }
  return undefined;
}

/** persistent across every route — contact never needs hunting for. text links
    only, no icons, consistent with the no-decoration rule. */
export function Footer({ ref }: { ref?: Ref<HTMLElement> }) {
  const { pathname } = useLocation();
  const backLink = getBackLink(pathname);

  return (
    <footer className="footer section" ref={ref}>
      <ul className="footer__list">
        {backLink && (
          <li>
            <Link className="footer__link invert-hover" to={backLink.to}>
              {backLink.label}
            </Link>
          </li>
        )}
        {contacts.map(({ label, href }) => (
          <li key={href}>
            <a
              className="footer__link invert-hover"
              href={href}
              {...(href.startsWith('http')
                ? { target: '_blank', rel: 'noreferrer noopener' }
                : {})}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
