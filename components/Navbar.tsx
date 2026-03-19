'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';

/* ───────── menu data ───────── */

type MenuItem = {
  title: string;
  subtitle?: string;
  href: string;
  enabled: boolean;
};

type MenuSection = {
  label: string;
  items: MenuItem[];
  columns?: 1 | 2;
  maxWidth: number; // px
};

const MENUS: Record<string, MenuSection> = {
  Solutions: {
    label: 'Solutions',
    columns: 1,
    maxWidth: 420,
    items: [
      { title: 'For Founders & CEOs', subtitle: 'Payroll that disappears so you can build', href: '/solutions/founders', enabled: true },
      { title: 'For HR & People Ops', subtitle: 'Global workforce, zero compliance headaches', href: '#', enabled: false },
      { title: 'For CFOs & Finance', subtitle: 'One invoice, clean audit trail, full control', href: '#', enabled: false },
      { title: 'For Contractors', subtitle: 'Get paid on time, in your currency, every time', href: '#', enabled: false },
    ],
  },
  Product: {
    label: 'Product',
    columns: 2,
    maxWidth: 500,
    items: [
      { title: 'Contractor of Record (COR)', subtitle: 'Pay contractors in 242 locations. We handle compliance.', href: '/contractor-of-record', enabled: true },
      { title: 'Employer of Record (EOR)', subtitle: 'Hire full-time employees without a local entity', href: '/employer-of-record', enabled: true },
    ],
  },
  'Use Cases': {
    label: 'Use Cases',
    columns: 2,
    maxWidth: 600,
    items: [
      { title: 'Global Hiring', subtitle: 'Scale your team across borders without entities', href: '/use-cases/global-hiring', enabled: true },
      { title: 'Crypto Payroll', subtitle: 'Your treasury is in USDT. Your team isn\u2019t.', href: '/industry/web3', enabled: true },
      { title: 'IP Transfer', subtitle: 'Own what your team builds \u2014 legally', href: '/use-cases/ip-transfer', enabled: true },
      { title: 'Contractor Compliance', subtitle: 'Stay legal in every jurisdiction', href: '#', enabled: false },
      { title: 'Employee Relocation', subtitle: 'Move people, keep them employed', href: '#', enabled: false },
      { title: 'Hiring in a New Location', subtitle: 'Enter new markets without setting up entities', href: '#', enabled: false },
      { title: 'Team Offsite Abroad', subtitle: 'Send your team to a conference in another country', href: '#', enabled: false },
    ],
  },
  Industries: {
    label: 'Industries',
    columns: 2,
    maxWidth: 400,
    items: [
      { title: 'SaaS & Tech', href: '#', enabled: false },
      { title: 'FinTech', href: '#', enabled: false },
      { title: 'Gaming & iGaming', href: '#', enabled: false },
      { title: 'Crypto & Web3', href: '/industry/web3', enabled: true },
      { title: 'EdTech', href: '#', enabled: false },
      { title: 'Software Outsourcing', href: '#', enabled: false },
      { title: 'Professional Services', href: '#', enabled: false },
      { title: 'Accounting', href: '#', enabled: false },
    ],
  },
};

const TOP_ITEMS = ['Solutions', 'Product', 'Use Cases', 'Industries'] as const;

