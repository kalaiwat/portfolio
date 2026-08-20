import { useParams } from 'react-router-dom';
import { getExperience } from '../content/experience';
import { getGallery } from '../content/gallery';
import { StackGrid } from '../components/StackGrid';
import { Gallery } from '../components/Gallery';
import { ExternalLinkIcon } from '../components/ExternalLinkIcon';
import { NotFound } from './NotFound';
import './page.css';

export function ExperienceDetail() {
  const { slug } = useParams();
  const item = getExperience(slug);
  const gallery = getGallery(slug ?? '');

  if (!item || !item.body) return <NotFound />;

  return (
    <section className="page section">
      <h1 className="page__title">
        {item.org}
        {item.link && <ExternalLinkIcon href={item.link} />}
      </h1>
      <p className="caption page__meta">
        {item.role} · {item.period}
      </p>
      <div className="page__prose">
        {item.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
      {item.stack && (
        <div className="page__stack">
          <h2 className="page__title">Stack</h2>
          <p className="caption page__meta">{item.stack.join(', ')}</p>
          <StackGrid stack={item.stack} />
        </div>
      )}
      {gallery.length > 0 && (
        <div className="page__gallery">
          <h2 className="page__title">Gallery</h2>
          <p className="caption page__meta">a look at media related to {item.org}.</p>
          <Gallery images={gallery} alt={item.org} />
        </div>
      )}
    </section>
  );
}
