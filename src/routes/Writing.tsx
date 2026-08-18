import { PostCard } from '../components/PostCard';
import { posts } from '../content/posts';
import './page.css';

export function Writing() {
  return (
    <section className="page section">
      <h1 className="page__title">writing</h1>
      {posts.length === 0 ? (
        <p className="page__prose">nothing published here yet. check back later.</p>
      ) : (
        <ul className="page__list">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </ul>
      )}
    </section>
  );
}
