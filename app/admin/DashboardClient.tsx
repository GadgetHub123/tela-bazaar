"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type Order = {
  id: string;
  name: string;
  items: number;
  total: number;
  payment: string;
  status: string;
  date: string;
};

type Props = {
  productCount: number;
  orderCount: number;
  userCount: number;
  revenue: number;
  recentOrders: Order[];
  ordersPerDay: { label: string; count: number }[];
};

export default function AdminDashboardClient({ productCount, orderCount, userCount, revenue, recentOrders, ordersPerDay }: Props) {
  const stats = [
    { label: "Total Products", value: productCount, icon: "🧵", color: "bg-amber-50 border-amber-200 text-amber-600" },
    { label: "Total Orders", value: orderCount, icon: "📦", color: "bg-blue-50 border-blue-200 text-blue-600" },
    { label: "Total Users", value: userCount, icon: "👥", color: "bg-green-50 border-green-200 text-green-600" },
    { label: "Total Revenue", value: `₱${revenue.toFixed(2)}`, icon: "💰", color: "bg-purple-50 border-purple-200 text-purple-600" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back, Admin. Here is what is happening today.</p>
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

      {/* Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-10">
        <h2 className="font-bold text-gray-900 mb-1">Orders This Week</h2>
        <p className="text-xs text-gray-400 mb-6">Daily order volume for the last 7 days</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={ordersPerDay} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{ borderRadius: "12px", border: "1px solid #f0f0f0", fontSize: "12px" }}
              cursor={{ fill: "#fef3c7" }}
            />
            <Bar dataKey="count" name="Orders" fill="#f59e0b" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50">
          <h2 className="font-bold text-gray-900">Recent Orders</h2>
          <p className="text-xs text-gray-400 mt-0.5">Latest {recentOrders.length} orders</p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Items</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left">Payment</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {recentOrders.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs flex-shrink-0">
                      {o.name[0].toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-800">{o.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-gray-400">#{o.id.slice(0, 8).toUpperCase()}</td>
                <td className="px-6 py-4 text-gray-500">{o.items} item(s)</td>
                <td className="px-6 py-4 font-semibold text-gray-900">&#8369;{o.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full capitalize">
                    {o.payment === "cod" ? "Cash on Delivery" : o.payment}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full capitalize">{o.status}</span>
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs">{new Date(o.date).toLocaleDateString("en-PH")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}