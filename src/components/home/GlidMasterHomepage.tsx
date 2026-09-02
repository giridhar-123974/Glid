'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Star, 
  Clock, 
  Heart, 
  Share2, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Lock, 
  Users, 
  Briefcase, 
  Radio, 
  Mic, 
  Crosshair, 
  Award,
  Zap,
  Globe,
  CreditCard,
  Check
} from 'lucide-react';
import { PROFESSIONALS } from '@/data/mockData';
import { Professional } from '@/types';

const TRENDING_SEARCHES = [
  'Photographer',
  'Web Developer',
  'Video Editor',
  'Tutor',
  'Electrician'
];

const QUICK_CATEGORIES = [
  { name: 'Development', icon: '💻', count: '4,850+ Pros', href: '/explore?q=Development' },
  { name: 'Design', icon: '🎨', count: '3,120+ Pros', href: '/explore?q=Design' },
  { name: 'Photography', icon: '📷', count: '3,240+ Pros', href: '/explore?q=Photography' },
  { name: 'Video Editing', icon: '🎬', count: '2,750+ Pros', href: '/explore?q=Video+Editing' },
  { name: 'Marketing', icon: '📈', count: '2,410+ Pros', href: '/explore?q=Marketing' },
  { name: 'Tutors', icon: '🎓', count: '1,950+ Pros', href: '/explore?q=Tutor' },
  { name: 'Events', icon: '🎪', count: '1,420+ Pros', href: '/explore?q=Events' },
  { name: 'Home Services', icon: '⚡', count: '3,820+ Pros', href: '/explore?q=Home+Services' },
  { name: 'Business Services', icon: '💼', count: '1,480+ Pros', href: '/explore?q=Business' },
  { name: 'View All', icon: '✨', count: '50+ Areas', href: '/services' }
];

const WORKFLOW_STEPS = [
  { step: '01', title: 'Search', desc: 'Type natural AI prompt or role' },
  { step: '02', title: 'Choose Location', desc: 'Set GPS or choose radius' },
  { step: '03', title: 'Verified Pros', desc: 'Browse 100% Aadhaar KYC talent' },
  { step: '04', title: 'Instant Book', desc: 'Select hourly or milestone package' },
  { step: '05', title: 'Bank Escrow', desc: 'Funds secured with OTP safety' },
  { step: '06', title: 'Work Done', desc: 'Verify work & release payment' }
];

const WHY_GLID_CARDS = [
  { icon: ShieldCheck, title: 'Verified Users', desc: '100% DigiLocker Aadhaar KYC authenticated identities.' },
  { icon: Sparkles, title: 'AI Matching', desc: 'Natural language search parses urgency, budget & skill instantly.' },
  { icon: Lock, title: 'Institutional Escrow', desc: 'Funds safely held in trustee bank escrow until milestone approval.' },
  { icon: Zap, title: 'Instant Booking', desc: 'Direct calendar integration for immediate confirmed appointments.' },
  { icon: Radio, title: 'Live Tracking', desc: 'Real-time GPS proximity and live active status radar.' },
  { icon: CreditCard, title: 'Secure Payments', desc: 'Instant UPI, Cards, Net Banking with automated GST invoices.' },
  { icon: Award, title: 'One Identity', desc: 'Universal trust score & verified reputation that travels with you.' },
  { icon: Users, title: 'Thriving Community', desc: 'Empowering over 200,000+ top Indian freelancers and creators.' }
];

