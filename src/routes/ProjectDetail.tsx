import { useParams } from 'react-router-dom';
import { getProject } from '../content/projects';
import { getGallery } from '../content/gallery';
import { StackGrid } from '../components/StackGrid';
import { Gallery } from '../components/Gallery';
import { ExternalLinkIcon } from '../components/ExternalLinkIcon';
import { NotFound } from './NotFound';
import './page.css';

export function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);
  const gallery = getGallery(slug ?? '');

  if (!project) return <NotFound />;

  return (
    <section className="page section">
      <h1 className="page__title">
        {project.name}
        {project.link && <ExternalLinkIcon href={project.link} />}
      </h1>
      <p className="caption page__meta">{project.meta}</p>
      <div className="page__prose">
        {project.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
      <div className="page__stack">
        <h2 className="page__title">Stack</h2>
        <p className="caption page__meta">{project.stack.join(', ')}</p>
        <StackGrid stack={project.stack} />
      </div>
      {gallery.length > 0 && (
        <div className="page__gallery">
          <h2 className="page__title">Gallery</h2>
          <p className="caption page__meta">
            a look at media related to {project.name}.
          </p>
          <Gallery images={gallery} alt={project.name} />
        </div>
      )}
    </section>
  );
}
