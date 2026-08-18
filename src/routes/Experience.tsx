import { TimelineItem } from '../components/TimelineItem';
import { experience } from '../content/experience';
import './page.css';

export function Experience() {
  return (
    <section className="page section">
      <h1 className="page__title">experience</h1>
      <ul className="page__list">
        {experience.map((item) => (
          <TimelineItem key={`${item.org}-${item.period}`} item={item} />
        ))}
      </ul>
    </section>
  );
}
