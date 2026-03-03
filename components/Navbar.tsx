'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Left: hamburger + logo */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-primary p-1"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <Link href="/" className="text-xl font-display font-extrabold text-primary tracking-tight">
              Stape
            </Link>
          </div>

          {/* Center: nav links */}
          <div className="hidden md:flex items-center gap-8">
            <div ref={solutionsRef} className="relative">
              <button
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                className="flex items-center gap-1 text-sm text-foreground-secondary hover:text-primary transition-colors"
              >
                Solutions
                <svg className={`w-3 h-3 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {solutionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg border border-border shadow-lg py-2">
                  <Link
                    href="/solutions/founders"
                    onClick={() => setSolutionsOpen(false)}
                    className="block px-4 py-2 text-sm text-foreground-secondary hover:text-primary hover:bg-background-secondary transition-colors"
                  >
                    For Founders
                  </Link>
                  <Link
                    href="/use-cases/global-hiring"
                    onClick={() => setSolutionsOpen(false)}
                    className="block px-4 py-2 text-sm text-foreground-secondary hover:text-primary hover:bg-background-secondary transition-colors"
                  >
                    Global Hiring
                  </Link>
                  <Link
                    href="/use-cases/ip-transfer"
                    onClick={() => setSolutionsOpen(false)}
                    className="block px-4 py-2 text-sm text-foreground-secondary hover:text-primary hover:bg-background-secondary transition-colors"
                  >
                    IP Transfer
                  </Link>
                  <Link
                    href="/industry/web3"
                    onClick={() => setSolutionsOpen(false)}
                    className="block px-4 py-2 text-sm text-foreground-secondary hover:text-primary hover:bg-background-secondary transition-colors"
                  >
                    Web3 & Crypto
                  </Link>
                </div>
              )}
            </div>
            <Link href="/product" className="text-sm text-foreground-secondary hover:text-primary transition-colors">
              Product
            </Link>
            <a href="#pricing" className="text-sm text-foreground-secondary hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#how-it-works" className="text-sm text-foreground-secondary hover:text-primary transition-colors">
              Resources
            </a>
            <a href="#" className="text-sm text-foreground-secondary hover:text-primary transition-colors">
              Partner Program
            </a>
          </div>

          {/* Right: language, login, CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-foreground-secondary hover:text-primary transition-colors px-3 py-1.5 border border-border rounded-md">
              EN
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <Link
              href="#"
              className="flex items-center gap-1 text-sm text-foreground-secondary hover:text-primary transition-colors"
            >
              Login
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:bg-primary/90 transition-colors"
            >
              Book a Demo
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile menu button (visible only on small screens when hamburger is hidden) */}
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="bg-white border-t border-border">
          <div className="px-6 py-4 space-y-3">
            <div className="py-1">
              <span className="block text-sm text-foreground-secondary">Solutions</span>
              <Link href="/solutions/founders" onClick={() => setIsOpen(false)} className="block text-sm text-foreground-muted pl-4 py-1 hover:text-primary transition-colors">For Founders</Link>
              <Link href="/use-cases/global-hiring" onClick={() => setIsOpen(false)} className="block text-sm text-foreground-muted pl-4 py-1 hover:text-primary transition-colors">Global Hiring</Link>
              <Link href="/use-cases/ip-transfer" onClick={() => setIsOpen(false)} className="block text-sm text-foreground-muted pl-4 py-1 hover:text-primary transition-colors">IP Transfer</Link>
              <Link href="/industry/web3" onClick={() => setIsOpen(false)} className="block text-sm text-foreground-muted pl-4 py-1 hover:text-primary transition-colors">Web3 & Crypto</Link>
            </div>
            <Link href="/product" className="block text-sm text-foreground-secondary py-1">Product</Link>
            <a href="#pricing" className="block text-sm text-foreground-secondary py-1">Pricing</a>
            <a href="#how-it-works" className="block text-sm text-foreground-secondary py-1">Resources</a>
            <a href="#" className="block text-sm text-foreground-secondary py-1">Partner Program</a>
            <div className="pt-3 border-t border-border space-y-3">
              <Link href="#" className="block text-sm text-foreground-secondary">Login</Link>
              <Link
                href="#"
                className="block w-full text-center px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-md"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
