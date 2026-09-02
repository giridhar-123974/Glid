'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Crosshair, 
  Mic, 
  Star, 
  ShieldCheck, 
  Clock, 
  Heart, 
  Share2, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  X, 
  Calendar, 
  Check, 
  ChevronRight,
  MessageSquare,
  Award,
  Zap,
  Globe,
  Briefcase,
  Radio,
  FileText,
  CreditCard,
  Building,
  CheckCircle
} from 'lucide-react';
import { PROFESSIONALS } from '@/data/mockData';
import { Professional, Review } from '@/types';

const TRENDING_SEARCHES = [
  'Wedding Photographer',
  'React Developer',
  'Video Editor',
  'Electrician',
  'Tutor',
  'Graphic Designer'
];

const POPULAR_CATEGORIES = [
  { id: 'web-dev', name: 'Web Development', count: '4,850+ Pros', icon: '💻', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=80' },
  { id: 'mobile-dev', name: 'Mobile Development', count: '2,940+ Pros', icon: '📱', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&auto=format&fit=crop&q=80' },
  { id: 'ai-auto', name: 'AI & Automation', count: '1,820+ Pros', icon: '🤖', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80' },
  { id: 'ui-ux', name: 'UI/UX Design', count: '3,120+ Pros', icon: '🎨', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=80' },
  { id: 'graphic-design', name: 'Graphic Design', count: '3,480+ Pros', icon: '✨', image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=500&auto=format&fit=crop&q=80' },
  { id: 'video-editing', name: 'Video Editing', count: '2,750+ Pros', icon: '🎬', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&auto=format&fit=crop&q=80' },
  { id: 'photography', name: 'Photography', count: '3,240+ Pros', icon: '📷', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=80' },
  { id: 'videography', name: 'Videography', count: '1,960+ Pros', icon: '🎥', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80' },
  { id: 'digital-marketing', name: 'Digital Marketing', count: '2,410+ Pros', icon: '📈', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=80' },
  { id: 'content-writing', name: 'Content Writing', count: '2,180+ Pros', icon: '✍️', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&auto=format&fit=crop&q=80' },
  { id: 'tutors', name: 'Tutors', count: '1,950+ Pros', icon: '🎓', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&auto=format&fit=crop&q=80' },
  { id: 'electricians', name: 'Electricians', count: '3,820+ Pros', icon: '⚡', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80' },
  { id: 'plumbers', name: 'Plumbers', count: '2,200+ Pros', icon: '🔧', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=80' },
  { id: 'car-rental', name: 'Car Rental', count: '1,120+ Pros', icon: '🚗', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&auto=format&fit=crop&q=80' },
  { id: 'home-cleaning', name: 'Home Cleaning', count: '2,650+ Pros', icon: '🧹', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80' }
];

export default function HomeGuidedSearchFlow() {
  // Navigation Flow State
  // 0: Homepage Default (Hero + Popular Categories)
  // 1: Location & Radius Screen
  // 2: Filter Screen (Chips only)
  // 3: Results Page
  // 4: Profile Details Drawer
  // 5: Booking Configuration
  // 6: Escrow Payment & OTP Confirmation
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState('Web Development');

  // Location Screen State
  const [locationInput, setLocationInput] = useState('Hitech City, Hyderabad');
  const [selectedRadius, setSelectedRadius] = useState<'5 KM' | '10 KM' | '20 KM' | '50 KM'>('10 KM');
  const [isGpsDetected, setIsGpsDetected] = useState(false);

  // Filter Chips State (Pure chips, zero ugly dropdowns)
  const [filterVerified, setFilterVerified] = useState(true);
  const [filterAvailableNow, setFilterAvailableNow] = useState(false);
  const [filterTopRated, setFilterTopRated] = useState(false);
  const [filterRemote, setFilterRemote] = useState(false);
  const [filterOnSite, setFilterOnSite] = useState(false);
  const [filterHighTrust, setFilterHighTrust] = useState(false);

  // Selected Profile & Booking State
  const [activeProfessional, setActiveProfessional] = useState<Professional | null>(null);
  const [packageType, setPackageType] = useState<'Hourly' | 'Fixed Project' | 'Monthly'>('Fixed Project');
  const [bookingDate, setBookingDate] = useState('2026-09-02');
  const [bookingTime, setBookingTime] = useState('10:30 AM');
  const [projectDescription, setProjectDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Cards' | 'Net Banking' | 'Razorpay'>('UPI');

  // Escrow & Completion State
  const [generatedOTP, setGeneratedOTP] = useState('7491');
  const [isCompleted, setIsCompleted] = useState(false);
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStartSearch = (queryOrCategory?: string) => {
    const finalVal = queryOrCategory || searchQuery || 'Web Development';
    setSearchQuery(finalVal);
    setSelectedCategoryName(finalVal);
    setCurrentStep(1); // Proceed directly to Location screen
  };

  const handleDetectGps = () => {
    setIsGpsDetected(true);
    setLocationInput('Current Location (Hitech City, 17.4474° N, 78.3762° E)');
    triggerToast('📍 GPS Location detected with accuracy within 15 meters');
  };

  const toggleSave = (id: string, name: string) => {
    const next = !savedIds[id];
    setSavedIds(prev => ({ ...prev, [id]: next }));
    triggerToast(next ? `Saved ${name} to Bookmarks` : `Removed ${name}`);
  };

  const handleShare = (name: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/profile/${id}`);
      triggerToast(`Copied ${name}'s verified link!`);
    }
  };

  // Filtered Professionals List
  const filteredPros = PROFESSIONALS.filter(pro => {
    if (filterAvailableNow && pro.liveStatus !== 'available_now') return false;
    if (filterTopRated && pro.trustScore < 98) return false;
    if (filterRemote && !pro.isRemoteAvailable) return false;
    if (filterOnSite && !pro.isOnsiteAvailable) return false;
    if (filterHighTrust && pro.trustScore < 99) return false;
    return true;
  });

  return (
    <div className="w-full bg-white text-[#111827]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#111827] text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 0: HERO SECTION & POPULAR CATEGORIES (DEFAULT HOMEPAGE VIEW)          */}
      {/* ========================================================================= */}
      {currentStep === 0 && (
        <>
          {/* SECTION 1: HERO */}
          <section className="pt-16 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Subtle Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF7ED] text-[#F97316] text-xs font-bold border border-orange-200/60 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span>India’s Verified Opportunity Marketplace</span>
            </div>

            {/* Huge Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#111827] leading-[1.1]">
              One Verified Identity.{' '}
              <span className="text-[#F97316]">Infinite Opportunities.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
              Discover verified professionals, creators, freelancers and businesses around you.
            </p>

            {/* Large Rounded (16px) Search Bar */}
            <div className="mt-10 max-w-3xl mx-auto">
              <div className="p-2 sm:p-2.5 rounded-2xl bg-white border border-[#E5E7EB] shadow-search-bar flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0 hover:border-gray-300 transition-all">
                
                <div className="flex-1 px-4 py-2.5 text-left flex items-center gap-3">
                  <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleStartSearch()}
                    placeholder="What are you looking for? (e.g. Wedding Photographer, React Developer)"
                    className="w-full bg-transparent text-sm font-semibold text-[#111827] placeholder:text-gray-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 px-2">
                  <button
                    onClick={() => triggerToast("Voice search listening...")}
                    className="p-2.5 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                    title="Voice Search"
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleDetectGps}
                    className="p-2.5 text-gray-400 hover:text-[#F97316] rounded-xl hover:bg-orange-50 transition-colors"
                    title="Use Current Location"
                  >
                    <Crosshair className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleStartSearch()}
                    className="btn-orange px-6 py-3 text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

            {/* Below Search: Trending Searches */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="font-bold text-[#111827]">Trending:</span>
              {TRENDING_SEARCHES.map((term, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStartSearch(term)}
                  className="px-3.5 py-1.5 rounded-full bg-gray-50 hover:bg-[#FFF7ED] border border-[#E5E7EB] hover:border-orange-200 text-[#111827] hover:text-[#F97316] transition-all font-semibold"
                >
                  {term}
                </button>
              ))}
            </div>

          </section>

          {/* SECTION 2: POPULAR CATEGORIES (15 PREMIUM ROUNDED 16PX CARDS) */}
          <section className="py-16 bg-white border-t border-[#E5E7EB]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
                    Popular Categories
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6B7280] mt-1 font-medium">
                    Verified specialists ready for instant booking & bank escrow protection
                  </p>
                </div>

                <button
                  onClick={() => handleStartSearch('All Services')}
                  className="text-xs font-bold text-[#F97316] hover:text-[#EA580C] flex items-center gap-1 transition-colors"
                >
                  <span>View All 15+</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 15 Category Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {POPULAR_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleStartSearch(cat.name)}
                    className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-soft shadow-soft-hover text-left flex flex-col justify-between h-36 group transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="text-[10px] font-bold text-[#6B7280] bg-gray-50 px-2 py-0.5 rounded-full border border-[#E5E7EB]">
                        {cat.count}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#111827] group-hover:text-[#F97316] transition-colors leading-tight">
                        {cat.name}
                      </h3>
                      <span className="text-[10px] text-[#6B7280] font-medium block mt-0.5">Explore talent →</span>
                    </div>
                  </button>
                ))}
              </div>

            </div>
          </section>
        </>
      )}

      {/* ========================================================================= */}
      {/* 20-SECOND GUIDED SEARCH FLOW (When User Searches or Clicks a Category)    */}
      {/* ========================================================================= */}
      {currentStep > 0 && (
        <section className="py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh]">
          
          {/* Header & Step Navigation */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-8">
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              className="flex items-center gap-1.5 text-xs font-bold text-[#111827] hover:text-[#F97316] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {/* Stepper Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#6B7280]">
              <span className={currentStep >= 1 ? 'text-[#F97316]' : ''}>1. Location</span>
              <span>›</span>
              <span className={currentStep >= 2 ? 'text-[#F97316]' : ''}>2. Filters</span>
              <span>›</span>
              <span className={currentStep >= 3 ? 'text-[#F97316]' : ''}>3. Results</span>
              <span>›</span>
              <span className={currentStep >= 5 ? 'text-[#F97316]' : ''}>4. Book & Escrow</span>
            </div>

            <button
              onClick={() => setCurrentStep(0)}
              className="text-xs font-bold text-[#6B7280] hover:text-[#111827]"
            >
              Close ✕
            </button>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* SCREEN 1: LOCATION SCREEN & RADIUS SELECTOR (Google Places)         */}
          {/* ------------------------------------------------------------------- */}
          {currentStep === 1 && (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
                  STEP 1 OF 3 • LOCATION
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
                  Where do you need {selectedCategoryName}?
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280]">
                  Set your location to match nearby verified specialists with live GPS coordinates.
                </p>
              </div>

              {/* Google Places Autocomplete Input Box */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-soft space-y-4">
                <div className="relative flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 absolute left-3.5" />
                  <input
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    placeholder="Search city, area, or pin-code..."
                    className="w-full pl-11 pr-24 py-3 rounded-xl bg-gray-50 border border-[#E5E7EB] text-xs sm:text-sm font-semibold text-[#111827] focus:outline-none focus:border-[#F97316]"
                  />
                  <button
                    onClick={handleDetectGps}
                    className="absolute right-2 px-3 py-1.5 rounded-lg bg-[#FFF7ED] hover:bg-orange-100 text-[#F97316] text-[11px] font-bold transition-colors flex items-center gap-1"
                  >
                    <Crosshair className="w-3.5 h-3.5" />
                    <span>GPS</span>
                  </button>
                </div>

                {/* Radius Selector (5 KM, 10 KM, 20 KM, 50 KM) */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#111827]">
                    Search Radius:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['5 KM', '10 KM', '20 KM', '50 KM'] as const).map((rad) => (
                      <button
                        key={rad}
                        onClick={() => setSelectedRadius(rad)}
                        className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                          selectedRadius === rad
                            ? 'bg-[#111827] text-white shadow-xs'
                            : 'bg-gray-50 text-[#111827] border border-[#E5E7EB] hover:bg-gray-100'
                        }`}
                      >
                        {rad}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Saved / Recent Locations */}
                <div className="pt-2 border-t border-gray-100 space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">
                    Recent Hubs:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['Hitech City, Hyderabad', 'Koramangala, Bengaluru', 'CyberHub, Gurugram', 'Entire India (Remote)'].map((hub, idx) => (
                      <button
                        key={idx}
                        onClick={() => setLocationInput(hub)}
                        className="px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-[#FFF7ED] text-[#6B7280] hover:text-[#F97316] font-medium border border-[#E5E7EB]"
                      >
                        {hub}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full btn-orange py-3.5 text-xs font-bold shadow-sm"
              >
                Apply Location & Choose Filters →
              </button>
            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* SCREEN 2: FILTER SCREEN (HORIZONTAL CHIPS ONLY, NO DROPDOWNS)        */}
          {/* ------------------------------------------------------------------- */}
          {currentStep === 2 && (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
                  STEP 2 OF 3 • FILTERS
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
                  Refine Your Preferences
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280]">
                  Select the attributes you care about (pure horizontal chips, zero complex forms).
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-soft space-y-6 text-left">
                
                {/* Trust & Availability Chips */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#111827] block">Verification & Status:</span>
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={() => setFilterVerified(!filterVerified)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                        filterVerified ? 'bg-[#111827] text-white border-[#111827]' : 'bg-gray-50 text-[#111827] border-[#E5E7EB]'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                      <span>DigiLocker Aadhaar KYC Verified</span>
                    </button>

                    <button
                      onClick={() => setFilterAvailableNow(!filterAvailableNow)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                        filterAvailableNow ? 'bg-[#F97316] text-white border-[#F97316]' : 'bg-gray-50 text-[#111827] border-[#E5E7EB]'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Available Right Now</span>
                    </button>

                    <button
                      onClick={() => setFilterTopRated(!filterTopRated)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                        filterTopRated ? 'bg-[#111827] text-white border-[#111827]' : 'bg-gray-50 text-[#111827] border-[#E5E7EB]'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>Top 1% Rated (4.9★+)</span>
                    </button>
                  </div>
                </div>

                {/* Delivery Mode Chips */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#111827] block">Delivery Preference:</span>
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={() => setFilterRemote(!filterRemote)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                        filterRemote ? 'bg-[#111827] text-white border-[#111827]' : 'bg-gray-50 text-[#111827] border-[#E5E7EB]'
                      }`}
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Remote Delivery</span>
                    </button>

                    <button
                      onClick={() => setFilterOnSite(!filterOnSite)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                        filterOnSite ? 'bg-[#111827] text-white border-[#111827]' : 'bg-gray-50 text-[#111827] border-[#E5E7EB]'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>On-Site / Local Visit</span>
                    </button>

                    <button
                      onClick={() => setFilterHighTrust(!filterHighTrust)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                        filterHighTrust ? 'bg-[#111827] text-white border-[#111827]' : 'bg-gray-50 text-[#111827] border-[#E5E7EB]'
                      }`}
                    >
                      <Award className="w-3.5 h-3.5 text-[#F97316]" />
                      <span>Trust Score 99%+</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* View Results Button */}
              <button
                onClick={() => setCurrentStep(3)}
                className="w-full btn-orange py-3.5 text-xs font-bold shadow-sm"
              >
                View Verified Professionals ({filteredPros.length}) →
              </button>
            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* SCREEN 3: RESULT PAGE (PREMIUM 16PX PROFESSIONAL CARDS)             */}
          {/* ------------------------------------------------------------------- */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight">
                    Verified {selectedCategoryName} Specialists
                  </h2>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    Showing {filteredPros.length} professionals in {locationInput.split(',')[0]} (within {selectedRadius})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-3.5 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-[#E5E7EB] text-xs font-bold text-[#111827]"
                  >
                    Adjust Filters
                  </button>
                </div>
              </div>

              {/* Professional 16px Rounded Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPros.map((pro) => {
                  const isSaved = !!savedIds[pro.id];

                  return (
                    <div
                      key={pro.id}
                      className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden shadow-soft shadow-soft-hover flex flex-col justify-between transition-all"
                    >
                      {/* Large Photo Header */}
                      <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={pro.portfolio[0]?.imageUrl || pro.coverUrl || pro.avatarUrl}
                          alt={pro.name}
                          className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                          onClick={() => {
                            setActiveProfessional(pro);
                            setCurrentStep(4);
                          }}
                        />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                          <span className="pointer-events-auto px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-[#111827] shadow-2xs flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                            {pro.liveStatus === 'available_now' ? 'Available Now' : 'Tomorrow'}
                          </span>

                          <div className="pointer-events-auto flex items-center gap-1.5">
                            <button
                              onClick={() => handleShare(pro.name, pro.id)}
                              className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#111827] flex items-center justify-center shadow-2xs transition-transform hover:scale-110"
                              title="Share"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => toggleSave(pro.id, pro.name)}
                              className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#111827] flex items-center justify-center shadow-2xs transition-transform hover:scale-110"
                              title="Save"
                            >
                              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                            </button>
                          </div>
                        </div>

                        {/* Trust Score */}
                        <div className="absolute bottom-3 left-3 pointer-events-none">
                          <span className="px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-bold text-white">
                            Trust Score: {pro.trustScore}%
                          </span>
                        </div>
                      </div>

                      {/* Card Content Body */}
                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Name + Verified Badge + Rating */}
                          <div className="flex items-center justify-between">
                            <h3 
                              onClick={() => {
                                setActiveProfessional(pro);
                                setCurrentStep(4);
                              }}
                              className="font-bold text-sm text-[#111827] flex items-center gap-1 hover:underline cursor-pointer"
                            >
                              {pro.name}
                              <ShieldCheck className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                            </h3>

                            <div className="flex items-center gap-1 text-xs font-bold text-[#111827]">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span>4.98</span>
                              <span className="text-[#6B7280] font-normal">({pro.completedProjectsCount || 42})</span>
                            </div>
                          </div>

                          <p className="text-xs text-[#6B7280] font-medium truncate mt-0.5">{pro.headline}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{pro.location} • {pro.cityArea} ({pro.distanceKm || 1.8} km)</p>
                        </div>

                        {/* Starting Price & Action Buttons */}
                        <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider block">Starting at</span>
                            <span className="text-sm font-black text-[#111827]">₹{pro.hourlyRateINR.toLocaleString()}/hr</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setActiveProfessional(pro);
                                setCurrentStep(4);
                              }}
                              className="px-3 py-1.5 rounded-xl border border-[#E5E7EB] hover:bg-gray-50 text-xs font-bold text-[#111827]"
                            >
                              Profile
                            </button>
                            <button
                              onClick={() => {
                                setActiveProfessional(pro);
                                setCurrentStep(5);
                              }}
                              className="btn-orange px-4 py-1.5 text-xs font-bold shadow-xs"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* SCREEN 4: FULL PROFILE DRAWER / VIEW                                */}
          {/* ------------------------------------------------------------------- */}
          {currentStep === 4 && activeProfessional && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
              
              {/* Profile Card */}
              <div className="p-8 rounded-2xl bg-white border border-[#E5E7EB] shadow-soft space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 border-2 border-white shadow-sm flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={activeProfessional.avatarUrl} alt={activeProfessional.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-[#111827] flex items-center gap-1.5">
                        {activeProfessional.name}
                        <ShieldCheck className="w-5 h-5 text-[#22C55E]" />
                      </h2>
                      <p className="text-xs font-medium text-[#6B7280] mt-0.5">{activeProfessional.headline}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        <span className="text-[#F97316] font-bold bg-[#FFF7ED] px-2 py-0.5 rounded-full">
                          Trust Score {activeProfessional.trustScore}%
                        </span>
                        <span className="font-bold text-[#111827]">★ 4.98 ({activeProfessional.completedProjectsCount || 84} projects)</span>
                        <span className="text-[#6B7280]">• Response: {activeProfessional.responseTime}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentStep(5)}
                    className="btn-orange px-6 py-3 text-xs font-bold shadow-sm"
                  >
                    Configure Booking →
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-[#111827] leading-relaxed font-normal pt-3 border-t border-[#E5E7EB]">
                  {activeProfessional.bio}
                </p>

                {/* Skills */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Verified Skills & Tools</span>
                  <div className="flex flex-wrap gap-2">
                    {activeProfessional.skills.map((s, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-xl bg-gray-50 border border-[#E5E7EB] text-xs font-semibold text-[#111827]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Portfolio Works Gallery */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-[#111827]">Verified Portfolio Works</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeProfessional.portfolio.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-soft space-y-2">
                      <div className="aspect-[16/9] rounded-xl overflow-hidden bg-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-bold text-sm text-[#111827]">{item.title}</h4>
                      <p className="text-xs text-[#6B7280]">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* SCREEN 5: BOOKING FLOW (PACKAGE SELECTION, DATE, TIME)              */}
          {/* ------------------------------------------------------------------- */}
          {currentStep === 5 && activeProfessional && (
            <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
                  STEP 3 OF 3 • BOOKING
                </span>
                <h2 className="text-2xl font-black text-[#111827] tracking-tight">
                  Configure Engagement with {activeProfessional.name}
                </h2>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-soft space-y-4 text-left">
                
                {/* Package Type Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#111827] mb-2">Select Package Type:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Hourly', 'Fixed Project', 'Monthly'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setPackageType(t)}
                        className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                          packageType === t 
                            ? 'bg-[#111827] text-white shadow-xs' 
                            : 'bg-gray-50 text-[#111827] border border-[#E5E7EB]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111827] mb-1">Target Date:</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full p-3 rounded-xl bg-gray-50 border border-[#E5E7EB] text-xs font-semibold text-[#111827] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111827] mb-1">Time Slot:</label>
                  <input
                    type="text"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full p-3 rounded-xl bg-gray-50 border border-[#E5E7EB] text-xs font-semibold text-[#111827] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111827] mb-1">Project Description & Scope:</label>
                  <textarea
                    rows={3}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Briefly describe what you need delivered..."
                    className="w-full p-3 rounded-xl bg-gray-50 border border-[#E5E7EB] text-xs font-semibold text-[#111827] focus:outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(6)}
                className="w-full btn-orange py-3.5 text-xs font-bold shadow-sm flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Continue to Escrow Payment →</span>
              </button>
            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* SCREEN 6: ESCROW PAYMENT & OTP SIMULATION                           */}
          {/* ------------------------------------------------------------------- */}
          {currentStep === 6 && activeProfessional && (
            <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-200 text-center">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider">
                  100% BANK ESCROW PROTECTION
                </span>
                <h2 className="text-2xl font-black text-[#111827] tracking-tight">
                  Secure Escrow Deposit
                </h2>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-soft text-left space-y-4">
                
                {/* Payment Method Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#111827] mb-2">Payment Gateway Method:</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['UPI', 'Razorpay', 'Cards', 'Net Banking'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setPaymentMethod(m)}
                        className={`py-2 rounded-xl text-[11px] font-bold transition-all ${
                          paymentMethod === m 
                            ? 'bg-[#F97316] text-white' 
                            : 'bg-gray-50 text-[#111827] border border-[#E5E7EB]'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Contract Fee (Held in Trustee Escrow)</span>
                    <span className="font-bold text-[#111827]">₹{(activeProfessional.hourlyRateINR * 4).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">GST Invoice (18%)</span>
                    <span className="font-bold text-[#111827]">₹{Math.round(activeProfessional.hourlyRateINR * 4 * 0.18).toLocaleString()}</span>
                  </div>
                </div>

                {/* OTP Box */}
                <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-center space-y-1">
                  <span className="text-[10px] font-bold text-orange-900 uppercase tracking-wider">
                    Your Cryptographic Completion OTP
                  </span>
                  <div className="text-3xl font-black tracking-widest text-[#F97316] font-mono">
                    {generatedOTP}
                  </div>
                  <p className="text-[11px] text-[#6B7280]">
                    Share this OTP with {activeProfessional.name} ONLY after work is delivered and verified.
                  </p>
                </div>
              </div>

              {!isCompleted ? (
                <button
                  onClick={() => {
                    setIsCompleted(true);
                    triggerToast(`Milestone approved! ₹${(activeProfessional.hourlyRateINR * 4).toLocaleString()} disbursed.`);
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simulate Milestone Release (Approve & Pay)</span>
                </button>
              ) : (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold space-y-3">
                  <p className="text-sm">🎉 Booking confirmed & payment released to {activeProfessional.name}!</p>
                  <button
                    onClick={() => setCurrentStep(0)}
                    className="px-6 py-2.5 rounded-xl bg-[#111827] text-white text-xs font-bold"
                  >
                    Return to Homepage
                  </button>
                </div>
              )}

            </div>
          )}

        </section>
      )}

    </div>
  );
}
