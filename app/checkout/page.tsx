"use client";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const { data: session } = useSession();
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cod");
  const [gcash, setGcash] = useState("");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (!session) return router.push("/login");
    if (!address) return alert("Lagyan ng delivery address.");
    setLoading(true);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({ productId: i.id, quantity: i.quantity, price: i.price })),
        total: total(),
        address,
        paymentMethod: payment,
      }),
    });
    const data = await res.json();
    clearCart();
    router.push(`/orders/${data.id}`);
  };

  if (items.length === 0) return (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <p className="text-gray-400">Walang laman ang cart.</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              placeholder="Ilagay ang iyong address..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-400"
            />
          </div>

          {/* Payment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Paraan ng Bayad</label>
            <div className="space-y-3">
              {[
                { value: "cod", label: "💵 Cash on Delivery" },
                { value: "gcash", label: "💙 GCash" },
                { value: "card", label: "💳 Credit / Debit Card" },
              ].map((p) => (
                <label key={p.value} className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition ${payment === p.value ? "border-amber-500 bg-amber-50" : "border-gray-200"}`}>
                  <input type="radio" value={p.value} checked={payment === p.value} onChange={() => setPayment(p.value)} className="accent-amber-500" />
                  <span className="text-sm font-medium">{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          {payment === "gcash" && (
            <input value={gcash} onChange={(e) => setGcash(e.target.value)} placeholder="GCash number" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-400" />
          )}

          {payment === "card" && (
            <div className="space-y-3">
              <input value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} placeholder="Card number" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-400" />
              <div className="grid grid-cols-2 gap-3">
                <input value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} placeholder="MM/YY" className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-400" />
                <input value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} placeholder="CVV" className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-400" />
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-2xl p-6 h-fit">
          <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-gray-600">
                <span>{item.name} x{item.quantity}</span>
                <span>&#8369;{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-gray-900 mb-6">
            <span>Total</span>
            <span>&#8369;{total().toFixed(2)}</span>
          </div>
          <button
            onClick={handleOrder}
            disabled={loading}
            className="w-full bg-amber-600 text-white py-3 rounded-full font-medium hover:bg-amber-700 transition disabled:opacity-50"
          >
            {loading ? "Nagpo-proseso..." : payment === "cod" ? "I-place ang Order" : "Bayaran Ngayon"}
          </button>
        </div>
      </div>
    </div>
  );
}