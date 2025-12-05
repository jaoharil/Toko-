import { products, getPromotions } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function HomePage() {
  const promoItems = getPromotions().slice(0, 4);
  const featuredItems = products.slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="bg-gradient-to-r from-green-500 to-teal-600 text-white text-center py-16 rounded-xl mb-10">
        <h1 className="text-4xl font-bold mb-4">Selamat Datang di TokoKu!</h1>
        <p className="text-xl mb-6">Diskon hingga 50% untuk pembelian hari ini!</p>
        <Link href="/promotions" className="bg-white text-green-600 px-6 py-2 rounded font-bold hover:bg-gray-100 inline-block">
          Lihat Promo
        </Link>
      </section>

      {promoItems.length > 0 && (
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">🔥 Promo Hari Ini</h2>
            <Link href="/promotions" className="text-green-600 hover:underline">
              Lihat Semua
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {promoItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-4">Produk Unggulan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredItems.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
