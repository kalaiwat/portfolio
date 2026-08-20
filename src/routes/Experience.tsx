import { RowItem } from '../components/RowItem';
import { experience } from '../content/experience';
import './page.css';

export function Experience() {
  return (
    <section className="page section">
      <h1 className="page__title">experience</h1>
      <ul className="page__list">
        {experience.map((item) => {
          const to = item.slug
            ? `/experience/${item.slug}`
            : item.projectSlug
              ? `/projects/${item.projectSlug}`
              : undefined;
          return (
            <RowItem
              key={`${item.org}-${item.period}`}
              to={to}
              logo={item.logo}
              logoAlt={`${item.org} logo`}
              title={`${item.role} @ ${item.org}`}
              meta={item.period}
              description={item.description}
            />
          );
        })}
      </ul>
    </section>
  );
}
