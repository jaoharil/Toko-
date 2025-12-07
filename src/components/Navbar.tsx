'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useCart } from '@/lib/useCart'; // ← tambahkan ini
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaShoppingCart, FaHeart, FaSearch } from 'react-icons/fa';
import { categories } from '@/lib/products';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart, wishlist } = useCart(); // ← ambil data keranjang & wishlist
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Hitung total item di keranjang
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white text-black shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-green-600">
          TokoKu
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-green-600">
            Beranda
          </Link>
          <div className="relative group">
            <button className="hover:text-green-600">Kategori</button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded mt-1 py-1 w-48">
              {categories.map((cat) => (
                <Link key={cat} href={`/categories/${cat}`} className="block px-4 py-1 hover:bg-gray-100">
                  {cat}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/promotions" className="hover:text-green-600">
            Promo
          </Link>
          <Link href="/faq" className="hover:text-green-600">
            FAQ
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center border rounded px-2">
            <input type="text" placeholder="Cari produk..." className="py-1 px-2 outline-none text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button type="submit" className="text-gray-500">
              <FaSearch size={12} />
            </button>
          </form>

          {/* Wishlist Icon */}
          <Link href="/wishlist" className="relative text-gray-700 hover:text-red-500">
            <FaHeart size={18} />
            {wishlist.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{wishlist.length}</span>}
          </Link>

          {/* Keranjang Icon */}
          <Link href="/cart" className="relative text-gray-700 hover:text-blue-500">
            <FaShoppingCart size={18} />
            {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{totalItems}</span>}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm hidden md:block">Halo, {user.name}</span>
              <button
                onClick={() => {
                  logout();
                  router.refresh();
                }}
                className="text-red-600 text-sm hover:underline"
              >
                Keluar
              </button>
            </div>
          ) : (
            <Link href="/auth/login" className="bg-green-600 text-white px-3 py-1 rounded text-sm hidden md:block">
              Masuk
            </Link>
          )}
        </div>

        <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden text-black bg-gray-50 px-4 py-2 flex flex-col space-y-2">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            Beranda
          </Link>
          <details className="mb-2">
            <summary className="cursor-pointer">Kategori</summary>
            <div className="pl-4 mt-1 space-y-1">
              {categories.map((cat) => (
                <Link key={cat} href={`/categories/${cat}`} className="block hover:text-green-600" onClick={() => setIsMenuOpen(false)}>
                  {cat}
                </Link>
              ))}
            </div>
          </details>
          <Link href="/promotions" onClick={() => setIsMenuOpen(false)}>
            Promo
          </Link>
          <Link href="/faq" onClick={() => setIsMenuOpen(false)}>
            FAQ
          </Link>

          {/* Mobile: Icon keranjang & wishlist */}
          <div className="flex gap-4 pt-2">
            <Link href="/wishlist" onClick={() => setIsMenuOpen(false)} className="text-gray-700">
              <FaHeart size={20} />
            </Link>
            <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="text-gray-700">
              <FaShoppingCart size={20} />
            </Link>
          </div>

          {user ? (
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
                router.refresh();
              }}
              className="text-red-600 text-left mt-2"
            >
              Keluar
            </button>
          ) : (
            <Link href="/auth/login" className="bg-green-600 text-white px-4 py-2 rounded mt-2 text-center" onClick={() => setIsMenuOpen(false)}>
              Masuk
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
