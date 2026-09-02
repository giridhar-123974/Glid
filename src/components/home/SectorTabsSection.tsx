'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Terminal, 
  Camera, 
  Music, 
  Zap, 
  GraduationCap, 
  Briefcase, 
  Car, 
  Rocket,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { SECTORS } from '@/data/mockData';

const SECTOR_DATA: Record<string, {
  title: string;
  description: string;
  roles: string[];
  features: string[];
  ctaText: string;
  href: string;
}> = {
  digital: {
    title: 'Digital & Software Engineering',
    description: 'Hire verified Next.js 15 full-stack developers, mobile app architects, UI/UX designers, and generative AI prompt engineers with code repository audits.',
    roles: ['Full Stack Web Developers', 'React Native & Flutter', 'Generative AI & LLM Engineers', 'Figma UI/UX Architects', 'DevOps & AWS Cloud'],
    features: ['GitHub Commits Verified', 'Clean Architecture Audit', 'Milestone Escrow Payouts', 'NDA & IP Protection'],
    ctaText: 'Explore Digital Talent',
    href: '/explore?category=tech'
  },
  creators: {
    title: 'Content & Media Creators',
    description: 'Book Sony FX3/FX6 commercial cinematographers, licensed DGCA drone pilots, YouTube editors, and voiceover artists across India.',
    roles: ['Sony Cinema Cinematographers', 'DGCA Licensed Drone Pilots', 'DaVinci Resolve Colorists', 'Short-Form Reels Editors', 'Studio Voice Artists'],
    features: ['4K RAW Portfolio Checked', 'Onsite Equipment Insured', 'Emergency 1h Dispatch', 'Full Commercial Rights'],
    ctaText: 'Book Media Creators',
    href: '/explore?category=creators'
  },
  events: {
    title: 'Events & Wedding Production',
    description: 'Find top-rated wedding cinematographers, event DJs, anchors, live bands, and stage choreographers with verified client reviews.',
    roles: ['Luxury Wedding Shoots', 'Club & Event DJs', 'Bilingual Emcees / Anchors', 'Live Indie & Fusion Bands', 'Choreographers'],
    features: ['Real Event Showcase', '100% Date Guarantee', 'Multi-Camera Crews', 'Escrow Milestone Deposit'],
    ctaText: 'Find Event Specialists',
    href: '/explore?category=events'
  },
  home_services: {
    title: 'On-Demand Home Services',
    description: 'Get Govt-certified electricians, inverter AC technicians, plumbers, and deep home sanitization professionals dispatched in 30 mins.',
    roles: ['Certified Electricians', 'Inverter AC Repair', 'Sanitary Plumbers', 'Deep Kitchen & Sofa Cleaning', 'Appliance Technicians'],
    features: ['Govt Licensed Wiremen', 'Trackable GPS Arrival', 'Transparent Rate Card', 'OTP Service Verification'],
    ctaText: 'Book Home Services',
    href: '/explore?category=home_services'
  },
  education: {
    title: 'Tutors & Mentors',
    description: '1-on-1 coding mentorship, IIT JEE Math coaches, language trainers, music instructors, and certified yoga fitness trainers.',
    roles: ['Coding & DSA Mentors', 'IIT JEE & NEET Tutors', 'Spoken English & IELTS', 'Hatha Yoga Trainers', 'Acoustic Guitar Teachers'],
    features: ['Academic Credentials Verified', 'Live 1-on-1 Video Sessions', 'Structured Curriculum', 'Money-Back Trial'],
    ctaText: 'Find Verified Tutors',
    href: '/explore?category=education'
  },
  business: {
    title: 'Chartered Accountants & Legal Advisors',
    description: 'Chartered Accountants (FCA/DISA), startup corporate lawyers, GST audit specialists, and IP trademark registration consultants.',
    roles: ['Pvt Ltd Registration', 'GST & Income Tax Filings', 'Trademark & Copyright', 'ESOP Pool Structuring', 'Due Diligence Audits'],
    features: ['ICAI & Bar Council Verified', 'Fixed Package Pricing', 'Govt Portal Integration', '100% Confidentiality'],
    ctaText: 'Consult Business Experts',
    href: '/explore?category=business'
  },
  mobility: {
    title: 'Mobility, Rentals & Logistics',
    description: 'Verified chauffeur-driven car rentals, bike rentals, on-demand drivers, packers & movers, and hyperlocal courier delivery.',
    roles: ['Outstation Car Rentals', 'Chauffeur On Demand', 'House Relocation Crews', 'Electric Bike Fleet', 'Express Same-Day Courier'],
    features: ['Verified DL & RC Check', 'Live GPS Tracking', 'Transit Cargo Insurance', 'Zero Hidden Surcharges'],
    ctaText: 'Explore Mobility Options',
    href: '/explore?category=mobility'
  },
  startups: {
    title: 'Startups, Jobs & Co-Founder Match',
    description: 'Assemble early-stage startup squads, find technical co-founders, post paid internships, and collaborate on hackathons.',
    roles: ['Technical Co-Founders', 'Founding Engineers', 'Paid Tech Internships', 'Part-Time Specialists', 'Startup Hackathons'],
    features: ['Founder Identity Verified', 'Equity & Milestone Escrow', 'Direct Messaging', 'YC & DPIIT Alumni Network'],
    ctaText: 'Explore Startup Network',
    href: '/ai-tools'
  }
};

