'use client';

import { useCart } from '@/lib/useCart';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ShippingCalculator from '@/components/ShippingCalculator';
import { FaTruck, FaCreditCard, FaQrcode } from 'react-icons/fa';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [ongkir, setOngkir] = useState(9000);
  const [kota, setKota] = useState('Jakarta');
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('transfer');

  // Hitung total
  useEffect(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    setTotal(subtotal + ongkir);
  }, [cart, ongkir]);

  const handleShippingChange = (harga: number, kota: string) => {
    setOngkir(harga);
    setKota(kota);
  };

  const handlePay = () => {
    // Simulasi: arahkan ke halaman sukses setelah "bayar"
    alert(`Pembayaran berhasil! Total: Rp${total.toLocaleString()}\nKirim ke: ${kota}`);
    clearCart();
    router.push('/'); // kembali ke beranda
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Keranjang kosong</h1>
        <button onClick={() => router.push('/products')} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Lihat Produk
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ringkasan Pesanan */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Alamat Pengiriman</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nama Lengkap</label>
                <input type="text" className="w-full border rounded px-3 py-2" placeholder="Contoh: Budi Santoso" required />
              </div>
              <div>
                <label className="block text-sm font-medium">Nomor Telepon</label>
                <input type="tel" className="w-full border rounded px-3 py-2" placeholder="081234567890" required />
              </div>
              <div>
                <label className="block text-sm font-medium">Alamat Lengkap</label>
                <textarea className="w-full border rounded px-3 py-2" rows={3} placeholder="Jl. Merdeka No. 123, RT 01/RW 02..." required></textarea>
              </div>
            </form>

            <ShippingCalculator onShippingChange={handleShippingChange} />

            <h2 className="text-xl font-semibold mb-4">Pilih Metode Pembayaran</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" value="transfer" checked={paymentMethod === 'transfer'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4" />
                <FaCreditCard className="text-blue-500" />
                <span>Transfer Bank (BCA, BNI, Mandiri)</span>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" value="qris" checked={paymentMethod === 'qris'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4" />
                <FaQrcode className="text-green-500" />
                <span>QRIS (DANA, OVO, GoPay)</span>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4" />
                <FaTruck className="text-gray-600" />
                <span>Bayar di Tempat (COD)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Ringkasan Belanja */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-xl font-semibold mb-4">Ringkasan Belanja</h2>
          <div className="space-y-2 mb-4">
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span>
                  {item.quantity}x {item.product.name}
                </span>
                <span>Rp{(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-2 space-y-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp{cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Ongkos kirim ({kota})</span>
              <span>Rp{ongkir.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span className="text-green-600">Rp{total.toLocaleString()}</span>
            </div>
          </div>
          <button onClick={handlePay} className="w-full mt-6 bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition">
            Bayar Sekarang
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">Data Anda aman. Situs ini menggunakan enkripsi SSL.</p>
        </div>
      </div>
    </div>
  );
}
