import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-orange-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          100% Identity & Escrow Protected
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-2xl mx-auto leading-tight">
          Ready to hire top talent or start earning?
        </h2>

        <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto font-normal">
          Join 18,540+ verified professionals and ambitious companies across India.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/explore"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Marketplace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/dashboard?role=professional"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <span>Join as a Verified Pro</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
