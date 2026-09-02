'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Star, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Users, 
  Briefcase, 
  Zap, 
  Navigation,
  Key,
  Bike,
  Car,
  Play,
  Check,
  Cpu,
  Layers,
  Phone,
  MessageSquare,
  ExternalLink,
  Shield,
  SlidersHorizontal,
  Compass,
  Code,
  Palette,
  Camera,
  GraduationCap,
  HeartPulse,
  Scissors,
  PartyPopper,
  Flame,
  User,
  CheckCircle,
  DollarSign,
  Mic,
  Video,
  Music,
  Megaphone,
  QrCode,
  Smartphone,
  Apple,
  HelpCircle,
  ChevronDown,
  Building2,
  FileCheck,
  Award,
  Globe,
  Radio,
  Eye,
  ShieldAlert,
  AlertTriangle,
  TrendingUp,
  Coins,
  BadgeCheck,
  Target,
  Rocket,
  HeartHandshake,
  Calculator,
  Calendar,
  Heart,
  Wrench,
  UtensilsCrossed,
  Truck
} from 'lucide-react';
import { PROFESSIONALS } from '@/data/mockData';
import { Professional } from '@/types';
import GoogleMapsMarketplaceEngine, { RadiusOption } from '@/components/maps/GoogleMapsMarketplaceEngine';
import UberStyleLiveTrackerModal from '@/components/maps/UberStyleLiveTrackerModal';
import PremiumBookingEscrowModal from '@/components/payments/PremiumBookingEscrowModal';
import RoleOnboardingHubModal, { UserOnboardingRole } from '@/components/account/RoleOnboardingHubModal';
import { formatINR } from '@/lib/utils';

// 12 Modern Categories with Badges & Icons
const POPULAR_CATEGORIES = [
  { id: 'tech', name: 'Software & AI', emoji: '💻', icon: Code, count: '4,850+ Pros', href: '/services?category=tech' },
  { id: 'design', name: 'Design & UI/UX', emoji: '🎨', icon: Palette, count: '3,120+ Pros', href: '/services?category=design' },
  { id: 'photography', name: 'Photography', emoji: '📸', icon: Camera, count: '3,240+ Pros', href: '/services?category=creative' },
  { id: 'video', name: 'Video Production', emoji: '🎥', icon: Video, count: '2,940+ Pros', href: '/services?category=creative' },
  { id: 'music', name: 'Music & Audio', emoji: '🎼', icon: Music, count: '1,420+ Pros', href: '/services?category=creative' },
  { id: 'home', name: 'Home Services', emoji: '🏠', icon: Zap, count: '3,820+ Pros', href: '/services?category=home_services' },
  { id: 'rentals', name: 'Rentals & Drivers', emoji: '🚗', icon: Truck, count: '1,280+ Pros', href: '/services?category=home_services' },
  { id: 'education', name: 'Tutors & Mentors', emoji: '📚', icon: GraduationCap, count: '1,950+ Pros', href: '/services?category=education' },
  { id: 'business', name: 'Business & CA', emoji: '💼', icon: Briefcase, count: '1,480+ Pros', href: '/services?category=business' },
  { id: 'repair', name: 'Appliance Repair', emoji: '⚙️', icon: Wrench, count: '2,420+ Pros', href: '/services?category=home_services' },
  { id: 'fitness', name: 'Fitness & Yoga', emoji: '🏋', icon: HeartPulse, count: '1,120+ Pros', href: '/services?category=health' },
  { id: 'catering', name: 'Catering & Chefs', emoji: '🍽', icon: UtensilsCrossed, count: '940+ Pros', href: '/services?category=events' }
];

