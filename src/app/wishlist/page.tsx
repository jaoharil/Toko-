'use client';

import { useCart } from '@/lib/useCart';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlist } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Wishlist Kosong</h1>
        <p className="mt-2">Simpan produk favorit Anda di sini!</p>
        <Link href="/products" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Lihat Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {wishlist.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
