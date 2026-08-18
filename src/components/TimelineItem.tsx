import { Link } from 'react-router-dom';
import type { ExperienceItem } from '../content/experience';
import './TimelineItem.css';

export function TimelineItem({ item }: { item: ExperienceItem }) {
  const content = (
    <>
      <h2 className="timeline__role">
        {item.role} — {item.org}
      </h2>
      <p className="caption timeline__period">{item.period}</p>
      <p className="timeline__description">{item.description}</p>
    </>
  );

  return (
    <li className="timeline__item">
      {item.projectSlug ? (
        <Link className="timeline__row invert-hover" to={`/projects/${item.projectSlug}`}>
          {content}
        </Link>
      ) : (
        <div className="timeline__row">{content}</div>
      )}
    </li>
  );
}
