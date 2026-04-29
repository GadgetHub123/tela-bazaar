import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  const totalSpent = orders.reduce((s, o) => s + o.total, 0);
  const totalItems = orders.reduce((s, o) => s + o.items.reduce((si, i) => si + i.quantity, 0), 0);

  return (
    <div className="bg-[#FDFAF6] min-h-screen">

      {/* Hero Banner */}
      <div className="relative bg-gray-900 py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-amber-400 flex items-center justify-center text-3xl font-bold text-white flex-shrink-0 shadow-lg">
            {session.user.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-400 mb-1">Iyong Account</p>
            <h1 className="text-3xl font-bold text-white">{session.user.name}</h1>
            <p className="text-gray-400 text-sm mt-1">{session.user.email}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { label: "Total Orders", value: orders.length, icon: "📦" },
            { label: "Items Bought", value: totalItems, icon: "🛍️" },
            { label: "Total Spent", value: `₱${totalSpent.toFixed(2)}`, icon: "💳" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl mb-2">{s.icon}</div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Admin Link */}
        {(session.user as any).role === "admin" && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex items-center justify-between">
            <div>
              <p className="font-semibold text-amber-800 text-sm">Admin Access</p>
              <p className="text-amber-600 text-xs mt-0.5">Ikaw ay may admin privileges</p>
            </div>
            <Link href="/admin" className="bg-amber-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-amber-600 transition">
              Admin Panel →
            </Link>
          </div>
        )}

        {/* Orders */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Iyong mga Order</h2>
          <p className="text-sm text-gray-400">{orders.length} orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100">
            <p className="text-5xl mb-4">🛍️</p>
            <p className="font-semibold text-gray-900 mb-2">Wala pang orders</p>
            <p className="text-gray-400 text-sm mb-6">Magsimula nang mamili sa aming koleksyon.</p>
            <Link href="/shop" className="bg-amber-500 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-amber-600 transition">
              Mamili na
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-mono text-xs text-gray-400 mb-0.5">#{order.id.slice(0, 12).toUpperCase()}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium capitalize">
                      {order.status}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium capitalize">
                      {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* Product thumbnails */}
                <div className="flex gap-2 mb-4">
                  {order.items.slice(0, 5).map((item) => (
                    <div key={item.id} className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {order.items.length > 5 && (
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xs text-gray-400 font-medium">
                      +{order.items.length - 5}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                  <p className="text-xs text-gray-400">{order.items.length} item(s)</p>
                  <p className="font-bold text-gray-900">&#8369;{order.total.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}