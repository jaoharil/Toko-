'use client';

import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('search')?.toLowerCase() || '';

  const filteredProducts = query ? products.filter((p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)) : products;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Semua Produk</h1>
      {filteredProducts.length === 0 ? (
        <p>Produk tidak ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
