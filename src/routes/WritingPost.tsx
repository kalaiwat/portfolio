import { Link, useParams } from 'react-router-dom';
import { getPost } from '../content/posts';
import { NotFound } from './NotFound';
import './page.css';

export function WritingPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) return <NotFound />;

  return (
    <article className="page section">
      <h1 className="page__title">{post.title}</h1>
      <p className="caption page__meta">{post.date}</p>
      <div className="page__prose">
        {post.body.split('\n\n').map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
      <Link className="page__back invert-hover" to="/writing">
        ← all writing
      </Link>
    </article>
  );
}
