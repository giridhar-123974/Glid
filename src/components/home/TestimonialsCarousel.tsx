import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "We hired an entire Next.js + Gemini AI squad on GLID in 24 hours. The escrow milestone system gave us 100% peace of mind.",
    name: "Nitin Kulkarni",
    role: "Founder & CEO, CloudPulse AI",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    company: "YC W24 Cohort"
  },
  {
    quote: "Found our commercial drone cinematographer in Hyderabad within 45 minutes of posting. Pristine 4K footage delivered next morning.",
    name: "Siddharth Varma",
    role: "Creative Producer, Starlight Media",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    company: "Commercial Studio"
  },
  {
    quote: "As a Chartered Accountant, GLID eliminated all payment chasing. Clients deposit into escrow upfront and funds disburse automatically upon filing.",
    name: "CA Neha Kulkarni",
    role: "FCA, Corporate Tax Specialist",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    company: "190+ Completed Audits"
  }
];

export default function TestimonialsCarousel() {
  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Trusted by India’s Best Startups & Creators
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Real stories from verified clients and independent specialists.
          </p>
        </div>

        {/* 3 Clean Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div key={idx} className="bg-gray-50/70 p-8 rounded-2xl border border-gray-200/70 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed font-normal">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-200/60">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1">
                    {item.name}
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </h4>
                  <p className="text-[11px] text-gray-500 font-medium">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
