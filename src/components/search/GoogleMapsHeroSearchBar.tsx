'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Crosshair, 
  Mic, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Check, 
  X, 
  Zap, 
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { CATEGORIES } from '@/data/mockData';

const POPULAR_SUGGESTIONS = [
  { text: 'Website Developer', category: 'Programming', count: '4,850+ pros', trending: true },
  { text: 'Wedding Photographer', category: 'Photography', count: '3,240+ pros', trending: true },
  { text: 'Certified Electrician', category: 'Home Services', count: '3,820+ pros', trending: true },
  { text: 'Video & Reels Editor', category: 'Video Production', count: '2,750+ pros', trending: false },
  { text: '1-on-1 Coding Mentor', category: 'Education', count: '1,950+ pros', trending: false },
  { text: 'Chartered Accountant (CA)', category: 'Business & Legal', count: '1,480+ pros', trending: true },
  { text: 'UI/UX Product Designer', category: 'Design Systems', count: '3,120+ pros', trending: true },
  { text: 'AC Repair & Service', category: 'Home Services', count: '2,100+ pros', trending: false },
  { text: 'React & Next.js Architect', category: 'Programming', count: '2,400+ pros', trending: true },
  { text: 'High Court Advocate', category: 'Business & Legal', count: '940+ pros', trending: false }
];

const LOCALITY_SUGGESTIONS: Record<string, string[]> = {
  'Hyderabad': [
    'Hitech City, Cyber Towers',
    'Gachibowli, Financial District',
    'Madhapur, Mindspace',
    'Jubilee Hills, Road No. 36',
    'Banjara Hills, Road No. 12',
    'Kondapur, Botanical Garden',
    'Kukatpally, KPHB Colony',
    'Begumpet, Airport Road'
  ],
  'Bengaluru': [
    'Koramangala, 80ft Road',
    'Indiranagar, 100ft Road',
    'HSR Layout, Sector 1',
    'Whitefield, ITPL Main Rd',
    'Bellandur, EcoSpace',
    'Jayanagar, 4th Block'
  ],
  'Mumbai': [
    'Bandra Kurla Complex (BKC)',
    'Andheri West, Lokhandwala',
    'Powai, Hiranandani',
    'Lower Parel, Phoenix Mills'
  ],
  'Delhi NCR': [
    'CyberHub, Gurugram',
    'Connaught Place, Central Delhi',
    'Sector 62, Noida',
    'Golf Course Road, Gurugram'
  ]
};

const POPULAR_PILLS = [
  'Website Developer',
  'Photographer',
  'Electrician',
  'Video Editor',
  'Tutor',
  'Lawyer',
  'UI Designer',
  'Full Stack Developer'
];

interface GoogleMapsHeroSearchBarProps {
  onSearchSubmit?: (query: string, location: string) => void;
  initialQuery?: string;
  initialLocation?: string;
  className?: string;
  compact?: boolean;
}

