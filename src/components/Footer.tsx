import type { Ref } from 'react';
import { Link, useLocation } from 'react-router-dom';
import resumePdf from '../assets/portfolio/resume.pdf?url';
import './Footer.css';

/* `external` is explicit rather than sniffed from the href, since the resume
   is a same-origin build asset (no "http" prefix) that still needs to open
   in a new tab like the true external links do */
const contacts = [
  { label: 'Contact', href: 'mailto:kalaiwat3@gatech.edu', external: false },
  { label: 'GitHub', href: 'https://github.com/kalaiwat', external: true },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kareem-alaiwat-21a62a306',
    external: true,
  },
  { label: 'Resume', href: resumePdf, external: true },
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
        {contacts.map(({ label, href, external }) => (
          <li key={href}>
            <a
              className="footer__link invert-hover"
              href={href}
              {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
