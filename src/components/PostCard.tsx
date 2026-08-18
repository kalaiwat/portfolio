import { Link } from 'react-router-dom';
import type { Post } from '../content/posts';
import './PostCard.css';

export function PostCard({ post }: { post: Post }) {
  return (
    <li className="post-card__item">
      <Link className="post-card invert-hover" to={`/writing/${post.slug}`}>
        <h2 className="post-card__title">{post.title}</h2>
        <p className="caption post-card__date">{post.date}</p>
        <p className="post-card__excerpt">{post.excerpt}</p>
      </Link>
    </li>
  );
}
