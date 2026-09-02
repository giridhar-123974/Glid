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
  Briefcase
} from 'lucide-react';
import { PROFESSIONALS } from '@/data/mockData';
import { Professional, Review } from '@/types';

const POPULAR_CHIPS = [
  'Photography',
  'Website Development',
  'Video Editing',
  'Tutoring',
  'Graphic Design',
  'Electrician',
  'Car Rental',
  'Drone Operator',
  'Wedding Planner',
  'Home Cleaning'
];

const ROTATING_SUGGESTIONS = [
  'Wedding Photographer',
  'React Developer',
  'Video Editor',
  'Electrician',
  'Home Tutor',
  'Graphic Designer',
  'Car Rental',
  'AI Automation Expert'
];

export default function GuidedMarketplaceFlow() {
  // Step State (0 = Hero, 1 = Category, 2 = Location, 3 = Filters, 4 = Results, 5 = Profile, 6 = Booking, 7 = Escrow)
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Website Development');
  const [selectedLocation, setSelectedLocation] = useState('Hitech City, Hyderabad');
  
  // Filter Chips State (Airbnb-style)
  const [filterVerified, setFilterVerified] = useState(true);
  const [filterAvailableToday, setFilterAvailableToday] = useState(false);
  const [filterTopRating, setFilterTopRating] = useState(false);
  const [filterRemote, setFilterRemote] = useState(false);
  const [filterNearby, setFilterNearby] = useState(false);

  // Profile & Booking Selection
  const [activePro, setActivePro] = useState<Professional | null>(null);
  const [bookingType, setBookingType] = useState<'hourly' | 'daily' | 'project' | 'package'>('project');
  const [bookingDate, setBookingDate] = useState('2026-09-02');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [bookingNotes, setBookingNotes] = useState('');
  
  // Escrow & OTP State
  const [escrowStage, setEscrowStage] = useState<'deposited' | 'in_progress' | 'completed'>('deposited');
  const [generatedOTP, setGeneratedOTP] = useState('8492');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Rotating search suggestion
  const [suggestionIdx, setSuggestionIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setSuggestionIdx((prev) => (prev + 1) % ROTATING_SUGGESTIONS.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStartSearch = (queryText?: string) => {
    const finalQ = queryText || searchQuery || ROTATING_SUGGESTIONS[suggestionIdx];
    setSearchQuery(finalQ);
    setSelectedCategory(finalQ);
    setCurrentStep(1);
  };

  const toggleSave = (id: string, name: string) => {
    const next = !savedIds[id];
    setSavedIds(prev => ({ ...prev, [id]: next }));
    triggerToast(next ? `Saved ${name} to Wishlist` : `Removed ${name}`);
  };

  const handleShare = (name: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/profile/${id}`);
      triggerToast(`Copied verified link for ${name}!`);
    }
  };

  // Filtered Professionals List
  const filteredProfessionals = PROFESSIONALS.filter(pro => {
    if (filterAvailableToday && pro.liveStatus !== 'available_now') return false;
    if (filterTopRating && pro.trustScore < 98) return false;
    if (filterRemote && !pro.isRemoteAvailable) return false;
    return true;
  });

  return (
    <div className="w-full bg-white text-gray-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 0: HERO & LARGE SEARCH BAR & POPULAR SEARCHES CHIPS                   */}
      {/* ========================================================================= */}
      {currentStep === 0 && (
        <section className="pt-16 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Subtle Verified Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-700 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>One Verified Identity. Infinite Opportunities.</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 leading-[1.1]">
            One Verified Identity.{' '}
            <span className="text-[#F97316]">Infinite Opportunities.</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mt-4 font-normal leading-relaxed">
            Discover verified professionals, businesses, creators and services near you through one intelligent trusted platform.
          </p>

          {/* Large Floating Search Bar */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="p-2 sm:p-2.5 rounded-3xl sm:rounded-full bg-white border border-gray-200 shadow-search flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0 hover:border-gray-300 transition-all">
              
              <div className="flex-1 px-5 py-3 text-left flex items-center gap-3">
                <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleStartSearch()}
                  placeholder={`What are you looking for? (e.g. ${ROTATING_SUGGESTIONS[suggestionIdx]})`}
                  className="w-full bg-transparent text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 px-3">
                <button
                  onClick={() => triggerToast("Voice search listening...")}
                  className="p-2.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50"
                  title="Voice Search"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleStartSearch()}
                  className="px-6 py-3 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs shadow-sm hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

          {/* SECTION 3: Popular Searches Chips */}
          <div className="mt-8 space-y-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              Popular Searches
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {POPULAR_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStartSearch(chip)}
                  className="px-4 py-2 rounded-full bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 text-xs font-semibold text-gray-700 hover:text-[#EA580C] transition-all"
                >
                  {chip}
                </button>
              ))}
              <button
                onClick={() => handleStartSearch('All Services')}
                className="px-4 py-2 rounded-full text-xs font-bold text-[#F97316] hover:underline"
              >
                View All →
              </button>
            </div>
          </div>

        </section>
      )}

      {/* ========================================================================= */}
      {/* GUIDED 7-STEP FLOW CONTAINER (When Searching)                             */}
      {/* ========================================================================= */}
      {currentStep > 0 && (
        <section className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb / Step Indicator Header */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-8">
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {/* Stepper Dots */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
              <span className={currentStep >= 1 ? 'text-[#F97316] font-black' : ''}>1. Category</span>
              <span>›</span>
              <span className={currentStep >= 2 ? 'text-[#F97316] font-black' : ''}>2. Location</span>
              <span>›</span>
              <span className={currentStep >= 3 ? 'text-[#F97316] font-black' : ''}>3. Filters</span>
              <span>›</span>
              <span className={currentStep >= 4 ? 'text-[#F97316] font-black' : ''}>4. Results</span>
            </div>

            <button
              onClick={() => setCurrentStep(0)}
              className="text-xs font-bold text-gray-400 hover:text-gray-600"
            >
              Reset
            </button>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* STEP 1: SELECT CATEGORY                                             */}
          {/* ------------------------------------------------------------------- */}
          {currentStep === 1 && (
            <div className="max-w-xl mx-auto text-center space-y-6 py-6 animate-in fade-in duration-200">
              <span className="text-xs font-black text-[#F97316] uppercase tracking-wider">
                STEP 1 OF 4
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Selected Category
              </h2>
              <p className="text-sm text-gray-500">
                You are searching for specialists in:
              </p>

              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 text-left space-y-2">
                <div className="text-xs font-bold text-gray-400 uppercase">Specialization</div>
                <div className="text-xl font-black text-gray-900">{selectedCategory}</div>
                <p className="text-xs text-gray-500">
                  Matches verified architects, engineers, and freelancers across India with DigiLocker KYC.
                </p>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="w-full py-3.5 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm shadow-sm transition-all"
              >
                Continue to Location →
              </button>
            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* STEP 2: CHOOSE LOCATION                                             */}
          {/* ------------------------------------------------------------------- */}
          {currentStep === 2 && (
            <div className="max-w-xl mx-auto text-center space-y-6 py-6 animate-in fade-in duration-200">
              <span className="text-xs font-black text-[#F97316] uppercase tracking-wider">
                STEP 2 OF 4
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Choose Location
              </h2>
              <p className="text-sm text-gray-500">
                Find verified talent in your city or pin-code:
              </p>

              <div className="space-y-3 text-left">
                {[
                  { name: 'Hitech City, Hyderabad', tag: 'Current GPS Location' },
                  { name: 'Koramangala, Bengaluru', tag: 'Tech Hub' },
                  { name: 'CyberHub, Gurugram (Delhi NCR)', tag: 'Corporate Hub' },
                  { name: 'Bandra BKC, Mumbai', tag: 'Commercial Hub' },
                  { name: 'Entire India (Remote Only)', tag: 'Pan-India Delivery' }
                ].map((loc, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedLocation(loc.name);
                      setCurrentStep(3);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedLocation === loc.name 
                        ? 'border-[#F97316] bg-orange-50/50 shadow-2xs' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-gray-900">{loc.name}</div>
                      <div className="text-xs text-gray-400">{loc.tag}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentStep(3)}
                className="w-full py-3.5 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm shadow-sm transition-all"
              >
                Continue with {selectedLocation.split(',')[0]} →
              </button>
            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* STEP 3: SELECT FILTERS (Airbnb-Style Chips Only)                     */}
          {/* ------------------------------------------------------------------- */}
          {currentStep === 3 && (
            <div className="max-w-2xl mx-auto text-center space-y-6 py-6 animate-in fade-in duration-200">
              <span className="text-xs font-black text-[#F97316] uppercase tracking-wider">
                STEP 3 OF 4
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Filter by Preference
              </h2>
              <p className="text-sm text-gray-500">
                Tap chips to refine verified specialists without complex forms:
              </p>

              {/* Horizontal Chips */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setFilterVerified(!filterVerified)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
                    filterVerified 
                      ? 'bg-gray-900 text-white border-gray-900' 
                      : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                  DigiLocker KYC Verified
                </button>

                <button
                  onClick={() => setFilterAvailableToday(!filterAvailableToday)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
                    filterAvailableToday 
                      ? 'bg-[#F97316] text-white border-[#F97316]' 
                      : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Available Today
                </button>

                <button
                  onClick={() => setFilterTopRating(!filterTopRating)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
                    filterTopRating 
                      ? 'bg-gray-900 text-white border-gray-900' 
                      : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  Top 1% Rated (98%+ Trust)
                </button>

                <button
                  onClick={() => setFilterRemote(!filterRemote)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
                    filterRemote 
                      ? 'bg-gray-900 text-white border-gray-900' 
                      : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  Remote Delivery
                </button>

                <button
                  onClick={() => setFilterNearby(!filterNearby)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
                    filterNearby 
                      ? 'bg-gray-900 text-white border-gray-900' 
                      : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Within 5 km
                </button>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setCurrentStep(4)}
                  className="w-full max-w-sm py-3.5 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm shadow-sm transition-all"
                >
                  Show Verified Results ({filteredProfessionals.length}) →
                </button>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* STEP 4: RESULTS (Airbnb-Grade Cards)                                */}
          {/* ------------------------------------------------------------------- */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                    Verified Specialists in {selectedLocation.split(',')[0]}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Showing {filteredProfessionals.length} top-ranked professionals matching "{selectedCategory}"
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-3.5 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-bold text-gray-700"
                  >
                    Edit Filters
                  </button>
                </div>
              </div>

              {/* Grid of Airbnb-Style Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProfessionals.map((pro) => {
                  const isSaved = !!savedIds[pro.id];

                  return (
                    <div key={pro.id} className="group flex flex-col justify-between">
                      
                      {/* Large Photo */}
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={pro.portfolio[0]?.imageUrl || pro.coverUrl || pro.avatarUrl}
                          alt={pro.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                          onClick={() => {
                            setActivePro(pro);
                            setCurrentStep(5);
                          }}
                        />

                        {/* Top Pills */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                          <span className="pointer-events-auto px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-gray-900 shadow-2xs flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {pro.liveStatus === 'available_now' ? 'Available Today' : 'Tomorrow'}
                          </span>

                          <div className="pointer-events-auto flex items-center gap-1.5">
                            <button
                              onClick={() => handleShare(pro.name, pro.id)}
                              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-gray-700 flex items-center justify-center transition-transform hover:scale-110 shadow-2xs"
                              title="Share"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => toggleSave(pro.id, pro.name)}
                              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-gray-700 flex items-center justify-center transition-transform hover:scale-110 shadow-2xs"
                              title="Save"
                            >
                              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                            </button>
                          </div>
                        </div>

                        {/* Trust Score */}
                        <div className="absolute bottom-3 left-3 pointer-events-none">
                          <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-white">
                            Trust Score {pro.trustScore}%
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 
                            onClick={() => {
                              setActivePro(pro);
                              setCurrentStep(5);
                            }}
                            className="font-bold text-gray-900 text-sm flex items-center gap-1 cursor-pointer hover:underline"
                          >
                            {pro.name}
                            <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" />
                          </h3>
                          <div className="flex items-center gap-1 text-xs font-bold text-gray-900">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>4.98</span>
                            <span className="text-gray-400 font-normal">({pro.completedProjectsCount || 42})</span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-500 truncate font-medium">{pro.headline}</p>
                        <p className="text-xs text-gray-400 font-normal">{pro.location} • {pro.cityArea}</p>

                        <div className="pt-2 flex items-center justify-between">
                          <div>
                            <span className="text-sm font-black text-gray-900">₹{pro.hourlyRateINR.toLocaleString()}</span>
                            <span className="text-xs text-gray-500 font-normal"> / hr</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setActivePro(pro);
                                setCurrentStep(5);
                              }}
                              className="px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold transition-all"
                            >
                              Profile
                            </button>
                            <button
                              onClick={() => {
                                setActivePro(pro);
                                setCurrentStep(6);
                              }}
                              className="px-3.5 py-1.5 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1"
                            >
                              <Lock className="w-3 h-3" />
                              <span>Book Now</span>
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
          {/* STEP 5: FULL PROFILE VIEW                                           */}
          {/* ------------------------------------------------------------------- */}
          {currentStep === 5 && activePro && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
              
              {/* Profile Top Card */}
              <div className="p-8 rounded-3xl bg-gray-50/70 border border-gray-200 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-200 border-2 border-white shadow-sm flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={activePro.avatarUrl} alt={activePro.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 flex items-center gap-1.5">
                        {activePro.name}
                        <ShieldCheck className="w-5 h-5 text-[#16A34A]" />
                      </h2>
                      <p className="text-xs font-semibold text-gray-500 mt-0.5">{activePro.headline}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        <span className="text-[#EA580C] font-bold bg-orange-50 px-2 py-0.5 rounded-full">
                          Trust Score {activePro.trustScore}%
                        </span>
                        <span className="font-bold text-gray-700">★ 4.98 ({activePro.completedProjectsCount || 84} completed)</span>
                        <span className="text-gray-400">• {activePro.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black text-gray-900">₹{activePro.hourlyRateINR.toLocaleString()} <span className="text-xs text-gray-500 font-normal">/hr</span></div>
                    <button
                      onClick={() => setCurrentStep(6)}
                      className="mt-2 px-6 py-2.5 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs shadow-sm"
                    >
                      Book with Escrow
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed font-normal pt-2 border-t border-gray-200">
                  {activePro.bio}
                </p>

                {/* Skills */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Verified Skills & Tools</span>
                  <div className="flex flex-wrap gap-2">
                    {activePro.skills.map((s, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-gray-800">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Portfolio Works */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-gray-900 tracking-tight">Verified Deliverables & Portfolio</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activePro.portfolio.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white border border-gray-200 space-y-2">
                      <div className="aspect-[16/9] rounded-xl overflow-hidden bg-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-bold text-sm text-gray-900">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* STEP 6: BOOKING DETAILS (Hourly / Daily / Project)                  */}
          {/* ------------------------------------------------------------------- */}
          {currentStep === 6 && activePro && (
            <div className="max-w-xl mx-auto space-y-6 py-6 animate-in fade-in duration-200">
              <span className="text-xs font-black text-[#F97316] uppercase tracking-wider">
                STEP 6 OF 7 • BOOKING
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Configure Booking for {activePro.name}
              </h2>

              {/* Booking Type Options */}
              <div className="grid grid-cols-4 gap-2">
                {(['hourly', 'daily', 'project', 'package'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setBookingType(t)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase transition-all ${
                      bookingType === t 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-50 text-gray-700 border border-gray-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Select Date</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Scope & Notes</label>
                  <textarea
                    rows={3}
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    placeholder="Briefly describe what you need delivered..."
                    className="w-full p-3 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(7)}
                className="w-full py-3.5 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Continue to Bank Escrow Payment →</span>
              </button>
            </div>
          )}

          {/* ------------------------------------------------------------------- */}
          {/* STEP 7: BANK ESCROW & OTP VERIFICATION                              */}
          {/* ------------------------------------------------------------------- */}
          {currentStep === 7 && activePro && (
            <div className="max-w-xl mx-auto space-y-6 py-6 animate-in fade-in duration-200 text-center">
              <span className="text-xs font-black text-[#16A34A] uppercase tracking-wider">
                STEP 7 OF 7 • 100% ESCROW PROTECTION
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Escrow & OTP Release
              </h2>

              <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-xs font-bold text-gray-600">Escrow Contract ID</span>
                  <span className="font-mono text-xs font-bold text-gray-900">#GLID-ESC-9082</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-xs font-bold text-gray-600">Professional</span>
                  <span className="text-xs font-bold text-gray-900">{activePro.name}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-xs font-bold text-gray-600">Deposit Amount (Held in RBI Escrow)</span>
                  <span className="text-base font-black text-gray-900 font-mono">₹{activePro.hourlyRateINR * 4}</span>
                </div>

                {/* OTP Box */}
                <div className="p-4 rounded-2xl bg-white border border-gray-200 text-center space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Your Cryptographic Completion OTP
                  </span>
                  <div className="text-3xl font-black tracking-widest text-[#F97316] font-mono">
                    {generatedOTP}
                  </div>
                  <p className="text-[11px] text-gray-500 font-normal">
                    Share this OTP with {activePro.name} ONLY after work is delivered and approved.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                {!isOtpVerified ? (
                  <button
                    onClick={() => {
                      setIsOtpVerified(true);
                      triggerToast("Milestone approved! ₹" + (activePro.hourlyRateINR * 4) + " disbursed.");
                    }}
                    className="w-full py-3.5 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Simulate Delivery Approval (Release Escrow)</span>
                  </button>
                ) : (
                  <div className="w-full p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold space-y-2">
                    <p>🎉 Payment successfully released to {activePro.name}!</p>
                    <button
                      onClick={() => setCurrentStep(0)}
                      className="px-4 py-2 rounded-full bg-emerald-700 text-white text-xs font-bold"
                    >
                      Return to Home
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

        </section>
      )}

    </div>
  );
}
