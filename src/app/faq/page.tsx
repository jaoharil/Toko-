export default function FAQPage() {
  const faqs = [
    {
      q: 'Bagaimana cara memesan?',
      a: 'Pilih produk, tambahkan ke keranjang, lalu lanjutkan ke checkout.',
    },
    {
      q: 'Apakah ada garansi?',
      a: 'Produk elektronik bergaransi resmi 1 tahun.',
    },
    {
      q: 'Berapa lama pengiriman?',
      a: 'Estimasi 2-5 hari kerja tergantung lokasi.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Frequently Asked Questions (FAQ)</h1>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b pb-4">
            <h3 className="font-semibold">{faq.q}</h3>
            <p className="text-gray-700 mt-1">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
