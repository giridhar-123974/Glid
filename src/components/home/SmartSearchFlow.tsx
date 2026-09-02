'use client';

import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Crosshair, 
  ShieldCheck, 
  Star, 
  Clock, 
  Heart, 
  Share2, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  X, 
  Check, 
  CreditCard, 
  Calendar,
  Radio,
  FileText,
  DollarSign
} from 'lucide-react';
import { PROFESSIONALS } from '@/data/mockData';
import { Professional } from '@/types';

export default function SmartSearchFlow({
  initialQuery = 'Web Development',
  onClose
}: {
  initialQuery?: string;
  onClose?: () => void;
}) {
  // Step 1: Search Service
  // Step 2: Select Category
  // Step 3: Choose Location & Radius
  // Step 4: Choose Availability
  // Step 5: Select Budget
  // Step 6: View Nearby Professionals
  // Step 7: Open Profile
  // Step 8: Choose Package
  // Step 9: Escrow Payment & Confirmation
  const [currentStep, setCurrentStep] = useState<number>(3); // Starts at Location & Radius step if launched from hero search
  const [serviceQuery, setServiceQuery] = useState(initialQuery);
  const [selectedLocation, setSelectedLocation] = useState('Hitech City, Hyderabad');
  const [selectedRadius, setSelectedRadius] = useState<'1 km' | '5 km' | '10 km' | '20 km' | '50 km' | '100 km'>('10 km');
  const [availabilityOption, setAvailabilityOption] = useState<'Available Now' | 'Today' | 'This Week'>('Available Now');
  const [budgetOption, setBudgetOption] = useState<'Any' | 'Under ₹1,000' | '₹1,000 - ₹5,000' | '₹5,000+'>('Any');

  const [activeProfessional, setActiveProfessional] = useState<Professional | null>(PROFESSIONALS[0]);
  const [selectedPackage, setSelectedPackage] = useState<'Hourly' | 'Fixed Project' | 'Monthly'>('Fixed Project');
  const [bookingDate, setBookingDate] = useState('2026-09-02');
  const [bookingTime, setBookingTime] = useState('10:30 AM');
  const [projectBrief, setProjectBrief] = useState('');
  const [paymentGateway, setPaymentGateway] = useState<'Razorpay UPI' | 'Cards' | 'Net Banking' | 'Wallet'>('Razorpay UPI');
  const [milestoneOtp, setMilestoneOtp] = useState('9412');
  const [isEscrowFunded, setIsEscrowFunded] = useState(false);
  const [isWorkReleased, setIsWorkReleased] = useState(false);

  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});
  const [compareIds, setCompareIds] = useState<Record<string, boolean>>({});

  const toggleSave = (id: string) => {
    setSavedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCompare = (id: string) => {
    setCompareIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl border border-[#E5E7EB] shadow-2xl p-6 sm:p-8 space-y-6 font-sans">
      
      {/* Top Breadcrumb Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
        <button
          onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          className="flex items-center gap-1.5 text-xs font-bold text-[#111827] hover:text-[#FF6B00] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* 9-Step Indicator */}
        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-[#6B7280]">
          <span className={currentStep >= 1 ? 'text-[#FF6B00]' : ''}>1. Search</span>
          <span>›</span>
          <span className={currentStep >= 3 ? 'text-[#FF6B00]' : ''}>3. Location</span>
          <span>›</span>
          <span className={currentStep >= 4 ? 'text-[#FF6B00]' : ''}>4. Availability</span>
          <span>›</span>
          <span className={currentStep >= 5 ? 'text-[#FF6B00]' : ''}>5. Budget</span>
          <span>›</span>
          <span className={currentStep >= 6 ? 'text-[#FF6B00]' : ''}>6. Talent</span>
          <span>›</span>
          <span className={currentStep >= 8 ? 'text-[#FF6B00]' : ''}>8. Escrow</span>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-xs font-bold text-[#6B7280] hover:text-[#111827]"
          >
            ✕ Close
          </button>
        )}
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* STEP 3: CHOOSE LOCATION & RADIUS                                    */}
      {/* ------------------------------------------------------------------- */}
      {currentStep === 3 && (
        <div className="max-w-xl mx-auto space-y-6 animate-in fade-in">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-[#FF6B00] uppercase">Step 3 of 9 • Location</span>
            <h2 className="text-2xl font-black text-[#111827]">Where do you need the professional?</h2>
            <p className="text-xs text-[#6B7280]">Detect GPS or enter your city / pincode for distance matching.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F7F8FA] border border-[#E5E7EB] space-y-4">
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#FF6B00] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                placeholder="Search city, area, pincode..."
                className="w-full pl-10 pr-24 py-3 rounded-xl bg-white border border-[#E5E7EB] text-xs font-semibold text-[#111827] focus:outline-none focus:border-[#FF6B00]"
              />
              <button
                onClick={() => setSelectedLocation('Current Location (GPS Detected)')}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-orange-50 text-[#FF6B00] text-[11px] font-bold flex items-center gap-1"
              >
                <Crosshair className="w-3 h-3" />
                <span>GPS</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111827] mb-2">Search Radius:</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {(['1 km', '5 km', '10 km', '20 km', '50 km', '100 km'] as const).map(rad => (
                  <button
                    key={rad}
                    onClick={() => setSelectedRadius(rad)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedRadius === rad
                        ? 'bg-[#111827] text-white shadow-xs'
                        : 'bg-white text-[#111827] border border-[#E5E7EB]'
                    }`}
                  >
                    {rad}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentStep(4)}
            className="w-full btn-primary py-3.5 text-xs font-bold shadow-sm"
          >
            Continue to Availability & Budget →
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* STEP 4 & 5: AVAILABILITY & BUDGET                                   */}
      {/* ------------------------------------------------------------------- */}
      {currentStep === 4 && (
        <div className="max-w-xl mx-auto space-y-6 animate-in fade-in">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-[#FF6B00] uppercase">Step 4 & 5 • Availability & Budget</span>
            <h2 className="text-2xl font-black text-[#111827]">Set your timing & target budget</h2>
          </div>

          <div className="p-5 rounded-2xl bg-[#F7F8FA] border border-[#E5E7EB] space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#111827] mb-2">Availability Needed:</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Available Now', 'Today', 'This Week'] as const).map(opt => (
                  <button
                    key={opt}
                    onClick={() => setAvailabilityOption(opt)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                      availabilityOption === opt
                        ? 'bg-[#111827] text-white shadow-xs'
                        : 'bg-white text-[#111827] border border-[#E5E7EB]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111827] mb-2">Target Price Range:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Any', 'Under ₹1,000', '₹1,000 - ₹5,000', '₹5,000+'] as const).map(b => (
                  <button
                    key={b}
                    onClick={() => setBudgetOption(b)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      budgetOption === b
                        ? 'bg-[#FF6B00] text-white shadow-xs'
                        : 'bg-white text-[#111827] border border-[#E5E7EB]'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentStep(6)}
            className="w-full btn-primary py-3.5 text-xs font-bold shadow-sm"
          >
            View Nearby Verified Professionals ({PROFESSIONALS.length}) →
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* STEP 6: VIEW NEARBY PROFESSIONALS (CARDS WITH KYC, TRUST SCORE)     */}
      {/* ------------------------------------------------------------------- */}
      {currentStep === 6 && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-[#111827]">
                Verified {serviceQuery} Talent in {selectedLocation.split(',')[0]}
              </h2>
              <p className="text-xs text-[#6B7280]">
                Within {selectedRadius} • 100% DigiLocker Aadhaar KYC Authenticated
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROFESSIONALS.map((pro) => {
              const isSaved = !!savedIds[pro.id];
              const isComparing = !!compareIds[pro.id];

              return (
                <div
                  key={pro.id}
                  className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden shadow-soft shadow-soft-hover flex flex-col justify-between transition-all"
                >
                  <div className="relative aspect-[16/10] bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pro.portfolio[0]?.imageUrl || pro.avatarUrl}
                      alt={pro.name}
                      className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                      onClick={() => {
                        setActiveProfessional(pro);
                        setCurrentStep(7);
                      }}
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-[#111827] shadow-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                      <span>{pro.liveStatus === 'available_now' ? 'Available' : 'Tomorrow'}</span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={() => toggleCompare(pro.id)}
                        className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shadow-xs transition-colors ${
                          isComparing ? 'bg-[#FF6B00] text-white' : 'bg-white/90 text-gray-700 hover:bg-white'
                        }`}
                        title="Compare"
                      >
                        ⚖️
                      </button>
                      <button
                        onClick={() => toggleSave(pro.id)}
                        className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-gray-700 flex items-center justify-center shadow-xs"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                    </div>

                    <div className="absolute bottom-2.5 left-3">
                      <span className="px-2 py-0.5 rounded-md bg-black/75 text-[10px] font-bold text-white">
                        Trust Score: {pro.trustScore}%
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 
                          onClick={() => {
                            setActiveProfessional(pro);
                            setCurrentStep(7);
                          }}
                          className="font-bold text-sm text-[#111827] flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          {pro.name}
                          <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                        </h3>
                        <div className="flex items-center gap-1 text-xs font-bold text-[#111827]">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>4.98</span>
                          <span className="text-gray-400 font-normal">({pro.completedProjectsCount || 42})</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#6B7280] truncate mt-0.5">{pro.headline}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">📍 {pro.cityArea} • {pro.distanceKm || 1.8} km away</p>
                    </div>

                    <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase block leading-none">Starting</span>
                        <span className="text-sm font-black text-[#111827]">₹{pro.hourlyRateINR.toLocaleString()}/hr</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setActiveProfessional(pro);
                            setCurrentStep(7);
                          }}
                          className="px-3 py-1.5 rounded-xl border border-[#E5E7EB] hover:bg-gray-50 text-xs font-bold text-[#111827]"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => {
                            setActiveProfessional(pro);
                            setCurrentStep(8);
                          }}
                          className="btn-primary px-3.5 py-1.5 text-xs font-bold shadow-xs"
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
      {/* STEP 7: PROFILE DRAWER                                              */}
      {/* ------------------------------------------------------------------- */}
      {currentStep === 7 && activeProfessional && (
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
          <div className="p-6 rounded-3xl bg-[#F7F8FA] border border-[#E5E7EB] space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activeProfessional.avatarUrl} alt={activeProfessional.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#111827] flex items-center gap-1.5">
                  {activeProfessional.name}
                  <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                </h3>
                <p className="text-xs text-[#6B7280]">{activeProfessional.headline}</p>
                <div className="flex items-center gap-2 text-xs mt-1">
                  <span className="text-[#FF6B00] font-bold bg-orange-50 px-2 py-0.2 rounded-md">
                    Trust Score {activeProfessional.trustScore}%
                  </span>
                  <span className="font-bold">★ 4.98 ({activeProfessional.completedProjectsCount} projects)</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed pt-2 border-t border-gray-200">{activeProfessional.bio}</p>
          </div>

          <button
            onClick={() => setCurrentStep(8)}
            className="w-full btn-primary py-3.5 text-xs font-bold shadow-sm"
          >
            Configure Package & Proceed to Escrow →
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* STEP 8 & 9: CHOOSE PACKAGE & ESCROW PAYMENT                         */}
      {/* ------------------------------------------------------------------- */}
      {currentStep === 8 && activeProfessional && (
        <div className="max-w-xl mx-auto space-y-6 animate-in fade-in">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-[#16A34A] uppercase">Step 8 & 9 • Escrow Booking</span>
            <h2 className="text-2xl font-black text-[#111827]">Book {activeProfessional.name}</h2>
          </div>

          <div className="p-6 rounded-2xl bg-[#F7F8FA] border border-[#E5E7EB] space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#111827] mb-2">Select Engagement Model:</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Hourly', 'Fixed Project', 'Monthly'] as const).map(pkg => (
                  <button
                    key={pkg}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`py-2.5 rounded-xl font-bold transition-all ${
                      selectedPackage === pkg
                        ? 'bg-[#111827] text-white shadow-xs'
                        : 'bg-white text-[#111827] border border-[#E5E7EB]'
                    }`}
                  >
                    {pkg}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#111827] mb-1">Target Date & Slot:</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="p-2.5 rounded-xl bg-white border border-[#E5E7EB] font-semibold"
                />
                <input
                  type="text"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="p-2.5 rounded-xl bg-white border border-[#E5E7EB] font-semibold"
                />
              </div>
            </div>

            {/* Escrow OTP Display */}
            <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-center space-y-1">
              <span className="text-[10px] font-bold text-orange-900 uppercase">Your Milestone Release OTP</span>
              <div className="text-3xl font-black text-[#FF6B00] font-mono tracking-widest">{milestoneOtp}</div>
              <p className="text-[10px] text-gray-500">
                Share this OTP with {activeProfessional.name} only when work is completed.
              </p>
            </div>
          </div>

          {!isEscrowFunded ? (
            <button
              onClick={() => setIsEscrowFunded(true)}
              className="w-full btn-primary py-3.5 text-xs font-bold shadow-sm flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Fund Institutional Escrow (₹{(activeProfessional.hourlyRateINR * 4).toLocaleString()})</span>
            </button>
          ) : (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold text-center space-y-3">
              <p className="text-sm">🎉 Booking Confirmed & ₹{(activeProfessional.hourlyRateINR * 4).toLocaleString()} safely locked in Trustee Escrow!</p>
              {!isWorkReleased ? (
                <button
                  onClick={() => setIsWorkReleased(true)}
                  className="px-6 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-xs"
                >
                  Simulate OTP Verification & Release Payment
                </button>
              ) : (
                <p className="text-xs text-[#16A34A]">✅ Payment successfully released to {activeProfessional.name}!</p>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
