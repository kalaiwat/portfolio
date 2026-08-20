import './ExternalLinkIcon.css';

export function ExternalLinkIcon({ href }: { href: string }) {
  return (
    <a
      className="external-link-icon"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="open external site"
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 3h6v6M10 14 21 3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
