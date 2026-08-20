import getpaidLogo from '../assets/logos/getpaid.png';
import tenxLogo from '../assets/logos/10x.jpeg';
import nollaLogo from '../assets/logos/nolla.png';

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  description: string;
  logo: string;
  /** slug of this item's own detail page, at /experience/:slug, where one exists */
  slug?: string;
  /** body paragraphs on the /experience/:slug detail page */
  body?: string[];
  stack?: string[];
  /** slug of the matching /projects/:slug detail page, where one exists instead */
  projectSlug?: string;
  /** external site shown as a small icon next to the title on the detail page */
  link?: string;
};

export const experience: ExperienceItem[] = [
  {
    role: 'Founder & CTO',
    org: 'GetPaid',
    period: 'June 2026 – present',
    description:
      'fintech app helping consumers discover and claim class-action settlements, unclaimed property, and cancel unwanted subscriptions.',
    logo: getpaidLogo,
    slug: 'getpaid',
    body: [
      'co-founded a fintech app helping consumers discover and claim class-action settlements and unclaimed property.',
      "architected the app's cross-platform attribution pipeline, unifying RevenueCat, AppsFlyer, and Meta into a single source of truth across iOS and Android and producing reliable statistics for tracking brand growth and forecasting future performance.",
      "built an automated subscription-cancellation engine on Plaid's Recurring Transactions API, combining exact- and fuzzy-matching logic to help consumers identify and cancel unwanted charges across providers.",
      'surpassed $100K in revenue, 20K monthly active users, and a #150 U.S. App Store Finance ranking in under 60 days.',
    ],
    stack: [
      'Expo',
      'React Native',
      'TypeScript',
      'Node.js',
      'Firebase',
      'RevenueCat',
      'AppsFlyer',
      'Meta',
      'Plaid',
      'Google Cloud',
    ],
    link: 'https://trygetpaid.app',
  },
  {
    role: 'Software Engineer Intern',
    org: '10x',
    period: 'April 2026 – May 2026',
    description:
      'notification framework and foundational interaction infrastructure for Core OS, an AI-native desktop operating system.',
    logo: tenxLogo,
    slug: '10x',
    body: [
      'built the notification framework and foundational interaction infrastructure for Core OS, an AI-native desktop operating system built with Python, Qt/PySide6, and X11.',
      'architected a full notification framework: toast UI, notification center, SQLite-backed persistence, actionable agent flows, hotkeys, and Do Not Disturb, with unified action dispatching shared across the scheduler and agent systems.',
      'also built foundational interaction infrastructure: a declarative, focus-aware menu system, a file/folder attachment pipeline, notification deep linking, and extensible AI-agent interaction flows.',
    ],
    stack: ['Python', 'Qt', 'X11', 'SQLite'],
    link: 'https://10x.so',
  },
  {
    role: 'Software Engineer Intern',
    org: 'Nolla Health',
    period: 'Jan 2026 – Feb 2026',
    description:
      "integrated Derm AI's scanning features into the Nolla Acne iOS app, including streaks, a native home screen widget, and treatment adherence tracking.",
    logo: nollaLogo,
    slug: 'nolla',
    body: [
      'collaborated in a cross-company initiative to integrate Derm AI features into the Nolla Acne iOS app.',
      "developed user-friendly features using Swift and SwiftUI, enhancing the app's functionality.",
      'designed in-app scanning streaks and a native home screen widget to promote user engagement.',
      'implemented an accomplishments feature to track treatment adherence and skin improvement.',
    ],
    stack: ['Swift', 'SwiftUI'],
    link: 'https://nollahealth.com',
  },
];

export function getExperience(slug: string | undefined): ExperienceItem | undefined {
  return experience.find((item) => item.slug === slug);
}
