'use client';

import { Product } from '@/lib/products';
import { useCart } from '@/lib/useCart';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaHeart } from 'react-icons/fa';

export default function ProductCard({ product }: { product: Product }) {
  const { addToWishlist } = useCart();

  const finalPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition">
      <Link href={`/products/${product.id}`}>
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          <Image src={product.image} alt={product.name} width={200} height={200} className="object-contain p-2" />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
          <div className="flex items-center mt-1">
            <FaStar className="text-yellow-500 text-xs" />
            <span className="text-xs text-gray-500 ml-1">
              {product.rating} ({product.reviews})
            </span>
          </div>
          <div className="mt-2">
            <span className="text-green-600 font-bold">Rp{finalPrice.toLocaleString()}</span>
            {product.discount && <span className="text-gray-500 line-through text-xs ml-2">Rp{product.price.toLocaleString()}</span>}
          </div>
        </div>
      </Link>
      <button onClick={() => addToWishlist(product)} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow" aria-label="Tambah ke wishlist">
        <FaHeart className="text-gray-500 hover:text-red-500" />
      </button>
    </div>
  );
}
