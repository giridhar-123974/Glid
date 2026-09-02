'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Bell, 
  Mail, 
  Heart, 
  ChevronRight, 
  Sparkles,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import GlidLogo from '@/components/ui/GlidLogo';

export interface MegaCategoryColumn {
  title: string;
  items: { name: string; href: string; isNew?: boolean; isTool?: boolean }[];
}

export interface MegaCategory {
  id: string;
  name: string;
  href: string;
  hasFire?: boolean;
  columns?: MegaCategoryColumn[];
}

export const CATEGORY_TREE_DATA: MegaCategory[] = [
  {
    id: 'trending',
    name: 'Trending 🔥',
    href: '/explore?filter=trending'
  },
  {
    id: 'graphics-design',
    name: 'Graphics & Design',
    href: '/explore?category=design',
    columns: [
      {
        title: 'Logo & Brand Identity',
        items: [
          { name: 'Logo Design', href: '/explore?q=Logo+Design' },
          { name: 'Brand Style Guides', href: '/explore?q=Brand+Style+Guides' },
          { name: 'Business Cards & Stationery', href: '/explore?q=Business+Cards' },
          { name: 'Fonts & Typography', href: '/explore?q=Typography' },
          { name: 'Art Direction', href: '/explore?q=Art+Direction', isNew: true },
          { name: 'Logo Maker Tool', href: '/ai-tools', isTool: true }
        ]
      },
      {
        title: 'Art & Illustration',
        items: [
          { name: 'Illustration', href: '/explore?q=Illustration' },
          { name: 'AI Artists', href: '/explore?q=AI+Artists' },
          { name: 'AI Avatar Design', href: '/explore?q=AI+Avatar', isNew: true },
          { name: 'Portraits & Caricatures', href: '/explore?q=Portraits' },
          { name: 'Comic Illustration', href: '/explore?q=Comic', isNew: true },
          { name: 'Cartoon Illustration', href: '/explore?q=Cartoon' },
          { name: 'Storyboards', href: '/explore?q=Storyboards' }
        ]
      },
      {
        title: 'Web & App Design',
        items: [
          { name: 'Website Design', href: '/explore?q=Website+Design' },
          { name: 'App Design', href: '/explore?q=App+Design' },
          { name: 'UX Design', href: '/explore?q=UX+Design' },
          { name: 'Landing Page Design', href: '/explore?q=Landing+Page' },
          { name: 'Icon Design', href: '/explore?q=Icon+Design' },
          { name: 'E-Commerce Website Design', href: '/explore?q=E-Commerce+Design' }
        ]
      },
      {
        title: '3D Design & Visual',
        items: [
          { name: '3D Architecture', href: '/explore?q=3D+Architecture' },
          { name: '3D Industrial Design', href: '/explore?q=3D+Industrial' },
          { name: '3D Game Art', href: '/explore?q=3D+Game+Art' },
          { name: 'Image Editing', href: '/explore?q=Image+Editing' },
          { name: 'Presentation Design', href: '/explore?q=Presentation+Design' }
        ]
      }
    ]
  },
  {
    id: 'programming-tech',
    name: 'Programming & Tech',
    href: '/explore?category=tech',
    columns: [
      {
        title: 'Web Development',
        items: [
          { name: 'Full Stack Web Development', href: '/explore?q=Full+Stack' },
          { name: 'Next.js 15 & React 19', href: '/explore?q=Next.js' },
          { name: 'WordPress & WooCommerce', href: '/explore?q=WordPress' },
          { name: 'Shopify Store Development', href: '/explore?q=Shopify' },
          { name: 'Custom Web Applications', href: '/explore?q=Web+App' }
        ]
      },
      {
        title: 'AI & Data Science',
        items: [
          { name: 'AI Websites & Software', href: '/explore?q=AI+Software' },
          { name: 'AI Mobile Applications', href: '/explore?q=AI+App' },
          { name: 'AI Agents Development', href: '/explore?q=AI+Agents', isNew: true },
          { name: 'AI Technology Consulting', href: '/explore?q=AI+Consulting' },
          { name: 'Machine Learning Models', href: '/explore?q=Machine+Learning' }
        ]
      },
      {
        title: 'Mobile & Desktop Apps',
        items: [
          { name: 'Flutter App Development', href: '/explore?q=Flutter' },
          { name: 'React Native Apps', href: '/explore?q=React+Native' },
          { name: 'iOS Swift Apps', href: '/explore?q=iOS' },
          { name: 'Android Kotlin Apps', href: '/explore?q=Android' }
        ]
      },
      {
        title: 'DevOps & Security',
        items: [
          { name: 'AWS Cloud & Infrastructure', href: '/explore?q=AWS' },
          { name: 'Docker & Kubernetes', href: '/explore?q=Docker' },
          { name: 'Cyber Security & Audit', href: '/explore?q=Security' },
          { name: 'QA & Automation Testing', href: '/explore?q=QA' }
        ]
      }
    ]
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    href: '/explore?category=marketing',
    columns: [
      {
        title: 'Search & SEO',
        items: [
          { name: 'Search Engine Optimization (SEO)', href: '/explore?q=SEO' },
          { name: 'Generative Engine Optimization (GEO)', href: '/explore?q=GEO', isNew: true },
          { name: 'Search Engine Marketing (SEM)', href: '/explore?q=SEM' },
          { name: 'Local SEO & Maps', href: '/explore?q=Local+SEO' },
          { name: 'E-Commerce SEO', href: '/explore?q=E-Commerce+SEO' },
          { name: 'Video SEO', href: '/explore?q=Video+SEO' }
        ]
      },
      {
        title: 'Channel Specific',
        items: [
          { name: 'TikTok Shop Growth', href: '/explore?q=TikTok+Shop' },
          { name: 'Facebook Ads Campaign', href: '/explore?q=Facebook+Ads' },
          { name: 'Instagram Marketing', href: '/explore?q=Instagram' },
          { name: 'YouTube Promotion', href: '/explore?q=YouTube' },
          { name: 'Google Ads & SEM', href: '/explore?q=Google+Ads' },
          { name: 'Shopify Marketing', href: '/explore?q=Shopify+Marketing' }
        ]
      },
      {
        title: 'Scale Your Marketing With AI',
        items: [
          { name: 'AI Marketing Prompt Strategy', href: '/explore?q=AI+Marketing' },
          { name: 'Brand Personality Design', href: '/explore?q=Brand+Personality' },
          { name: 'Email Marketing Personalization', href: '/explore?q=Email+Personalization' },
          { name: 'AI-Powered Campaign Management', href: '/explore?q=AI+Campaigns' },
          { name: 'AI-Powered Ad Bidding & Automation', href: '/explore?q=AI+Bidding' }
        ]
      },
      {
        title: 'Industry & Analytics',
        items: [
          { name: 'Music Promotion', href: '/explore?q=Music+Promotion' },
          { name: 'Podcast Marketing', href: '/explore?q=Podcast' },
          { name: 'Book & eBook Marketing', href: '/explore?q=Book+Marketing' },
          { name: 'Marketing Strategy & Consultation', href: '/explore?q=Marketing+Strategy' }
        ]
      }
    ]
  },
  {
    id: 'video-animation',
    name: 'Video & Animation',
    href: '/explore?category=creators',
    columns: [
      {
        title: 'Video Editing',
        items: [
          { name: 'Video Ads & Commercials', href: '/explore?q=Video+Ads' },
          { name: 'UGC Video Ads', href: '/explore?q=UGC+Videos', isNew: true },
          { name: 'YouTube Video & Reels Editing', href: '/explore?q=YouTube+Editing' },
          { name: 'DaVinci Color Grading', href: '/explore?q=Color+Grading' }
        ]
      },
      {
        title: 'Animation & Motion',
        items: [
          { name: '2D & 3D Character Animation', href: '/explore?q=Animation' },
          { name: 'Motion Graphics (After Effects)', href: '/explore?q=Motion+Graphics' },
          { name: 'Logo Animation & Intros', href: '/explore?q=Logo+Animation' },
          { name: 'Explainer Videos', href: '/explore?q=Explainer' }
        ]
      }
    ]
  },
  {
    id: 'writing-translation',
    name: 'Writing & Translation',
    href: '/explore?category=writing',
    columns: [
      {
        title: 'Brand Story & Strategy',
        items: [
          { name: 'Brand Story & Mission Vision', href: '/explore?q=Brand+Story' },
          { name: 'Tone of Voice Guidelines', href: '/explore?q=Tone+of+Voice' },
          { name: 'Website Copywriting & About Us', href: '/explore?q=About+Us' },
          { name: 'Pitch Decks & Elevator Pitches', href: '/explore?q=Pitch+Deck' }
        ]
      },
      {
        title: 'Content & Books',
        items: [
          { name: 'Resume Writing & LinkedIn', href: '/explore?q=Resume' },
          { name: 'Book & eBook Writing', href: '/explore?q=Book+Writing' },
          { name: 'Book Editing & Proofreading', href: '/explore?q=Book+Editing' },
          { name: 'Translation & Localization', href: '/explore?q=Translation' }
        ]
      }
    ]
  },
  {
    id: 'music-audio',
    name: 'Music & Audio',
    href: '/explore?category=events'
  },
  {
    id: 'business',
    name: 'Business',
    href: '/explore?category=business'
  },
  {
    id: 'finance',
    name: 'Finance',
    href: '/explore?category=business'
  },
  {
    id: 'ai-services',
    name: 'AI Services',
    href: '/explore?category=tech'
  }
];

