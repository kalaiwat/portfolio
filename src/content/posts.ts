export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  /** plain paragraphs for now, one string per paragraph joined by \n\n */
  body: string;
};

/* intentionally empty — infra is ready, no fake posts. append here to publish;
   WritingPost looks posts up by slug, no new infrastructure needed. */
export const posts: Post[] = [];

export function getPost(slug: string | undefined): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
