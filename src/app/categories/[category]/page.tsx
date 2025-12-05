'use client';

import { getProductsByCategory, categories } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams();
  const category = decodeURIComponent(params.category as string);

  if (!categories.includes(category)) {
    return <div className="container mx-auto px-4 py-12">Kategori tidak ditemukan.</div>;
  }

  const products = getProductsByCategory(category);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Kategori: {category}</h1>
      {products.length === 0 ? (
        <p>Tidak ada produk di kategori ini.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
