'use client';

import Link from 'next/link';
import { useCart } from '@/lib/useCart';
import { useState } from 'react';
import { FaShoppingCart, FaHeart, FaSearch } from 'react-icons/fa';
import { categories } from '@/lib/products';

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Navbar component.
 *
 * This component displays the navigation bar of the website, including the
 * logo, search bar, navigation links, and login button.
 *
 * On mobile devices, the navigation links are hidden and can be
 * accessed by clicking the menu button.
 *
 * @returns {JSX.Element} The JSX element of the Navbar component.
 */
/*******  867bb8b7-02ef-4481-bf3b-2d0eb31c0c6c  *******/export default function Navbar() {
  const { cart, wishlist } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
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

        <div className="flex items-center space-x-3">
          <form onSubmit={handleSearch} className="hidden md:flex items-center border rounded px-2">
            <input type="text" placeholder="Cari produk..." className="py-1 px-2 outline-none text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button type="submit" className="text-gray-500">
              <FaSearch size={12} />
            </button>
          </form>

          <Link href="/wishlist" className="relative">
            <FaHeart className="text-gray-700" />
            {wishlist.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{wishlist.length}</span>}
          </Link>
          <Link href="/cart" className="relative">
            <FaShoppingCart className="text-gray-700" />
            {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{totalItems}</span>}
          </Link>
          <Link href="/auth/login" className="bg-green-600 text-white px-3 py-1 rounded text-sm hidden md:block">
            Masuk
          </Link>
        </div>

        <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 px-4 py-2 flex flex-col space-y-2">
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
          <Link href="/auth/login" className="bg-green-600 text-white px-4 py-2 rounded mt-2 text-center">
            Masuk
          </Link>
        </div>
      )}
    </nav>
  );
}
