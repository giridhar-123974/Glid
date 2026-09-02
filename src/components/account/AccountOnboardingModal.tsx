'use client';

import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  ShieldCheck, 
  Upload, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  MapPin, 
  Lock, 
  Image as ImageIcon,
  DollarSign,
  FileText,
  Building,
  Check,
  X
} from 'lucide-react';

export interface UserAccountData {
  role: 'client' | 'professional';
  name: string;
  email: string;
  phone: string;
  cityArea: string;
  avatarUrl: string;
  headline: string;
  bio: string;
  hourlyRateINR: number;
  skills: string[];
  portfolioItems: {
    title: string;
    imageUrl: string;
    category: string;
    liveUrl: string;
  }[];
  isKycVerified: boolean;
  aadhaarNumber: string;
}

export const DEFAULT_USER_ACCOUNT: UserAccountData = {
  role: 'professional',
  name: 'Giridhar Naik',
  email: 'giridhar@example.com',
  phone: '+91 98765 43210',
  cityArea: 'Hitech City, Hyderabad',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  headline: 'Senior Full Stack & AI Solutions Architect',
  bio: 'Over 6+ years building enterprise SaaS platforms, AI integrations, and mobile applications with 100% milestone delivery on GLID.',
  hourlyRateINR: 1500,
  skills: ['Next.js 15', 'React 19', 'TypeScript', 'AI Agents', 'Tailwind CSS', 'Node.js', 'Google Maps API'],
  portfolioItems: [
    {
      title: 'GLID Marketplace Architecture',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
      category: 'Web Development',
      liveUrl: 'https://glid.in'
    },
    {
      title: 'Fintech Escrow Mobile Dashboard',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
      category: 'UI/UX Design',
      liveUrl: 'https://github.com'
    }
  ],
  isKycVerified: true,
  aadhaarNumber: 'XXXX-XXXX-8912'
};

import { useAuth } from '@/context/AuthContext';

