import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "./DashboardClient";

export default async function AdminDashboard() {
  const [productCount, orders, userCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.findMany({
      include: { items: true, user: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count(),
  ]);

  const revenue = orders.reduce((s, o) => s + o.total, 0);

  // Orders per day for chart (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toLocaleDateString("en-PH", { month: "short", day: "numeric" });
  });

  const ordersPerDay = last7Days.map((label) => ({
    label,
    count: orders.filter((o) => {
      const d = new Date(o.createdAt);
      return d.toLocaleDateString("en-PH", { month: "short", day: "numeric" }) === label;
    }).length,
  }));

  return (
    <AdminDashboardClient
      productCount={productCount}
      orderCount={orders.length}
      userCount={userCount}
      revenue={revenue}
      recentOrders={orders.slice(0, 8).map((o) => ({
        id: o.id,
        name: o.user.name,
        items: o.items.length,
        total: o.total,
        payment: o.paymentMethod,
        status: o.status,
        date: o.createdAt.toISOString(),
      }))}
      ordersPerDay={ordersPerDay}
    />
  );
}