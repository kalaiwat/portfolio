/* every icon in src/assets/techs, resolved to a built URL at compile time.
   the glob is eager so the grid can render synchronously — these are small
   logos, not route-level payloads. */
const icons = import.meta.glob('../assets/techs/*.{png,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export const techCategories = [
  'all',
  'web',
  'mobile',
  'frontend',
  'backend',
  'tools',
] as const;

export type TechCategory = (typeof techCategories)[number];

/* categories a tech belongs to, keyed by its file stem in src/assets/techs.
   membership is deliberately overlapping — TypeScript is not "a frontend
   language", it's the language both halves of the stack are written in. */
const catalog: Record<string, { label: string; tags: Exclude<TechCategory, 'all'>[] }> = {
  android: { label: 'Android', tags: ['mobile'] },
  appsflyer: { label: 'AppsFlyer', tags: ['tools'] },
  claude: { label: 'Claude', tags: ['tools'] },
  cli: { label: 'CLI', tags: ['tools'] },
  codex: { label: 'Codex', tags: ['tools'] },
  cpp: { label: 'C++', tags: ['backend'] },
  csharp: { label: 'C#', tags: ['backend'] },
  css: { label: 'CSS', tags: ['web', 'frontend'] },
  expo: { label: 'Expo', tags: ['mobile', 'frontend'] },
  figma: { label: 'Figma', tags: ['tools', 'frontend'] },
  firebase: { label: 'Firebase', tags: ['backend', 'web', 'mobile'] },
  gcp: { label: 'Google Cloud', tags: ['backend', 'tools'] },
  git: { label: 'Git', tags: ['tools'] },
  html: { label: 'HTML', tags: ['web', 'frontend'] },
  ios: { label: 'iOS', tags: ['mobile'] },
  java: { label: 'Java', tags: ['backend', 'mobile'] },
  javascript: { label: 'JavaScript', tags: ['web', 'frontend', 'backend'] },
  nodejs: { label: 'Node.js', tags: ['backend', 'web'] },
  npm: { label: 'npm', tags: ['tools'] },
  openaiapi: { label: 'OpenAI API', tags: ['tools', 'backend'] },
  openclaw: { label: 'OpenClaw', tags: ['tools'] },
  plaid: { label: 'Plaid', tags: ['tools', 'backend'] },
  python: { label: 'Python', tags: ['backend'] },
  qt: { label: 'Qt', tags: ['frontend'] },
  react: { label: 'React', tags: ['web', 'frontend'] },
  reactnative: { label: 'React Native', tags: ['mobile', 'frontend'] },
  revenuecat: { label: 'RevenueCat', tags: ['tools', 'mobile'] },
  sqlite: { label: 'SQLite', tags: ['backend'] },
  stripeapi: { label: 'Stripe API', tags: ['tools', 'backend'] },
  swift: { label: 'Swift', tags: ['mobile'] },
  typescript: { label: 'TypeScript', tags: ['web', 'frontend', 'backend'] },
  vite: { label: 'Vite', tags: ['web', 'frontend', 'tools'] },
  voicerunapi: { label: 'VoiceRun API', tags: ['tools', 'backend'] },
  vscode: { label: 'VS Code', tags: ['tools'] },
  x11: { label: 'X11', tags: ['backend'] },
};

/* stack entries whose text doesn't literally match a catalog label */
const aliases: Record<string, string> = {
  reactjs: 'react',
};

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

/** looks up a stack entry (e.g. "React.js") against the tech catalog by normalized
    label/id match, falling back to the alias table above */
export function resolveTech(name: string): Tech | undefined {
  const key = normalize(name);
  return techs.find((tech) => normalize(tech.label) === key || normalize(tech.id) === key)
    ?? techs.find((tech) => tech.id === aliases[key]);
}

/** splits a project/experience stack list into techs with a matching icon and
    the raw names that have none yet */
export function resolveStack(stack: string[]): { resolved: Tech[]; missing: string[] } {
  const resolved: Tech[] = [];
  const missing: string[] = [];
  for (const name of stack) {
    const tech = resolveTech(name);
    if (tech) resolved.push(tech);
    else missing.push(name);
  }
  return { resolved, missing };
}

export type Tech = {
  id: string;
  label: string;
  src: string;
  tags: Exclude<TechCategory, 'all'>[];
};

/* built from the glob rather than from `catalog`, so dropping a new icon into
   the folder surfaces it immediately — untagged files land in `tools` and show
   up under "all", which is a visible prompt to categorise them properly. */
export const techs: Tech[] = Object.entries(icons)
  .map(([path, src]) => {
    const id = path.split('/').pop()!.replace(/\.(png|svg)$/, '');
    const entry = catalog[id];
    return {
      id,
      label: entry?.label ?? id,
      src,
      tags: entry?.tags ?? (['tools'] as Exclude<TechCategory, 'all'>[]),
    };
  })
  .sort((a, b) => a.label.localeCompare(b.label));

export function filterTechs(category: TechCategory): Tech[] {
  return category === 'all'
    ? techs
    : techs.filter((tech) => tech.tags.includes(category));
}
