import { Link } from 'react-router-dom';
import './RowItem.css';

export type RowItemProps = {
  /** omit to render a non-interactive row */
  to?: string;
  logo: string;
  logoAlt: string;
  title: string;
  /** right-aligned line on desktop — a date for experience, a stack list for projects */
  meta: string;
  description: string;
};

/** shared list-row layout for /projects and /experience */
export function RowItem({ to, logo, logoAlt, title, meta, description }: RowItemProps) {
  const content = (
    <>
      <img className="row-item__logo" src={logo} alt={logoAlt} />
      <div className="row-item__content">
        <h2 className="row-item__title">{title}</h2>
        <p className="caption row-item__meta">{meta}</p>
        <p className="row-item__description">{description}</p>
      </div>
    </>
  );

  return (
    <li className="row-item__item">
      {to ? (
        <Link className="row-item__row invert-hover" to={to}>
          {content}
        </Link>
      ) : (
        <div className="row-item__row">{content}</div>
      )}
    </li>
  );
}
