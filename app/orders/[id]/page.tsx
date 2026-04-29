import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } } },
  });

  if (!order) return notFound();

  const paymentLabel =
    order.paymentMethod === "gcash"
      ? "GCash"
      : order.paymentMethod === "card"
      ? "Credit / Debit Card"
      : "Cash on Delivery";

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">✓</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-400 text-sm">Salamat sa iyong order. Ipoproseso na ito.</p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 mb-6">
        <p className="text-xs text-gray-400 mb-1">Order ID</p>
        <p className="font-mono font-medium text-gray-900">#{order.id.slice(0, 12).toUpperCase()}</p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 mb-6 space-y-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
              <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">{item.product.name}</p>
              <p className="text-gray-400 text-xs">x{item.quantity}</p>
            </div>
            <p className="font-medium text-gray-900 text-sm">&#8369;{(item.priceAtPurchase * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 mb-6 space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>&#8369;{order.total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="text-green-500">Free</span>
        </div>
        <div className="flex justify-between font-bold text-gray-900 border-t border-gray-200 pt-3">
          <span>Total</span>
          <span>&#8369;{order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 mb-6 space-y-3 text-sm text-gray-600">
        <div>
          <p className="text-xs text-gray-400 mb-1">Delivering to</p>
          <p className="font-medium text-gray-900">{order.address}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Payment method</p>
          <p className="font-medium text-gray-900">{paymentLabel}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link href="/shop" className="flex-1 text-center border border-gray-200 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-50 transition text-sm">
          Magpatuloy sa Shopping
        </Link>
        <Link href="/profile" className="flex-1 text-center bg-amber-600 text-white py-3 rounded-full font-medium hover:bg-amber-700 transition text-sm">
          Tingnan ang Orders
        </Link>
      </div>
    </div>
  );
}