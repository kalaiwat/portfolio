export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  description: string;
  /** slug of the matching project detail page, where one exists */
  projectSlug?: string;
};

export const experience: ExperienceItem[] = [
  {
    role: 'Co-Founder & CTO',
    org: 'GetPaid',
    period: 'June 2026 – present',
    description:
      "cross-platform attribution pipeline across RevenueCat, AppsFlyer, and Meta, plus an automated subscription-cancellation engine on Plaid's Recurring Transactions API.",
    projectSlug: 'getpaid',
  },
  {
    role: 'Engineer Intern',
    org: '10x',
    period: 'April 2026 – May 2026',
    description:
      'notification framework and foundational interaction infrastructure for Core OS, an AI-native desktop operating system.',
    projectSlug: 'core-os',
  },
  {
    role: 'Engineer Intern',
    org: 'Nolla Health',
    period: 'Jan 2026 – Feb 2026',
    description:
      "integrated Derm AI's scanning features into the Nolla Acne iOS app — streaks, a native home-screen widget, and treatment-adherence tracking.",
    projectSlug: 'derm-ai',
  },
];
