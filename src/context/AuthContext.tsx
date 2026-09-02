'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'professional' | 'business' | 'agency' | 'student';
  avatarUrl: string;
  headline?: string;
  trustScore: number;
  isVerified: boolean;
  location?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (userData: Partial<AuthUser>) => void;
  register: (userData: Partial<AuthUser>) => void;
  logout: () => void;
  updateProfile: (updatedData: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'glid_auth_session';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Hydrate user session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load user session from localStorage', e);
    }
  }, []);

  const login = (userData: Partial<AuthUser>) => {
    const newUser: AuthUser = {
      id: userData.id || 'usr_' + Date.now(),
      name: userData.name || 'Giridhar Naik',
      email: userData.email || 'giridhar@glid.network',
      phone: userData.phone || '+91 98490 12345',
      role: userData.role || 'customer',
      avatarUrl: userData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      headline: userData.headline || (userData.role === 'professional' ? 'Verified Specialist' : 'Verified Client'),
      trustScore: userData.trustScore || 99,
      isVerified: true,
      location: userData.location || 'Hitech City, Hyderabad'
    };
    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch (e) {
      console.error('Failed to save user session', e);
    }
  };

  const register = (userData: Partial<AuthUser>) => {
    login(userData);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear user session', e);
    }
  };

  const updateProfile = (updatedData: Partial<AuthUser>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    setUser(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update user session', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
