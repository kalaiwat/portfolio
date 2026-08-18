import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../content/projects';
import './page.css';

export function Projects() {
  return (
    <section className="page section">
      <h1 className="page__title">projects</h1>
      <ul className="page__list">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>
    </section>
  );
}
