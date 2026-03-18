'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Left: Title + description + CTA card */}
          <div className="md:col-span-4">
            <h3 className="text-xl font-display font-bold mb-2">Stape</h3>
            <p className="text-sm text-primary-foreground/70 mb-6 leading-relaxed">
              Global contractor payroll. Stop doing payroll. Pay one person first. See what vanishes.
            </p>

            {/* Book a Demo */}
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

          {/* Right: Link columns */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-semibold mb-4">Product</h4>
              <ul className="space-y-2.5 text-sm text-primary-foreground/70">
                <li><Link href="/contractor-of-record" className="hover:text-primary-foreground transition-colors">For contractors</Link></li>
                <li><Link href="/employer-of-record" className="hover:text-primary-foreground transition-colors">For companies</Link></li>
                <li><Link href="#" className="hover:text-primary-foreground transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Company</h4>
              <ul className="space-y-2.5 text-sm text-primary-foreground/70">
                <li><Link href="/about" className="hover:text-primary-foreground transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-primary-foreground transition-colors">Careers</Link></li>
                <li><a href="mailto:support@thestape.com" className="hover:text-primary-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Legal</h4>
              <ul className="space-y-2.5 text-sm text-primary-foreground/70">
                <li><Link href="#" className="hover:text-primary-foreground transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-primary-foreground transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-primary-foreground transition-colors">Compliance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Socials</h4>
              <ul className="space-y-2.5 text-sm text-primary-foreground/70">
                <li><Link href="#" className="hover:text-primary-foreground transition-colors">Twitter</Link></li>
                <li><Link href="#" className="hover:text-primary-foreground transition-colors">LinkedIn</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom: entity info + legal */}
        <div className="pt-8 border-t border-primary-foreground/20 space-y-4">
          <div className="text-xs text-primary-foreground/40 leading-relaxed space-y-1">
            <p>Telecom Apps LLC · 303 Twin Dolphin Drive, CA, US / 541 Jefferson Ave, CA, US</p>
            <p>Stape Online LTD · United Kingdom · TW9 2NA</p>
            <p><a href="mailto:support@thestape.com" className="hover:text-primary-foreground/60 transition-colors">support@thestape.com</a></p>
          </div>
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} Stape. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
