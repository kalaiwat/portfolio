import './Footer.css';

const contacts = [
  { label: 'kareem.alaiwat@gmail.com', href: 'mailto:kareem.alaiwat@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/kalaiwat' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kareem-alaiwat-21a62a306',
  },
];

/** persistent across every route — contact never needs hunting for. text links
    only, no icons, consistent with the no-decoration rule. */
export function Footer() {
  return (
    <footer className="footer section">
      <ul className="footer__list">
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
