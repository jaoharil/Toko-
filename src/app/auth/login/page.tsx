'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ← 🚨 WAJIB: cegah refresh halaman

    const success = login(email, password);
    if (success) {
      // Redirect setelah login sukses
      router.push('/');
      router.refresh(); // opsional: refresh UI jika perlu
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Masuk ke Akun</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="contoh@email.com" required />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="••••••••" required />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Masuk
        </button>
      </form>
      <p className="mt-4 text-center">
        Belum punya akun?{' '}
        <a href="/auth/register" className="text-green-600 hover:underline">
          Daftar
        </a>
      </p>
    </div>
  );
}
