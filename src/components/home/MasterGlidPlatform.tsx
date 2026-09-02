'use client';

import React, { useState } from 'react';
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
  Truck,
  X,
  ChevronRight,
  Server,
  Terminal,
  Activity,
  FolderLock
} from 'lucide-react';
import { PROFESSIONALS } from '@/data/mockData';
import { Professional } from '@/types';
import GoogleMapsMarketplaceEngine, { RadiusOption } from '@/components/maps/GoogleMapsMarketplaceEngine';
import UberStyleLiveTrackerModal from '@/components/maps/UberStyleLiveTrackerModal';
import PremiumBookingEscrowModal from '@/components/payments/PremiumBookingEscrowModal';
import RoleOnboardingHubModal, { UserOnboardingRole } from '@/components/account/RoleOnboardingHubModal';

// =========================================================================
// UNIFIED GLOBAL DESIGN SYSTEM DATA & STRUCTURES
// =========================================================================

const TRUST_STATS = [
  { value: '60,000+', label: 'Verified Professionals', desc: 'Government DigiLocker KYC' },
  { value: '250+', label: 'Service Categories', desc: 'Tech, Creative, Home & Legal' },
  { value: '150+', label: 'Indian Cities', desc: 'Hyperlocal GPS Dispatch' },
  { value: '98%', label: 'Average Trust Score', desc: 'Algorithmically Audited' },
  { value: '₹120Cr+', label: 'Escrow Transactions', desc: '100% Zero-Fraud Guarantee' },
  { value: '4.9★', label: 'Customer Rating', desc: 'Over 85,000+ Completed Jobs' },
];

const PLATFORM_COMPARISON = [
  {
    feature: 'Government DigiLocker Aadhaar KYC',
    glid: true,
    fiverr: false,
    upwork: false,
    urbanCompany: 'Partial',
    linkedIn: false,
  },
  {
    feature: 'Hyperlocal GPS Street Discovery (2-50 km)',
    glid: true,
    fiverr: false,
    upwork: false,
    urbanCompany: true,
    linkedIn: false,
  },
  {
    feature: 'Milestone Escrow with OTP Release',
    glid: true,
    fiverr: 'High Fee (20%)',
    upwork: 'High Fee (10-20%)',
    urbanCompany: false,
    linkedIn: false,
  },
  {
    feature: 'AI Natural Language Match Engine',
    glid: true,
    fiverr: false,
    upwork: false,
    urbanCompany: false,
    linkedIn: false,
  },
  {
    feature: 'Real-Time Dispatch & Live GPS Tracking',
    glid: true,
    fiverr: false,
    upwork: false,
    urbanCompany: 'Limited',
    linkedIn: false,
  },
  {
    feature: 'Portable Multi-Disciplinary Trust Score',
    glid: true,
    fiverr: false,
    upwork: false,
    urbanCompany: false,
    linkedIn: false,
  },
  {
    feature: 'Direct Chat & Phone Privacy Relay',
    glid: true,
    fiverr: false,
    upwork: false,
    urbanCompany: false,
    linkedIn: false,
  },
];

const POPULAR_CATEGORIES = [
  { id: 'tech', name: 'Software & AI Engineering', count: '4,850+ Pros', icon: Code, color: 'text-blue-600 bg-blue-50 border-blue-100', href: '/services?category=tech', desc: 'Next.js, Python, Mobile apps, AI & Cloud systems' },
  { id: 'design', name: 'UI/UX & Product Design', count: '3,120+ Pros', icon: Palette, color: 'text-purple-600 bg-purple-50 border-purple-100', href: '/services?category=design', desc: 'Figma systems, Mobile UI, Branding & Prototypes' },
  { id: 'photography', name: 'Commercial Photography', count: '3,240+ Pros', icon: Camera, color: 'text-rose-600 bg-rose-50 border-rose-100', href: '/services?category=creative', desc: 'Fashion, Studio portraits, Events & E-commerce' },
  { id: 'video', name: '4K Cinematography & Drone', count: '2,940+ Pros', icon: Video, color: 'text-amber-600 bg-amber-50 border-amber-100', href: '/services?category=creative', desc: 'Sony FX3, Drone reels, Ad shoots & Color grading' },
  { id: 'home', name: 'Electrical, AC & Home Care', count: '3,820+ Pros', icon: Zap, color: 'text-orange-600 bg-orange-50 border-orange-100', href: '/services?category=home_services', desc: 'Master wiremen, 3-phase DB panel, Inverters' },
  { id: 'business', name: 'Chartered Accountants & CA', count: '1,480+ Pros', icon: Briefcase, color: 'text-emerald-600 bg-emerald-50 border-emerald-100', href: '/services?category=business', desc: 'Pvt Ltd setup, GST audits, DPIIT & Startup tax' },
  { id: 'education', name: '1-on-1 Tutors & Tech Mentors', count: '1,950+ Pros', icon: GraduationCap, color: 'text-indigo-600 bg-indigo-50 border-indigo-100', href: '/services?category=education', desc: 'Coding, Math, Test prep & Career coaching' },
  { id: 'repair', name: 'Appliance & Precision Repair', count: '2,420+ Pros', icon: Wrench, color: 'text-teal-600 bg-teal-50 border-teal-100', href: '/services?category=home_services', desc: 'AC service, Washing machine & Device fixes' },
];

