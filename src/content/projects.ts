import autogradEngineLogo from '../assets/logos/autograd-engine.png';
import dermAiLogo from '../assets/logos/dermai.png';
import devbrainLogo from '../assets/logos/devbrain.png';
import sparelotLogo from '../assets/logos/sparelot.png';

export type Project = {
  slug: string;
  name: string;
  /** caption line under the title — role, org, dates, any placement */
  meta: string;
  /** start date shown on the /projects index row, in place of the stack list */
  started: string;
  /** one-line dense description, used on the /projects index */
  summary: string;
  /** body paragraphs on the detail page */
  body: string[];
  stack: string[];
  logo: string;
  /** external site shown as a small icon next to the title on the detail page */
  link?: string;
};

/** ordered most technically substantial first */
export const projects: Project[] = [
  {
    slug: 'autograd-engine',
    name: 'Autograd Engine',
    meta: 'August 2026 – Present',
    started: 'August 2026 – Present',
    summary: 'a reverse-mode automatic differentiation engine built in C++.',
    body: [
      "implementing the core mechanism behind PyTorch style neural network training: a computation graph recorded via operator overloading and walked backward via topological sort, with gradient accumulation handled explicitly to support reused variables and graphs with diamond shaped dependencies. node ownership is reference counted, and memory safety is verified with sanitizers (ASan/UBSan); each primitive's backward pass is hand derived and unit tested in isolation before composition. the scalar engine is in progress, with a planned extension to tensor operations (broadcasting, matmul) and cross validation against PyTorch gradients.",
    ],
    stack: ['C++', 'CMake', 'Catch2'],
    logo: autogradEngineLogo,
    link: 'https://github.com/kalaiwat/autograd-engine',
  },
  {
    slug: 'devbrain',
    name: 'DevBrain',
    meta: 'co-founder · June 2026 · 2nd place, ClawComp',
    started: 'June 2026',
    summary: 'shared context layer keeping multiple AI coding agents from desyncing.',
    body: [
      'co-founded at ClawComp, a Link Ventures-hosted hackathon. a Firestore-backed shared state layer exposed through a Next.js dashboard and an OpenClaw agent plugin, giving multiple AI coding agents a shared context window to prevent desync and duplicate work.',
      // 'stepped away from the project after the hackathon; it was later rebranded to Synqed by the remaining team.',
    ],
    stack: [
      'Next.js',
      'React',
      'Node.js',
      'Firebase',
      'Firestore',
      'TypeScript',
      'Vite',
      'npm',
      'OpenClaw',
      'VoiceRun API',
      'CLI',
      'Google Cloud',
    ],
    logo: devbrainLogo,
    link: 'https://www.linkedin.com/feed/update/urn:li:activity:7501825907213402112/',
  },
  {
    slug: 'derm-ai',
    name: 'Derm AI',
    meta: 'Founder & CTO · June 2025 – June 2026',
    started: 'June 2025',
    summary:
      'AI-powered skin analysis and product recommendation app, integrated into a partner iOS product.',
    body: [
      'an app for AI-powered skin analysis and product recommendations, integrating OpenAI and Cloud Vision APIs to analyze skin condition and suggest products against user profiles.',
      "partnered with Nolla Health to integrate Derm AI's scanning features into the Nolla Acne iOS app, shipping in-app scanning streaks, a native home screen widget, an accomplishments feature tracking treatment adherence and skin improvement, and environment-aware weather widgets.",
      'reached 1,000+ users, 20,000+ App Store impressions, 2,000+ scans taken.',
    ],
    stack: [
      'Expo',
      'React Native',
      'JavaScript',
      'Node.js',
      'Firebase',
      'OpenAI API',
      'Cloud Vision',
      'RevenueCat',
      'AppsFlyer',
      'Google Cloud',
    ],
    logo: dermAiLogo,
    link: 'https://derm-ai.app',
  },
  {
    slug: 'sparelot',
    name: 'SpareLot',
    meta: 'Founder & CTO · June 2024 – June 2025',
    started: 'June 2024',
    summary: 'marketplace for renting out underutilized storage space.',
    body: [
      'a fullstack platform for renting out underutilized storage space. implemented Firebase Auth, Firestore, and Cloud Functions to handle secure user data, listings, and transactions.',
    ],
    stack: ['HTML', 'CSS', 'React.js', 'Node.js', 'Firebase', 'Stripe API', 'Google Cloud'],
    logo: sparelotLogo,
    link: 'https://sparelot.com',
  },
];

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
