export type Project = {
  slug: string;
  name: string;
  /** caption line under the title — role, org, dates, any placement */
  meta: string;
  /** one-line dense description, used on the /projects index */
  summary: string;
  /** body paragraphs on the detail page */
  body: string[];
  stack: string[];
};

/** ordered most technically substantial first */
export const projects: Project[] = [
  {
    slug: 'getpaid',
    name: 'GetPaid',
    meta: 'co-founder & CTO · June 2026 – present',
    summary:
      'fintech app for finding and claiming class-action settlements and unclaimed property.',
    body: [
      "a fintech app helping consumers find and claim class-action settlements and unclaimed property they don't know they're owed.",
      'the problem: attribution data was fragmented across RevenueCat, AppsFlyer, and Meta, with no single source of truth to evaluate what was actually driving growth.',
      "the approach: architected a cross-platform attribution pipeline unifying all three into one reliable dataset across iOS and Android, and built an automated subscription-cancellation engine on Plaid's Recurring Transactions API — combining exact- and fuzzy-matching logic to catch charges under inconsistent merchant naming.",
      'the result: $100K+ in revenue, 20K monthly active users, and a #150 U.S. App Store Finance ranking within the first month.',
    ],
    stack: ['RevenueCat', 'AppsFlyer', 'Meta', 'Plaid'],
  },
  {
    slug: 'core-os',
    name: 'Core OS',
    meta: 'engineer intern, 10x · April 2026 – May 2026',
    summary:
      'AI-native desktop operating system — notification framework and core interaction infrastructure.',
    body: [
      'an AI-native desktop operating system built with Python, Qt/PySide6, and X11.',
      'architected a full notification framework — toast UI, notification center, SQLite-backed persistence, actionable agent flows, hotkeys, do-not-disturb — with unified action dispatching shared across the scheduler and agent systems.',
      'also built foundational interaction infrastructure: a declarative, focus-aware menu system, a file/folder attachment pipeline, notification deep-linking, and extensible AI-agent interaction flows.',
    ],
    stack: ['Python', 'Qt/PySide6', 'X11', 'SQLite'],
  },
  {
    slug: 'derm-ai',
    name: 'Derm AI',
    meta: 'co-founder & CTO · June 2025 – June 2026',
    summary:
      'AI-powered skin analysis and product recommendation app, integrated into a partner iOS product.',
    body: [
      'an app for AI-powered skin analysis and product recommendations, integrating OpenAI and Cloud Vision APIs to analyze skin condition and suggest products against user profiles.',
      "partnered with Nolla Health to integrate Derm AI's scanning features into the Nolla Acne iOS app — shipped in-app scanning streaks, a native home-screen widget, an accomplishments feature tracking treatment adherence and skin improvement, and environment-aware weather widgets.",
      'reached 1,000+ users, 20,000+ App Store impressions, 2,000+ scans taken.',
    ],
    stack: ['Expo', 'React Native', 'Node.js', 'Firebase', 'OpenAI', 'Cloud Vision'],
  },
  {
    slug: 'synqed',
    name: 'Synqed',
    meta: 'co-founder · June 2026 · 2nd place, ClawComp',
    summary: 'shared context layer keeping multiple AI coding agents from desyncing.',
    body: [
      'co-founded as DevBrain at ClawComp, a Link Ventures-hosted hackathon. a Firestore-backed shared state layer exposed through a Next.js dashboard and an OpenClaw agent plugin, giving multiple AI coding agents a shared context window to prevent desync and duplicate work.',
    ],
    stack: ['Next.js', 'Firebase', 'Firestore', 'TypeScript', 'OpenClaw'],
  },
  {
    slug: 'sparelot',
    name: 'SpareLot',
    meta: 'founder & CTO · June 2024 – June 2025',
    summary: 'marketplace for renting out underutilized storage space.',
    body: [
      'a fullstack platform for renting out underutilized storage space. implemented Firebase Auth, Firestore, and Cloud Functions to handle secure user data, listings, and transactions.',
    ],
    stack: ['HTML', 'CSS', 'React.js', 'Node.js', 'Firebase'],
  },
];

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