const TEN_STEPS = [
  { step: '01', title: 'Intelligent Query Search', desc: 'Describe your requirement in natural language or pick a discipline.' },
  { step: '02', title: 'AI Intent Understanding', desc: 'GLID parses technical scope, timeline, budget, and GPS radius.' },
  { step: '03', title: 'Hyperlocal Radar Scan', desc: 'Instant radar discovers DigiLocker-authenticated pros in 2–50 km.' },
  { step: '04', title: 'Algorithmic Trust Audit', desc: 'Review 98%+ Trust Scores, biometric badges, and client reviews.' },
  { step: '05', title: 'Escrow Payment Lock', desc: '100% of client funds are deposited into an RBI-regulated vault.' },
  { step: '06', title: 'Live GPS Dispatch', desc: 'Track real-time transit on Google Maps with route ETA and privacy relay.' },
  { step: '07', title: 'Milestone Execution', desc: 'Specialist delivers on-site or digital work to agreed scope.' },
  { step: '08', title: 'Client Inspection', desc: 'Inspect deliverables thoroughly with built-in revision guarantee.' },
  { step: '09', title: '4-Digit OTP Release', desc: 'Disburse funds instantly to the pro only after explicit authorization.' },
  { step: '10', title: 'Portable Trust Score', desc: 'Rating permanently enhances the pro’s cross-platform reputation.' }
];