export default function FiverrHeader() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryHover, setActiveCategoryHover] = useState<string | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/explore');
    }
  };

  const activeCategory = CATEGORY_TREE_DATA.find(c => c.id === activeCategoryHover);

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 font-sans">
      
      {/* 1. TOP MAIN HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Left: GLID Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-200/80 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
            <GlidLogo size={20} variant="orange" />
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900 leading-none">
            GLID<span className="text-[#F97316]">.</span>
          </span>
        </Link>

        {/* Center: Large Wide Search Bar (Exact Fiverr Style) */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-gray-900 transition-colors">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What service are you looking for today?"
            className="w-full px-4 py-2 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#222325] hover:bg-black text-white px-4 py-2.5 flex items-center justify-center transition-colors"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-5 text-xs font-semibold text-gray-700">
          
          <button 
            onClick={() => router.push('/dashboard?tab=notifications')}
            className="relative p-1.5 text-gray-600 hover:text-black transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F97316]" />
          </button>

          <button 
            onClick={() => router.push('/dashboard?tab=messages')}
            className="p-1.5 text-gray-600 hover:text-black transition-colors"
            title="Messages"
          >
            <Mail className="w-4 h-4" />
          </button>

          <button 
            onClick={() => router.push('/explore?filter=saved')}
            className="p-1.5 text-gray-600 hover:text-black transition-colors"
            title="Saved Gigs"
          >
            <Heart className="w-4 h-4" />
          </button>

          <Link href="/dashboard?tab=bookings" className="hover:text-black transition-colors hidden sm:inline-block">
            Orders
          </Link>

          {/* User Profile Avatar with Online Dot */}
          <Link href="/dashboard" className="flex items-center gap-1.5 group">
            <div className="relative w-8 h-8 rounded-full bg-[#1DBF73] text-white font-black text-xs flex items-center justify-center ring-2 ring-transparent group-hover:ring-gray-300 transition-all">
              <span>G</span>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#22C55E] ring-1.5 ring-white" />
            </div>
          </Link>

        </div>

      </div>

      {/* 2. CATEGORY RIBBON BAR (With Interactive Mega-Menu on Hover) */}
      <div 
        className="border-t border-gray-200 bg-white relative"
        onMouseLeave={() => setActiveCategoryHover(null)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-7 overflow-x-auto no-scrollbar whitespace-nowrap text-xs font-semibold text-gray-600">
          {CATEGORY_TREE_DATA.map((cat) => {
            const isActive = activeCategoryHover === cat.id;

            return (
              <div
                key={cat.id}
                onMouseEnter={() => setActiveCategoryHover(cat.id)}
                className="py-2.5 cursor-pointer relative"
              >
                <Link
                  href={cat.href}
                  className={`hover:text-black transition-colors flex items-center gap-1 ${
                    isActive ? 'text-black font-bold' : ''
                  }`}
                >
                  <span>{cat.name}</span>
                </Link>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1DBF73]" />
                )}
              </div>
            );
          })}
        </div>

        {/* 3. MEGA-MENU DROPDOWN CANVAS */}
        {activeCategory && activeCategory.columns && activeCategory.columns.length > 0 && (
          <div 
            ref={megaMenuRef}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
            onMouseEnter={() => setActiveCategoryHover(activeCategory.id)}
            onMouseLeave={() => setActiveCategoryHover(null)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {activeCategory.columns.map((col, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider">
                      {col.title}
                    </h3>
                    <ul className="space-y-2">
                      {col.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <Link
                            href={item.href}
                            onClick={() => setActiveCategoryHover(null)}
                            className="text-xs text-gray-600 hover:text-black hover:font-bold transition-all flex items-center gap-1.5 group"
                          >
                            <span className="group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                            {item.isNew && (
                              <span className="text-[9px] font-bold text-pink-600 bg-pink-50 px-1.5 py-0.2 rounded uppercase">NEW</span>
                            )}
                            {item.isTool && (
                              <Sparkles className="w-3 h-3 text-orange-500" />
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Bottom Quick Link in Mega Menu */}
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-400">Need creative talent fast? Browse top verified freelancers.</span>
                <Link
                  href={activeCategory.href}
                  onClick={() => setActiveCategoryHover(null)}
                  className="font-bold text-[#1DBF73] hover:underline flex items-center gap-1"
                >
                  <span>Explore all in {activeCategory.name.replace(' 🔥', '')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>

    </header>
  );
}
