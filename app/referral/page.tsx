'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ReferralPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 md:pt-40 md:pb-28 bg-white">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
          <h1 className="font-display font-extrabold text-[36px] md:text-[52px] text-primary leading-[1.08] mb-6 tracking-[-0.025em]">
            Referral Program
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed">
            Refer a team to Kleos and earn rewards. Details coming soon.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