export default function GoogleMapsHeroSearchBar({
  onSearchSubmit,
  initialQuery = '',
  initialLocation = 'Hitech City, Hyderabad',
  className = '',
  compact = false
}: GoogleMapsHeroSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [isQueryFocused, setIsQueryFocused] = useState(false);
  const [isLocFocused, setIsLocFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const [activeCity, setActiveCity] = useState('Hyderabad');

  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsQueryFocused(false);
        setIsLocFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExecuteSearch = (q = query, loc = location) => {
    setIsQueryFocused(false);
    setIsLocFocused(false);
    if (onSearchSubmit) {
      onSearchSubmit(q, loc);
    } else {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (loc) params.set('loc', loc);
      router.push(`/explore?${params.toString()}`);
    }
  };

  const handleVoiceSearch = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }
    setIsListening(true);
    // Simulate speech recognition transcription
    setTimeout(() => {
      setQuery('Next.js Developer nearby');
      setIsListening(false);
      handleExecuteSearch('Next.js Developer nearby', location);
    }, 2200);
  };

  const handleGpsAutoDetect = () => {
    setIsGpsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsGpsLoading(false);
          const detected = 'Hitech City, Hyderabad (GPS)';
          setLocation(detected);
          setActiveCity('Hyderabad');
        },
        () => {
          setIsGpsLoading(false);
          setLocation('Hitech City, Hyderabad (GPS)');
        },
        { timeout: 3000 }
      );
    } else {
      setTimeout(() => {
        setIsGpsLoading(false);
        setLocation('Hitech City, Hyderabad (GPS)');
      }, 600);
    }
  };

  const filteredSuggestions = POPULAR_SUGGESTIONS.filter(item => 
    !query || item.text.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase())
  );

  const cityLocalities = LOCALITY_SUGGESTIONS[activeCity] || LOCALITY_SUGGESTIONS['Hyderabad'];
  const filteredLocalities = cityLocalities.filter(loc => 
    !location || loc.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div ref={containerRef} className={`w-full max-w-4xl mx-auto ${className}`}>
      
      {/* Main Dual Search Capsule */}
      <div className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-gray-200/80 p-2 sm:p-2.5 transition-all duration-300 ${
        isQueryFocused || isLocFocused ? 'ring-2 ring-[#FF6B00]/30 shadow-[0_20px_50px_rgba(255,107,0,0.12)] border-[#FF6B00]/50' : 'hover:border-gray-300'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          
          {/* Left Field: Service / Profession / Keyword Search */}
          <div className="flex-1 relative flex items-center min-w-0 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl hover:bg-gray-50/80 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center flex-shrink-0 mr-3">
              <Search className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Find Service or Talent
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setIsQueryFocused(true); }}
                onFocus={() => { setIsQueryFocused(true); setIsLocFocused(false); }}
                onKeyDown={(e) => e.key === 'Enter' && handleExecuteSearch()}
                placeholder="Search any professional or service..."
                className="w-full bg-transparent text-sm sm:text-base font-semibold text-[#0F172A] placeholder:text-gray-400 focus:outline-none truncate"
              />
            </div>
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200/60 mr-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={handleVoiceSearch}
              title="Voice Search"
              className={`p-2 rounded-xl transition-all ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'text-gray-400 hover:text-[#FF6B00] hover:bg-orange-50'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          {/* Divider Line (Desktop) */}
          <div className="hidden md:block w-px h-10 bg-gray-200 my-auto" />

          {/* Right Field: Location / Google Places / GPS Selector */}
          <div className="flex-1 relative flex items-center min-w-0 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl hover:bg-gray-50/80 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mr-3">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Location & Radius
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => { setLocation(e.target.value); setIsLocFocused(true); }}
                onFocus={() => { setIsLocFocused(true); setIsQueryFocused(false); }}
                onKeyDown={(e) => e.key === 'Enter' && handleExecuteSearch()}
                placeholder="City, area, landmark, pincode..."
                className="w-full bg-transparent text-sm sm:text-base font-semibold text-[#0F172A] placeholder:text-gray-400 focus:outline-none truncate"
              />
            </div>
            <button
              type="button"
              onClick={handleGpsAutoDetect}
              title="Use GPS Current Location"
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isGpsLoading 
                  ? 'bg-orange-100 text-[#FF6B00] animate-pulse' 
                  : 'bg-gray-100 hover:bg-orange-50 hover:text-[#FF6B00] text-gray-600'
              }`}
            >
              <Crosshair className={`w-3.5 h-3.5 ${isGpsLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isGpsLoading ? 'Locating...' : 'GPS'}</span>
            </button>
          </div>

          {/* Search CTA Button */}
          <button
            type="button"
            onClick={() => handleExecuteSearch()}
            className="w-full md:w-auto px-6 py-3.5 rounded-xl sm:rounded-2xl bg-[#FF6B00] hover:bg-[#E55F00] active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all flex-shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Search Nearby</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

        {/* Dropdown 1: Query Suggestions & Categories */}
        {isQueryFocused && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 p-3">
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <span>Instant Suggestions</span>
              <span className="text-[#FF6B00] flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Autocomplete
              </span>
            </div>

            <div className="max-h-72 overflow-y-auto divide-y divide-gray-50 py-1">
              {filteredSuggestions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setQuery(item.text);
                    handleExecuteSearch(item.text, location);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl hover:bg-orange-50/70 text-left flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-[#FF6B00] text-gray-500 group-hover:text-white flex items-center justify-center transition-colors">
                      <Search className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-[#0F172A] block">{item.text}</span>
                      <span className="text-[10px] text-gray-400 font-medium">{item.category}</span>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    {item.trending && (
                      <span className="px-2 py-0.5 rounded-full bg-orange-100 text-[#FF6B00] text-[10px] font-bold flex items-center gap-1">
                        <TrendingUp className="w-2.5 h-2.5" /> Hot
                      </span>
                    )}
                    <span className="text-xs font-semibold text-gray-400">{item.count}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#FF6B00] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dropdown 2: Location & Google Places Autocomplete */}
        {isLocFocused && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 p-3">
            {/* City Switcher */}
            <div className="flex items-center gap-1.5 pb-2.5 border-b border-gray-100 overflow-x-auto no-scrollbar">
              {['Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi NCR'].map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setActiveCity(city);
                    setLocation(`${cityLocalities[0] || city}`);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    activeCity === city
                      ? 'bg-[#0F172A] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            <div className="py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider px-2">
              Popular Localities in {activeCity}
            </div>

            <div className="max-h-60 overflow-y-auto divide-y divide-gray-50">
              {filteredLocalities.map((loc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setLocation(`${loc}, ${activeCity}`);
                    setIsLocFocused(false);
                  }}
                  className="w-full px-3 py-2 rounded-xl hover:bg-blue-50/70 text-left flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-[#0F172A]">{loc}</span>
                      <span className="text-[10px] text-gray-400 block">{activeCity}, India</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Select
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Popular Search Example Pills (Minimal & Apple aesthetic) */}
      {!compact && (
        <div className="mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-bold text-gray-400 flex-shrink-0 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-[#FF6B00]" /> Popular:
          </span>
          {POPULAR_PILLS.map((pill, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuery(pill);
                handleExecuteSearch(pill, location);
              }}
              className="px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-orange-50 border border-gray-200/80 hover:border-orange-200 text-xs font-semibold text-gray-700 hover:text-[#FF6B00] shadow-xs transition-all flex-shrink-0 active:scale-95"
            >
              {pill}
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
