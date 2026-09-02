'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Star, 
  Heart, 
  ShieldCheck, 
  Video, 
  ArrowRight, 
  Check, 
  Sparkles,
  ChevronDown,
  ChevronRight,
  Code,
  Palette,
  Megaphone,
  PenTool,
  Film,
  Bot,
  Play,
  Smartphone
} from 'lucide-react';
import { GIGS_DATA, GigItem } from '@/data/gigsData';
import EscrowModal from '@/components/profile/EscrowModal';
import { PROFESSIONALS } from '@/data/mockData';

const TOP_CATEGORIES_BAR = [
  { name: 'Trending 🔥', href: '/explore?filter=trending' },
  { name: 'Graphics & Design', href: '/explore?category=design' },
  { name: 'Programming & Tech', href: '/explore?category=tech' },
  { name: 'Digital Marketing', href: '/explore?category=marketing' },
  { name: 'Video & Animation', href: '/explore?category=creators' },
  { name: 'Writing & Translation', href: '/explore?category=writing' },
  { name: 'Music & Audio', href: '/explore?category=events' },
  { name: 'Business', href: '/explore?category=business' },
  { name: 'Finance', href: '/explore?category=business' },
  { name: 'AI Services', href: '/explore?category=tech' },
  { name: 'Personal Growth', href: '/explore?category=education' },
  { name: 'Consulting', href: '/explore?category=business' },
  { name: 'Data', href: '/explore?category=tech' },
  { name: 'Photography', href: '/explore?category=creators' }
];

const CATEGORY_TILES = [
  { name: 'Programming & Tech', icon: Code, href: '/explore?category=tech' },
  { name: 'Graphics & Design', icon: Palette, href: '/explore?category=design' },
  { name: 'Digital Marketing', icon: Megaphone, href: '/explore?category=marketing' },
  { name: 'Writing & Translation', icon: PenTool, href: '/explore?category=writing' },
  { name: 'Video & Animation', icon: Film, href: '/explore?category=creators' },
  { name: 'AI Services', icon: Bot, href: '/explore?category=tech' }
];

