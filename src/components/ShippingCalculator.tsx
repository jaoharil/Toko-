'use client';

import { useState } from 'react';

const kotaOngkir = [
  { kota: 'Jakarta', ongkir: 9000 },
  { kota: 'Bandung', ongkir: 12000 },
  { kota: 'Surabaya', ongkir: 18000 },
  { kota: 'Medan', ongkir: 25000 },
  { kota: 'Makassar', ongkir: 28000 },
];

export default function ShippingCalculator({ onShippingChange }: { onShippingChange: (harga: number, kota: string) => void }) {
  const [selectedKota, setSelectedKota] = useState<string>('Jakarta');
  const selectedOngkir = kotaOngkir.find((k) => k.kota === selectedKota)?.ongkir || 0;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const kota = e.target.value;
    setSelectedKota(kota);
    const ongkir = kotaOngkir.find((k) => k.kota === kota)?.ongkir || 0;
    onShippingChange(ongkir, kota);
  };

  return (
    <div className="border-t border-b py-4 mb-4">
      <h3 className="font-semibold mb-2">Estimasi Ongkos Kirim</h3>
      <div className="flex items-center gap-3">
        <select value={selectedKota} onChange={handleChange} className="border rounded px-3 py-2">
          {kotaOngkir.map((k) => (
            <option key={k.kota} value={k.kota}>
              {k.kota}
            </option>
          ))}
        </select>
        <span className="text-green-600 font-medium">Rp{selectedOngkir.toLocaleString()}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">Estimasi: 2-3 hari kerja</p>
    </div>
  );
}
