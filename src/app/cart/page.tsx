'use client';

import { useCart } from '@/lib/useCart';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Keranjang Anda Kosong</h1>
        <Link href="/products" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Belanja Sekarang
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>
      <div className="bg-white rounded shadow p-6">
        {cart.map((item) => (
          <div key={item.product.id} className="flex items-center justify-between border-b pb-4 mb-4">
            <div className="flex items-center gap-4">
              <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-contain" />
              <div>
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-green-600">Rp{(item.product.price * item.quantity).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 text-center">{item.quantity}</span>
              <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-6">
          <p className="text-xl font-bold">Total: Rp{total.toLocaleString()}</p>
          <Link href="/checkout" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Lanjut ke Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
