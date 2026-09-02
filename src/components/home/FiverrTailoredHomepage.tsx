'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Star, 
  Heart, 
  Video, 
  Sparkles, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Users, 
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { GIGS_DATA, GigItem } from '@/data/gigsData';
import FiverrHeader from '@/components/layout/FiverrHeader';

export default function FiverrTailoredHomepage() {
  const [savedGigs, setSavedGigs] = useState<Record<string, boolean>>({});

  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedGigs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full bg-white text-gray-900 min-h-screen font-sans">
      
      {/* 1. TOP HEADER WITH REAL MEGA-MENU */}
      <FiverrHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* 2. WELCOME USER & ACTION CARDS STRIP */}
        <section className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Welcome back, <span className="text-[#1DBF73]">giridharnaik522</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card 1: Recommended Post Project Brief */}
            <div className="p-5 rounded-xl border border-gray-200 bg-emerald-50/50 hover:bg-emerald-50 transition-colors flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-[#0F5132] uppercase tracking-wider block">
                  RECOMMENDED FOR YOU
                </span>
                <h2 className="text-sm font-bold text-gray-900">Post a project brief</h2>
                <p className="text-xs text-gray-600">Get tailored offers for your needs in minutes.</p>
              </div>
              <Link
                href="/explore"
                className="px-4 py-2 rounded-lg bg-[#222325] hover:bg-black text-white text-xs font-bold whitespace-nowrap shadow-xs"
              >
                Post a Brief
              </Link>
            </div>

            {/* Card 2: Profile Progress */}
            <div className="p-5 rounded-xl border border-gray-200 bg-orange-50/50 hover:bg-orange-50 transition-colors flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-orange-800 uppercase tracking-wider block">
                  PROFILE PROGRESS
                </span>
                <h2 className="text-sm font-bold text-gray-900">Tailor GLID to your needs</h2>
                <p className="text-xs text-gray-600">Complete your profile to unlock verified escrow rates.</p>
              </div>
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:border-gray-900 text-gray-900 text-xs font-bold whitespace-nowrap shadow-2xs"
              >
                Complete Profile
              </Link>
            </div>

          </div>
        </section>

        {/* 3. "BASED ON WHAT YOU MIGHT BE LOOKING FOR" GIGS GRID */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Based on what you might be looking for
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Keep exploring recommended services</p>
            </div>
            <Link href="/explore" className="text-xs font-bold text-[#1DBF73] hover:underline">
              Show All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {GIGS_DATA.slice(0, 8).map((gig) => {
              const isSaved = !!savedGigs[gig.id];

              return (
                <div key={gig.id} className="group flex flex-col justify-between border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white">
                  
                  {/* Cover */}
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

                  {/* Body */}
                  <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={gig.sellerAvatar} alt={gig.sellerName} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex items-center gap-1 truncate">
                          <span className="text-xs font-bold text-gray-900 truncate">{gig.sellerName}</span>
                          {gig.isPro && (
                            <span className="text-[9px] font-extrabold text-[#1DBF73] bg-emerald-50 px-1.5 py-0.2 rounded">PRO</span>
                          )}
                        </div>
                      </div>

                      <Link href={`/explore?gig=${gig.id}`}>
                        <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 hover:text-[#1DBF73] transition-colors leading-snug">
                          {gig.title}
                        </h3>
                      </Link>

                      {gig.hasVideoConsultation && (
                        <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1.5">
                          <Video className="w-3 h-3 text-[#1DBF73]" />
                          <span>Offers video consultations</span>
                        </div>
                      )}
                    </div>

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
        </section>

        {/* 4. "VERIFIED PRO SERVICES IN BRAND VOICE & TONE" */}
        <section className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Verified Pro services in Brand Voice & Tone
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Hand-vetted talent for all your professional needs.</p>
            </div>
            <Link href="/explore?filter=pro" className="text-xs font-bold text-[#1DBF73] hover:underline">
              Show All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {GIGS_DATA.filter(g => g.isPro).slice(0, 4).map((gig) => (
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
                  <span className="text-[9px] font-extrabold text-[#1DBF73] bg-emerald-50 px-1.5 py-0.2 rounded">PRO</span>
                </div>
                <p className="text-xs font-semibold text-gray-800 line-clamp-2">{gig.title}</p>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                  <span className="font-bold text-gray-900 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-black text-black" /> {gig.rating} ({gig.reviewsCount})
                  </span>
                  <span className="font-bold text-gray-900">From ₹{gig.startingPriceINR.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. "FIND FREELANCE TALENT — YOUR WAY" (3 SOURCING PILLARS) */}
        <section className="py-8 bg-gray-50/70 rounded-2xl p-6 sm:p-10 space-y-8 border border-gray-200">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Find freelance talent — your way
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Tell us what you need and we&apos;ll match you with freelancers perfect for your goal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#1DBF73] flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Post a project brief</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Generate a brief with AI to receive a curated shortlist of freelancer offers within hours.
                </p>
              </div>
              <Link href="/explore" className="text-xs font-bold text-[#1DBF73] hover:underline flex items-center gap-1">
                <span>Post brief</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-orange-50 text-[#F97316] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Let us find your freelancer</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Save the endless search — we&apos;ll source, interview, and vet top freelancers for you.
                </p>
                <div className="text-xs font-black text-gray-900">Only ₹19,933</div>
              </div>
              <Link href="/explore?filter=pro" className="text-xs font-bold text-[#F97316] hover:underline flex items-center gap-1">
                <span>Get matched</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Get a team built for you</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Big project? No problem. We&apos;ll build an elite freelance team and fully execute your project.
                </p>
                <div className="text-xs font-black text-gray-900">Custom pricing</div>
              </div>
              <Link href="/explore?category=tech" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                <span>Build a team</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </section>

        {/* 6. "MOST POPULAR GIGS IN BRAND VOICE & TONE" */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Most popular Gigs in Brand Voice & Tone
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Top-rated creative copywriters and brand architects</p>
            </div>
            <Link href="/explore?category=writing" className="text-xs font-bold text-[#1DBF73] hover:underline">
              Show All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {GIGS_DATA.slice(8, 16).map((gig) => (
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
                    <Star className="w-3.5 h-3.5 fill-black text-black" /> {gig.rating} ({gig.reviewsCount})
                  </span>
                  <span className="font-bold text-gray-900">From ₹{gig.startingPriceINR.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* 7. FULL 5-COLUMN MARKETPLACE FOOTER */}
      <footer className="border-t border-gray-200 bg-white pt-12 pb-16 text-xs text-gray-600 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-gray-200">
            
            {/* Col 1 */}
            <div className="space-y-2.5">
              <h3 className="font-black text-gray-900 uppercase tracking-wider text-[11px]">Categories</h3>
              <ul className="space-y-2">
                <li><Link href="/explore?category=design" className="hover:text-black">Graphics & Design</Link></li>
                <li><Link href="/explore?category=marketing" className="hover:text-black">Digital Marketing</Link></li>
                <li><Link href="/explore?category=writing" className="hover:text-black">Writing & Translation</Link></li>
                <li><Link href="/explore?category=creators" className="hover:text-black">Video & Animation</Link></li>
                <li><Link href="/explore?category=events" className="hover:text-black">Music & Audio</Link></li>
                <li><Link href="/explore?category=tech" className="hover:text-black">Programming & Tech</Link></li>
                <li><Link href="/explore?category=tech" className="hover:text-black">AI Services</Link></li>
              </ul>
            </div>

            {/* Col 2 */}
            <div className="space-y-2.5">
              <h3 className="font-black text-gray-900 uppercase tracking-wider text-[11px]">For Clients</h3>
              <ul className="space-y-2">
                <li><Link href="/escrow-guarantee" className="hover:text-black">How GLID Works</Link></li>
                <li><Link href="/explore" className="hover:text-black">Customer Success Stories</Link></li>
                <li><Link href="/escrow-guarantee" className="hover:text-black">Quality & Escrow Guide</Link></li>
                <li><Link href="/explore" className="hover:text-black">GLID Guides & Resources</Link></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-2.5">
              <h3 className="font-black text-gray-900 uppercase tracking-wider text-[11px]">For Freelancers</h3>
              <ul className="space-y-2">
                <li><Link href="/dashboard?role=professional" className="hover:text-black">Become a Freelancer</Link></li>
                <li><Link href="/dashboard?role=business" className="hover:text-black">Become an Agency</Link></li>
                <li><Link href="/dashboard" className="hover:text-black">Community Hub</Link></li>
                <li><Link href="/dashboard" className="hover:text-black">Freelance Events</Link></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="space-y-2.5">
              <h3 className="font-black text-gray-900 uppercase tracking-wider text-[11px]">Business Solutions</h3>
              <ul className="space-y-2">
                <li><Link href="/explore?filter=pro" className="hover:text-black">GLID Pro</Link></li>
                <li><Link href="/explore" className="hover:text-black">Project Management</Link></li>
                <li><Link href="/explore" className="hover:text-black">Expert Sourcing</Link></li>
                <li><Link href="/ai-tools" className="hover:text-black">AI Store Builder</Link></li>
                <li><Link href="/ai-tools" className="hover:text-black">GLID Logo Maker</Link></li>
              </ul>
            </div>

            {/* Col 5 */}
            <div className="space-y-2.5">
              <h3 className="font-black text-gray-900 uppercase tracking-wider text-[11px]">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/escrow-guarantee" className="hover:text-black">About GLID</Link></li>
                <li><Link href="/escrow-guarantee" className="hover:text-black">Trust & Safety</Link></li>
                <li><Link href="/escrow-guarantee" className="hover:text-black">Terms of Service</Link></li>
                <li><Link href="/escrow-guarantee" className="hover:text-black">Privacy Policy</Link></li>
                <li><Link href="/dashboard?tab=support" className="hover:text-black">Help & Support</Link></li>
              </ul>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <span>GLID.</span>
              <span className="font-normal text-gray-400">© 2026 GLID International Ltd. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <span>₹ INR (Indian Rupee)</span>
              <span>English</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
