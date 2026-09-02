'use client';

import React from 'react';

interface GlidLogoProps {
  className?: string;
  size?: number;
  variant?: string;
}

export default function GlidLogo({
  className = '',
}: GlidLogoProps) {
  return (
    <span className={`font-black tracking-tight text-[#0F172A] ${className}`}>
      GLID<span className="text-[#FF6B00]">.</span>
    </span>
  );
}