export default function SectorTabsSection() {
  const [activeSector, setActiveSector] = useState('digital');
  const activeData = SECTOR_DATA[activeSector] || SECTOR_DATA.digital;

  return (
    <section className="py-24 bg-white border-b border-[#ECECEC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 text-[#EA580C] text-xs font-black uppercase tracking-wider border border-orange-200">
            <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
            8 Comprehensive Opportunity Sectors
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
            Everything You Need, One Verified Identity.
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            From hiring full-stack AI developers to booking 4K wedding cinematographers and on-demand home electricians.
          </p>
        </div>

        {/* Sector Navigation Pill Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {SECTORS.map((sector) => {
            const isActive = activeSector === sector.id;
            return (
              <button
                key={sector.id}
                onClick={() => setActiveSector(sector.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#111827] text-white border-[#111827] shadow-md scale-105'
                    : 'bg-[#FAFAFA] text-gray-700 border-[#ECECEC] hover:border-orange-300 hover:text-[#EA580C]'
                }`}
              >
                <span>{sector.icon}</span>
                <span>{sector.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {sector.count.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Sector Showcase Card (20px Rounded Bento) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FAFAFA] border border-[#ECECEC] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-[#EA580C] uppercase tracking-wider">
                Sector Showcase
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                {activeData.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {activeData.description}
              </p>
            </div>

            {/* Popular Roles Tags */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Popular In-Demand Specializations
              </span>
              <div className="flex flex-wrap gap-2">
                {activeData.roles.map((role, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#ECECEC] text-xs font-bold text-gray-800 shadow-subtle"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Verification Guarantee Points */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {activeData.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-bold text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href={activeData.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#111827] hover:bg-[#F97316] text-white font-black text-xs shadow-md transition-all btn-magnetic"
              >
                <span>{activeData.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Filter Box on Right */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#ECECEC] shadow-subtle space-y-4">
            <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">
              Quick Filter by Availability
            </h4>
            <div className="space-y-2 text-xs font-bold">
              <Link
                href={`${activeData.href}&filter=available_now`}
                className="p-3 rounded-xl bg-[#FAFAFA] hover:bg-orange-50 border border-[#ECECEC] flex items-center justify-between transition-colors group"
              >
                <span className="flex items-center gap-2 text-gray-800 group-hover:text-[#EA580C]">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  🟢 Available Right Now (Immediate Dispatch)
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={`${activeData.href}&filter=top_rated`}
                className="p-3 rounded-xl bg-[#FAFAFA] hover:bg-orange-50 border border-[#ECECEC] flex items-center justify-between transition-colors group"
              >
                <span className="flex items-center gap-2 text-gray-800 group-hover:text-[#EA580C]">
                  <span>🏆</span>
                  <span>Top 1% Rated with 99%+ Trust Score</span>
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={`${activeData.href}&filter=nearby`}
                className="p-3 rounded-xl bg-[#FAFAFA] hover:bg-orange-50 border border-[#ECECEC] flex items-center justify-between transition-colors group"
              >
                <span className="flex items-center gap-2 text-gray-800 group-hover:text-[#EA580C]">
                  <span>📍</span>
                  <span>Hyperlocal (Within 5 km radius)</span>
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