// Why Choose GLID: Exactly 6 Punchy Cards
const WHY_GLID_CARDS = [
  {
    icon: ShieldCheck,
    title: 'Verified Professionals',
    desc: 'Every specialist undergoes government DigiLocker Aadhaar biometric e-KYC, bank validation, and portfolio check.',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
  },
  {
    icon: Lock,
    title: '100% Escrow Payments',
    desc: 'Client funds are locked in an RBI-regulated bank trustee vault and disbursed only when you approve work via OTP.',
    color: 'text-blue-600 bg-blue-50 border-blue-100'
  },
  {
    icon: Sparkles,
    title: 'AI Smart Matching',
    desc: 'Intelligent matching algorithm evaluates skills, client feedback, response speed, and exact GPS distance.',
    color: 'text-orange-600 bg-orange-50 border-orange-100'
  },
  {
    icon: Navigation,
    title: 'Hyperlocal 2km–50km Search',
    desc: 'Discover trusted talent right in your neighbourhood with real-time transit calculations for Bike, Cab, and Walk.',
    color: 'text-indigo-600 bg-indigo-50 border-indigo-100'
  },
  {
    icon: Clock,
    title: 'Instant Booking & Dispatch',
    desc: 'Book verified experts for immediate emergency assistance or schedule milestone deliverables with live tracking.',
    color: 'text-amber-600 bg-amber-50 border-amber-100'
  },
  {
    icon: HeartHandshake,
    title: 'Dispute Mediation & Guarantee',
    desc: 'Fair milestone inspection with an ironclad 100% money-back escrow protection in case of contract non-delivery.',
    color: 'text-purple-600 bg-purple-50 border-purple-100'
  }
];

// 8 Step Lifecycle Roadmap
const EIGHT_STEPS = [
  { num: '1', title: 'Search Service', desc: 'Find any skill or task' },
  { num: '2', title: 'Choose Location', desc: 'Set your area or GPS pin' },
  { num: '3', title: 'Compare Pros', desc: 'Review trust scores & work' },
  { num: '4', title: 'Book & Pay', desc: 'Lock funds safely in escrow' },
  { num: '5', title: 'Track Live', desc: 'Live GPS route & updates' },
  { num: '6', title: 'Inspect Work', desc: 'Review finished milestone' },
  { num: '7', title: 'Release Escrow', desc: 'Verify with 4-digit OTP' },
  { num: '8', title: 'Rate & Review', desc: 'Build community trust' }
];

