'use client';

import { products } from '@/lib/products';
import { useCart } from '@/lib/useCart';
import { useParams } from 'next/navigation';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetail() {
  const params = useParams();
  const { id } = params;
  const { addToCart, addToWishlist } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) return <div>Produk tidak ditemukan</div>;

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Image src={product.image} alt={product.name} width={500} height={500} className="w-full object-cover rounded-lg" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center mt-2">
            <FaStar className="text-yellow-500" />
            <span className="ml-1">
              {product.rating} ({product.reviews} ulasan)
            </span>
          </div>
          <p className="text-2xl font-bold mt-4 text-green-600">
            Rp{(product.price * (1 - (product.discount || 0) / 100)).toLocaleString()}
            {product.discount && <span className="text-gray-500 line-through text-lg ml-2">Rp{product.price.toLocaleString()}</span>}
          </p>
          {product.onPromotion && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded ml-2">Diskon {product.discount}%</span>}
          <p className="mt-4">{product.description}</p>
          <div className="mt-6 flex gap-3">
            <button onClick={() => addToCart(product)} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Tambah ke Keranjang
            </button>
            <button onClick={() => addToWishlist(product)} className="border border-gray-400 px-6 py-2 rounded hover:bg-gray-100">
              Simpan ke Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Ulasan */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Ulasan Pelanggan</h2>
        <div className="bg-gray-50 p-4 rounded">
          <p>“Produk bagus, pengiriman cepat!” – Budi, ★★★★★</p>
          <p className="mt-2">“Sesuai deskripsi, puas sekali.” – Siti, ★★★★☆</p>
        </div>
      </div>

      {/* Produk Terkait */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Produk Terkait</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {related.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className="block">
              <div className="border rounded p-3 hover:shadow">
                <Image src={p.image} alt={p.name} width={200} height={200} className="w-full h-40 object-cover rounded mb-2" />
                <h3 className="font-medium">{p.name}</h3>
                <p className="text-green-600">Rp{p.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
('use client');

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
