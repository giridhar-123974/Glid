'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  FileCheck, 
  Globe, 
  Apple, 
  Smartphone, 
  Mail, 
  ArrowUpRight 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0B1220] text-gray-400 border-t border-white/10 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Tier: Brand & 4 Equal Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          
          {/* Brand & Mission Statement (2 cols on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center text-2xl font-black text-white tracking-tight group">
              GLID<span className="text-[#FF6B00]">.</span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed font-medium max-w-sm">
              Global Local Identity & Discovery. India&apos;s verified AI-powered professional marketplace with live Google Maps radar and 100% RBI-regulated escrow protection.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#FF6B00] text-white flex items-center justify-center transition-colors font-bold text-xs"
                title="LinkedIn"
              >
                in
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#FF6B00] text-white flex items-center justify-center transition-colors font-bold text-xs"
                title="X / Twitter"
              >
                𝕏
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#FF6B00] text-white flex items-center justify-center transition-colors font-bold text-xs"
                title="GitHub"
              >
                gh
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#FF6B00] text-white flex items-center justify-center transition-colors font-bold text-xs"
                title="Instagram"
              >
                ig
              </a>
            </div>

            {/* App Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-[11px] font-semibold flex items-center gap-1.5">
                <Apple className="w-3.5 h-3.5 text-white" />
                <span>iOS App Store</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-[11px] font-semibold flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-white" />
                <span>Google Play</span>
              </div>
            </div>
          </div>

          {/* Column 1: Company */}
          <div className="space-y-3">
            <h4 className="font-black text-white text-xs uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 font-medium">
              <li><Link href="/#about" className="hover:text-white transition-colors">About GLID</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><a href="mailto:careers@glid.network" className="hover:text-white transition-colors flex items-center gap-1"><span>Careers</span><span className="text-[10px] px-1.5 py-0.2 rounded-md bg-orange-500/20 text-[#FF6B00] font-black">Hiring</span></a></li>
              <li><a href="mailto:press@glid.network" className="hover:text-white transition-colors">Press & Investors</a></li>
              <li><a href="mailto:support@glid.network" className="hover:text-white transition-colors flex items-center gap-1"><Mail className="w-3 h-3 text-[#FF6B00]" /><span>Contact Support</span></a></li>
            </ul>
          </div>

          {/* Column 2: Marketplace */}
          <div className="space-y-3">
            <h4 className="font-black text-white text-xs uppercase tracking-wider">Marketplace</h4>
            <ul className="space-y-2 font-medium">
              <li><Link href="/explore" className="hover:text-white transition-colors">Google Maps Radar</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">All 250+ Categories</Link></li>
              <li><Link href="/services?category=tech" className="hover:text-white transition-colors">Software & AI</Link></li>
              <li><Link href="/services?category=creative" className="hover:text-white transition-colors">4K Photography & Drone</Link></li>
              <li><Link href="/services?category=home_services" className="hover:text-white transition-colors">Master Electricians</Link></li>
            </ul>
          </div>

          {/* Column 3: Trust & Security */}
          <div className="space-y-3">
            <h4 className="font-black text-white text-xs uppercase tracking-wider">Trust & Security</h4>
            <ul className="space-y-2 font-medium">
              <li><Link href="/escrow-guarantee" className="hover:text-white transition-colors">100% Escrow Guarantee</Link></li>
              <li><Link href="/#about" className="hover:text-white transition-colors">DigiLocker e-KYC</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Client Escrow Dashboard</Link></li>
              <li><Link href="/ai-tools" className="hover:text-white transition-colors">AI Matching Engine</Link></li>
              <li><Link href="/dashboard?role=professional" className="hover:text-white transition-colors">Pro Onboarding Hub</Link></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="space-y-3">
            <h4 className="font-black text-white text-xs uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 font-medium">
              <li><Link href="/explore" className="hover:text-white transition-colors flex items-center gap-1"><span>Interactive Map Demo</span><ArrowUpRight className="w-3 h-3 text-gray-500" /></Link></li>
              <li><span className="text-gray-500 cursor-not-allowed">Developer API Docs</span></li>
              <li><span className="text-gray-500 cursor-not-allowed">B2B GST Tax Invoicing</span></li>
              <li><span className="text-gray-500 cursor-not-allowed">Dispute Mediation Policy</span></li>
              <li><span className="text-emerald-500 font-bold flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Systems Operational</span></li>
            </ul>
          </div>

        </div>

        {/* Security & Compliance Badges Strip */}
        <div className="py-6 border-y border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-300 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>ISO 27001 Certified</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-300 font-bold text-xs">
            <FileCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span>DigiLocker Verification</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-300 font-bold text-xs">
            <Lock className="w-4 h-4 text-[#FF6B00] flex-shrink-0" />
            <span>RBI Escrow Compliant</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-300 font-bold text-xs">
            <Globe className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span>GDPR & DPDP Ready</span>
          </div>
        </div>

        {/* Bottom Legal & Copyright Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 font-medium">
          <div>
            © {new Date().getFullYear()} GLID Network Technologies Pvt. Ltd. All rights reserved. Built for India.
          </div>
          <div className="flex flex-wrap items-center gap-4 text-gray-400">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Escrow Trust Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Security Audits</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
