// app/layout.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth'; // ← tambahkan ini

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TokoKu - Belanja Online Terpercaya',
  description: 'Toko online dengan promo menarik dan pengiriman cepat',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* 🔥 Bungkus seluruh app dengan AuthProvider */}
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
