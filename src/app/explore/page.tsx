'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Sparkles, 
  Map as MapIcon, 
  List, 
  Zap, 
  ArrowRight, 
  Navigation, 
  Lock, 
  Heart, 
  X,
  Mic,
  Crosshair
} from 'lucide-react';
import { PROFESSIONALS } from '@/data/mockData';
import { Professional } from '@/types';
import GoogleMapsMarketplaceEngine, { RadiusOption } from '@/components/maps/GoogleMapsMarketplaceEngine';
import UberStyleLiveTrackerModal from '@/components/maps/UberStyleLiveTrackerModal';
import PremiumBookingEscrowModal from '@/components/payments/PremiumBookingEscrowModal';

// Category Quick Filters
const QUICK_CATEGORIES = [
  { id: 'all', label: 'All Services' },
  { id: 'tech', label: 'Technology' },
  { id: 'creative', label: 'Photography & Media' },
  { id: 'design', label: 'Design & UI/UX' },
  { id: 'home_services', label: 'Home Services' },
  { id: 'business', label: 'Business & Legal' }
];

function ExploreContent() {
  const searchParams = useSearchParams();

  const urlQuery = searchParams.get('q') || '';
  const urlCategory = searchParams.get('category') || 'all';
  const urlCity = searchParams.get('city') || 'Hitech City, Hyderabad';

  const [searchQuery, setSearchQuery] = useState(urlQuery === 'all' ? '' : urlQuery);
  const [userLocationName, setUserLocationName] = useState(urlCity);
  const [selectedRadius, setSelectedRadius] = useState<RadiusOption>('10 km');
  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  
  // Selection states
  const [selectedPro, setSelectedPro] = useState<Professional | null>(PROFESSIONALS[0]);
  const [savedFavorites, setSavedFavorites] = useState<Record<string, boolean>>({});

  // Modals
  const [proForBooking, setProForBooking] = useState<Professional | null>(null);
  const [proForLiveTracking, setProForLiveTracking] = useState<Professional | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');

  // Convert radius string to km number
  const radiusKm = useMemo(() => {
    switch (selectedRadius) {
      case '2 km': return 2;
      case '5 km': return 5;
      case '10 km': return 10;
      case '20 km': return 20;
      case '50 km': return 50;
      default: return 999;
    }
  }, [selectedRadius]);

  // Dynamic Filtering Logic
  const filteredProfessionals = useMemo(() => {
    return PROFESSIONALS.filter((pro) => {
      // 1. Text Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = pro.name.toLowerCase().includes(q);
        const matchesHeadline = pro.headline.toLowerCase().includes(q);
        const matchesSkills = pro.skills.some(s => s.toLowerCase().includes(q));
        const matchesArea = pro.cityArea.toLowerCase().includes(q) || pro.location.toLowerCase().includes(q);
        const matchesSubcat = pro.subcategory.toLowerCase().includes(q);
        if (!matchesName && !matchesHeadline && !matchesSkills && !matchesArea && !matchesSubcat) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'all' && pro.category !== selectedCategory) {
        return false;
      }

      // 3. Radius Filter
      if ((pro.distanceKm || 1) > radiusKm) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      return (a.distanceKm || 0) - (b.distanceKm || 0);
    });
  }, [searchQuery, selectedCategory, radiusKm]);

  const toggleFavorite = (id: string) => {
    setSavedFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleVoiceSearch = () => {
    setIsListeningVoice(true);
    setTimeout(() => {
      setSearchQuery('Electrician');
      setIsListeningVoice(false);
    }, 1500);
  };

  const handleBookingSuccess = (bookingData: { professional: Professional }) => {
    setProForBooking(null);
    setProForLiveTracking(bookingData.professional);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#0F172A] selection:bg-orange-100 selection:text-[#FF6B00] flex flex-col">
      
      {/* Booking Checkout Modal */}
      {proForBooking && (
        <PremiumBookingEscrowModal
          professional={proForBooking}
          onClose={() => setProForBooking(null)}
          onBookingConfirmed={handleBookingSuccess}
        />
      )}

      {/* Live Tracker Modal */}
      {proForLiveTracking && (
        <UberStyleLiveTrackerModal
          professional={proForLiveTracking}
          bookingTitle={`${proForLiveTracking.subcategory} Booking`}
          contractAmountINR={proForLiveTracking.hourlyRateINR * 4}
          onClose={() => setProForLiveTracking(null)}
        />
      )}

      {/* ========================================================================= */}
      {/* CLEAN MINIMAL SEARCH HEADER */}
      {/* ========================================================================= */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3.5 sticky top-16 sm:top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto space-y-2.5">
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Search Input Bar */}
            <div className="flex-1 max-w-2xl flex items-center gap-2 p-1.5 pl-4 bg-[#F8F9FB] rounded-2xl border border-gray-300 focus-within:border-[#FF6B00] focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/10 transition-all shadow-2xs">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services, skills, or specialist name..."
                className="w-full text-xs sm:text-sm font-semibold text-[#0F172A] placeholder:text-gray-400 focus:outline-none bg-transparent"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-gray-400 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={handleVoiceSearch}
                title="Voice Search"
                className={`p-1.5 rounded-xl transition-colors ${
                  isListeningVoice ? 'bg-red-50 text-red-500 animate-pulse' : 'text-gray-400 hover:text-[#FF6B00]'
                }`}
              >
                <Mic className="w-4 h-4" />
              </button>

              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#E85D00] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1 flex-shrink-0"
              >
                <span>Search</span>
              </button>
            </div>

            {/* Radius Selector Pills */}
            <div className="flex items-center gap-1 p-1 bg-[#F1F5F9] rounded-2xl border border-gray-200 self-start md:self-auto overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-bold text-gray-400 uppercase px-2">Radius:</span>
              {(['2 km', '5 km', '10 km', '20 km', '50 km'] as RadiusOption[]).map(rad => (
                <button
                  key={rad}
                  type="button"
                  onClick={() => setSelectedRadius(rad)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedRadius === rad
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'text-gray-600 hover:bg-white'
                  }`}
                >
                  {rad}
                </button>
              ))}
            </div>

          </div>

          {/* Quick Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-0.5">
            {QUICK_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'bg-[#F8F9FB] border border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}

            <span className="ml-auto text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-1 flex-shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Escrow Protected</span>
            </span>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN SPLIT SCREEN: LEFT LIST + RIGHT MAP */}
      {/* ========================================================================= */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5 flex flex-col lg:flex-row gap-6">
        
        {/* Mobile View Toggle */}
        <div className="lg:hidden flex rounded-2xl bg-gray-200 p-1 mb-2">
          <button
            type="button"
            onClick={() => setMobileView('list')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 ${
              mobileView === 'list' ? 'bg-white text-black shadow-xs' : 'text-gray-600'
            }`}
          >
            <List className="w-4 h-4" />
            <span>List ({filteredProfessionals.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileView('map')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 ${
              mobileView === 'map' ? 'bg-white text-black shadow-xs' : 'text-gray-600'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>Map Radar</span>
          </button>
        </div>

        {/* LEFT COLUMN: SPECIALIST CARDS LIST */}
        <div className={`w-full lg:w-[460px] flex-shrink-0 space-y-4 overflow-y-auto max-h-[calc(100vh-210px)] pr-1 no-scrollbar ${
          mobileView === 'map' ? 'hidden lg:block' : 'block'
        }`}>
          
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-base font-black text-[#0F172A] tracking-tight">
                {filteredProfessionals.length} Verified Specialists
              </h2>
              <span className="text-xs text-gray-500 font-semibold">
                Within {selectedRadius} of {userLocationName}
              </span>
            </div>
          </div>

          {filteredProfessionals.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white border border-gray-200 text-center space-y-3">
              <Search className="w-8 h-8 text-gray-400 mx-auto" />
              <h3 className="text-sm font-black text-[#0F172A]">No specialists found</h3>
              <p className="text-xs text-gray-500">Try expanding your search radius to 20 km or 50 km.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedRadius('50 km');
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredProfessionals.map((pro) => {
              const isSelected = selectedPro?.id === pro.id;
              const isSaved = !!savedFavorites[pro.id];

              return (
                <div
                  key={pro.id}
                  onClick={() => setSelectedPro(pro)}
                  className={`p-5 rounded-3xl border bg-white cursor-pointer transition-all duration-300 space-y-3.5 group shadow-xs ${
                    isSelected
                      ? 'border-[#FF6B00] ring-2 ring-orange-500/20 shadow-lg'
                      : 'border-gray-200/90 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={pro.avatarUrl}
                          alt={pro.name}
                          className="w-14 h-14 rounded-2xl object-cover border border-white shadow-xs group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-[9px] font-bold border-2 border-white">
                          ✓
                        </div>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-black text-sm text-[#0F172A] truncate">{pro.name}</h3>
                          <span className="px-2 py-0.5 rounded-full bg-orange-50 text-[#FF6B00] text-[9px] font-black flex-shrink-0">
                            {pro.trustScore}% Trust
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium line-clamp-1 mt-0.5">{pro.headline}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(pro.id);
                      }}
                      className="p-1 rounded-full text-gray-400 hover:text-red-500"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>

                  {/* Distance & Availability */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
                    <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-600" />
                      {pro.cityArea} • {pro.distanceKm} km
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-[#16A34A] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      ETA ~{pro.etaMinutes || 12}m ({pro.transportMode || 'bike'})
                    </span>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {pro.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-lg bg-gray-100 text-gray-600 text-[10px] font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-xs font-bold text-[#16A34A]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>DigiLocker Verified</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/profile/${pro.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#0F172A]"
                      >
                        Profile
                      </Link>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setProForBooking(pro);
                        }}
                        className="px-4 py-1.5 rounded-xl bg-[#FF6B00] hover:bg-[#E85D00] text-white text-xs font-bold shadow-xs flex items-center gap-1"
                      >
                        <Lock className="w-3 h-3" />
                        <span>Book</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}

        </div>

        {/* RIGHT COLUMN: FULL GOOGLE MAPS RADAR CANVAS */}
        <div className={`flex-1 rounded-[32px] overflow-hidden border border-gray-300 shadow-xl min-h-[500px] lg:min-h-[calc(100vh-210px)] relative bg-slate-900 ${
          mobileView === 'list' ? 'hidden lg:block' : 'block'
        }`}>
          <GoogleMapsMarketplaceEngine
            professionals={filteredProfessionals}
            selectedPro={selectedPro}
            onSelectPro={(pro) => setSelectedPro(pro)}
            onBookPro={(pro) => setProForBooking(pro)}
            userLocationName={userLocationName}
            selectedRadius={selectedRadius}
            onRadiusChange={setSelectedRadius}
            showRadiusBar={true}
          />
        </div>

      </div>

    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-500 font-bold">
        Loading Map Radar...
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}
