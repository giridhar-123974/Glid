'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Crosshair, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react';

const ROTATING_EXAMPLES = [
  'Wedding Photographer',
  'Next.js 15 Developer',
  'Certified Electrician',
  'Chartered Accountant',
  'Sony FX3 Cinematographer',
  'UI/UX Design Systems'
];

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Hitech City, Hyderabad');
  const [timing, setTiming] = useState('Today');
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setExampleIndex((prev) => (prev + 1) % ROTATING_EXAMPLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalQuery = query.trim() || ROTATING_EXAMPLES[exampleIndex];
    router.push(`/explore?q=${encodeURIComponent(finalQuery)}&loc=${encodeURIComponent(location)}`);
  };

  const handleChipClick = (chip: string) => {
    router.push(`/explore?q=${encodeURIComponent(chip)}`);
  };

  return (
    <section className="relative pt-12 pb-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Subtle Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 mb-6 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
          <span>India’s Verified Opportunity Marketplace</span>
          <span className="text-gray-300">•</span>
          <span className="text-[#EA580C] font-bold">18,540+ Pros</span>
        </div>

        {/* Apple-Style Confident Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight max-w-4xl mx-auto leading-[1.1]">
          Find verified talent.{' '}
          <span className="text-[#F97316]">Instantly.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mt-4 font-normal leading-relaxed">
          Book top-rated developers, creators, home services, and local specialists with 100% bank escrow protection.
        </p>

        {/* Large Floating Airbnb-Style Search Bar */}
        <div className="mt-10 max-w-4xl mx-auto">
          <form 
            onSubmit={handleSearch}
            className="p-2 sm:p-2.5 rounded-3xl sm:rounded-full bg-white border border-gray-200/90 shadow-search flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0 transition-all hover:border-gray-300"
          >
            {/* Segment 1: What do you need? */}
            <div className="flex-1 px-5 py-3 text-left border-b sm:border-b-0 sm:border-r border-gray-100 hover:bg-gray-50/60 rounded-2xl sm:rounded-l-full transition-colors cursor-text">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                What are you looking for?
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`e.g. ${ROTATING_EXAMPLES[exampleIndex]}`}
                className="w-full bg-transparent text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none truncate mt-0.5"
              />
            </div>

            {/* Segment 2: Location */}
            <div className="px-5 py-3 text-left border-b sm:border-b-0 sm:border-r border-gray-100 hover:bg-gray-50/60 transition-colors">
              <div className="flex items-center justify-between">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Location
                </label>
                <button 
                  type="button" 
                  onClick={() => setLocation('Current Location (GPS)')} 
                  className="text-gray-400 hover:text-[#F97316]"
                  title="Detect GPS Location"
                >
                  <Crosshair className="w-3 h-3" />
                </button>
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-gray-900 focus:outline-none truncate mt-0.5"
              />
            </div>

            {/* Segment 3: When? */}
            <div className="px-5 py-3 text-left hover:bg-gray-50/60 transition-colors">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Availability
              </label>
              <select
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-gray-900 focus:outline-none cursor-pointer mt-0.5"
              >
                <option value="Today">⚡ Available Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Flexible">This Weekend / Any time</option>
              </select>
            </div>

            {/* Segment 4: Search Button */}
            <button
              type="submit"
              className="sm:w-14 sm:h-14 h-12 w-full rounded-2xl sm:rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white flex items-center justify-center flex-shrink-0 transition-all shadow-sm hover:scale-105 active:scale-95"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Quick Filter Horizontal Chips (Airbnb-style) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
            <button
              onClick={() => handleChipClick('Available Now')}
              className="px-3.5 py-1.5 rounded-full bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 text-gray-700 hover:text-[#EA580C] transition-all flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Available Today
            </button>

            <button
              onClick={() => handleChipClick('Photographer')}
              className="px-3.5 py-1.5 rounded-full bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 text-gray-700 hover:text-[#EA580C] transition-all"
            >
              📷 Photographers
            </button>

            <button
              onClick={() => handleChipClick('Developer')}
              className="px-3.5 py-1.5 rounded-full bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 text-gray-700 hover:text-[#EA580C] transition-all"
            >
              💻 Next.js & AI
            </button>

            <button
              onClick={() => handleChipClick('Electrician')}
              className="px-3.5 py-1.5 rounded-full bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 text-gray-700 hover:text-[#EA580C] transition-all"
            >
              ⚡ Home Services
            </button>

            <button
              onClick={() => handleChipClick('Chartered Accountant')}
              className="px-3.5 py-1.5 rounded-full bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 text-gray-700 hover:text-[#EA580C] transition-all"
            >
              💼 CA & Legal
            </button>

            <button
              onClick={() => handleChipClick('Top Rated')}
              className="px-3.5 py-1.5 rounded-full bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 text-gray-700 hover:text-[#EA580C] transition-all flex items-center gap-1"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              Top 1% Rated
            </button>
          </div>
        </div>

        {/* Minimalist Key Metric Line */}
        <div className="mt-14 pt-10 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left sm:text-center">
          <div>
            <div className="text-2xl font-black text-gray-900 tracking-tight">18,540+</div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">DigiLocker KYC Verified</div>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 tracking-tight">₹54.8 Cr+</div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">Protected in Bank Escrow</div>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 tracking-tight">8.4 mins</div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">Average Match Time</div>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 tracking-tight">4.98 ★</div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">Client Satisfaction Rate</div>
          </div>
        </div>

      </div>
    </section>
  );
}
