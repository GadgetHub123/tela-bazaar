"use client";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, User, Home, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const items = useCartStore((s) => s.items);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-100 px-8 py-4 flex items-center justify-between">
      <Link href="/" className="flex flex-col leading-none">
        <span className="text-xl font-bold tracking-tight text-gray-900">Tela Bazaar</span>
        <span className="text-xs text-amber-500 tracking-widest uppercase">Mura at Maganda</span>
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
        <Link href="/shop" className="hover:text-amber-600 transition">Shop</Link>
        <Link href="/shop?category=Fabrics" className="hover:text-amber-600 transition">Fabrics</Link>
        <Link href="/shop?category=Clothing" className="hover:text-amber-600 transition">Clothing</Link>
        <Link href="/shop?category=Accessories" className="hover:text-amber-600 transition">Accessories</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/" className="text-gray-400 hover:text-amber-600 transition">
          <Home size={20} />
        </Link>
        <Link href={session ? "/profile" : "/login"} className="text-gray-400 hover:text-amber-600 transition">
          <User size={20} />
        </Link>
        {session && (
          <button onClick={() => signOut({ callbackUrl: "/login" })} className="text-gray-400 hover:text-red-400 transition">
            <LogOut size={20} />
          </button>
        )}
        <Link href="/cart" className="relative text-gray-400 hover:text-amber-600 transition">
          <ShoppingBag size={20} />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
              {count}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}