"use client";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="bg-[#FDFAF6] min-h-screen">
        <div className="relative bg-gray-900 py-16 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600')] bg-cover bg-center opacity-20" />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-widest text-amber-400 mb-3">Tela Bazaar</p>
            <h1 className="text-4xl font-bold text-white">Iyong Cart</h1>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-6 py-32 text-center">
          <p className="text-6xl mb-6">🛍️</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Walang laman ang cart</h2>
          <p className="text-gray-400 mb-8 text-sm">Magdagdag ng mga produkto para magsimula.</p>
          <Link href="/shop" className="bg-amber-500 text-white px-10 py-3 rounded-full font-medium hover:bg-amber-600 transition text-sm">
            Pumunta sa Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFAF6] min-h-screen">

      {/* Hero */}
      <div className="relative bg-gray-900 py-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600')] bg-cover bg-center opacity-20" />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-widest text-amber-400 mb-3">Tela Bazaar</p>
          <h1 className="text-4xl font-bold text-white">Iyong Cart</h1>
          <p className="text-gray-400 text-sm mt-2">{items.length} item(s)</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">

          {/* Items */}
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-0.5">{item.name}</p>
                  <p className="text-amber-500 text-sm font-bold mb-3">&#8369;{item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 transition text-sm font-bold">-</button>
                    <span className="text-sm w-6 text-center font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 transition text-sm font-bold">+</button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeItem(item.id)} className="text-gray-200 hover:text-red-400 transition">
                    <Trash2 size={16} />
                  </button>
                  <p className="font-bold text-gray-900">&#8369;{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="h-fit bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h2 className="font-bold text-gray-900 mb-5 text-lg">Order Summary</h2>
            <div className="space-y-3 text-sm text-gray-500 mb-5">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="line-clamp-1 flex-1 mr-2">{item.name} x{item.quantity}</span>
                  <span className="font-medium text-gray-700">&#8369;{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm mb-5">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>&#8369;{total().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="text-green-500 font-medium">Free</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-900 text-lg mb-6">
              <span>Total</span>
              <span>&#8369;{total().toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="block text-center bg-amber-500 text-white px-6 py-3 rounded-full font-medium hover:bg-amber-600 transition text-sm">
              I-checkout →
            </Link>
            <Link href="/shop" className="block text-center text-gray-400 hover:text-gray-600 text-xs mt-3 transition">
              Magpatuloy sa pamimili
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}