export default function AccountOnboardingModal({
  isOpen,
  onClose,
  onSaveAccount
}: {
  isOpen: boolean;
  onClose: () => void;
  onSaveAccount?: (data: UserAccountData) => void;
}) {
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [accountData, setAccountData] = useState<UserAccountData>(DEFAULT_USER_ACCOUNT);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [newPortTitle, setNewPortTitle] = useState('');
  const [newPortUrl, setNewPortUrl] = useState('');
  const [isVerifyingKyc, setIsVerifyingKyc] = useState(false);
  const [isSuccessSaved, setIsSuccessSaved] = useState(false);

  if (!isOpen) return null;

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !accountData.skills.includes(newSkillInput.trim())) {
      setAccountData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkillInput.trim()]
      }));
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setAccountData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const handleAddPortfolio = () => {
    if (newPortTitle.trim()) {
      setAccountData(prev => ({
        ...prev,
        portfolioItems: [
          ...prev.portfolioItems,
          {
            title: newPortTitle.trim(),
            imageUrl: newPortUrl.trim() || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
            category: 'Project Showcase',
            liveUrl: newPortUrl.trim() || '#'
          }
        ]
      }));
      setNewPortTitle('');
      setNewPortUrl('');
    }
  };

  const handleSimulateKyc = () => {
    setIsVerifyingKyc(true);
    setTimeout(() => {
      setIsVerifyingKyc(false);
      setAccountData(prev => ({ ...prev, isKycVerified: true }));
    }, 1200);
  };

  const handleSaveAndComplete = () => {
    register({
      name: accountData.name,
      email: accountData.email,
      phone: accountData.phone,
      role: accountData.role === 'client' ? 'customer' : 'professional',
      avatarUrl: accountData.avatarUrl,
      headline: accountData.headline,
      trustScore: 99,
      isVerified: accountData.isKycVerified
    });
    if (onSaveAccount) onSaveAccount(accountData);
    setIsSuccessSaved(true);
    setTimeout(() => {
      setIsSuccessSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-[20px] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E8EBF0] relative font-sans text-[#0F172A]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors text-sm font-bold"
        >
          ✕
        </button>

        {/* Header & Step Indicator */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8EBF0]">
          <div>
            <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider">
              PROFILE & PORTFOLIO MANAGEMENT
            </span>
            <h3 className="text-xl font-black text-[#0F172A]">
              {accountData.role === 'professional' ? 'Professional Creator Profile' : 'Client Hiring Profile'}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
            <span className={currentStep === 1 ? 'text-[#FF6B00]' : ''}>1. Account</span>
            <span>›</span>
            <span className={currentStep === 2 ? 'text-[#FF6B00]' : ''}>2. Bio & Skills</span>
            <span>›</span>
            <span className={currentStep === 3 ? 'text-[#FF6B00]' : ''}>3. Portfolio</span>
            <span>›</span>
            <span className={currentStep === 4 ? 'text-[#FF6B00]' : ''}>4. DigiLocker</span>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* STEP 1: ACCOUNT BASICS & ROLE                                     */}
        {/* ----------------------------------------------------------------- */}
        {currentStep === 1 && (
          <div className="space-y-4 text-xs animate-in fade-in">
            {/* Role Switcher */}
            <div>
              <label className="block font-bold text-[#0F172A] mb-1.5">Select Account Role:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAccountData(prev => ({ ...prev, role: 'professional' }))}
                  className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    accountData.role === 'professional'
                      ? 'border-[#FF6B00] bg-orange-50/50 shadow-xs'
                      : 'border-[#E8EBF0] bg-[#F8F9FB]'
                  }`}
                >
                  <Briefcase className="w-5 h-5 text-[#FF6B00]" />
                  <div>
                    <span className="font-bold block text-sm">Professional / Creator</span>
                    <span className="text-[11px] text-gray-500">Offer skills & receive Escrow payouts</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountData(prev => ({ ...prev, role: 'client' }))}
                  className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    accountData.role === 'client'
                      ? 'border-[#FF6B00] bg-orange-50/50 shadow-xs'
                      : 'border-[#E8EBF0] bg-[#F8F9FB]'
                  }`}
                >
                  <User className="w-5 h-5 text-[#16A34A]" />
                  <div>
                    <span className="font-bold block text-sm">Client / Business</span>
                    <span className="text-[11px] text-gray-500">Hire verified talent with Escrow</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Name, Email, Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Full Legal Name:</label>
                <input
                  type="text"
                  value={accountData.name}
                  onChange={(e) => setAccountData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2.5 rounded-xl bg-[#F8F9FB] border border-[#E8EBF0] font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Email Address:</label>
                <input
                  type="email"
                  value={accountData.email}
                  onChange={(e) => setAccountData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-2.5 rounded-xl bg-[#F8F9FB] border border-[#E8EBF0] font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Phone Number (OTP Verified):</label>
                <input
                  type="text"
                  value={accountData.phone}
                  onChange={(e) => setAccountData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-2.5 rounded-xl bg-[#F8F9FB] border border-[#E8EBF0] font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">City & Area (GPS):</label>
                <input
                  type="text"
                  value={accountData.cityArea}
                  onChange={(e) => setAccountData(prev => ({ ...prev, cityArea: e.target.value }))}
                  className="w-full p-2.5 rounded-xl bg-[#F8F9FB] border border-[#E8EBF0] font-semibold"
                />
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(2)}
              className="w-full btn-primary py-3 font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 mt-2"
            >
              <span>Next: Bio & Skills Setup</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* STEP 2: BIO, HEADLINE & SKILLS                                    */}
        {/* ----------------------------------------------------------------- */}
        {currentStep === 2 && (
          <div className="space-y-4 text-xs animate-in fade-in">
            <div>
              <label className="block font-bold text-[#0F172A] mb-1">Professional Headline:</label>
              <input
                type="text"
                value={accountData.headline}
                onChange={(e) => setAccountData(prev => ({ ...prev, headline: e.target.value }))}
                placeholder="e.g. Senior Full Stack Developer & AI Architect"
                className="w-full p-2.5 rounded-xl bg-[#F8F9FB] border border-[#E8EBF0] font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0F172A] mb-1">Professional Bio:</label>
              <textarea
                rows={3}
                value={accountData.bio}
                onChange={(e) => setAccountData(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full p-2.5 rounded-xl bg-[#F8F9FB] border border-[#E8EBF0] font-semibold resize-none"
              />
            </div>

            {/* Hourly Rate & Starting Price */}
            <div>
              <label className="block font-bold text-[#0F172A] mb-1">Hourly Rate (₹ INR):</label>
              <input
                type="number"
                value={accountData.hourlyRateINR}
                onChange={(e) => setAccountData(prev => ({ ...prev, hourlyRateINR: Number(e.target.value) }))}
                className="w-full p-2.5 rounded-xl bg-[#F8F9FB] border border-[#E8EBF0] font-semibold"
              />
            </div>

            {/* Skills Pills */}
            <div>
              <label className="block font-bold text-[#0F172A] mb-1">Verified Skills & Tools:</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  placeholder="Type a skill and press Enter (e.g. Next.js, Figma, 4K Drone)..."
                  className="flex-1 p-2 rounded-xl bg-[#F8F9FB] border border-[#E8EBF0] font-semibold"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-3 py-2 bg-[#0F172A] text-white font-bold rounded-xl"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {accountData.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-full bg-orange-50 text-[#FF6B00] border border-orange-200 font-bold flex items-center gap-1"
                  >
                    <span>{skill}</span>
                    <button onClick={() => handleRemoveSkill(skill)} className="hover:text-red-600 font-black">✕</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setCurrentStep(1)}
                className="py-3 px-4 rounded-xl border border-[#E8EBF0] font-bold"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="flex-1 btn-primary py-3 font-bold text-xs shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Next: Portfolio Showcase</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* STEP 3: PORTFOLIO SHOWCASE                                        */}
        {/* ----------------------------------------------------------------- */}
        {currentStep === 3 && (
          <div className="space-y-4 text-xs animate-in fade-in">
            <div>
              <label className="block font-bold text-[#0F172A] mb-1">Add Portfolio Showcase Item:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  value={newPortTitle}
                  onChange={(e) => setNewPortTitle(e.target.value)}
                  placeholder="Project Title (e.g. E-Commerce Redesign)"
                  className="p-2.5 rounded-xl bg-[#F8F9FB] border border-[#E8EBF0] font-semibold"
                />
                <input
                  type="text"
                  value={newPortUrl}
                  onChange={(e) => setNewPortUrl(e.target.value)}
                  placeholder="Image URL or Live Link"
                  className="p-2.5 rounded-xl bg-[#F8F9FB] border border-[#E8EBF0] font-semibold"
                />
              </div>
              <button
                type="button"
                onClick={handleAddPortfolio}
                className="w-full py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#0F172A] font-bold flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Portfolio Gallery</span>
              </button>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto">
              {accountData.portfolioItems.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#F8F9FB] border border-[#E8EBF0] flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 truncate">
                    <h4 className="font-bold text-xs truncate">{item.title}</h4>
                    <span className="text-[10px] text-gray-500">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setCurrentStep(2)}
                className="py-3 px-4 rounded-xl border border-[#E8EBF0] font-bold"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="flex-1 btn-primary py-3 font-bold text-xs shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Next: DigiLocker Government KYC</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* STEP 4: DIGILOCKER GOVERNMENT KYC & FINISH                        */}
        {/* ----------------------------------------------------------------- */}
        {currentStep === 4 && (
          <div className="space-y-4 text-xs animate-in fade-in">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-950">
                <ShieldCheck className="w-5 h-5 text-[#16A34A]" />
                <span className="font-black text-sm">Government DigiLocker Authentication</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Connect your Aadhaar to receive the official <strong>100% DigiLocker Verified Badge</strong> and unlock instantaneous Escrow payouts.
              </p>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={accountData.aadhaarNumber}
                  onChange={(e) => setAccountData(prev => ({ ...prev, aadhaarNumber: e.target.value }))}
                  placeholder="Enter Aadhaar Number (XXXX-XXXX-XXXX)"
                  className="flex-1 p-2.5 rounded-xl bg-white border border-emerald-300 font-mono text-xs font-bold"
                />
                <button
                  type="button"
                  onClick={handleSimulateKyc}
                  disabled={isVerifyingKyc}
                  className="px-4 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold whitespace-nowrap"
                >
                  {isVerifyingKyc ? 'Verifying...' : 'Verify Biometrics'}
                </button>
              </div>

              {accountData.isKycVerified && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#16A34A] pt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Aadhaar Identity Biometrically Authenticated (Trust Score: 99%)</span>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setCurrentStep(3)}
                className="py-3 px-4 rounded-xl border border-[#E8EBF0] font-bold"
              >
                Back
              </button>
              <button
                onClick={handleSaveAndComplete}
                className="flex-1 btn-primary py-3.5 font-bold text-xs shadow-md flex items-center justify-center gap-1.5"
              >
                {isSuccessSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Profile Saved! Loading Marketplace...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Complete Profile & Publish</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
