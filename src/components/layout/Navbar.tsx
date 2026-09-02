'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  ChevronDown, 
  Sparkles, 
  ShieldCheck, 
  Menu, 
  X, 
  User, 
  ArrowRight,
  LogOut,
  LayoutDashboard,
  Wallet,
  Settings,
  CheckCircle2,
  Lock,
  ExternalLink
} from 'lucide-react';
import RoleOnboardingHubModal, { UserOnboardingRole } from '@/components/account/RoleOnboardingHubModal';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout, login } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [onboardingRole, setOnboardingRole] = useState<UserOnboardingRole>('customer');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openOnboarding = (role: UserOnboardingRole = 'customer') => {
    setOnboardingRole(role);
    setIsOnboardingModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleQuickDemoLogin = () => {
    login({
      name: 'Giridhar Naik',
      email: 'giridhar@glid.network',
      role: 'professional',
      headline: 'Full Stack & AI Systems Engineer',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
      trustScore: 99,
      isVerified: true
    });
  };

  return (
    <>
      <header className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-[#E8EBF0] shadow-xs' 
          : 'bg-white border-[#E8EBF0]'
      }`}>
        
        {/* Main Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Left: Brand Logo */}
            <Link href="/" className="flex items-center group select-none flex-shrink-0">
              <span className="font-black text-2xl tracking-tight text-[#0F172A] leading-none group-hover:text-[#FF6B00] transition-colors">
                GLID<span className="text-[#FF6B00]">.</span>
              </span>
            </Link>

            {/* Center: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-gray-600">
              <Link href="/" className="hover:text-[#FF6B00] transition-colors">
                Home
              </Link>
              <Link href="/#about" className="hover:text-[#FF6B00] transition-colors">
                About
              </Link>
              <Link href="/services" className="hover:text-[#FF6B00] transition-colors">
                Services
              </Link>
              <Link href="/#how-it-works" className="hover:text-[#FF6B00] transition-colors">
                How It Works
              </Link>
              <button
                onClick={() => openOnboarding('professional')}
                className="hover:text-[#FF6B00] transition-colors text-left"
              >
                Become a Professional
              </button>
              <button
                onClick={() => openOnboarding('business')}
                className="hover:text-[#FF6B00] transition-colors text-left"
              >
                Businesses
              </button>
              <Link href="/explore" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Map Explore</span>
              </Link>
            </nav>

            {/* Right: Actions & Registered User Profile */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              
              {/* City Dropdown */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F9FB] hover:bg-gray-100 border border-[#E8EBF0] text-xs font-bold text-[#0F172A] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>{selectedCity}</span>
                  <ChevronDown className="w-3 h-3 text-gray-500" />
                </button>

                {isCityDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl border border-[#E8EBF0] shadow-xl py-1.5 z-50 text-xs font-semibold animate-in fade-in zoom-in-95">
                    {['Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi NCR'].map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setIsCityDropdownOpen(false);
                        }}
                        className={`w-full px-3.5 py-2 text-left hover:bg-orange-50 hover:text-[#FF6B00] transition-colors ${
                          selectedCity === city ? 'font-bold text-[#FF6B00]' : 'text-gray-700'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* AUTHENTICATED USER PROFILE (TOP RIGHT CORNER) */}
              {isAuthenticated && user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2.5 p-1.5 pl-2 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200/90 shadow-2xs hover:shadow-xs transition-all"
                  >
                    {/* Registered Person Profile Picture with Green Tick */}
                    <div className="relative flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover border border-white shadow-xs"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-[9px] font-bold border-2 border-white">
                        ✓
                      </div>
                    </div>

                    {/* Registered Person Name & Badge */}
                    <div className="text-left hidden sm:block pr-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-[#0F172A] leading-none">
                          {user.name}
                        </span>
                        <span className="px-1.5 py-0.2 rounded-full bg-orange-50 text-[#FF6B00] text-[9px] font-black uppercase">
                          {user.role === 'professional' ? 'Pro' : user.role === 'business' ? 'Biz' : 'Verified'}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-semibold block mt-0.5 leading-none">
                        {user.trustScore}% Trust Score
                      </span>
                    </div>

                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 mr-1" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-3xl border border-gray-200 shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 text-left space-y-1">
                      
                      {/* User Summary Header */}
                      <div className="p-3 rounded-2xl bg-[#F8F9FB] border border-gray-100 space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#16A34A]" />
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                            DigiLocker Authenticated
                          </span>
                        </div>
                        <h4 className="text-xs font-black text-[#0F172A] truncate">{user.name}</h4>
                        <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00] transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>My Dashboard</span>
                        </Link>

                        <Link
                          href="/explore"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00] transition-colors"
                        >
                          <MapPin className="w-4 h-4" />
                          <span>Discover Nearby Specialists</span>
                        </Link>

                        <Link
                          href="/escrow-guarantee"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00] transition-colors"
                        >
                          <Wallet className="w-4 h-4" />
                          <span>Escrow Payments & Security</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Log Out</span>
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              ) : (
                /* GUEST ACTIONS (NOT LOGGED IN) */
                <>
                  <button
                    onClick={() => openOnboarding('customer')}
                    className="px-3.5 py-2 rounded-xl hover:bg-gray-100 text-xs font-bold text-gray-700 transition-colors"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => openOnboarding('customer')}
                    className="px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white text-xs font-bold shadow-md shadow-orange-500/20 flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Get Started</span>
                  </button>
                </>
              )}

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white p-4 space-y-3 animate-in slide-in-from-top-2">
            
            {/* User Profile in Mobile Drawer if Logged In */}
            {isAuthenticated && user && (
              <div className="p-3 rounded-2xl bg-[#F8F9FB] border border-gray-200 flex items-center gap-3 mb-2">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-10 h-10 rounded-xl object-cover border border-white"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-black text-[#0F172A] truncate">{user.name}</h4>
                  <span className="text-[10px] text-emerald-600 font-bold block">✓ Verified Account</span>
                </div>
                <button
                  onClick={() => logout()}
                  className="p-1.5 rounded-xl text-red-500 hover:bg-red-50 text-xs font-bold"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00]"
            >
              Home
            </Link>
            <Link
              href="/#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00]"
            >
              About GLID
            </Link>
            <Link
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00]"
            >
              Services Directory
            </Link>
            <Link
              href="/explore"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00]"
            >
              Google Maps Radar
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00]"
            >
              Dashboard
            </Link>

            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => openOnboarding('customer')}
                    className="w-full py-2.5 rounded-xl bg-gray-100 text-xs font-bold text-gray-800"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => openOnboarding('professional')}
                    className="w-full py-2.5 rounded-xl bg-[#FF6B00] text-xs font-bold text-white shadow-md"
                  >
                    Register as Professional
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-red-50 text-xs font-bold text-red-600"
                >
                  Log Out
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Role Onboarding Registration & Verification Modal */}
      <RoleOnboardingHubModal
        isOpen={isOnboardingModalOpen}
        initialRole={onboardingRole}
        onClose={() => setIsOnboardingModalOpen(false)}
      />
    </>
  );
}
