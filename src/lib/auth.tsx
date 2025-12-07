// lib/auth.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('user');
      if (saved) {
        try {
          setUser(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse user from localStorage', e);
          localStorage.removeItem('user');
        }
      }
    }
  }, []);

  const register = (name: string, email: string, password: string): boolean => {
    if (!name || !email || !password) {
      alert('Semua field wajib diisi!');
      return false;
    }

    try {
      const usersStr = localStorage.getItem('users') || '[]';
      const users: Array<{ id: string; name: string; email: string; password: string }> = JSON.parse(usersStr);

      const exists = users.some((u) => u.email === email);
      if (exists) {
        alert('Email sudah terdaftar!');
        return false;
      }

      const newUser = { id: Date.now().toString(), name, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Pendaftaran berhasil! Silakan login.');
      return true;
    } catch (e) {
      console.error('Register error:', e);
      alert('Terjadi kesalahan saat daftar.');
      return false;
    }
  };

  const login = (email: string, password: string): boolean => {
    if (!email || !password) {
      alert('Email dan password wajib diisi!');
      return false;
    }

    try {
      const usersStr = localStorage.getItem('users') || '[]';
      const users = JSON.parse(usersStr);
      const userMatch = users.find((u: any) => u.email === email && u.password === password);

      if (userMatch) {
        const { password: _, ...safeUser } = userMatch;
        setUser(safeUser);
        localStorage.setItem('user', JSON.stringify(safeUser));
        return true;
      } else {
        alert('Email atau password salah!');
        return false;
      }
    } catch (e) {
      console.error('Login error:', e);
      alert('Terjadi kesalahan saat login.');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