/* ───────── component ───────── */

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  /* close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* close on click outside */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 200);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const handleEnter = (key: string) => {
    cancelClose();
    setActiveMenu(key);
  };

  /* ───── render helpers ───── */

  const ComingSoonBadge = () => (
    <span className="inline-block ml-2 px-1.5 py-0.5 text-[10px] font-medium leading-none rounded bg-[#eee] text-[#999] align-middle">
      Coming soon
    </span>
  );

  const renderItem = (item: MenuItem, close: () => void) => {
    const inner = (
      <>
        <span className={`block font-semibold text-sm ${item.enabled ? 'text-primary' : 'text-[#999]'}`}>
          {item.title}
          {!item.enabled && <ComingSoonBadge />}
        </span>
        {item.subtitle && (
          <span className={`block text-xs mt-0.5 ${item.enabled ? 'text-foreground-secondary' : 'text-[#bbb]'}`}>
            {item.subtitle}
          </span>
        )}
      </>
    );

    const base = 'block rounded-md px-3 py-2 transition-colors duration-150';

    if (item.enabled) {
      return (
        <Link
          key={item.title}
          href={item.href}
          onClick={close}
          className={`${base} hover:bg-background-secondary cursor-pointer`}
        >
          {inner}
        </Link>
      );
    }

    return (
      <div key={item.title} className={`${base} cursor-default`}>
        {inner}
      </div>
    );
  };

  const chevronDown = (
    <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  const arrowRight = (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );

  /* ───── desktop dropdown panel ───── */

  const renderDropdown = (key: string) => {
    const menu = MENUS[key];
    if (!menu) return null;
    const cols = menu.columns ?? 1;

    return (
      <>
        {/* overlay */}
        <div className="fixed inset-0 top-16 z-40 bg-black/5" onClick={() => setActiveMenu(null)} />
        {/* floating card */}
        <div
          className="absolute top-full left-0 mt-2 z-50 bg-white rounded-xl border border-[#eee] animate-megaSlideDown"
          style={{
            width: menu.maxWidth,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="p-5">
            <div className={`grid gap-0.5 ${cols === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {menu.items.map((item) => renderItem(item, () => setActiveMenu(null)))}
            </div>
          </div>
        </div>
      </>
    );
  };

  /* ───── mobile accordion ───── */

  const renderMobileSection = (key: string) => {
    const menu = MENUS[key];
    if (!menu) return null;
    const open = mobileAccordion === key;

    return (
      <div key={key} className="border-b border-border/50 last:border-0">
        <button
          onClick={() => setMobileAccordion(open ? null : key)}
          className="flex items-center justify-between w-full py-3 text-sm font-semibold text-primary"
        >
          {key}
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="pb-3 pl-2 space-y-1">
            {menu.items.map((item) => renderItem(item, () => { setMobileOpen(false); setMobileAccordion(null); }))}
          </div>
        )}
      </div>
    );
  };

  /* ───── main render ───── */

  return (
    <>
      {/* inject keyframes once */}
      <style jsx global>{`
        @keyframes megaSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-megaSlideDown {
          animation: megaSlideDown 180ms ease-out forwards;
        }
      `}</style>

      <nav ref={navRef} className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center h-16">

            {/* ── Logo ── */}
            <Link href="/" className="text-xl font-display font-extrabold text-primary tracking-tight">
              Stape
            </Link>

            {/* ── Desktop nav items ── */}
            <div className="hidden md:flex items-center gap-1">
              {TOP_ITEMS.map((key) => (
                <div
                  key={key}
                  onMouseEnter={() => handleEnter(key)}
                  onMouseLeave={scheduleClose}
                  className="relative"
                >
                  <button
                    className={`flex items-center text-sm px-3 py-2 rounded-md transition-colors duration-150
                      ${activeMenu === key
                        ? 'text-primary font-medium bg-background-secondary'
                        : 'text-foreground-secondary hover:text-primary'
                      }`}
                  >
                    {key}
                    {chevronDown}
                  </button>
                  {activeMenu === key && MENUS[key] && renderDropdown(key)}
                </div>
              ))}

              {/* Pricing — direct link */}
              <Link
                href="/pricing"
                className="text-sm px-3 py-2 rounded-md text-foreground-secondary hover:text-primary transition-colors duration-150"
                onMouseEnter={() => { cancelClose(); setActiveMenu(null); }}
              >
                Pricing
              </Link>
            </div>

            {/* ── Right side ── */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="#"
                className="flex items-center gap-1 text-sm text-foreground-secondary hover:text-primary transition-colors"
              >
                Log in
                {arrowRight}
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
              >
                Book a Demo
                {arrowRight}
              </Link>
            </div>

            {/* ── Hamburger (mobile) ── */}
            <button
              type="button"
              className="md:hidden text-primary p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

      </nav>

      {/* ── Mobile full-screen menu ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16 overflow-y-auto md:hidden">
          <div className="px-6 py-4">
            {TOP_ITEMS.map((key) => renderMobileSection(key))}

            {/* Pricing */}
            <div className="border-b border-border/50">
              <Link
                href="/pricing"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm font-semibold text-primary"
              >
                Pricing
              </Link>
            </div>

            {/* Login + CTA */}
            <div className="pt-6 space-y-3">
              <Link
                href="#"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-1 text-sm text-foreground-secondary"
              >
                Log in {arrowRight}
              </Link>
              <Link
                href="#"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-md"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