export default function GlidMasterHomepage() {
  const router = useRouter();

  // Search & Navigation States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const [activeStep, setActiveStep] = useState<number>(0); // 0: Homepage, 1: Guided Flow
  
  // Guided Search Flow States
  const [flowCategory, setFlowCategory] = useState('Web Development');
  const [flowRadius, setFlowRadius] = useState<'5 KM' | '10 KM' | '20 KM' | '50 KM'>('10 KM');
  const [flowVerifiedOnly, setFlowVerifiedOnly] = useState(true);
  const [flowAvailableNow, setFlowAvailableNow] = useState(false);
  const [selectedProForBooking, setSelectedProForBooking] = useState<Professional | null>(null);
  const [bookingPackage, setBookingPackage] = useState<'Hourly' | 'Fixed Project' | 'Monthly'>('Fixed Project');
  const [bookingOtp, setBookingOtp] = useState('8392');
  const [isBookingDone, setIsBookingDone] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleExecuteSearch = (customQuery?: string) => {
    const q = customQuery || searchQuery;
    if (!q.trim()) {
      setFlowCategory('All Verified Specialists');
    } else {
      setFlowCategory(q.trim());
    }
    setActiveStep(1); // Open the Uber-style guided opportunity matching flow
  };

  // Filtered Professionals for the Guided Flow & Featured
  const displayedPros = PROFESSIONALS.filter(p => {
    if (flowAvailableNow && p.liveStatus !== 'available_now') return false;
    return true;
  });

  return (
    <div className="w-full bg-white text-[#111827] min-h-screen font-sans selection:bg-orange-100 selection:text-[#F97316]">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#111827] text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DEFAULT HOMEPAGE (CLEAN APPLE + AIRBNB + UBER SEARCH-FIRST INTERFACE)   */}
      {/* ========================================================================= */}
      {activeStep === 0 && (
        <div className="space-y-24 py-8 pb-24">
          
          {/* SECTION 2 & 3: HERO + AI SEARCH */}
          <section className="pt-12 pb-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7ED] text-[#F97316] text-xs font-bold border border-orange-200/60">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span>Location-First • AI-Powered Marketplace</span>
            </div>

            {/* Huge Clean Typography */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#111827] leading-[1.1]">
              One Verified Identity.<br />
              <span className="text-[#F97316]">Infinite Opportunities.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#6B7280] max-w-xl mx-auto font-medium leading-relaxed">
              Find verified professionals, creators and services around you.
            </p>

            {/* Unified Search-First AI Search Bar */}
            <div className="mt-8 max-w-3xl mx-auto">
              <div className="p-2 sm:p-2.5 rounded-2xl bg-white border border-[#E5E7EB] shadow-search-bar flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0 hover:border-gray-300 transition-all">
                
                {/* Input with Natural Language Understanding */}
                <div className="flex-1 px-3 py-2 text-left flex items-center gap-2.5">
                  <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleExecuteSearch()}
                    placeholder="Search What You Need..."
                    className="w-full bg-transparent text-sm font-semibold text-[#111827] placeholder:text-gray-400 focus:outline-none"
                  />
                  <button 
                    onClick={() => showToast("AI Voice listening...")}
                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0"
                    title="Voice Search"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>

                {/* Location Chip + Search Button */}
                <div className="flex items-center gap-2 px-2 border-t sm:border-t-0 sm:border-l border-gray-100 pt-2 sm:pt-0">
                  <div className="flex items-center gap-1 text-xs font-bold text-[#111827] px-2 py-1 bg-gray-50 rounded-lg whitespace-nowrap">
                    <MapPin className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>📍 {selectedCity}</span>
                  </div>

                  <button
                    onClick={() => handleExecuteSearch()}
                    className="btn-orange px-6 py-3 text-xs font-bold flex items-center gap-1.5 shadow-sm flex-shrink-0"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

            {/* Trending Natural Suggestions */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="font-bold text-[#111827]">Trending:</span>
              {TRENDING_SEARCHES.map((term, idx) => (
                <button
                  key={idx}
                  onClick={() => handleExecuteSearch(term)}
                  className="px-3.5 py-1.5 rounded-full bg-gray-50 hover:bg-[#FFF7ED] border border-[#E5E7EB] hover:border-orange-200 text-[#111827] hover:text-[#F97316] transition-all font-semibold"
                >
                  {term}
                </button>
              ))}
            </div>

          </section>

          {/* SECTION 4: QUICK CATEGORIES (10 BEAUTIFUL ROUNDED CARDS WITH GLASS EFFECT) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-[#111827] tracking-tight">
                  Explore Specialized Disciplines
                </h2>
                <p className="text-xs text-[#6B7280] mt-0.5">Vetted professionals ready for immediate booking</p>
              </div>
              <Link href="/services" className="text-xs font-bold text-[#F97316] hover:underline flex items-center gap-1">
                <span>View All 50+</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {QUICK_CATEGORIES.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => handleExecuteSearch(cat.name)}
                  className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-soft shadow-soft-hover text-left flex flex-col justify-between h-32 group transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-[10px] font-bold text-[#6B7280] bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                      {cat.count}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#111827] group-hover:text-[#F97316] transition-colors leading-tight">
                      {cat.name}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* SECTION 5: HOW GLID WORKS (ILLUSTRATED TIMELINE) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-gray-50/70 border border-[#E5E7EB] space-y-10">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
                  SEAMLESS WORKFLOW
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">
                  How GLID Works
                </h2>
                <p className="text-xs text-[#6B7280]">
                  From natural search to milestone release in under 6 simple steps.
                </p>
              </div>

              {/* 6 Illustrated Steps Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {WORKFLOW_STEPS.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs space-y-2 text-left flex flex-col justify-between">
                    <span className="text-xs font-black text-[#F97316] font-mono">{step.step}</span>
                    <div>
                      <h3 className="text-xs font-bold text-[#111827]">{step.title}</h3>
                      <p className="text-[11px] text-[#6B7280] mt-0.5 leading-snug">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 6: FEATURED PROFESSIONALS (PREMIUM HORIZONTAL CARDS) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-[#111827] tracking-tight">
                  Featured Professionals
                </h2>
                <p className="text-xs text-[#6B7280] mt-0.5">Top-tier authenticated talent with verified track records</p>
              </div>
              <Link href="/explore" className="text-xs font-bold text-[#F97316] hover:underline">
                Explore All →
              </Link>
            </div>

            {/* Horizontal Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROFESSIONALS.slice(0, 4).map((pro) => (
                <div
                  key={pro.id}
                  className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-soft shadow-soft-hover flex flex-col sm:flex-row items-center justify-between gap-5 transition-all"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={pro.avatarUrl} alt={pro.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-[#111827]">{pro.name}</h3>
                        <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-[#111827]">★★★★★ 4.9</span>
                        <span className="text-[#F97316] font-bold bg-[#FFF7ED] px-2 py-0.2 rounded-md text-[11px]">
                          {pro.trustScore} Trust Score
                        </span>
                      </div>
                      <p className="text-xs text-[#6B7280] font-medium">{pro.headline}</p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    <div className="text-left sm:text-right">
                      <span className="text-sm font-black text-[#111827]">₹{pro.hourlyRateINR.toLocaleString()}/hr</span>
                      <span className="text-[10px] text-[#6B7280] block font-medium">{pro.completedProjectsCount || 45} Projects</span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedProForBooking(pro);
                        setActiveStep(1);
                      }}
                      className="btn-orange px-4 py-2 text-xs font-bold shadow-xs whitespace-nowrap"
                    >
                      Book Now
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </section>

          {/* SECTION 7: AI RECOMMENDATIONS ("RECOMMENDED NEAR YOU") */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-[#111827] tracking-tight">
                  Recommended Near You in {selectedCity}
                </h2>
                <p className="text-xs text-[#6B7280] mt-0.5">Personalized matching based on location, budget & availability</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[
                { title: 'Wedding Photographer', rate: '₹1,500/hr', eta: 'Available Today', icon: '📷' },
                { title: 'Full Stack React Dev', rate: '₹1,200/hr', eta: 'Immediate Start', icon: '💻' },
                { title: 'DaVinci Video Editor', rate: '₹950/hr', eta: 'In 2 Hours', icon: '🎬' },
                { title: 'Certified Drone Pilot', rate: '₹2,200/hr', eta: 'Tomorrow 9 AM', icon: '🎥' },
                { title: 'Govt AC Technician', rate: '₹499 fixed', eta: 'In 30 Minutes', icon: '⚡' }
              ].map((rec, idx) => (
                <div
                  key={idx}
                  onClick={() => handleExecuteSearch(rec.title)}
                  className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-soft shadow-soft-hover text-left space-y-2 cursor-pointer transition-all"
                >
                  <span className="text-2xl">{rec.icon}</span>
                  <h3 className="text-xs font-bold text-[#111827] leading-snug">{rec.title}</h3>
                  <div className="pt-1 border-t border-gray-100 flex items-center justify-between text-[11px]">
                    <span className="font-black text-[#111827]">{rec.rate}</span>
                    <span className="text-[#22C55E] font-bold">{rec.eta}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 8: LIVE INTERACTIVE MAP (UBER-STYLE RADAR) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 rounded-3xl bg-[#111827] text-white space-y-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#F97316]">
                    <Radio className="w-3.5 h-3.5 text-[#22C55E] animate-pulse" />
                    <span>Live GPS Radar • {selectedCity}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                    Nearby Available Specialists
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold">
                  <span>Radius:</span>
                  {(['5 KM', '10 KM', '20 KM', '50 KM'] as const).map(r => (
                    <button
                      key={r}
                      onClick={() => setFlowRadius(r)}
                      className={`px-3 py-1 rounded-lg transition-colors ${
                        flowRadius === r ? 'bg-[#F97316] text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Uber-Style Vector Map Canvas */}
              <div className="relative h-64 sm:h-80 w-full rounded-2xl bg-slate-900 border border-white/10 overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#F97316_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Center User Pin */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full bg-[#F97316] ring-4 ring-[#F97316]/30 animate-pulse" />
                  <span className="text-[10px] font-bold text-white mt-1 bg-black/80 px-2 py-0.5 rounded">You (Hitech City)</span>
                </div>

                {/* Floating Specialist Pins */}
                <div className="absolute top-12 left-1/4 z-10 bg-white/95 text-gray-900 px-2.5 py-1.5 rounded-xl shadow-lg text-[10px] font-bold flex items-center gap-1.5 border border-white">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  <span>📍 Rahul (₹1200 • 99 Trust)</span>
                </div>

                <div className="absolute bottom-16 right-1/4 z-10 bg-white/95 text-gray-900 px-2.5 py-1.5 rounded-xl shadow-lg text-[10px] font-bold flex items-center gap-1.5 border border-white">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  <span>📍 Priya (₹1500 • 98 Trust)</span>
                </div>

                <div className="absolute top-16 right-1/3 z-10 bg-white/95 text-gray-900 px-2.5 py-1.5 rounded-xl shadow-lg text-[10px] font-bold flex items-center gap-1.5 border border-white">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  <span>📍 Vikram (₹800 • 99 Trust)</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 9: SUCCESS METRICS (ANIMATED COUNTERS) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-soft text-center">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-[#111827]">200K+</div>
                <div className="text-xs font-bold text-[#6B7280]">Verified Professionals</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-[#111827]">50K+</div>
                <div className="text-xs font-bold text-[#6B7280]">Projects Completed</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-[#F97316]">₹40Cr+</div>
                <div className="text-xs font-bold text-[#6B7280]">Total Freelancer Earnings</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-[#22C55E]">98%</div>
                <div className="text-xs font-bold text-[#6B7280]">Customer Satisfaction</div>
              </div>
            </div>
          </section>

          {/* SECTION 10: WHY GLID (VALUE CARDS) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
                BUILT ON TRUST
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">
                Why Choose GLID
              </h2>
              <p className="text-xs text-[#6B7280]">
                Institutional security, authenticated KYC identities and zero hidden deductions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_GLID_CARDS.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div key={idx} className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-soft shadow-soft-hover space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#F97316] flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-[#111827]">{card.title}</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">{card.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 12: CTA */}
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-10 sm:p-14 rounded-3xl bg-[#111827] text-white text-center space-y-6 shadow-2xl">
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Ready to grow with India&apos;s trusted network?
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
                Join over 200,000+ verified professionals and business clients today.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href="/dashboard?role=professional"
                  className="btn-orange px-6 py-3 text-xs font-bold"
                >
                  Become a Professional
                </Link>
                <button
                  onClick={() => handleExecuteSearch()}
                  className="px-6 py-3 rounded-xl bg-white text-[#111827] text-xs font-bold hover:bg-gray-100 transition-colors"
                >
                  Hire Talent
                </button>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 20-SECOND GUIDED SEARCH FLOW (When User Searches or Books)                 */}
      {/* ========================================================================= */}
      {activeStep > 0 && (
        <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh] space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
            <button
              onClick={() => setActiveStep(0)}
              className="flex items-center gap-1.5 text-xs font-bold text-[#111827] hover:text-[#F97316] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Search</span>
            </button>
            <span className="text-xs font-bold text-[#6B7280]">
              Matching in {selectedCity} (within {flowRadius})
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#111827]">
                  Verified {flowCategory} Specialists
                </h2>
                <p className="text-xs text-[#6B7280]">Showing {displayedPros.length} available professionals with 100% Escrow Protection</p>
              </div>

              {/* Filter Chips */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFlowVerifiedOnly(!flowVerifiedOnly)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1 ${
                    flowVerifiedOnly ? 'bg-[#111827] text-white border-[#111827]' : 'bg-gray-50 text-[#111827] border-[#E5E7EB]'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Aadhaar KYC</span>
                </button>

                <button
                  onClick={() => setFlowAvailableNow(!flowAvailableNow)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1 ${
                    flowAvailableNow ? 'bg-[#F97316] text-white border-[#F97316]' : 'bg-gray-50 text-[#111827] border-[#E5E7EB]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  <span>Available Now</span>
                </button>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedPros.map((pro) => (
                <div
                  key={pro.id}
                  className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-soft shadow-soft-hover flex flex-col justify-between space-y-4 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={pro.avatarUrl} alt={pro.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <h3 className="font-bold text-sm text-[#111827]">{pro.name}</h3>
                          <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                        </div>
                        <p className="text-xs text-[#6B7280]">{pro.headline}</p>
                        <div className="flex items-center gap-2 text-xs mt-1">
                          <span className="font-bold text-[#111827]">★ 4.98</span>
                          <span className="text-[#F97316] font-bold bg-[#FFF7ED] px-1.5 py-0.2 rounded text-[10px]">
                            {pro.trustScore} Trust
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black text-[#111827]">₹{pro.hourlyRateINR.toLocaleString()}/hr</span>
                      <span className="text-[10px] text-gray-400 block">{pro.distanceKm || 1.8} km away</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#22C55E] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                      {pro.liveStatus === 'available_now' ? 'Available Today' : 'Tomorrow'}
                    </span>

                    <button
                      onClick={() => {
                        setSelectedProForBooking(pro);
                        showToast(`Selected ${pro.name} for instant booking`);
                      }}
                      className="btn-orange px-4 py-1.5 text-xs font-bold shadow-xs"
                    >
                      Book with Escrow →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Escrow Booking Modal Overlay */}
            {selectedProForBooking && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E5E7EB] animate-in zoom-in-95">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div>
                      <span className="text-[10px] font-bold text-[#22C55E] uppercase tracking-wider">
                        100% INSTITUTIONAL BANK ESCROW
                      </span>
                      <h3 className="text-lg font-black text-[#111827]">
                        Book {selectedProForBooking.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedProForBooking(null);
                        setIsBookingDone(false);
                      }}
                      className="p-1.5 text-gray-400 hover:text-[#111827]"
                    >
                      ✕
                    </button>
                  </div>

                  {!isBookingDone ? (
                    <div className="space-y-4 text-xs">
                      <div>
                        <label className="block font-bold text-[#111827] mb-1.5">Package Type:</label>
                        <div className="grid grid-cols-3 gap-2">
                          {(['Hourly', 'Fixed Project', 'Monthly'] as const).map(pkg => (
                            <button
                              key={pkg}
                              onClick={() => setBookingPackage(pkg)}
                              className={`py-2 rounded-xl font-bold transition-all ${
                                bookingPackage === pkg
                                  ? 'bg-[#111827] text-white shadow-xs'
                                  : 'bg-gray-50 text-[#111827] border border-[#E5E7EB]'
                              }`}
                            >
                              {pkg}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-center space-y-1">
                        <span className="text-[10px] font-bold text-orange-900 uppercase">
                          Cryptographic Milestone OTP
                        </span>
                        <div className="text-3xl font-black text-[#F97316] font-mono tracking-widest">
                          {bookingOtp}
                        </div>
                        <p className="text-[10px] text-gray-600">
                          Share this OTP with {selectedProForBooking.name} ONLY after deliverables are verified.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setIsBookingDone(true);
                          showToast(`Milestone funded in bank escrow!`);
                        }}
                        className="w-full btn-orange py-3 text-xs font-bold shadow-sm"
                      >
                        Confirm Booking & Fund Escrow (₹{(selectedProForBooking.hourlyRateINR * 4).toLocaleString()})
                      </button>
                    </div>
                  ) : (
                    <div className="text-center space-y-4 py-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#22C55E] flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-gray-900">Booking Confirmed!</h4>
                      <p className="text-xs text-gray-600">
                        Funds safely locked in bank trustee escrow. {selectedProForBooking.name} has been notified.
                      </p>
                      <button
                        onClick={() => {
                          setSelectedProForBooking(null);
                          setIsBookingDone(false);
                          setActiveStep(0);
                        }}
                        className="px-6 py-2.5 rounded-xl bg-[#111827] text-white text-xs font-bold"
                      >
                        Return to Home
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
