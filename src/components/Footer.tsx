export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3">TokoKu</h3>
            <p className="text-sm">Toko online terpercaya sejak 2025.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Layanan</h4>
            <ul className="text-sm space-y-1">
              <li>
                <a href="/faq" className="hover:text-green-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-green-300">
                  Kontak Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-300">
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Kontak</h4>
            <p className="text-sm">
              Email: info@tokoku.com
              <br />
              Telepon: (021) 1234-5678
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Ikuti Kami</h4>
            <p className="text-sm">Instagram, Facebook, Twitter</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">© 2025 TokoKu. All rights reserved.</div>
      </div>
    </footer>
  );
}
