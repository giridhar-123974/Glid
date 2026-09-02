'use client';

import React, { useState } from 'react';
import { 
  X, 
  User, 
  Briefcase, 
  Building2, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Camera, 
  Lock, 
  Sparkles, 
  MapPin, 
  CreditCard, 
  Calendar, 
  Check, 
  FileText, 
  Globe, 
  DollarSign, 
  Zap, 
  Smartphone, 
  Mail, 
  Key
} from 'lucide-react';
import { formatINR } from '@/lib/utils';

import { useAuth } from '@/context/AuthContext';

export type UserOnboardingRole = 'customer' | 'professional' | 'business' | 'agency';

interface RoleOnboardingHubModalProps {
  isOpen: boolean;
  initialRole?: UserOnboardingRole;
  onClose: () => void;
  onSuccess?: (userData: any) => void;
}

export default function RoleOnboardingHubModal({
  isOpen,
  initialRole = 'customer',
  onClose,
  onSuccess
}: RoleOnboardingHubModalProps) {
  const { register } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserOnboardingRole>(initialRole);
  const [proStep, setProProStep] = useState<number>(1);
  const [customerStep, setCustomerStep] = useState<number>(1);

  // Form states - Professional Flow (7 Steps)
  const [proData, setProData] = useState({
    // Step 1: Basic Details
    name: 'Giridhar Naik',
    phone: '+91 98490 12345',
    email: 'giridhar@example.com',
    dob: '1996-08-15',
    gender: 'male',
    // Step 2: Identity Verification
    idType: 'Aadhaar Card (DigiLocker)',
    idNumber: '5421-8910-3490',
    selfieVerified: true,
    bankAccount: '918237465012',
    ifscCode: 'HDFC0001234',
    upiId: 'giridhar@okhdfcbank',
    panNumber: 'ABCDE1234F',
    // Step 3: Professional Info
    profession: 'Full Stack & AI Engineer',
    category: 'Technology',
    subcategory: 'Full Stack Web (Next.js 15 & React 19)',
    experienceYears: 6,
    languages: 'English, Telugu, Hindi',
    education: 'B.Tech in Computer Science',
    certifications: 'AWS Certified Solutions Architect, Google Cloud Professional',
    // Step 4: Portfolio
    profilePhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    portfolioTitle: 'Enterprise Next.js SaaS Platform',
    githubUrl: 'https://github.com/giridharnaik',
    linkedinUrl: 'https://linkedin.com/in/giridharnaik',
    // Step 5: Multi-tier Pricing
    hourlyRateINR: 2500,
    dailyRateINR: 18000,
    fixedProjectPriceINR: 50000,
    emergencyRateINR: 3500,
    // Step 6: Availability
    workingDays: 'Monday - Saturday',
    workingHours: '09:00 AM - 07:00 PM',
    mode: 'Hybrid (Remote & Onsite)',
    serviceRadiusKm: 25,
    locationArea: 'Hitech City, Hyderabad',
  });

  // Customer Form State
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    email: '',
    otp: '',
    location: 'Hitech City, Hyderabad',
    language: 'English',
    isOtpSent: false,
    isOtpVerified: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const handleProNext = () => {
    if (proStep < 7) {
      setProProStep(prev => prev + 1);
    } else {
      // Complete review & submit
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsCompleted(true);
        const userObj = {
          id: 'pro_' + Date.now(),
          name: proData.name || 'Giridhar Naik',
          email: proData.email || 'giridhar@glid.network',
          phone: proData.phone || '+91 98490 12345',
          role: 'professional' as const,
          avatarUrl: proData.profilePhoto || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
          headline: proData.profession || 'Full Stack & AI Engineer',
          trustScore: 99,
          isVerified: true,
          location: proData.locationArea || 'Hitech City, Hyderabad'
        };
        register(userObj);
        if (onSuccess) onSuccess(userObj);
      }, 1200);
    }
  };

  const handleCustomerSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
      const userObj = {
        id: 'cust_' + Date.now(),
        name: customerData.name || 'Giridhar Naik',
        email: customerData.email || 'giridhar@example.com',
        phone: customerData.phone || '+91 98490 12345',
        role: (selectedRole || 'customer') as any,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        headline: selectedRole === 'business' ? 'Enterprise Client' : selectedRole === 'agency' ? 'Agency Manager' : 'Verified Client',
        trustScore: 98,
        isVerified: true,
        location: customerData.location || 'Hitech City, Hyderabad'
      };
      register(userObj);
      if (onSuccess) onSuccess(userObj);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-2xl bg-white rounded-3xl sm:rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 bg-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-orange-50 text-[#FF6B00] flex items-center justify-center font-black">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-[#0F172A]">
                {isCompleted ? 'Welcome to GLID!' : 'Get Started with GLID'}
              </h2>
              <p className="text-xs text-gray-400 font-medium">India&apos;s Verified Professional Ecosystem</p>
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
          
          {/* SUCCESS SCREEN */}
          {isCompleted ? (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#0F172A]">Account Successfully Verified!</h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
                {selectedRole === 'professional' 
                  ? 'Your profile is approved with a 99% Trust Score. You can now receive funded escrow bookings.' 
                  : 'You are ready to discover and hire verified specialists near you with 100% escrow protection.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-2xl bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-xs shadow-md"
                >
                  Enter Marketplace
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Role Selection Tabs (Customer / Professional / Business / Agency) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'customer', label: 'Customer', desc: 'Hire Talent', icon: User },
                  { id: 'professional', label: 'Professional', desc: 'Offer Services', icon: Briefcase },
                  { id: 'business', label: 'Business', desc: 'Enterprise SLA', icon: Building2 },
                  { id: 'agency', label: 'Agency', desc: 'Manage Squads', icon: Users }
                ].map((r) => {
                  const Icon = r.icon;
                  const isSel = selectedRole === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        setSelectedRole(r.id as UserOnboardingRole);
                        setProProStep(1);
                        setCustomerStep(1);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSel
                          ? 'border-[#FF6B00] bg-orange-50/50 ring-2 ring-orange-500/20 shadow-xs'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1 ${isSel ? 'text-[#FF6B00]' : 'text-gray-400'}`} />
                      <span className={`text-xs font-black block ${isSel ? 'text-[#0F172A]' : 'text-gray-700'}`}>
                        {r.label}
                      </span>
                      <span className="text-[10px] text-gray-400 block">{r.desc}</span>
                    </button>
                  );
                })}
              </div>

              {/* ========================================================================= */}
              {/* FLOW 1: CUSTOMER ONBOARDING */}
              {/* ========================================================================= */}
              {(selectedRole === 'customer' || selectedRole === 'business' || selectedRole === 'agency') && (
                <div className="space-y-4">
                  <div className="text-xs font-black uppercase tracking-wider text-gray-400">
                    {selectedRole === 'customer' ? 'Customer Registration' : selectedRole === 'business' ? 'Business Account Registration' : 'Agency Account Setup'}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={customerData.name}
                        onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                        placeholder="e.g. Vikram Reddy"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">Phone Number (OTP Verification)</label>
                      <input
                        type="tel"
                        value={customerData.phone}
                        onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                        placeholder="+91 98490 XXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={customerData.email}
                        onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">Current Location (Google Places)</label>
                      <input
                        type="text"
                        value={customerData.location}
                        onChange={(e) => setCustomerData({ ...customerData, location: e.target.value })}
                        placeholder="City, Area, Landmark"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-100 text-xs text-[#0F172A] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#FF6B00] flex-shrink-0" />
                    <span>Your phone number remains confidential until you confirm a booking with a professional.</span>
                  </div>

                  <button
                    onClick={handleCustomerSubmit}
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-2xl bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-sm shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Verifying & Creating Account...' : 'Complete Registration'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* ========================================================================= */}
              {/* FLOW 2: PROFESSIONAL 7-STEP VERIFICATION FLOW */}
              {/* ========================================================================= */}
              {selectedRole === 'professional' && (
                <div className="space-y-5">
                  
                  {/* 7-Step Horizontal Stepper Header */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 overflow-x-auto no-scrollbar gap-2">
                    {[
                      { num: 1, label: 'Basic' },
                      { num: 2, label: 'KYC ID' },
                      { num: 3, label: 'Skills' },
                      { num: 4, label: 'Portfolio' },
                      { num: 5, label: 'Pricing' },
                      { num: 6, label: 'Radius' },
                      { num: 7, label: 'Trust Review' }
                    ].map((st) => (
                      <button
                        key={st.num}
                        type="button"
                        onClick={() => setProProStep(st.num)}
                        className={`flex items-center gap-1 text-[11px] font-bold whitespace-nowrap transition-colors ${
                          proStep === st.num 
                            ? 'text-[#FF6B00]' 
                            : proStep > st.num 
                            ? 'text-[#16A34A]' 
                            : 'text-gray-400'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black ${
                          proStep === st.num
                            ? 'bg-[#FF6B00] text-white'
                            : proStep > st.num
                            ? 'bg-emerald-100 text-[#16A34A]'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {proStep > st.num ? '✓' : st.num}
                        </span>
                        <span>{st.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* STEP 1: Basic Details */}
                  {proStep === 1 && (
                    <div className="space-y-4">
                      <div className="text-xs font-black uppercase text-gray-400">Step 1 — Basic Personal Details</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Full Legal Name</label>
                          <input
                            type="text"
                            value={proData.name}
                            onChange={(e) => setProData({ ...proData, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Mobile Phone (OTP Linked)</label>
                          <input
                            type="tel"
                            value={proData.phone}
                            onChange={(e) => setProData({ ...proData, phone: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Date of Birth</label>
                          <input
                            type="date"
                            value={proData.dob}
                            onChange={(e) => setProData({ ...proData, dob: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Gender</label>
                          <select
                            value={proData.gender}
                            onChange={(e) => setProData({ ...proData, gender: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Identity Verification (Govt KYC) */}
                  {proStep === 2 && (
                    <div className="space-y-4">
                      <div className="text-xs font-black uppercase text-gray-400">Step 2 — DigiLocker Government ID & Bank Account</div>
                      
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                        <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                          <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                          <span>DigiLocker Aadhaar e-KYC Connected</span>
                        </div>
                        <p className="text-[11px] text-emerald-700">
                          Biometric Aadhaar match verified via official Govt UIDAI API.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Aadhaar / Passport Number</label>
                          <input
                            type="text"
                            value={proData.idNumber}
                            onChange={(e) => setProData({ ...proData, idNumber: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">PAN Card Number</label>
                          <input
                            type="text"
                            value={proData.panNumber}
                            onChange={(e) => setProData({ ...proData, panNumber: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Bank Account (Penny-Drop Verified)</label>
                          <input
                            type="text"
                            value={proData.bankAccount}
                            onChange={(e) => setProData({ ...proData, bankAccount: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">UPI ID for Escrow Payouts</label>
                          <input
                            type="text"
                            value={proData.upiId}
                            onChange={(e) => setProData({ ...proData, upiId: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Professional Info & Skills */}
                  {proStep === 3 && (
                    <div className="space-y-4">
                      <div className="text-xs font-black uppercase text-gray-400">Step 3 — Professional Category & Core Skills</div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Primary Discipline</label>
                          <select
                            value={proData.category}
                            onChange={(e) => setProData({ ...proData, category: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          >
                            <option value="Technology">Technology & Software</option>
                            <option value="Design">UI/UX & Creative Design</option>
                            <option value="Media">Photography & Cinematography</option>
                            <option value="Home Services">Home Services & Electrician</option>
                            <option value="Business">Business, CA & Legal</option>
                            <option value="Education">Tutors & Mentors</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Years of Experience</label>
                          <input
                            type="number"
                            value={proData.experienceYears}
                            onChange={(e) => setProData({ ...proData, experienceYears: Number(e.target.value) })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">Professional Title / Headline</label>
                        <input
                          type="text"
                          value={proData.profession}
                          onChange={(e) => setProData({ ...proData, profession: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Portfolio & Links */}
                  {proStep === 4 && (
                    <div className="space-y-4">
                      <div className="text-xs font-black uppercase text-gray-400">Step 4 — Portfolio Showcase & Social Links</div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">GitHub / Behance URL</label>
                          <input
                            type="url"
                            value={proData.githubUrl}
                            onChange={(e) => setProData({ ...proData, githubUrl: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">LinkedIn Profile</label>
                          <input
                            type="url"
                            value={proData.linkedinUrl}
                            onChange={(e) => setProData({ ...proData, linkedinUrl: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">Featured Project Title</label>
                        <input
                          type="text"
                          value={proData.portfolioTitle}
                          onChange={(e) => setProData({ ...proData, portfolioTitle: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 5: Pricing Definition */}
                  {proStep === 5 && (
                    <div className="space-y-4">
                      <div className="text-xs font-black uppercase text-gray-400">Step 5 — Define Transparent Pricing Tiers</div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Hourly Rate (₹)</label>
                          <input
                            type="number"
                            value={proData.hourlyRateINR}
                            onChange={(e) => setProData({ ...proData, hourlyRateINR: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Daily Rate (₹)</label>
                          <input
                            type="number"
                            value={proData.dailyRateINR}
                            onChange={(e) => setProData({ ...proData, dailyRateINR: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Fixed Milestone (₹)</label>
                          <input
                            type="number"
                            value={proData.fixedProjectPriceINR}
                            onChange={(e) => setProData({ ...proData, fixedProjectPriceINR: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Emergency Rate (₹)</label>
                          <input
                            type="number"
                            value={proData.emergencyRateINR}
                            onChange={(e) => setProData({ ...proData, emergencyRateINR: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 6: Availability & Service Radius */}
                  {proStep === 6 && (
                    <div className="space-y-4">
                      <div className="text-xs font-black uppercase text-gray-400">Step 6 — Service Location & Google Maps Working Radius</div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Operating Locality</label>
                          <input
                            type="text"
                            value={proData.locationArea}
                            onChange={(e) => setProData({ ...proData, locationArea: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Maximum Service Radius</label>
                          <select
                            value={proData.serviceRadiusKm}
                            onChange={(e) => setProData({ ...proData, serviceRadiusKm: Number(e.target.value) })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          >
                            <option value={5}>Within 5 km</option>
                            <option value={10}>Within 10 km</option>
                            <option value={25}>Within 25 km</option>
                            <option value={50}>Within 50 km (City-wide)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Working Days</label>
                          <input
                            type="text"
                            value={proData.workingDays}
                            onChange={(e) => setProData({ ...proData, workingDays: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">Work Mode</label>
                          <select
                            value={proData.mode}
                            onChange={(e) => setProData({ ...proData, mode: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                          >
                            <option value="Hybrid (Remote & Onsite)">Hybrid (Remote & Onsite)</option>
                            <option value="Onsite Only">Onsite Only</option>
                            <option value="Remote Only">Remote Only</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 7: Automated Verification Review & Trust Score */}
                  {proStep === 7 && (
                    <div className="space-y-4">
                      <div className="text-xs font-black uppercase text-gray-400">Step 7 — Automated AI Trust Engine Review</div>
                      
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0F172A] to-gray-900 text-white space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-400">Calculated Identity Rating</span>
                            <h4 className="text-xl font-black text-[#FF6B00]">99% GLID Trust Score</h4>
                          </div>
                          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400 font-bold text-lg border border-white/20">
                            A+
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/10 text-gray-300">
                          <div className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>UIDAI DigiLocker Verified</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Penny-Drop Bank Linked</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>100% Escrow Enabled</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Google Maps Active</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500">
                        Clicking publish activates your listing on Google Maps and allows nearby clients to book you instantly with milestone escrow protection.
                      </p>
                    </div>
                  )}

                  {/* Stepper Navigation Buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      disabled={proStep === 1}
                      onClick={() => setProProStep(prev => Math.max(1, prev - 1))}
                      className="px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 disabled:opacity-40"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={handleProNext}
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <span>{proStep === 7 ? (isSubmitting ? 'Publishing Profile...' : 'Publish Verified Profile') : 'Continue'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              )}

            </>
          )}

        </div>

      </div>

    </div>
  );
}
