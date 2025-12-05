export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Kontak Kami</h1>
      <div className="bg-white p-6 rounded shadow">
        <p className="mb-4">
          <strong>Email:</strong> info@tokoku.com
        </p>
        <p className="mb-4">
          <strong>Telepon:</strong> (021) 1234-5678
        </p>
        <p className="mb-6">
          <strong>Alamat:</strong> Jl. Merdeka No. 123, Jakarta Pusat
        </p>
        <form className="space-y-4">
          <input type="text" placeholder="Nama Anda" className="w-full border rounded px-3 py-2" required />
          <input type="email" placeholder="Email" className="w-full border rounded px-3 py-2" required />
          <textarea placeholder="Pesan Anda" className="w-full border rounded px-3 py-2" rows={4} required></textarea>
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Kirim Pesan
          </button>
        </form>
      </div>
    </div>
  );
}
