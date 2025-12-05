export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Daftar Akun Baru</h1>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Nama Lengkap</label>
          <input type="text" className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" className="w-full border rounded px-3 py-2" required />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Daftar
        </button>
      </form>
      <p className="mt-4 text-center">
        Sudah punya akun?{' '}
        <a href="/auth/login" className="text-green-600 hover:underline">
          Masuk
        </a>
      </p>
    </div>
  );
}