export default function FiverrMarketplaceView() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [savedGigs, setSavedGigs] = useState<Record<string, boolean>>({});
  const [selectedGigForBooking, setSelectedGigForBooking] = useState<GigItem | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/explore');
    }
  };

  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedGigs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full bg-white text-gray-900">
      
      {/* 1. TOP SUB-HEADER CATEGORIES STRIP */}
      <div className="border-b border-gray-200 bg-white sticky top-14 z-30 overflow-x-auto no-scrollbar py-2.5 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 whitespace-nowrap text-xs font-semibold text-gray-600">
          {TOP_CATEGORIES_BAR.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="hover:text-[#0F5132] hover:border-b-2 hover:border-[#0F5132] pb-0.5 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* 2. HERO HEADER WITH SEARCH BAR */}
      <section className="bg-gradient-to-b from-[#0F5132] to-[#0A3622] text-white py-14 sm:py-20 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Our freelancers will take it from here
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/80 max-w-xl mx-auto">
            Find the right verified freelance service, right away with 100% bank escrow protection.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex items-center bg-white rounded-lg p-1.5 shadow-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for any service (e.g. Website development, Logo design)..."
              className="w-full px-4 py-2.5 text-xs sm:text-sm text-gray-900 bg-transparent focus:outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#0F5132] hover:bg-[#14532D] text-white rounded-md font-bold text-xs flex items-center gap-1.5 flex-shrink-0 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>

          {/* Popular Search Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-emerald-200/90 pt-2">
            <span className="font-bold text-white">Popular:</span>
            {['Website Design', 'WordPress', 'Logo Design', 'AI Services', 'Video Editing'].map((tag, idx) => (
              <button
                key={idx}
                onClick={() => router.push(`/explore?q=${encodeURIComponent(tag)}`)}
                className="px-3 py-1 rounded-full border border-white/20 hover:bg-white/10 text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CATEGORY ICON TILES */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORY_TILES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={idx}
                  href={cat.href}
                  className="p-5 rounded-xl border border-gray-200 hover:border-[#0F5132] hover:shadow-md transition-all flex flex-col items-center justify-center text-center space-y-2 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-emerald-50 text-gray-700 group-hover:text-[#0F5132] flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-800 group-hover:text-[#0F5132] transition-colors leading-tight">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <Link href="/services" className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-[#0F5132]">
              <span>Show all 14 categories</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. POPULAR SERVICES CAROUSEL / TILES */}
      <section className="py-14 bg-gray-50/50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-6">
            Popular Services
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { title: 'Website Development', tag: 'Build your web presence', color: 'bg-emerald-900', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80', href: '/explore?q=Website' },
              { title: 'Logo & Brand Identity', tag: 'Build your identity', color: 'bg-orange-950', img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&auto=format&fit=crop&q=80', href: '/explore?q=Logo' },
              { title: 'Video Editing', tag: 'Engage your audience', color: 'bg-slate-900', img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&auto=format&fit=crop&q=80', href: '/explore?q=Video' },
              { title: 'AI & Data Science', tag: 'Automate workflows', color: 'bg-blue-950', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80', href: '/explore?q=AI' },
              { title: 'SEO & Performance', tag: 'Rank on Google', color: 'bg-teal-950', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80', href: '/explore?q=SEO' }
            ].map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="group relative rounded-xl overflow-hidden aspect-[4/5] shadow-xs hover:shadow-lg transition-all p-4 flex flex-col justify-between"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative z-10 text-white">
                  <span className="text-[10px] uppercase font-bold text-emerald-300 block">{item.tag}</span>
                  <h3 className="text-sm font-black text-white mt-1 leading-tight">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MAKE IT ALL HAPPEN WITH FREELANCERS (VALUE PROPS) */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-10">
            Make it all happen with freelancers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-800 flex items-center justify-center font-bold">
                ⚡
              </div>
              <h3 className="text-sm font-bold text-gray-900">Access top verified talent</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Connect with freelancers across 200+ skill categories with verified DigiLocker Aadhaar KYC.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-800 flex items-center justify-center font-bold">
                🎯
              </div>
              <h3 className="text-sm font-bold text-gray-900">Fast & smart matching</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Get matched in minutes through our natural language search and real-time availability radar.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-800 flex items-center justify-center font-bold">
                💳
              </div>
              <h3 className="text-sm font-bold text-gray-900">100% Escrow Protection</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Your payment is held securely in institutional bank escrow and only released when you approve.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-800 flex items-center justify-center font-bold">
                🏆
              </div>
              <h3 className="text-sm font-bold text-gray-900">24/7 dedicated support</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Our support and AI dispute audit team is always ready to assist from onboarding to completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GLID PRO BANNER (ENTERPRISE SOURCING) */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#0F5132] text-white p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-emerald-200">
                <Sparkles className="w-3.5 h-3.5" /> GLID Pro
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Let experts find the right freelancer for you
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/90 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                  <span>Dedicated account manager matching your exact project brief</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                  <span>Hand-vetted top 1% verified professionals with proven track records</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                  <span>Custom milestone contracts and unified team invoicing</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/explore?filter=pro"
                  className="px-6 py-3 rounded-lg bg-white text-[#0F5132] font-bold text-xs hover:bg-emerald-50 transition-colors inline-block shadow-md"
                >
                  Try GLID Pro Today
                </Link>
              </div>
            </div>

            {/* Pro Avatars Showcase */}
            <div className="flex -space-x-4 overflow-hidden p-4 bg-white/10 rounded-2xl border border-white/20">
              {['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'].map((src, i) => (
                <div key={i} className="inline-block h-16 w-16 rounded-full ring-2 ring-white overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="Pro" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. RECOMMENDED GIGS GRID (Based on what you might be looking for) */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Based on what you might be looking for
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Keep exploring recommended services</p>
            </div>
            <Link href="/explore" className="text-xs font-bold text-[#0F5132] hover:underline">
              Show All →
            </Link>
          </div>

          {/* Gigs Grid (Exact Fiverr Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {GIGS_DATA.map((gig) => {
              const isSaved = !!savedGigs[gig.id];

              return (
                <div key={gig.id} className="group flex flex-col justify-between border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white">
                  
                  {/* Gig Cover Image */}
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                    <Link href={`/explore?gig=${gig.id}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={gig.coverImage}
                        alt={gig.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <button
                      onClick={(e) => toggleSave(e, gig.id)}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-gray-700 flex items-center justify-center shadow-xs"
                      title="Save Gig"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>

                  {/* Gig Info */}
                  <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Seller Avatar + Name */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={gig.sellerAvatar} alt={gig.sellerName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex items-center gap-1 truncate">
                          <span className="text-xs font-bold text-gray-900 truncate">{gig.sellerName}</span>
                          {gig.isPro && (
                            <span className="text-[9px] font-extrabold text-[#0F5132] bg-emerald-50 px-1.5 py-0.2 rounded">PRO</span>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <Link href={`/explore?gig=${gig.id}`}>
                        <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 hover:text-[#0F5132] transition-colors leading-snug">
                          {gig.title}
                        </h3>
                      </Link>

                      {/* Video Consultation Tag */}
                      {gig.hasVideoConsultation && (
                        <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1.5">
                          <Video className="w-3 h-3 text-[#0F5132]" />
                          <span>Offers video consultations</span>
                        </div>
                      )}
                    </div>

                    {/* Rating & Price Row */}
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 font-bold text-gray-900">
                        <Star className="w-3.5 h-3.5 fill-black text-black" />
                        <span>{gig.rating.toFixed(1)}</span>
                        <span className="text-gray-400 font-normal">({gig.reviewsCount})</span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 font-normal block leading-none">From</span>
                        <span className="text-sm font-bold text-gray-900">₹{gig.startingPriceINR.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. VERIFIED PRO SERVICES SHOWCASE */}
      <section className="py-14 bg-gray-50/60 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Verified Pro services in Brand Voice & Tech
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Hand-vetted talent for all your professional needs</p>
            </div>
            <Link href="/explore?filter=pro" className="text-xs font-bold text-[#0F5132] hover:underline">
              Show All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {GIGS_DATA.slice(0, 4).map((gig) => (
              <div key={gig.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white p-4 space-y-3 shadow-2xs hover:shadow-md transition-all">
                <div className="aspect-[16/10] rounded-lg overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={gig.coverImage} alt={gig.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={gig.sellerAvatar} alt={gig.sellerName} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-bold text-gray-900">{gig.sellerName}</span>
                </div>
                <p className="text-xs font-semibold text-gray-800 line-clamp-2">{gig.title}</p>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                  <span className="font-bold text-gray-900 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-black text-black" /> {gig.rating}
                  </span>
                  <span className="font-bold text-gray-900">From ₹{gig.startingPriceINR.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. MOBILE APP PROMO BANNER */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-amber-950 via-stone-900 to-black text-white p-8 sm:p-12 text-center space-y-4 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Freelance services at your <span className="text-orange-400">fingertips</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
              Manage your projects, chat with freelancers in real time, and release milestone payments on the go.
            </p>
            <div className="pt-2">
              <Link
                href="/explore"
                className="px-6 py-3 rounded-lg bg-white text-gray-900 font-bold text-xs hover:bg-gray-100 transition-colors inline-block"
              >
                Explore Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
