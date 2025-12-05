'use client';

import { getPromotions } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function PromotionsPage() {
  const promoProducts = getPromotions();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Promo Spesial</h1>
      {promoProducts.length === 0 ? (
        <p>Tidak ada promo saat ini.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {promoProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