// Verified Testimonials
const TESTIMONIALS = [
  {
    quote: 'Found an amazing commercial drone photographer in 5 minutes. Arrived with top-tier gear and deliverables were uploaded by evening.',
    name: 'Ravi Teja',
    location: 'Hyderabad',
    role: 'Founder, PixelKraft Studios',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    quote: 'Hired a senior Next.js 15 developer on the same day for our fintech MVP. Clean code, punctual milestones, and transparent communication.',
    name: 'Sneha Reddy',
    location: 'Bengaluru',
    role: 'Product Lead, NeoPay',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    quote: 'Escrow payment gave me complete peace of mind. Knowing my money was safe until the work was inspected made all the difference.',
    name: 'Rahul Sharma',
    location: 'Mumbai',
    role: 'Director, Aura Logistics',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

export default function MasterGlidPlatform() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const [selectedAvailability, setSelectedAvailability] = useState('today');
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [selectedMapRadius, setSelectedMapRadius] = useState<RadiusOption>('5 km');
  const [userLocationName] = useState('Hitech City, Hyderabad');
  
  // Interactive Modals
  const [proForBooking, setProForBooking] = useState<Professional | null>(null);
  const [proForLiveTracking, setProForLiveTracking] = useState<Professional | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingRole, setOnboardingRole] = useState<UserOnboardingRole>('customer');
  const [savedFavorites, setSavedFavorites] = useState<Record<string, boolean>>({});
  const [activeChatPro, setActiveChatPro] = useState<Professional | null>(null);

  // Dynamic Autocomplete suggestions
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchSuggestions = [
    'Next.js 15 Full Stack Developer',
    'Commercial 4K Drone Pilot',
    'Certified Startup CA Tax Auditor',
    'Master Electrician (3-Phase)',
    'UI/UX Design System Specialist',
    'Performance Growth Marketer'
  ];

  const openOnboarding = (role: UserOnboardingRole = 'customer') => {
    setOnboardingRole(role);
    setIsOnboardingOpen(true);
  };

  const toggleFavorite = (id: string) => {
    setSavedFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleVoiceSearch = () => {
    setIsListeningVoice(true);
    setTimeout(() => {
      setSearchQuery('Wedding photographer in Hyderabad today');
      setIsListeningVoice(false);
    }, 1800);
  };

  return (
    <div className="w-full bg-[#F8F9FB] text-[#0F172A] font-sans selection:bg-orange-100 selection:text-[#FF6B00]">
      
      {/* 4-Role Onboarding Modal */}
      {isOnboardingOpen && (
        <RoleOnboardingHubModal
          isOpen={isOnboardingOpen}
          initialRole={onboardingRole}
          onClose={() => setIsOnboardingOpen(false)}
        />
      )}

      {/* Booking Checkout Modal */}
      {proForBooking && (
        <PremiumBookingEscrowModal
          professional={proForBooking}
          onClose={() => setProForBooking(null)}
          onBookingConfirmed={(data) => {
            setProForBooking(null);
            setProForLiveTracking(data.professional);
          }}
        />
      )}

      {/* Uber-Style Live Tracker Modal */}
      {proForLiveTracking && (
        <UberStyleLiveTrackerModal
          professional={proForLiveTracking}
          bookingTitle={`${proForLiveTracking.subcategory} Booking`}
          contractAmountINR={proForLiveTracking.hourlyRateINR * 4}
          onClose={() => setProForLiveTracking(null)}
        />
      )}

      {/* Privacy Relay Chat Modal */}
      {activeChatPro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-gray-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activeChatPro.avatarUrl} alt={activeChatPro.name} className="w-10 h-10 rounded-full object-cover border" />
                <div>
                  <h4 className="font-black text-sm text-[#0F172A]">{activeChatPro.name}</h4>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active Online • Privacy Relay
                  </span>
                </div>
              </div>
              <button onClick={() => setActiveChatPro(null)} className="p-1 rounded-full text-gray-400 hover:text-black">✕</button>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 text-xs text-orange-950 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#FF6B00]" /> Encrypted Client Relay
              </span>
              <p className="text-gray-700 leading-relaxed">
                Direct phone numbers are unlocked automatically once a booking is confirmed with funded escrow.
              </p>
            </div>

            <div className="h-36 bg-gray-50 rounded-2xl p-3 flex flex-col justify-end text-xs text-gray-500">
              <div className="p-2.5 rounded-xl bg-white border self-start max-w-[85%] text-gray-800 shadow-xs">
                Hi! I am available today in {activeChatPro.cityArea}. How can I assist with your project?
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#FF6B00]"
              />
              <button
                onClick={() => {
                  alert('Message sent securely via GLID Privacy Relay!');
                  setActiveChatPro(null);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#FF6B00] text-white text-xs font-bold hover:bg-[#E85D00]"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (High Impact, Zero Ambiguity, Apple / Silicon Valley Grade) */}
      {/* ========================================================================= */}
      <section className="relative pt-10 sm:pt-14 pb-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        
        {/* Soft Ambient Mesh Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-orange-100/40 via-amber-50/30 to-blue-50/20 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Top Minimal Trust Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-[#0F172A] text-xs font-bold shadow-xs mb-6 animate-in fade-in">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
          <span className="text-[#FF6B00] font-black">AI-POWERED MATCHING</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-700">100% Milestone Escrow Protection</span>
        </div>

        {/* Clear Crystal-Clear Professional Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.12] max-w-4xl mx-auto">
          One Verified Identity.<br />
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#EA580C] bg-clip-text text-transparent">Unlimited Opportunities.</span>
        </h1>

        {/* Concrete Descriptive Subtitle */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-[#475569] font-medium max-w-3xl mx-auto leading-relaxed">
          India&apos;s AI-powered marketplace for verified professionals, freelancers, creators, businesses, and local services. Hire with confidence through live location discovery, intelligent matching, and secure escrow payments.
        </p>

        {/* ========================================================================= */}
        {/* 2. GOOGLE-GRADE MULTI-FIELD SEARCH BOX */}
        {/* ========================================================================= */}
        <div className="mt-8 sm:mt-10 w-full max-w-4xl mx-auto relative z-30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const q = searchQuery.trim() || 'all';
              window.location.href = `/explore?q=${encodeURIComponent(q)}&city=${encodeURIComponent(selectedCity)}&avail=${encodeURIComponent(selectedAvailability)}`;
            }}
            className="p-2 sm:p-3 rounded-3xl bg-white border border-gray-200 shadow-2xl flex flex-col md:flex-row items-stretch md:items-center gap-2.5 transition-all focus-within:border-[#FF6B00] focus-within:ring-4 focus-within:ring-orange-500/10"
          >
            {/* Field 1: Service Query */}
            <div className="flex-1 flex items-center gap-3 pl-3 sm:pl-4 py-1">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isListeningVoice ? 'Listening to voice...' : 'What service do you need? (e.g. React Dev, Drone Pilot)'}
                className="w-full text-xs sm:text-sm font-semibold text-[#0F172A] placeholder:text-gray-400 focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={handleVoiceSearch}
                title="Voice Search"
                className={`p-2 rounded-xl transition-colors ${isListeningVoice ? 'bg-red-50 text-red-500 animate-pulse' : 'text-gray-400 hover:text-[#FF6B00]'}`}
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-gray-200" />

            {/* Field 2: City / Location Selector */}
            <div className="flex items-center gap-2 px-3 py-1 bg-[#F8F9FB] rounded-2xl border border-gray-200/80 md:bg-transparent md:border-none">
              <MapPin className="w-4 h-4 text-[#FF6B00] flex-shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent text-xs font-bold text-[#0F172A] focus:outline-none cursor-pointer pr-2"
              >
                <option value="Hyderabad">📍 Hyderabad</option>
                <option value="Bengaluru">📍 Bengaluru</option>
                <option value="Mumbai">📍 Mumbai</option>
                <option value="Delhi NCR">📍 Delhi NCR</option>
                <option value="Chennai">📍 Chennai</option>
                <option value="Pune">📍 Pune</option>
              </select>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-gray-200" />

            {/* Field 3: Availability Date */}
            <div className="flex items-center gap-2 px-3 py-1 bg-[#F8F9FB] rounded-2xl border border-gray-200/80 md:bg-transparent md:border-none">
              <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="bg-transparent text-xs font-bold text-[#0F172A] focus:outline-none cursor-pointer pr-2"
              >
                <option value="today">📅 Today (Fast)</option>
                <option value="emergency">⚡ Emergency (30m)</option>
                <option value="tomorrow">📅 Tomorrow</option>
                <option value="flexible">🗓 Flexible Date</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="px-7 py-3.5 rounded-2xl bg-[#FF6B00] hover:bg-[#E85D00] text-white font-black text-xs sm:text-sm shadow-md shadow-orange-500/25 transition-all active:scale-95 flex items-center justify-center gap-2 flex-shrink-0"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Autocomplete Dropdown */}
          {isSearchFocused && !searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 shadow-xl p-3 text-left space-y-1 z-40 animate-in fade-in">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 block">
                Popular Searches
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {searchSuggestions.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setSearchQuery(s);
                      setIsSearchFocused(false);
                    }}
                    className="p-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00] text-left transition-colors flex items-center gap-2"
                  >
                    <Search className="w-3.5 h-3.5 text-gray-400" />
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Trending Chips */}
          <div className="mt-3 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar text-[11px] text-gray-500">
            <span className="font-bold text-gray-400">Trending:</span>
            {['React 19 Dev', 'Drone Cinematographer', 'Certified Electrician', 'Startup CA Audit'].map((query, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSearchQuery(query)}
                className="px-3 py-1 rounded-full bg-white border border-gray-200/80 hover:border-[#FF6B00] hover:text-[#FF6B00] font-semibold transition-colors flex-shrink-0 shadow-2xs"
              >
                {query}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. TRUST BAR (Directly Below Hero) */}
        {/* ========================================================================= */}
        <div className="mt-12 p-4 rounded-3xl bg-white border border-gray-200/90 shadow-sm grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-bold text-gray-700 text-center">
          <div className="flex items-center justify-center gap-1.5 p-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Govt DigiLocker Verified</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 p-1">
            <Lock className="w-4 h-4 text-[#FF6B00]" />
            <span>100% Escrow Protected</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 p-1">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>AI Smart Matched</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 p-1">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>256-bit Bank Security</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 p-1">
            <Coins className="w-4 h-4 text-amber-600" />
            <span>Zero Hidden Charges</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 p-1">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>50,000+ Specialists</span>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. POPULAR CATEGORIES (12 Icon Cards with Hover Lift & Emojis) */}
      {/* ========================================================================= */}
      <section id="services" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00]">
              Verified Services Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight mt-0.5">
              Explore Popular Categories
            </h2>
          </div>

          <Link
            href="/services"
            className="text-xs sm:text-sm font-bold text-[#FF6B00] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Subcategories & Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {POPULAR_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="p-5 rounded-3xl bg-white border border-gray-200/80 hover:border-[#FF6B00] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center space-y-2 group shadow-xs"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F8F9FB] group-hover:bg-orange-50 text-[#0F172A] group-hover:text-[#FF6B00] group-hover:scale-110 flex items-center justify-center text-xl transition-all duration-300">
                  <span>{cat.emoji}</span>
                </div>
                <div>
                  <span className="text-xs font-black text-[#0F172A] group-hover:text-[#FF6B00] transition-colors block">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold block mt-0.5">
                    {cat.count}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. HOW IT WORKS (8-Step Visual Journey) */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80">
        
        <div className="text-center max-w-xl mx-auto mb-12 space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00]">Simple Lifecycle</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            How GLID Works
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            From instant discovery to verified milestone release in 8 steps.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
          {EIGHT_STEPS.map((s, idx) => (
            <div
              key={idx}
              className="p-4 rounded-3xl bg-white border border-gray-200/80 hover:shadow-md hover:border-[#FF6B00] transition-all space-y-2 flex flex-col justify-between text-left sm:text-center shadow-xs"
            >
              <div className="w-7 h-7 rounded-full bg-orange-50 text-[#FF6B00] font-black text-xs flex items-center justify-center mx-auto">
                {s.num}
              </div>
              <h4 className="font-bold text-xs text-[#0F172A] leading-tight">{s.title}</h4>
              <p className="text-[10px] text-gray-500 leading-normal">{s.desc}</p>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 8. WHY GLID (6 Minimal Premium Cards with Large Icons) */}
      {/* ========================================================================= */}
      <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00]">Trust & Engineering</span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Why Choose GLID
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Built from first principles to ensure zero advance payment fraud and verified identity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_GLID_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-[32px] bg-white border border-gray-200/80 hover:shadow-xl hover:border-gray-300 transition-all duration-300 space-y-3.5 flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold border ${card.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-[#0F172A]">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 9. TESTIMONIALS (Social Proof) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80">
        
        <div className="text-center max-w-xl mx-auto mb-12 space-y-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00]">Verified Feedback</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            Loved by Founders, Creators & Businesses
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Real stories from verified customers across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#0F172A] font-medium italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div>
                  <h4 className="font-bold text-xs text-[#0F172A]">{t.name}</h4>
                  <p className="text-[10px] text-gray-500">{t.role} • {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 8. STARTUP GRADE EXPANDED FOOTER */}
      {/* ========================================================================= */}
      <footer id="contact" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200 text-xs text-gray-500">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          
          <div className="col-span-2 space-y-3">
            <span className="text-xl font-black text-[#0F172A]">
              GLID<span className="text-[#FF6B00]">.</span>
            </span>
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
              Global Local Identity & Discovery. India&apos;s verified professional marketplace powered by AI, Google Maps, and 100% secure escrow payments.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-gray-400">
              Trusted by 50,000+ Verified Specialists across Hyderabad, Bengaluru, Mumbai, and Delhi NCR.
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#0F172A]">Company</h4>
            <ul className="space-y-1.5">
              <li><a href="#about" className="hover:text-[#FF6B00]">About Us</a></li>
              <li><a href="#about" className="hover:text-[#FF6B00]">Careers (Hiring!)</a></li>
              <li><a href="#about" className="hover:text-[#FF6B00]">Blogs & Engineering</a></li>
              <li><a href="#about" className="hover:text-[#FF6B00]">Investor Relations</a></li>
              <li><a href="#about" className="hover:text-[#FF6B00]">Community Guidelines</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#0F172A]">Marketplace</h4>
            <ul className="space-y-1.5">
              <li><a href="/services" className="hover:text-[#FF6B00]">Services Directory</a></li>
              <li><a href="/explore" className="hover:text-[#FF6B00]">Google Maps Radar</a></li>
              <li><button onClick={() => openOnboarding('professional')} className="hover:text-[#FF6B00] text-left">Become a Professional</button></li>
              <li><button onClick={() => openOnboarding('business')} className="hover:text-[#FF6B00] text-left">Business Solutions (SLA)</button></li>
              <li><a href="/escrow-guarantee" className="hover:text-[#FF6B00]">Escrow Protection</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#0F172A]">Trust & Legal</h4>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:text-[#FF6B00]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#FF6B00]">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#FF6B00]">RBI Trustee Compliance</a></li>
              <li><a href="#" className="hover:text-[#FF6B00]">DigiLocker Verification</a></li>
              <li><a href="#" className="hover:text-[#FF6B00]">GST Tax Invoicing</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <span>© 2026 GLID Technologies India Pvt. Ltd. All rights reserved.</span>
          <span className="text-gray-400">Protected by 100% Aadhaar KYC & RBI Trustee Escrow Security</span>
        </div>
      </footer>

    </div>
  );
}