const SUCCESS_CASE_STUDIES = [
  {
    title: 'Fintech Startup Built MVP in 14 Days',
    company: 'NeoPay Solutions',
    metrics: 'Saved ₹1.8L & Shipped on Schedule',
    client: 'Sneha Reddy, Product Lead',
    city: 'Hyderabad',
    quote: 'Found an ex-Razorpay architect on GLID in 10 minutes. Escrow milestones gave our board total financial confidence.',
    rating: 5,
    tag: 'Next.js 15 & AI Systems',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    title: '4K Commercial Drone Ad Shoot in 48 Hours',
    company: 'PixelKraft Studios',
    metrics: 'Broadcast-Ready 4K RAW Delivery',
    client: 'Ravi Teja, Studio Director',
    city: 'Bengaluru',
    quote: 'Our scheduled cameraman cancelled last minute. GLID dispatched a DGCA-licensed drone pilot within 45 minutes.',
    rating: 5,
    tag: 'Commercial Cinematography',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    title: 'Emergency Server Room DB Wiring Fix',
    company: 'Aura Logistics Hub',
    metrics: 'Zero Downtime Restored in 40 Mins',
    client: 'Rahul Sharma, Operations Head',
    city: 'Mumbai',
    quote: 'A certified master wireman arrived at our warehouse with diagnostic gear and restored power safely before morning shift.',
    rating: 5,
    tag: 'Master Electrical Repair',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

const FAQ_ITEMS = [
  {
    q: 'How does the 100% Escrow Protection guarantee work?',
    a: 'When you book a professional, your payment is placed safely in an RBI-regulated bank trustee escrow vault. The funds are NEVER released automatically. Once you inspect the completed deliverable and provide your 4-digit OTP, the payment is disbursed instantly to the professional.'
  },
  {
    q: 'How is a specialist’s 98% Trust Score calculated?',
    a: 'GLID’s proprietary trust algorithm audits 7 objective data points: DigiLocker biometric Aadhaar verification, bank account name match, completed job count, zero dispute history, on-time delivery rate, response speed, and verified client ratings.'
  },
  {
    q: 'How does Hyperlocal Google Maps Discovery work?',
    a: 'You can search by single skill or emergency task and select a discovery radius (2km, 5km, 10km, 20km, 50km). GLID calculates live travel distances and route ETAs for Bike, Cab, and Walk transit.'
  },
  {
    q: 'What happens if the work is unsatisfactory or delayed?',
    a: 'Because your funds remain safely locked in escrow, you are 100% protected against financial loss. You can request milestone revisions directly. If an agreement cannot be reached, GLID’s dispute mediation team investigates and issues a full 100% refund.'
  },
  {
    q: 'How does DigiLocker government verification work?',
    a: 'Every specialist completes a government e-KYC flow linking their Aadhaar, PAN, and bank account before accepting client bookings, virtually eliminating fake profiles and anonymous scammers.'
  },
  {
    q: 'Can businesses hire on GLID with GST tax invoices?',
    a: 'Yes. GLID automatically generates compliant B2B GST tax invoices with your company’s GSTIN for every milestone payment, making accounting seamless for startups and enterprises.'
  }
];

const TECH_PARTNERS = [
  { name: 'Google Maps Platform', desc: 'Live Geo Radar & ETA' },
  { name: 'DigiLocker / UIDAI', desc: 'Government e-KYC' },
  { name: 'Razorpay / Bank Escrow', desc: 'Trustee Vaults' },
  { name: 'Amazon Web Services', desc: 'Encrypted Cloud' },
  { name: 'OpenAI / Gemini', desc: 'Semantic Matching' },
  { name: 'Cloudflare', desc: 'DDoS & Edge Security' }
];

export default function MasterGlidPlatform() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const [selectedAvailability, setSelectedAvailability] = useState('today');
  const [selectedMapRadius, setSelectedMapRadius] = useState<RadiusOption>('10 km');
  const [isListeningVoice, setIsListeningVoice] = useState(false);

  // Modals & Selection
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [onboardingRole, setOnboardingRole] = useState<UserOnboardingRole>('customer');
  const [proForBooking, setProForBooking] = useState<Professional | null>(null);
  const [proForLiveTracking, setProForLiveTracking] = useState<Professional | null>(null);
  const [selectedMapPro, setSelectedMapPro] = useState<Professional | null>(PROFESSIONALS[0]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const openOnboarding = (role: UserOnboardingRole = 'customer') => {
    setOnboardingRole(role);
    setIsOnboardingModalOpen(true);
  };

  const handleVoiceSearch = () => {
    setIsListeningVoice(true);
    setTimeout(() => {
      setSearchQuery('Certified Electrician');
      setIsListeningVoice(false);
    }, 1500);
  };

  return (
    <div className="w-full bg-[#FFFFFF] text-[#0F172A] selection:bg-orange-100 selection:text-[#FF6B00]">
      
      {/* Onboarding Registration Modal */}
      <RoleOnboardingHubModal
        isOpen={isOnboardingModalOpen}
        initialRole={onboardingRole}
        onClose={() => setIsOnboardingModalOpen(false)}
      />

      {/* Escrow Booking Checkout Modal */}
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

      {/* Live Tracker Modal */}
      {proForLiveTracking && (
        <UberStyleLiveTrackerModal
          professional={proForLiveTracking}
          bookingTitle={`${proForLiveTracking.subcategory} Milestone Booking`}
          contractAmountINR={proForLiveTracking.hourlyRateINR * 4}
          onClose={() => setProForLiveTracking(null)}
        />
      )}

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        
        {/* Soft Ambient Mesh Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-orange-100/30 via-amber-50/20 to-blue-50/20 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Top Minimal Trust Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-[#0F172A] text-xs font-bold shadow-xs mb-6 animate-in fade-in">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
          <span className="text-[#FF6B00] font-black">GOVERNMENT e-KYC AUTHENTICATED</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-700">100% Escrow Secured</span>
        </div>

        {/* Investor-Grade Primary Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.12] max-w-4xl mx-auto">
          India&apos;s First AI-Powered <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#FF6B00] to-[#EA580C] bg-clip-text text-transparent">
            Verified Professional
          </span> Marketplace.
        </h1>

        {/* Crystal Clear Subtitle */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-[#475569] font-medium max-w-3xl mx-auto leading-relaxed">
          Book trusted freelancers, creators, engineers, technicians and experts with AI matching, government verification, and secure escrow payments.
        </p>

        {/* Unified Search Experience */}
        <div className="mt-8 sm:mt-10 w-full max-w-4xl mx-auto relative z-30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const q = searchQuery.trim() || 'all';
              window.location.href = `/explore?q=${encodeURIComponent(q)}&city=${encodeURIComponent(selectedCity)}&avail=${encodeURIComponent(selectedAvailability)}`;
            }}
            className="p-2.5 sm:p-3 rounded-3xl bg-white border border-gray-200 shadow-xl flex flex-col md:flex-row items-stretch md:items-center gap-2.5 transition-all focus-within:border-[#FF6B00] focus-within:ring-4 focus-within:ring-orange-500/10"
          >
            {/* Service Query Input */}
            <div className="flex-1 flex items-center gap-3 pl-3 sm:pl-4 py-1.5">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skill, service, e.g. React Developer, Electrician, Drone Pilot..."
                className="w-full text-xs sm:text-sm font-semibold text-[#0F172A] placeholder:text-gray-400 focus:outline-none bg-transparent"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} className="p-1 text-gray-400 hover:text-black">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="hidden md:block w-px h-8 bg-gray-200" />

            {/* Location City */}
            <div className="flex items-center gap-2 px-3.5 py-2 bg-[#F8F9FB] rounded-2xl border border-gray-100">
              <MapPin className="w-4 h-4 text-[#FF6B00] flex-shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="text-xs font-bold text-[#0F172A] bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Chennai">Chennai</option>
                <option value="Pune">Pune</option>
              </select>
            </div>

            {/* Availability Option */}
            <div className="flex items-center gap-2 px-3.5 py-2 bg-[#F8F9FB] rounded-2xl border border-gray-100">
              <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="text-xs font-bold text-[#0F172A] bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="today">Available Today</option>
                <option value="emergency">⚡ Emergency (30m)</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="this_week">This Week</option>
              </select>
            </div>

            {/* Voice & Search Buttons */}
            <div className="flex items-center gap-2 self-end md:self-auto w-full md:w-auto">
              <button
                type="button"
                onClick={handleVoiceSearch}
                title="Google Voice Search"
                className={`p-3 rounded-2xl transition-colors ${
                  isListeningVoice ? 'bg-red-50 text-red-500 animate-pulse' : 'bg-gray-100 text-gray-600 hover:text-[#FF6B00]'
                }`}
              >
                <Mic className="w-4 h-4" />
              </button>

              <button
                type="submit"
                className="flex-1 md:flex-initial px-6 py-3.5 rounded-2xl bg-[#FF6B00] hover:bg-[#E55F00] active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Popular Search Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            <span className="text-gray-400 font-bold text-[11px] uppercase tracking-wider">Popular:</span>
            {['Next.js 15 Architect', 'Wedding Cinematographer', 'Certified Electrician', 'Figma UI/UX', 'CA Startup Tax'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchQuery(tag);
                  window.location.href = `/explore?q=${encodeURIComponent(tag)}`;
                }}
                className="px-3 py-1 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[#FF6B00] hover:border-orange-200 text-xs font-semibold transition-all shadow-2xs"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10 pt-8 border-t border-gray-100 text-xs font-bold text-gray-600">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>DigiLocker Verified KYC</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>100% Escrow Protection</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Navigation className="w-4 h-4 text-orange-600" />
            <span>Hyperlocal GPS Radar</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>AI Semantic Matching</span>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. TRUST NUMBERS & INSTITUTIONAL METRICS */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#F8F9FB] border-y border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {TRUST_STATS.map((stat, idx) => (
              <div key={idx} className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs h-full flex flex-col justify-center space-y-1">
                <span className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight block">
                  {stat.value}
                </span>
                <h4 className="text-xs font-bold text-gray-800">{stat.label}</h4>
                <p className="text-[11px] text-gray-400 font-medium">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHAT IS GLID? */}
      {/* ========================================================================= */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-4">
        <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00]">
          Institutional Overview
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
          What is GLID?
        </h2>
        <p className="text-base sm:text-xl text-[#334155] font-semibold leading-relaxed max-w-3xl mx-auto">
          GLID is India&apos;s AI-powered verified professional marketplace where businesses and customers discover, hire, and securely pay trusted specialists using government identity verification, milestone escrow protection, and hyperlocal GPS recommendations.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHY WE BUILT GLID (Problem vs Solution) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-red-600">The Problem & The Fix</span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Why Legacy Freelancing Platforms Are Broken
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Freelance portals and classifieds suffer from lack of trust, fake accounts, and runaway fraud. Here is how GLID transforms the entire industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Legacy Problems */}
          <div className="p-8 rounded-3xl bg-red-50/50 border border-red-100 space-y-5 h-full flex flex-col justify-between">
            <div className="flex items-center gap-2 text-red-700 font-black text-sm uppercase tracking-wider">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span>Today&apos;s Broken Marketplaces</span>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm font-semibold text-gray-700">
              <li className="flex items-start gap-2.5">
                <span className="text-red-600 font-black">❌</span>
                <span><strong>Fake Profiles & Unverified Talent</strong> with anonymous bot accounts and stolen credentials.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-600 font-black">❌</span>
                <span><strong>Exorbitant 20–30% Commissions</strong> penalizing honest freelancers and overcharging clients.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-600 font-black">❌</span>
                <span><strong>Advance Payment Scams</strong> where money disappears with zero work delivered.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-600 font-black">❌</span>
                <span><strong>Zero Hyperlocal Discovery</strong> making it impossible to find verified experts nearby.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-600 font-black">❌</span>
                <span><strong>Locked-In Reputation</strong> preventing specialists from transferring their earned trust.</span>
              </li>
            </ul>
            <div className="text-[11px] font-bold text-red-600 uppercase tracking-wider pt-2 border-t border-red-100">
              Risk: High Client Friction & Financial Loss
            </div>
          </div>

          {/* GLID Solution */}
          <div className="p-8 rounded-3xl bg-emerald-50/50 border border-emerald-100 space-y-5 h-full flex flex-col justify-between">
            <div className="flex items-center gap-2 text-emerald-800 font-black text-sm uppercase tracking-wider">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>The GLID Architecture</span>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm font-semibold text-gray-700">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-black">✓</span>
                <span><strong>DigiLocker Aadhaar e-KYC</strong> ensures 100% government-authenticated individual accountability.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-black">✓</span>
                <span><strong>RBI-Grade Bank Escrow</strong> locks funds safely until you approve milestones with a 4-digit OTP.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-black">✓</span>
                <span><strong>Live Google Maps Radar</strong> pinpoints available specialists in 2km, 5km, 10km, 20km, and 50km radii.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-black">✓</span>
                <span><strong>Portable Universal Trust Score</strong> consolidates reviews, speed, and track record into one identity.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-black">✓</span>
                <span><strong>AI Semantic Matchmaker</strong> automatically aligns technical briefs with proven local talent.</span>
              </li>
            </ul>
            <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider pt-2 border-t border-emerald-100">
              Guarantee: 100% Verified Deliverables & Zero Fraud
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. EXISTING PLATFORMS COMPARISON (Investor Matrix) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00]">Competitive Advantage</span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            How GLID Compares with Existing Platforms
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            A comprehensive side-by-side feature comparison across legacy freelancing, hiring, and gig portals.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-xs bg-white">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-[#F8F9FB]">
                <th className="p-4 sm:p-5 font-black text-gray-900">Platform Capability</th>
                <th className="p-4 sm:p-5 font-black text-[#FF6B00] bg-orange-50/70">GLID.</th>
                <th className="p-4 sm:p-5 font-semibold text-gray-600">Fiverr</th>
                <th className="p-4 sm:p-5 font-semibold text-gray-600">Upwork</th>
                <th className="p-4 sm:p-5 font-semibold text-gray-600">Urban Company</th>
                <th className="p-4 sm:p-5 font-semibold text-gray-600">LinkedIn</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {PLATFORM_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 sm:p-5 text-gray-900 font-bold">{row.feature}</td>
                  <td className="p-4 sm:p-5 text-emerald-700 font-black bg-orange-50/40">
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Yes (Built-in)
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-gray-500">{typeof row.fiverr === 'boolean' ? (row.fiverr ? '✓' : '❌') : row.fiverr}</td>
                  <td className="p-4 sm:p-5 text-gray-500">{typeof row.upwork === 'boolean' ? (row.upwork ? '✓' : '❌') : row.upwork}</td>
                  <td className="p-4 sm:p-5 text-gray-500">{typeof row.urbanCompany === 'boolean' ? (row.urbanCompany ? '✓' : '❌') : row.urbanCompany}</td>
                  <td className="p-4 sm:p-5 text-gray-500">{typeof row.linkedIn === 'boolean' ? (row.linkedIn ? '✓' : '❌') : row.linkedIn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FIND THE RIGHT PROFESSIONAL IN SECONDS (Clean White Discovery) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 text-[#FF6B00] text-xs font-bold border border-orange-200/80">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INSTANT INTELLIGENT DISCOVERY</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Find the Right Professional in Seconds
          </h2>
          <p className="text-xs sm:text-base text-gray-600 font-medium leading-relaxed">
            Search by service, skill, location, availability, budget, or simply describe your requirement. GLID&apos;s AI works silently in the background to instantly match you with verified professionals nearby.
          </p>
        </div>

        {/* Large Intelligent Multi-Filter Search Bar */}
        <div className="max-w-5xl mx-auto mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const q = searchQuery.trim() || 'all';
              window.location.href = `/explore?q=${encodeURIComponent(q)}&city=${encodeURIComponent(selectedCity)}&avail=${encodeURIComponent(selectedAvailability)}`;
            }}
            className="p-3 sm:p-4 rounded-3xl bg-white border border-gray-200 shadow-xl flex flex-col lg:flex-row items-stretch lg:items-center gap-3 transition-all focus-within:border-[#FF6B00] focus-within:ring-4 focus-within:ring-orange-500/10"
          >
            {/* 1. Service / Skill Input */}
            <div className="flex-1 flex items-center gap-3 pl-3 sm:pl-4 py-1.5">
              <Search className="w-5 h-5 text-[#FF6B00] flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What service do you need? e.g., React Developer, Electrician, CA..."
                className="w-full text-xs sm:text-sm font-semibold text-[#0F172A] placeholder:text-gray-400 focus:outline-none bg-transparent"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} className="p-1 text-gray-400 hover:text-black">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="hidden lg:block w-px h-10 bg-gray-200" />

            {/* 2. Location Selector */}
            <div className="flex items-center gap-2 px-3.5 py-2 bg-[#F8F9FB] rounded-2xl border border-gray-100">
              <MapPin className="w-4 h-4 text-[#FF6B00] flex-shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="text-xs font-bold text-[#0F172A] bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Chennai">Chennai</option>
                <option value="Pune">Pune</option>
              </select>
            </div>

            {/* 3. Date Picker */}
            <div className="flex items-center gap-2 px-3.5 py-2 bg-[#F8F9FB] rounded-2xl border border-gray-100">
              <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="text-xs font-bold text-[#0F172A] bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="weekend">This Weekend</option>
                <option value="flexible">Flexible Date</option>
              </select>
            </div>

            {/* 4. Time / Slot Picker */}
            <div className="flex items-center gap-2 px-3.5 py-2 bg-[#F8F9FB] rounded-2xl border border-gray-100">
              <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <select
                className="text-xs font-bold text-[#0F172A] bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="anytime">Anytime</option>
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                <option value="evening">Evening (5 PM - 9 PM)</option>
                <option value="emergency">⚡ Emergency (30m)</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-[#FF6B00] hover:bg-[#E55F00] active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all flex-shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Find Professionals</span>
            </button>
          </form>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-xs">
            <span className="text-gray-400 font-bold text-[11px] uppercase tracking-wider">Popular Searches:</span>
            {[
              'Electrician',
              'Photographer',
              'Full Stack Developer',
              'UI/UX Designer',
              'Video Editor',
              'Plumber',
              'Teacher',
              'CA',
              'Lawyer',
              'Interior Designer',
              'Digital Marketing',
              'Event Planner'
            ].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchQuery(tag);
                  window.location.href = `/explore?q=${encodeURIComponent(tag)}`;
                }}
                className="px-3 py-1 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[#FF6B00] hover:border-orange-300 text-xs font-semibold transition-all shadow-2xs hover:-translate-y-0.5"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* RECOMMENDED NEAR YOU SECTION */}
        <div className="mt-14 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00]">Curated For You</span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
                Recommended Near You
              </h3>
            </div>
            <Link
              href="/explore"
              className="text-xs font-bold text-[#FF6B00] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View All on Google Maps Radar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Recommended Specialists Grid (Equal Heights) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {PROFESSIONALS.slice(0, 6).map((pro, index) => {
              const recommendationChips = [
                '✓ Best Match',
                '✓ Highest Rated',
                '✓ Nearest Available',
                '✓ Available Today',
                '✓ Top Financial Specialist',
                '✓ Certified Expert'
              ];
              const chip = recommendationChips[index % recommendationChips.length];

              return (
                <div
                  key={pro.id}
                  className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col justify-between space-y-4 group h-full"
                >
                  <div className="space-y-3.5">
                    
                    {/* Top Row: AI Chip + Trust Score */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-orange-50 text-[#FF6B00] text-[10px] font-black tracking-wide border border-orange-100">
                        {chip}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black border border-emerald-100">
                        {pro.trustScore}% Trust Score
                      </span>
                    </div>

                    {/* Pro Header: Photo + Name + Verified */}
                    <div className="flex items-start gap-3">
                      <div className="relative w-14 h-14 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={pro.avatarUrl}
                          alt={pro.name}
                          className="w-14 h-14 rounded-2xl object-cover border border-gray-200 shadow-xs"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-[9px] font-bold border border-white">
                          ✓
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-sm sm:text-base font-black text-[#0F172A] group-hover:text-[#FF6B00] transition-colors truncate">
                            {pro.name}
                          </h4>
                        </div>
                        <p className="text-xs text-gray-500 font-medium line-clamp-1 mt-0.5">
                          {pro.headline}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-gray-400 font-semibold mt-1">
                          <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span>5.0 ({pro.completedProjectsCount})</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#FF6B00]" />
                            <span>{pro.distanceKm} km away</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status & Category Tag */}
                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-gray-100 font-semibold">
                      <span className="text-gray-500">{pro.subcategory}</span>
                      <span className="text-[#16A34A] flex items-center gap-1 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                        <span>Available Today</span>
                      </span>
                    </div>

                  </div>

                  {/* Bottom Rate + Action Buttons */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-gray-400 font-medium block">Starting from</span>
                      <span className="text-sm font-black text-[#0F172A]">₹{pro.hourlyRateINR.toLocaleString()}</span>
                      <span className="text-[10px] text-gray-400 font-medium">/hr</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/profile/${pro.id}`}
                        className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#0F172A] font-bold text-xs transition-colors"
                      >
                        Profile
                      </Link>
                      <button
                        type="button"
                        onClick={() => setProForBooking(pro)}
                        className="px-4 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-xs shadow-xs transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* "Why this match?" Informational Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#F8F9FB] border border-gray-200/90 mt-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-black text-[#0F172A] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
              <span>Why This Match? — How GLID Intelligently Pairs You</span>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              GLID&apos;s background matchmaking engine audits multi-dimensional signals in real time to recommend the highest-quality specialist for your exact needs:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-xs font-bold text-gray-700">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Verified Identity (Aadhaar)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>98%+ Audited Trust Score</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Live GPS Proximity (2-50km)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Verified Skills & Portfolio</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Years of Proven Experience</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Real-Time Live Availability</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Budget & Transparent Rates</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Payment-Verified Reviews</span>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 7. POPULAR SERVICE CATEGORIES */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00]">Browse Expertise</span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight mt-1">
              Top Service Disciplines
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              Over 250+ specialized disciplines across digital and physical services.
            </p>
          </div>

          <Link
            href="/services"
            className="text-xs sm:text-sm font-bold text-[#FF6B00] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All 250+ Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Equal-Height Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {POPULAR_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="p-6 rounded-3xl bg-white border border-gray-200/80 hover:border-[#FF6B00] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group shadow-xs space-y-4 h-full"
              >
                <div className="space-y-3.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold border ${cat.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#0F172A] group-hover:text-[#FF6B00] transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-xs text-gray-400 font-semibold block mt-1">
                      {cat.count}
                    </span>
                    <p className="text-[11px] text-gray-500 font-medium mt-1.5 line-clamp-2">
                      {cat.desc}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-xs font-bold text-[#FF6B00] group-hover:translate-x-1 transition-transform pt-2 border-t border-gray-100">
                  <span>Explore specialists →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. LIVE GOOGLE MAPS RADAR SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
              <span>LIVE GPS RADAR</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              Hyperlocal Talent Discovery
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              Find, compare, and instantly dispatch verified specialists within 2km–50km of your exact location.
            </p>
          </div>

          {/* Radius Selector Pills */}
          <div className="flex items-center gap-1 p-1 bg-[#F1F5F9] rounded-2xl border border-gray-200 self-start md:self-auto overflow-x-auto no-scrollbar">
            {(['2 km', '5 km', '10 km', '20 km', '50 km'] as RadiusOption[]).map((rad) => (
              <button
                key={rad}
                type="button"
                onClick={() => setSelectedMapRadius(rad)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedMapRadius === rad ? 'bg-[#0F172A] text-white shadow-xs' : 'text-gray-600 hover:bg-white'
                }`}
              >
                {rad}
              </button>
            ))}
          </div>
        </div>

        {/* Live Map Radar Engine */}
        <div className="rounded-3xl overflow-hidden border border-gray-300 shadow-xl bg-slate-900 relative">
          <GoogleMapsMarketplaceEngine
            professionals={PROFESSIONALS}
            selectedPro={selectedMapPro}
            onSelectPro={(pro) => setSelectedMapPro(pro)}
            onBookPro={(pro) => setProForBooking(pro)}
            userLocationName="Hitech City, Hyderabad"
            selectedRadius={selectedMapRadius}
            onRadiusChange={setSelectedMapRadius}
            heightClass="h-[480px] sm:h-[540px]"
            showRadiusBar={false}
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FEATURED TOP-RATED SPECIALISTS */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00]">Verified Talent</span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight mt-1">
              Top 1% Rated Specialists
            </h2>
          </div>
          <Link href="/explore" className="text-xs sm:text-sm font-bold text-[#FF6B00] hover:underline flex items-center gap-1">
            <span>Explore all talent</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {PROFESSIONALS.slice(0, 3).map((pro) => (
            <div
              key={pro.id}
              className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between h-full"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={pro.avatarUrl}
                        alt={pro.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-gray-200"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-[9px] font-bold border border-white">
                        ✓
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-black text-[#0F172A]">{pro.name}</h3>
                      <span className="text-xs text-gray-500 font-medium line-clamp-1">{pro.headline}</span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-orange-50 text-[#FF6B00] text-[10px] font-black flex-shrink-0">
                    {pro.trustScore}% Trust
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>{pro.cityArea}, {pro.location} • {pro.distanceKm} km away</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {pro.skills.slice(0, 3).map((s, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-lg bg-gray-100 text-gray-600 text-[10px] font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 font-medium">Starting at</span>
                  <div className="text-base font-black text-[#0F172A]">₹{pro.hourlyRateINR.toLocaleString()}/hr</div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/profile/${pro.id}`}
                    className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#0F172A] transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => setProForBooking(pro)}
                    className="px-4 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    Book Escrow
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. HOW AI MATCHING WORKS (10-Step Visual Flow) */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00]">End-To-End Architecture</span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            How GLID Works in 10 Seamless Steps
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            From initial intent interpretation to verified milestone inspection and instantaneous OTP escrow release.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
          {TEN_STEPS.map((s, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:shadow-md hover:border-[#FF6B00] transition-all space-y-2 flex flex-col justify-between h-full"
            >
              <div className="w-8 h-8 rounded-full bg-orange-50 text-[#FF6B00] font-black text-xs flex items-center justify-center">
                {s.step}
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-[#0F172A] leading-tight">{s.title}</h4>
              <p className="text-[11px] text-gray-500 leading-normal">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. BANK-GRADE ESCROW PROTECTION */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80">
        <div className="bg-[#0F172A] rounded-3xl p-8 sm:p-14 text-white space-y-8 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>RBI-REGULATED TRUSTEE ESCROW</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Your Money Stays 100% Safe. Released Only After Your Approval.
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-medium">
              No advance payment scams. No unfulfilled promises. Client funds are placed in bank escrow and released only with your 4-digit OTP.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-white/10 items-stretch">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-orange-400 block mb-1">1. Deposit Escrow</span>
                <p className="text-[11px] text-gray-300 font-medium">Funds are locked securely in the bank trustee vault.</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-orange-400 block mb-1">2. Pro Executes</span>
                <p className="text-[11px] text-gray-300 font-medium">Specialist performs work on-site or submits code/designs.</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-orange-400 block mb-1">3. You Inspect</span>
                <p className="text-[11px] text-gray-300 font-medium">Verify deliverables against the agreed milestone scope.</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-emerald-400 block mb-1">4. OTP Release</span>
                <p className="text-[11px] text-gray-300 font-medium">Authorize instant payout to the pro using your 4-digit code.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. THE 98% PORTABLE TRUST SCORE SYSTEM */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00]">Algorithm & Accountability</span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              The 98% Portable Trust Score
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
              Unlike star ratings that can be easily faked, GLID evaluates 7 objective criteria to assign a mathematically audited Trust Score.
            </p>
            <div className="space-y-2.5 pt-2">
              {[
                'Government DigiLocker Biometric Identity Check',
                'Completed Milestones & On-Time Delivery Record',
                'Zero Dispute & 100% Escrow Release Ratio',
                'Verified Client Ratings & Code/Portfolio Audits',
                'Response Speed (< 15 mins average)'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-3xl bg-[#F8F9FB] border border-gray-200 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white font-black text-xl flex items-center justify-center shadow-md">
                  98%
                </div>
                <div>
                  <h4 className="font-black text-base text-[#0F172A]">Master Verified Score</h4>
                  <span className="text-xs text-emerald-700 font-bold">✓ Top 1% Tier in India</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700">
                Aadhaar KYC
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                  <span>Identity & Legal Background</span>
                  <span>100%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-[#16A34A] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                  <span>Milestone Completion Reliability</span>
                  <span>99%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-[99%] h-full bg-[#FF6B00] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                  <span>Response Speed & Communication</span>
                  <span>97%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-[97%] h-full bg-blue-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. WHY CHOOSE GLID (BENTO GRID) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00]">Bento Grid</span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Why Professionals & Businesses Choose GLID
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            A state-of-the-art platform designed for speed, trust, and mutual security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <div className="p-8 rounded-3xl bg-white border border-gray-200/90 shadow-xs hover:shadow-xl transition-all space-y-3 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0F172A]">DigiLocker Identity</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                Every professional undergoes biometric Aadhaar verification, eliminating scams and impersonation.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700">100% Real People</span>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-gray-200/90 shadow-xs hover:shadow-xl transition-all space-y-3 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0F172A]">Bank Escrow Vaults</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                Client funds are safeguarded in an RBI-regulated bank escrow vault until OTP verification.
              </p>
            </div>
            <span className="text-[11px] font-bold text-blue-700">Zero Payment Scams</span>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-gray-200/90 shadow-xs hover:shadow-xl transition-all space-y-3 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF6B00] flex items-center justify-center font-bold border border-orange-100">
                <Navigation className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0F172A]">Live Transit Radar</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                Interactive Google Maps engine with real-time transit ETAs for Bike, Cab, and Walk dispatch.
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#FF6B00]">Hyperlocal 2–50 km</span>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-gray-200/90 shadow-xs hover:shadow-xl transition-all space-y-3 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold border border-purple-100">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0F172A]">AI Matchmaking</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                NLP semantic matching pairs complex client briefs with proven specialists in seconds.
              </p>
            </div>
            <span className="text-[11px] font-bold text-purple-700">Semantic Matching</span>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-gray-200/90 shadow-xs hover:shadow-xl transition-all space-y-3 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold border border-amber-100">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0F172A]">Portable Trust Score</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                One unified profile that stores verified career history, earnings, and cross-platform ratings.
              </p>
            </div>
            <span className="text-[11px] font-bold text-amber-700">Universal Reputation</span>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-gray-200/90 shadow-xs hover:shadow-xl transition-all space-y-3 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold border border-rose-100">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#0F172A]">Dispute Mediation</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
                Multi-tier inspection and 100% money-back guarantee in case of unresolved milestone issues.
              </p>
            </div>
            <span className="text-[11px] font-bold text-rose-700">100% Money-Back Guarantee</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 14. CUSTOMER SUCCESS STORIES & CASE STUDIES */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00]">Proven Results</span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Loved by Founders, Creators & Enterprises
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Real milestone deliverables completed with verified escrow security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {SUCCESS_CASE_STUDIES.map((study, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:shadow-xl transition-all space-y-4 flex flex-col justify-between h-full"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-lg bg-orange-50 text-[#FF6B00] text-[10px] font-black uppercase">
                    {study.tag}
                  </span>
                  <span className="text-xs font-semibold text-gray-400">{study.city}</span>
                </div>
                <h3 className="text-base font-black text-[#0F172A]">{study.title}</h3>
                <div className="text-xs font-bold text-emerald-700">✓ {study.metrics}</div>
                <p className="text-xs text-gray-600 italic leading-relaxed font-medium">
                  &ldquo;{study.quote}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={study.avatar} alt={study.client} className="w-10 h-10 rounded-xl object-cover border" />
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">{study.client}</h4>
                  <span className="text-[10px] text-gray-400 font-semibold">{study.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 15. FOUNDER VISION (For Investors & Committees) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center border-t border-gray-200/80 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 text-[#FF6B00] text-xs font-bold border border-orange-200">
          <Rocket className="w-3.5 h-3.5" />
          <span>OUR NORTH STAR</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
          The GLID Foundation Vision
        </h2>
        <blockquote className="text-base sm:text-xl text-[#334155] font-semibold italic leading-relaxed max-w-3xl mx-auto">
          &ldquo;To build India&apos;s trusted identity and opportunity infrastructure — where every skilled specialist owns one verified digital identity that instantly unlocks dignified work, fair earnings, and universal trust across every city.&rdquo;
        </blockquote>
      </section>

      {/* ========================================================================= */}
      {/* 16. SECURITY & COMPLIANCE SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80">
        <div className="bg-[#F8F9FB] rounded-3xl p-8 sm:p-12 border border-gray-200 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00]">Enterprise Compliance</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              Bank-Grade Security Architecture
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Engineered with zero-trust security principles to protect client funds, biometric identity, and proprietary data.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center items-stretch">
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-2xs space-y-1.5 h-full flex flex-col justify-center">
              <FolderLock className="w-6 h-6 text-blue-600 mx-auto" />
              <h4 className="text-xs font-bold text-[#0F172A]">256-Bit SSL/TLS</h4>
              <p className="text-[10px] text-gray-400 font-medium">End-to-End Encryption</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-2xs space-y-1.5 h-full flex flex-col justify-center">
              <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto" />
              <h4 className="text-xs font-bold text-[#0F172A]">DigiLocker e-KYC</h4>
              <p className="text-[10px] text-gray-400 font-medium">Government Biometrics</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-2xs space-y-1.5 h-full flex flex-col justify-center">
              <Lock className="w-6 h-6 text-orange-600 mx-auto" />
              <h4 className="text-xs font-bold text-[#0F172A]">RBI Trustee Escrow</h4>
              <p className="text-[10px] text-gray-400 font-medium">Zero Chargeback Risk</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-2xs space-y-1.5 h-full flex flex-col justify-center">
              <Key className="w-6 h-6 text-purple-600 mx-auto" />
              <h4 className="text-xs font-bold text-[#0F172A]">4-Digit OTP Release</h4>
              <p className="text-[10px] text-gray-400 font-medium">Explicit Authorization</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 17. TECHNOLOGY PARTNERS */}
      {/* ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80">
        <div className="text-center mb-6">
          <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">
            Powered by World-Class Infrastructure
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center items-stretch">
          {TECH_PARTNERS.map((tech, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-gray-100 shadow-2xs h-full flex flex-col justify-center">
              <span className="text-xs font-black text-[#0F172A] block">{tech.name}</span>
              <span className="text-[10px] text-gray-400 font-semibold">{tech.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 18. DOWNLOAD GLID APP (Mobile Suite) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200/80">
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-8 sm:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl space-y-3 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase">
              On-The-Go Access
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Download the GLID Mobile Suite
            </h2>
            <p className="text-xs sm:text-sm text-orange-100 leading-relaxed font-medium">
              Book nearby specialists, track live arrival routes, chat securely with privacy relay, and release escrow milestones on iOS & Android.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-3">
              <button
                type="button"
                onClick={() => alert("GLID iOS TestFlight invite dispatched to your email!")}
                className="px-5 py-3 rounded-2xl bg-white text-[#0F172A] text-xs font-bold shadow-md hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                <Apple className="w-4 h-4" />
                <span>App Store</span>
              </button>
              <button
                type="button"
                onClick={() => alert("GLID Android APK download started!")}
                className="px-5 py-3 rounded-2xl bg-[#0F172A] text-white text-xs font-bold shadow-md hover:bg-black transition-all flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4" />
                <span>Google Play</span>
              </button>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white text-[#0F172A] text-center space-y-2 shadow-2xl flex-shrink-0">
            <QrCode className="w-24 h-24 text-[#0F172A] mx-auto" />
            <span className="text-xs font-black block">Scan to Install</span>
            <span className="text-[10px] text-gray-400 font-semibold">Instant Mobile Dispatch</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 19. COMPREHENSIVE FAQ SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-gray-200/80">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00]">Common Questions</span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Everything you need to know about payments, verification, and discovery.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-[#0F172A] hover:text-[#FF6B00]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-[#FF6B00]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-gray-600 leading-relaxed font-medium border-t border-gray-100 pt-3 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 20. FINAL HIGH-CONVERSION CTA */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#0F172A] rounded-3xl p-10 sm:p-16 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00]">
              Start In 60 Seconds
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Ready to Hire Verified Specialists With Zero Risk?
            </h2>
            <p className="text-xs sm:text-base text-gray-400 font-medium">
              Join 60,000+ verified specialists and businesses across India on GLID.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/explore"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FF6B00] hover:bg-[#E55F00] active:scale-95 text-white font-bold text-sm shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Explore Verified Talent</span>
            </Link>

            <button
              type="button"
              onClick={() => openOnboarding('professional')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Become a Verified Professional</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 21. MEGA ENTERPRISE FOOTER */}
      {/* ========================================================================= */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200 text-xs text-gray-500 space-y-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          <div className="col-span-2 space-y-3">
            <Link href="/" className="text-2xl font-black text-[#0F172A] block">
              GLID<span className="text-[#FF6B00]">.</span>
            </Link>
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed font-medium">
              Global Local Identity & Discovery. India&apos;s verified professional marketplace powered by AI, Google Maps, and 100% secure escrow payments.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-gray-400">
              Trusted by 60,000+ Verified Specialists across Hyderabad, Bengaluru, Mumbai, and Delhi NCR.
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-black text-[#0F172A] text-xs uppercase tracking-wider">Marketplace</h4>
            <ul className="space-y-2 font-semibold">
              <li><Link href="/explore" className="hover:text-[#FF6B00] transition-colors">Google Maps Radar</Link></li>
              <li><Link href="/services" className="hover:text-[#FF6B00] transition-colors">All 250+ Categories</Link></li>
              <li><Link href="/services?category=tech" className="hover:text-[#FF6B00] transition-colors">Software & AI</Link></li>
              <li><Link href="/services?category=creative" className="hover:text-[#FF6B00] transition-colors">4K Photography & Drone</Link></li>
              <li><Link href="/services?category=home_services" className="hover:text-[#FF6B00] transition-colors">Master Electricians</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-black text-[#0F172A] text-xs uppercase tracking-wider">Trust & Security</h4>
            <ul className="space-y-2 font-semibold">
              <li><Link href="/escrow-guarantee" className="hover:text-[#FF6B00] transition-colors">Escrow Guarantee</Link></li>
              <li><Link href="/#about" className="hover:text-[#FF6B00] transition-colors">DigiLocker e-KYC</Link></li>
              <li><Link href="/ai-tools" className="hover:text-[#FF6B00] transition-colors">AI Studio Tools</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#FF6B00] transition-colors">Client Dashboard</Link></li>
              <li><button onClick={() => openOnboarding('professional')} className="hover:text-[#FF6B00] transition-colors text-left">Pro Onboarding</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-black text-[#0F172A] text-xs uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 font-semibold">
              <li><Link href="/#about" className="hover:text-[#FF6B00] transition-colors">About Us</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-[#FF6B00] transition-colors">How It Works</Link></li>
              <li><a href="mailto:support@glid.network" className="hover:text-[#FF6B00] transition-colors">Contact Support</a></li>
              <li><span className="text-gray-400">Careers (Hiring)</span></li>
              <li><span className="text-gray-400">Press & Investors</span></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-semibold text-gray-400">
          <div>
            © {new Date().getFullYear()} GLID Network Technologies Pvt Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>RBI Escrow Compliance</span>
            <span>•</span>
            <span>ISO 27001 Certified</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
