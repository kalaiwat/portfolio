import { RowItem } from '../components/RowItem';
import { projects } from '../content/projects';
import './page.css';

export function Projects() {
  return (
    <section className="page section">
      <h1 className="page__title">projects</h1>
      <ul className="page__list">
        {projects.map((project) => (
          <RowItem
            key={project.slug}
            to={`/projects/${project.slug}`}
            logo={project.logo}
            logoAlt={`${project.name} logo`}
            title={project.name}
            meta={project.started}
            description={project.summary}
          />
        ))}
      </ul>
    </section>
  );
}
