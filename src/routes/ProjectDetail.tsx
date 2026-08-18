import { Link, useParams } from 'react-router-dom';
import { getProject } from '../content/projects';
import { NotFound } from './NotFound';
import './page.css';

export function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) return <NotFound />;

  return (
    <section className="page section">
      <h1 className="page__title">{project.name}</h1>
      <p className="caption page__meta">{project.meta}</p>
      <div className="page__prose">
        {project.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
        <p className="caption">stack: {project.stack.join(', ')}</p>
      </div>
      <Link className="page__back invert-hover" to="/projects">
        ← all projects
      </Link>
    </section>
  );
}
