import { Link } from 'react-router-dom';
import type { Project } from '../content/projects';
import './ProjectCard.css';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <li className="project-card__item">
      <Link className="project-card invert-hover" to={`/projects/${project.slug}`}>
        <h2 className="project-card__name">{project.name}</h2>
        <p className="project-card__summary">{project.summary}</p>
        <p className="caption project-card__stack">{project.stack.join(', ')}</p>
      </Link>
    </li>
  );
}
