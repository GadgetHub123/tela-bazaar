import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-2">Tela Bazaar</h3>
            <p className="text-xs uppercase tracking-widest text-amber-400 mb-4">Mura at Maganda</p>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Simpleng tela at damit, presyong tiangge. Para sa pang-araw-araw na pananamit at proyekto ng bawat Pilipino.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Shop</p>
            <div className="space-y-2">
              {["Fabrics", "Clothing", "Sinulid", "Accessories"].map((cat) => (
                <Link key={cat} href={`/shop?category=${cat}`} className="block text-sm text-gray-400 hover:text-amber-400 transition">
                  {cat}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Account</p>
            <div className="space-y-2">
              {[
                { label: "Login", href: "/login" },
                { label: "Register", href: "/register" },
                { label: "My Orders", href: "/profile" },
                { label: "Cart", href: "/cart" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm text-gray-400 hover:text-amber-400 transition">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-600">
          &#169; 2026 Tela Bazaar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}