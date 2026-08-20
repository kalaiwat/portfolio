/* every image in src/assets/gallery/<slug>, resolved to a built URL at compile
   time — same eager-glob approach as techs.ts, so dropping images into a new
   project's folder is all a future gallery needs. */
const images = import.meta.glob('../assets/gallery/*/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const bySlug = new Map<string, { order: number; src: string }[]>();
for (const [path, src] of Object.entries(images)) {
  const match = path.match(/gallery\/([^/]+)\/([^/]+)\.\w+$/);
  if (!match) continue;
  const [, slug, stem] = match;
  const list = bySlug.get(slug) ?? [];
  list.push({ order: Number(stem) || 0, src });
  bySlug.set(slug, list);
}
for (const list of bySlug.values()) list.sort((a, b) => a.order - b.order);

export function getGallery(slug: string): string[] {
  return (bySlug.get(slug) ?? []).map((item) => item.src);
}
