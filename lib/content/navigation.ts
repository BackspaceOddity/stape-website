/**
 * Shared navigation content — used by Navbar and Footer.
 */

export const navigation = {
  mainNav: [
    { label: 'For whom', href: '/solutions' },
    { label: 'Solutions', href: '/product' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Resources', href: '/resources' },
    { label: 'Partner Program', href: '/partners' },
  ],
  cta: {
    login: { label: 'Login', href: '/login' },
    demo: { label: 'Book a Demo', href: '/demo' },
  },
  footer: {
    description:
      'Global contractor payroll. Stop doing payroll. Pay one person first. See what vanishes.',
    columns: [
      {
        title: 'Resources',
        links: [
          { label: 'Documentation', href: '/docs' },
          { label: 'Support', href: '/support' },
          { label: 'Status', href: '/status' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Careers', href: '/careers' },
          { label: 'Blog', href: '/blog' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy', href: '/privacy' },
          { label: 'Terms', href: '/terms' },
          { label: 'Compliance', href: '/compliance' },
        ],
      },
      {
        title: 'Socials',
        links: [
          { label: 'Twitter', href: 'https://twitter.com/stape' },
          { label: 'LinkedIn', href: 'https://linkedin.com/company/stape' },
          { label: 'GitHub', href: 'https://github.com/stape' },
        ],
      },
    ],
  },
};
