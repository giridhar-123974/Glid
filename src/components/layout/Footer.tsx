import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-10 text-xs text-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          
          {/* Brand */}
          <Link href="/" className="flex items-center group select-none">
            <span className="font-black text-xl text-gray-900 tracking-tight group-hover:text-[#FF6B00] transition-colors">
              GLID<span className="text-[#FF6B00]">.</span>
            </span>
          </Link>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-6 font-semibold text-gray-600">
            <Link href="/explore" className="hover:text-gray-900 transition-colors">Explore Talent</Link>
            <Link href="/services" className="hover:text-gray-900 transition-colors">Categories</Link>
            <Link href="/ai-tools" className="hover:text-gray-900 transition-colors">AI Suite</Link>
            <Link href="/escrow-guarantee" className="hover:text-gray-900 transition-colors">Escrow Guarantee</Link>
            <Link href="/dashboard?role=professional" className="hover:text-gray-900 transition-colors">Become a Pro</Link>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <div>
            © {new Date().getFullYear()} GLID Technologies Pvt. Ltd. All rights reserved. Made in India.
          </div>
          <div className="flex items-center gap-4 font-semibold text-emerald-600">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% RBI Escrow Compliant
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
