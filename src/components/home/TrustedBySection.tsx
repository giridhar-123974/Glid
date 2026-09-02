import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function TrustedBySection() {
  const brands = [
    { name: 'KredX', type: 'Fintech Enterprise' },
    { name: 'Aura Health', type: 'Series A HealthTech' },
    { name: 'CloudPulse AI', type: 'YC W24 Alum' },
    { name: 'Nexus Logistics', type: 'Supply Chain SaaS' },
    { name: 'Starlight Media', type: 'Creator Studio' },
    { name: 'Bharat D2C', type: 'Brand Network' },
    { name: 'Qubit Capital', type: 'Venture Studio' },
    { name: 'Vanguard Legal', type: 'Corporate Compliance' }
  ];

  return (
    <section className="py-10 bg-white border-y border-gray-200/60 overflow-hidden relative select-none">
      
      {/* Subtle edge fade overlays for marquee */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
          <span>Trusted by 3,800+ Indian Startups, YC Alums & Scaleups</span>
        </p>
      </div>

      {/* Infinite Smooth Scrolling Marquee */}
      <div className="flex animate-marquee gap-8 items-center">
        {[...brands, ...brands, ...brands].map((brand, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-[#F8FAF8] border border-gray-200/80 hover:border-emerald-400/80 transition-colors shadow-2xs group flex-shrink-0"
          >
            <div className="w-7 h-7 rounded-xl bg-[#DCFCE7] text-[#0F5132] font-black flex items-center justify-center text-xs group-hover:bg-[#0F5132] group-hover:text-white transition-colors">
              {brand.name.charAt(0)}
            </div>
            <div>
              <span className="text-xs font-extrabold text-gray-800 tracking-tight block group-hover:text-[#0F5132]">
                {brand.name}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">
                {brand.type}
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
