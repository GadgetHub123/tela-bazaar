import { prisma } from "@/lib/prisma";

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } }, user: true },
    orderBy: { createdAt: "desc" },
  });

  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status === "pending").length;
  const cod = orders.filter((o) => o.paymentMethod === "cod").length;
  const paid = orders.filter((o) => o.paymentMethod !== "cod").length;

  const stats = [
    { label: "Total Orders", value: orders.length, color: "bg-blue-50 border-blue-200 text-blue-600", icon: "📦" },
    { label: "Pending", value: pending, color: "bg-amber-50 border-amber-200 text-amber-600", icon: "⏳" },
    { label: "Cash on Delivery", value: cod, color: "bg-orange-50 border-orange-200 text-orange-600", icon: "💵" },
    { label: "Total Revenue", value: `₱${revenue.toFixed(2)}`, color: "bg-green-50 border-green-200 text-green-600", icon: "💰" },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-400 text-sm mt-1">{orders.length} total orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className={`${s.color} border rounded-2xl p-5`}>
            <div className="text-2xl mb-3">{s.icon}</div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50">
          <h2 className="font-bold text-gray-900">All Orders</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Products</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left">Payment</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs flex-shrink-0">
                      {o.user.name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{o.user.name}</p>
                      <p className="text-xs text-gray-400">{o.user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-gray-400">#{o.id.slice(0, 8).toUpperCase()}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {o.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100">
                        <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {o.items.length > 3 && (
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                        +{o.items.length - 3}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900">&#8369;{o.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full capitalize">
                    {o.paymentMethod === "cod" ? "Cash on Delivery" : o.paymentMethod}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full capitalize">{o.status}</span>
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs">{new Date(o.createdAt).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}