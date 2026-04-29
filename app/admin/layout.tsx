import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || (session.user as any).role !== "admin") redirect("/");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-56 bg-gray-900 text-white flex flex-col py-8 px-4 fixed h-full">
        <div className="mb-10">
          <p className="text-lg font-bold text-white">Tela Bazaar</p>
          <p className="text-xs text-amber-400 uppercase tracking-widest">Admin Panel</p>
        </div>
        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/admin" className="px-4 py-2.5 rounded-xl hover:bg-gray-800 transition text-gray-300 hover:text-white">Dashboard</Link>
          <Link href="/admin/products" className="px-4 py-2.5 rounded-xl hover:bg-gray-800 transition text-gray-300 hover:text-white">Products</Link>
          <Link href="/admin/orders" className="px-4 py-2.5 rounded-xl hover:bg-gray-800 transition text-gray-300 hover:text-white">Orders</Link>
        </nav>
        <div className="mt-auto">
          <Link href="/" className="px-4 py-2.5 rounded-xl hover:bg-gray-800 transition text-gray-400 hover:text-white text-sm block">
            ← Back to Site
          </Link>
        </div>
      </aside>
      <main className="ml-56 flex-1 p-10">{children}</main>
    </div>
  );
}