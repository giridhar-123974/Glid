'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Globe, 
  Linkedin, 
  Github, 
  FileText, 
  Download, 
  Lock, 
  Share2, 
  Briefcase, 
  MessageSquare,
  ArrowRight,
  X,
  CreditCard,
  Building2,
  Award,
  Check,
  Heart,
  Video,
  Navigation,
  ExternalLink,
  Bike,
  Car
} from 'lucide-react';
import { PROFESSIONALS } from '@/data/mockData';
import { formatINR } from '@/lib/utils';
import PremiumBookingEscrowModal from '@/components/payments/PremiumBookingEscrowModal';
import UberStyleLiveTrackerModal from '@/components/maps/UberStyleLiveTrackerModal';
import RealtimeChatWindow from '@/components/chat/RealtimeChatWindow';
import GoogleMapsMarketplaceEngine from '@/components/maps/GoogleMapsMarketplaceEngine';

export default function ProfilePage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const pro = PROFESSIONALS.find((p) => p.id === id) || PROFESSIONALS[0];

  const [activeTab, setActiveTab] = useState<'portfolio' | 'services' | 'map' | 'reviews' | 'about'>('portfolio');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLiveTrackingOpen, setIsLiveTrackingOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [isSaved, setIsSaved] = useState(false);
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);

  const packages = {
    basic: {
      name: 'Starter Consultation & Setup',
      price: pro.hourlyRateINR * 2,
      duration: '1-2 Days',
      features: ['Initial Scope Review', 'Core Deliverable Draft', '1 Revision Round', '100% Escrow Protection']
    },
    standard: {
      name: 'Full Milestone Package',
      price: pro.hourlyRateINR * 6,
      duration: '3-5 Days',
      features: ['Full End-to-End Execution', 'Source Files & Assets', '3 Revisions', '24/7 Chat Relay', 'Cryptographic OTP Release']
    },
    premium: {
      name: 'Enterprise Dedicated Retainer',
      price: pro.hourlyRateINR * 16,
      duration: '1 Month',
      features: ['Priority Dedicated Support', 'Unlimited Milestone Iterations', 'Full Commercial License', 'Dedicated Account Manager', 'GST 18% Invoices']
    }
  };

  const currentPkg = packages[selectedPackage];

  const handleBookingConfirmed = () => {
    setIsBookingModalOpen(false);
    setIsLiveTrackingOpen(true);
  };

  return (
    <div className="bg-[#F8F9FB] min-h-screen pb-24 text-[#0F172A] font-sans selection:bg-orange-100 selection:text-[#FF6B00]">
      
      {/* Lightbox Modal */}
      {activeLightboxImg && (
        <div 
          onClick={() => setActiveLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer animate-in fade-in"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={activeLightboxImg} alt="Portfolio Fullscreen" className="max-w-4xl max-h-[85vh] rounded-2xl object-contain shadow-2xl" />
        </div>
      )}

      {/* Booking & Escrow Modal */}
      {isBookingModalOpen && (
        <PremiumBookingEscrowModal
          professional={pro}
          onClose={() => setIsBookingModalOpen(false)}
          onBookingConfirmed={handleBookingConfirmed}
        />
      )}

      {/* Live Uber-Style Tracker Modal */}
      {isLiveTrackingOpen && (
        <UberStyleLiveTrackerModal
          professional={pro}
          bookingTitle={`${pro.subcategory} Booking`}
          contractAmountINR={currentPkg.price}
          onClose={() => setIsLiveTrackingOpen(false)}
        />
      )}

      {/* Real-time Chat Drawer Modal */}
      {isChatModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="max-w-xl w-full">
            <RealtimeChatWindow
              professional={pro}
              onClose={() => setIsChatModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Cover Header Banner */}
      <div className="relative h-64 sm:h-80 w-full bg-[#0F172A] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pro.coverUrl || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=80'}
          alt={pro.name}
          className="w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FB] via-black/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Profile Details, Portfolio, Reviews */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Main Header Card */}
            <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E8EBF0] shadow-apple space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Avatar & Identifiers */}
                <div className="flex items-center gap-5">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-gray-100 flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pro.avatarUrl}
                      alt={pro.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#16A34A] ring-2 ring-white" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-black tracking-tight text-[#0F172A]">{pro.name}</h1>
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] text-xs font-black border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Aadhaar KYC</span>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-[#FF6B00]">{pro.headline}</p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B] pt-1">
                      <span className="flex items-center gap-1 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                        {pro.cityArea}, {pro.location} • {pro.distanceKm || 1.8} km away
                      </span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                        {pro.liveStatus === 'available_now' ? 'Available Today' : 'Available Tomorrow'}
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-gray-500">ETA ~{pro.etaMinutes || 10}m ({pro.transportMode || 'bike'})</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Icons */}
                <div className="flex items-center gap-2 self-end sm:self-start">
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className="p-2.5 rounded-xl border border-[#E8EBF0] hover:bg-gray-50 text-gray-700 shadow-xs"
                    title="Favorite"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      alert("Profile link copied to clipboard!");
                    }}
                    className="p-2.5 rounded-xl border border-[#E8EBF0] hover:bg-gray-50 text-gray-700 shadow-xs"
                    title="Share Profile"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Bio Statement */}
              <p className="text-xs text-gray-700 leading-relaxed pt-2 border-t border-gray-100 font-medium">
                {pro.bio}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {pro.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-[#F8F9FB] text-[#0F172A] border border-[#E8EBF0] text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-[#E8EBF0] pb-2 overflow-x-auto no-scrollbar">
              {[
                { id: 'portfolio', label: `Portfolio (${pro.portfolio?.length || 4})` },
                { id: 'services', label: 'Packages & Rates' },
                { id: 'map', label: 'Service Radius Map' },
                { id: 'reviews', label: `Client Reviews (${pro.reviews?.length || 18})` },
                { id: 'about', label: 'Trust & KYC Breakdown' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#FF6B00] text-white shadow-xs'
                      : 'bg-white text-[#64748B] border border-[#E8EBF0] hover:text-[#0F172A]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: PORTFOLIO SHOWCASE */}
            {activeTab === 'portfolio' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pro.portfolio.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveLightboxImg(item.imageUrl)}
                    className="rounded-[20px] border border-[#E8EBF0] bg-white overflow-hidden shadow-apple shadow-apple-hover group cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs">
                        Click to Expand 🔍
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-sm text-[#0F172A]">{item.title}</h4>
                      <p className="text-xs text-[#64748B] mt-0.5 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: SERVICE RADIUS GOOGLE MAP */}
            {activeTab === 'map' && (
              <div className="bg-white rounded-[24px] p-6 border border-[#E8EBF0] shadow-apple space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-base text-[#0F172A]">Service Area & GPS Location</h3>
                    <p className="text-xs text-gray-500">Active within a {pro.serviceRadiusKm || 30} km radius from {pro.cityArea}, {pro.location}.</p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${pro.coordinates.lat},${pro.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold flex items-center gap-1"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <GoogleMapsMarketplaceEngine
                  professionals={[pro]}
                  selectedPro={pro}
                  userLocationName={pro.cityArea}
                  heightClass="h-[380px]"
                  showRadiusBar={false}
                />
              </div>
            )}

            {/* TAB CONTENT: SERVICES & PACKAGES */}
            {activeTab === 'services' && (
              <div className="space-y-4">
                {pro.services.map((srv, idx) => (
                  <div key={idx} className="p-6 rounded-[20px] bg-white border border-[#E8EBF0] shadow-apple space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-base text-[#0F172A]">{srv.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{srv.description}</p>
                      </div>
                      <span className="text-xl font-black text-[#FF6B00]">{formatINR(srv.priceINR)}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 text-xs">
                      {srv.features.map((f, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-gray-50 text-gray-700 font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3 text-[#16A34A]" /> {f}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setIsBookingModalOpen(true)}
                      className="w-full py-3 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Book this Package with Escrow</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {pro.reviews.map((rev) => (
                  <div key={rev.id} className="p-5 rounded-[20px] bg-white border border-[#E8EBF0] shadow-apple space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white font-bold text-xs flex items-center justify-center">
                          {rev.clientName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#0F172A]">{rev.clientName}</h4>
                          <span className="text-[10px] text-gray-400 font-semibold">{rev.clientRole || 'Verified Client'} • {rev.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed font-medium">&ldquo;{rev.comment}&rdquo;</p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: TRUST & VERIFICATION RADAR */}
            {activeTab === 'about' && (
              <div className="p-6 rounded-[20px] bg-white border border-[#E8EBF0] shadow-apple space-y-4">
                <h3 className="font-black text-base text-[#0F172A]">Government & Biometric Identity Breakdown</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-950 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      UIDAI Aadhaar Verified
                    </span>
                    <p className="text-[11px] text-emerald-800">Biometric match certified via official DigiLocker API.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-950 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      Bank Account Escrow Linked
                    </span>
                    <p className="text-[11px] text-emerald-800">Penny-drop authenticated with NPCI gateway.</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: 3-Tier Booking & Instant Escrow Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 bg-white rounded-[24px] p-6 border border-[#E8EBF0] shadow-apple space-y-5">
              
              {/* Package Selector Tabs */}
              <div className="grid grid-cols-3 gap-1.5 bg-[#F8F9FB] p-1 rounded-xl border border-[#E8EBF0] text-xs font-bold">
                {(['basic', 'standard', 'premium'] as const).map(pkg => (
                  <button
                    key={pkg}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`py-2 rounded-lg capitalize transition-all ${
                      selectedPackage === pkg ? 'bg-[#0F172A] text-white shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    {pkg}
                  </button>
                ))}
              </div>

              {/* Selected Package Details */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#64748B] uppercase">{currentPkg.name}</span>
                  <span className="text-2xl font-black text-[#FF6B00]">₹{currentPkg.price.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>Estimated Delivery: {currentPkg.duration}</span>
                </div>

                <div className="space-y-2 pt-3 border-t border-gray-100 text-xs">
                  <span className="font-bold text-[#0F172A] block">What&apos;s Included:</span>
                  {currentPkg.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-[#0F172A]">
                      <Check className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full py-3.5 rounded-2xl bg-[#FF6B00] hover:bg-[#E55F00] text-white text-xs font-bold shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Lock className="w-4 h-4" />
                  <span>Book with Escrow (₹{currentPkg.price.toLocaleString()})</span>
                </button>

                <button
                  onClick={() => setIsChatModalOpen(true)}
                  className="w-full py-2.5 rounded-2xl border border-[#E8EBF0] hover:bg-[#F8F9FB] text-xs font-bold text-[#0F172A] flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#FF6B00]" />
                  <span>Chat & Discuss Scope</span>
                </button>
              </div>

              {/* Trust Badge */}
              <div className="p-3.5 rounded-2xl bg-orange-50/60 border border-orange-100 text-[11px] text-[#0F172A] space-y-1">
                <span className="font-bold text-[#FF6B00] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  100% RBI Escrow Guarantee
                </span>
                <p className="text-gray-600">
                  Your funds stay locked in RBI-regulated trustee escrow until you enter your 4-digit OTP.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
