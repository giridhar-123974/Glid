'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Mic, 
  MicOff, 
  Sparkles, 
  MapPin, 
  Navigation, 
  X, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Calendar,
  Clock
} from 'lucide-react';
import { parseNaturalLanguageQuery, ExtractedFilterState } from '@/lib/aiSearchParser';

interface UniversalAISearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSearch: (val: string, extracted: ExtractedFilterState) => void;
  userLocationName?: string;
  onDetectLocation?: () => void;
}

const ROTATING_EXAMPLES = [
  'Need a wedding photographer tomorrow under ₹12000 near Gachibowli',
  'Need a React developer under ₹35,000 near Hitech City',
  'Need video editor today for YouTube tech reels',
  'Need UI/UX designer inspired by Linear & Apple',
  'Need CA for startup incorporation in Hyderabad',
  'Need drone videographer for weekend event in Jubilee Hills',
  'Need female photographer near Madhapur'
];

const SUGGESTIONS = [
  { label: 'Wedding Photographer', category: 'Photography & Videography', icon: '📷' },
  { label: 'React & Next.js Developer', category: 'Software & Technology', icon: '💻' },
  { label: 'YouTube & Reels Video Editor', category: 'Photography & Videography', icon: '🎬' },
  { label: 'UI/UX & Product Designer', category: 'Design & Creative', icon: '🎨' },
  { label: 'Chartered Accountant (GST/Tax)', category: 'Business Services', icon: '💼' },
  { label: 'Performance & Meta Ads Marketer', category: 'Marketing & Growth', icon: '📈' },
  { label: 'Drone Aerial Operator', category: 'Photography & Videography', icon: '🚁' }
];

export default function UniversalAISearchBar({
  value,
  onChange,
  onSearch,
  userLocationName = 'Hitech City, Hyderabad',
  onDetectLocation
}: UniversalAISearchBarProps) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic Placeholder rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % ROTATING_EXAMPLES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  // Voice Search (Web Speech API)
  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Try Google Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const speechText = event.results[0][0].transcript;
      onChange(speechText);
      setIsListening(false);
      const parsed = parseNaturalLanguageQuery(speechText);
      onSearch(speechText, parsed);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    const parsed = parseNaturalLanguageQuery(value);
    onSearch(value, parsed);
  };

  const handleSelectSuggestion = (suggestLabel: string) => {
    onChange(suggestLabel);
    setShowSuggestions(false);
    const parsed = parseNaturalLanguageQuery(suggestLabel);
    onSearch(suggestLabel, parsed);
  };

  // Real-time AI Extracted Parameter Preview
  const extracted = parseNaturalLanguageQuery(value);
  const hasExtractedParams = value.trim().length > 3 && (
    extracted.detectedCategory || 
    extracted.maxBudgetINR || 
    extracted.detectedLocation || 
    extracted.availability
  );

  return (
    <div ref={searchContainerRef} className="relative w-full max-w-4xl mx-auto space-y-3">
      
      {/* MAIN ROUNDED SEARCH BAR (Airbnb / Google / Rapido fusion) */}
      <form
        onSubmit={handleFormSubmit}
        className="p-2 sm:p-3 rounded-3xl bg-white border-2 border-[#0F5132]/30 hover:border-[#16A34A] focus-within:border-[#0F5132] shadow-premium transition-all flex flex-col sm:flex-row items-center gap-2 relative z-30"
      >
        <div className="flex items-center gap-3 w-full px-3 py-1 sm:py-0">
          <div className="w-10 h-10 rounded-2xl bg-[#DCFCE7] flex items-center justify-center flex-shrink-0 text-[#0F5132]">
            <Sparkles className="w-5 h-5 text-[#16A34A] animate-pulse" />
          </div>

          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder={ROTATING_EXAMPLES[placeholderIndex]}
              className="w-full text-base sm:text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
            />
          </div>

          {/* Clear Button */}
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange('');
                onSearch('', { rawQuery: '' });
              }}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Voice Search Button */}
          <button
            type="button"
            onClick={handleVoiceSearch}
            className={`p-2.5 rounded-2xl transition-all flex items-center justify-center ${
              isListening
                ? 'bg-red-500 text-white animate-ping'
                : 'text-gray-500 hover:text-[#0F5132] hover:bg-gray-100'
            }`}
            title="Voice Search (Speak requirements)"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-[#16A34A]" />}
          </button>

          {/* Current Location Trigger */}
          {onDetectLocation && (
            <button
              type="button"
              onClick={onDetectLocation}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 hover:bg-[#DCFCE7] text-gray-700 hover:text-[#0F5132] text-xs font-semibold border border-gray-200 transition-colors whitespace-nowrap"
              title="Use current location"
            >
              <Navigation className="w-3.5 h-3.5 text-[#16A34A]" />
              <span className="truncate max-w-[110px]">{userLocationName.split(',')[0]}</span>
            </button>
          )}
        </div>

        {/* Search Submit CTA */}
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#0F5132] to-[#14532D] hover:from-[#14532D] hover:to-[#0F5132] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Search className="w-4 h-4" />
          <span>AI Search</span>
        </button>
      </form>

      {/* AUTOCOMPLETE SUGGESTIONS DROPDOWN */}
      {showSuggestions && value.length > 1 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl border border-gray-200 shadow-2xl z-40 p-4 space-y-1 animate-in fade-in-50 duration-150">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400 px-3 pb-2 border-b border-gray-100">
            Suggested Specializations & Roles
          </div>
          {SUGGESTIONS.filter(s => s.label.toLowerCase().includes(value.toLowerCase()) || value.toLowerCase().includes(s.label.toLowerCase().split(' ')[0])).map((sug, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSuggestion(sug.label)}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-[#DCFCE7] text-left flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{sug.icon}</span>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-[#0F5132]">{sug.label}</div>
                  <div className="text-xs text-gray-500">{sug.category}</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0F5132] group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      )}

      {/* AI EXTRACTED INTENT CHIPS (Real-Time Natural Language Tagging) */}
      {hasExtractedParams && (
        <div className="flex flex-wrap items-center gap-2 px-2 py-1 animate-in slide-in-from-top-2 duration-200">
          <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" /> AI Detected Intent:
          </span>

          {extracted.detectedCategory && (
            <span className="px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-xs font-bold text-[#0F5132] shadow-2xs">
              Category: {extracted.detectedSubcategory || extracted.detectedCategory}
            </span>
          )}

          {extracted.maxBudgetINR && (
            <span className="px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-xs font-bold text-[#0F5132] shadow-2xs">
              💰 Max Budget: ₹{extracted.maxBudgetINR.toLocaleString()}
            </span>
          )}

          {extracted.detectedLocation && (
            <span className="px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-xs font-bold text-[#0F5132] shadow-2xs">
              📍 Area: {extracted.detectedLocation}
            </span>
          )}

          {extracted.availability && (
            <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-300 text-xs font-bold text-amber-900 shadow-2xs">
              ⚡ Timing: {extracted.availability.replace('_', ' ').toUpperCase()}
            </span>
          )}

          {extracted.preferredGender && (
            <span className="px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-300 text-xs font-bold text-purple-900 shadow-2xs">
              👤 Preference: {extracted.preferredGender.toUpperCase()}
            </span>
          )}
        </div>
      )}

    </div>
  );
}
