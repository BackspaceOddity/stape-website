'use client';

import Link from 'next/link';

const solutionsLinks = [
  { label: 'Contractor of Record (COR)', href: '/contractor-of-record' },
  { label: 'Employer of Record (EOR)', href: '/employer-of-record' },
];

const useCasesLinks = [
  { label: 'Global Hiring', href: '/use-cases/global-hiring' },
  { label: 'Crypto Payroll', href: '/industry/web3' },
  { label: 'IP Transfer', href: '/use-cases/ip-transfer' },
  { label: 'Contractor Compliance', href: '#' },
];

const builtForLinks = [
  { label: 'Founders & CEOs', href: '/solutions/founders' },
  { label: 'HR & People Ops', href: '#' },
  { label: 'CFOs & Finance', href: '#' },
  { label: 'Contractors', href: '#' },
];

const companyLinks = [
  { label: 'About us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact us', href: 'mailto:support@thestape.com', external: true },
];

const resourcesLinks = [
  { label: 'Documentation', href: 'https://docs.thestape.com/', external: true },
  { label: 'Platform Status', href: 'https://status.thestape.com/', external: true },
  { label: 'Referral Program', href: '/referral' },
];

const legalLinks = [
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'KYC / AML Policy', href: '/kyc' },
  { label: 'Unsupported Industries', href: '/unsupported-industries' },
];

const linkClass = 'text-primary-foreground/70 hover:text-primary-foreground transition-colors';

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string; external?: boolean }[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-4">{title}</h4>
      <ul className="space-y-2.5 text-sm">
        {links.map((link) =>
          link.external ? (
            <li key={link.label}>
              <a href={link.href} className={linkClass}>{link.label}</a>
            </li>
          ) : (
            <li key={link.label}>
              <Link href={link.href} className={linkClass}>{link.label}</Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Branding + Navigation columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-12">
          {/* Left: Title + description + CTA */}
          <div className="md:col-span-3">
            <h3 className="text-xl font-display font-bold mb-2">Stape</h3>
            <p className="text-sm text-primary-foreground/70 mb-6 leading-relaxed">
              Global contractor payroll. Stop doing payroll. Pay one person first. See what vanishes.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-primary text-sm font-semibold rounded-md hover:bg-accent/90 transition-colors"
            >
              Book a Demo
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right: Link columns — 2 rows × 3 columns on desktop */}
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
            <FooterColumn title="Solutions" links={solutionsLinks} />
            <FooterColumn title="Use Cases" links={useCasesLinks} />
            <FooterColumn title="Built for" links={builtForLinks} />
            <FooterColumn title="Company" links={companyLinks} />
            <FooterColumn title="Resources" links={resourcesLinks} />
            <FooterColumn title="Legal" links={legalLinks} />
          </div>
        </div>

        {/* Section 2: Legal entities */}
        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="text-xs text-primary-foreground/40 leading-relaxed space-y-1 mb-8">
            <div className="space-y-1">
              <p>Telecom Apps LLC &middot; 303 Twin Dolphin Drive, CA, US</p>
              <p>Stape Online LTD &middot; TW9 2NA, London, UK</p>
            </div>
            <p className="mt-2">
              <a href="mailto:support@thestape.com" className="hover:text-primary-foreground/60 transition-colors">
                support@thestape.com
              </a>
            </p>
          </div>
        </div>

        {/* Section 3: Bottom bar */}
        <div className="pt-6 border-t border-primary-foreground/20 flex items-center justify-between">
          <p className="text-sm text-primary-foreground/50">
            &copy; {new Date().getFullYear()} Stape
          </p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="LinkedIn" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
