'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Navigation, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Lock, 
  Key, 
  Bike, 
  Car, 
  Check, 
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Professional } from '@/types';
import { formatINR } from '@/lib/utils';

interface UberStyleLiveTrackerModalProps {
  professional: Professional;
  bookingTitle?: string;
  contractAmountINR?: number;
  onClose: () => void;
  onEscrowReleased?: (txId: string) => void;
}

type ServiceStage = 'accepted' | 'en_route' | 'arrived' | 'work_started' | 'completed';

export default function UberStyleLiveTrackerModal({
  professional,
  bookingTitle = 'Onsite Service Booking',
  contractAmountINR = 3500,
  onClose,
  onEscrowReleased
}: UberStyleLiveTrackerModalProps) {
  const [currentStage, setCurrentStage] = useState<ServiceStage>('en_route');
  const [etaMinutes, setEtaMinutes] = useState(professional.etaMinutes || 8);
  const [otpCode, setOtpCode] = useState('8492');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isReleasingEscrow, setIsReleasingEscrow] = useState(false);
  const [escrowSuccessTx, setEscrowSuccessTx] = useState<string | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: 'pro', text: `Hi! I am on my way to your location with all equipment. ETA ~${professional.etaMinutes || 8} mins.`, time: 'Just now' }
  ]);

  // Stage progression timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMinutes(prev => {
        if (prev > 1) return prev - 1;
        return 1;
      });
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const STAGES: { id: ServiceStage; label: string; desc: string }[] = [
    { id: 'accepted', label: 'Booking Accepted', desc: 'Verified identity & tools confirmed' },
    { id: 'en_route', label: 'En Route', desc: `Traveling via ${professional.transportMode || 'bike'} (Live GPS)` },
    { id: 'arrived', label: 'Arrived Onsite', desc: 'Professional has reached your premises' },
    { id: 'work_started', label: 'Work In Progress', desc: 'Inspecting and executing deliverables' },
    { id: 'completed', label: 'Completed & Verify', desc: 'Share OTP to release Escrow payout' },
  ];

  const getStageIndex = (stage: ServiceStage) => {
    return STAGES.findIndex(s => s.id === stage);
  };

  const handleNextStageSimulation = () => {
    const order: ServiceStage[] = ['accepted', 'en_route', 'arrived', 'work_started', 'completed'];
    const currentIdx = order.indexOf(currentStage);
    if (currentIdx < order.length - 1) {
      setCurrentStage(order[currentIdx + 1]);
    }
  };

  const handleReleaseEscrow = () => {
    setIsReleasingEscrow(true);
    setTimeout(() => {
      setIsReleasingEscrow(false);
      const tx = `GLID-ESCROW-${Math.floor(100000 + Math.random() * 900000)}`;
      setEscrowSuccessTx(tx);
      setIsOtpVerified(true);
      if (onEscrowReleased) onEscrowReleased(tx);
    }, 1800);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setChatLog(prev => [
      ...prev,
      { sender: 'user', text: chatMessage, time: 'Just now' }
    ]);
    setChatMessage('');
    // Auto reply
    setTimeout(() => {
      setChatLog(prev => [
        ...prev,
        { sender: 'pro', text: 'Got it! See you shortly.', time: 'Just now' }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-2xl bg-white rounded-3xl sm:rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 bg-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-orange-50 text-[#FF6B00] flex items-center justify-center font-black text-sm">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-black text-[#0F172A]">Live Service Tracker</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-ping" /> Live Tracking
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">{bookingTitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Simulated Google Maps Live Route View */}
          <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden bg-[#0F172A] border border-gray-200 shadow-inner">
            {/* SVG Vector Map */}
            <svg className="w-full h-full object-cover opacity-90" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="liveGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" strokeWidth="1" />
                </pattern>
                <linearGradient id="liveRoute" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B00" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>

              <rect width="100%" height="100%" fill="url(#liveGrid)" />
              
              {/* Roads */}
              <path d="M -50 180 Q 200 120 600 220" fill="none" stroke="#334155" strokeWidth="6" />
              <path d="M 120 -20 Q 250 150 400 300" fill="none" stroke="#1E293B" strokeWidth="5" />

              {/* Dynamic Animated Route Polyline */}
              <path
                d="M 140 70 Q 260 110, 480 180"
                fill="none"
                stroke="url(#liveRoute)"
                strokeWidth="5"
                strokeDasharray="8,6"
                className="animate-[dash_1s_linear_infinite]"
              />
            </svg>

            {/* Moving Professional Pin on Map */}
            <div className="absolute top-16 left-28 z-20 animate-bounce">
              <div className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF6B00] text-white shadow-xl text-xs font-bold border-2 border-white">
                <Bike className="w-3.5 h-3.5" />
                <span>{professional.name.split(' ')[0]}</span>
              </div>
            </div>

            {/* Destination Client Location Pin */}
            <div className="absolute bottom-12 right-24 z-10">
              <div className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600 text-white shadow-xl text-xs font-bold border-2 border-white">
                <MapPin className="w-3.5 h-3.5" />
                <span>You (Destination)</span>
              </div>
            </div>

            {/* Floating Top Banner: Live ETA */}
            <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
              <div className="px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-gray-200 pointer-events-auto flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF6B00] animate-spin" />
                <div>
                  <span className="text-xs font-black text-[#0F172A] block">
                    {currentStage === 'arrived' ? 'Arrived Onsite!' : currentStage === 'work_started' ? 'In Progress' : currentStage === 'completed' ? 'Service Finished' : `Arriving in ~${etaMinutes} mins`}
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold">{professional.distanceKm} km away • {professional.transportMode || 'bike'}</span>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${professional.coordinates.lat},${professional.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-gray-200 pointer-events-auto text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Professional Details & Quick Contact */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={professional.avatarUrl}
                alt={professional.name}
                className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-xs flex-shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-black text-sm text-[#0F172A]">{professional.name}</h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#16A34A] text-[10px] font-bold">
                    Aadhaar KYC
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium">{professional.headline}</p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400 font-semibold">
                  <span>★ {professional.trustScore}% Trust</span>
                  <span>•</span>
                  <span>{professional.completedProjectsCount} Orders</span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Call & Chat */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCalling(!isCalling)}
                className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                  isCalling 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-white hover:bg-gray-100 border border-gray-200 text-[#0F172A]'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isCalling ? professional.phone : 'Call'}</span>
              </button>

              <button
                onClick={() => setIsChatting(!isChatting)}
                className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-gray-100 border border-gray-200 text-[#0F172A] font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Chat</span>
              </button>
            </div>
          </div>

          {/* Inline Chat Tray (if open) */}
          {isChatting && (
            <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3 animate-in fade-in">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Direct Message</div>
              <div className="max-h-36 overflow-y-auto space-y-2 text-xs">
                {chatLog.map((c, i) => (
                  <div key={i} className={`flex ${c.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-2.5 rounded-2xl max-w-[80%] ${
                      c.sender === 'user' ? 'bg-[#FF6B00] text-white rounded-br-none' : 'bg-gray-100 text-[#0F172A] rounded-bl-none'
                    }`}>
                      <p>{c.text}</p>
                      <span className={`text-[9px] block mt-0.5 ${c.sender === 'user' ? 'text-white/80' : 'text-gray-400'}`}>{c.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message to professional..."
                  className="flex-1 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#FF6B00]"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-bold hover:bg-black"
                >
                  Send
                </button>
              </div>
            </div>
          )}

          {/* 5-Step Progression Stepper */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-black text-[#0F172A] uppercase tracking-wider text-[11px]">Service Milestones</span>
              <button
                onClick={handleNextStageSimulation}
                className="text-[#FF6B00] hover:underline font-bold text-xs flex items-center gap-1"
              >
                <span>Advance Stage Demo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {STAGES.map((s, idx) => {
                const currentIdx = getStageIndex(currentStage);
                const isPassed = idx < currentIdx;
                const isCurrent = idx === currentIdx;

                return (
                  <div
                    key={s.id}
                    className={`p-3 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-orange-50/80 border-[#FF6B00] shadow-xs'
                        : isPassed
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-800'
                        : 'bg-gray-50/60 border-gray-200 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black uppercase">0{idx + 1}</span>
                      {isPassed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                      ) : isCurrent ? (
                        <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-ping" />
                      ) : null}
                    </div>
                    <div className="text-xs font-bold truncate text-[#0F172A]">{s.label}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">{s.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Milestone Escrow Release Card (Final Step Protection) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-gray-900 to-[#0F172A] text-white shadow-xl space-y-4">
            
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                  <Lock className="w-3 h-3" />
                  100% RBI Trustee Escrow Protected
                </div>
                <h4 className="text-sm sm:text-base font-black mt-1.5">
                  Milestone Payout: {formatINR(contractAmountINR)}
                </h4>
                <p className="text-xs text-gray-300">
                  Funds will remain securely held in escrow until you inspect the deliverables and approve completion.
                </p>
              </div>

              {/* Cryptographic OTP Box */}
              <div className="text-center p-2.5 rounded-2xl bg-white/10 border border-white/20 flex-shrink-0">
                <span className="text-[9px] uppercase font-bold text-gray-400 block">Security OTP</span>
                <span className="text-lg font-black tracking-widest text-[#FF6B00]">{otpCode}</span>
              </div>
            </div>

            {/* Escrow Release CTA */}
            {escrowSuccessTx ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Escrow Released! Transaction ID: {escrowSuccessTx}</span>
                </div>
                <button
                  onClick={onClose}
                  className="px-3 py-1 rounded-lg bg-emerald-500 text-white text-xs font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-white/10">
                <div className="text-xs text-gray-400 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  <span>Provide OTP to professional only after satisfactory completion.</span>
                </div>

                <button
                  onClick={handleReleaseEscrow}
                  disabled={isReleasingEscrow}
                  className="w-full sm:w-auto ml-auto px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isReleasingEscrow ? 'Releasing Funds...' : 'Release Escrow Payout'}</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
