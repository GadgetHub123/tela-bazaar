import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const { category, search } = await searchParams;

  const products = await prisma.product.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
    },
    orderBy: { name: "asc" },
  });

  const categories = ["All", "Fabrics", "Clothing", "Sinulid", "Accessories"];

  return (
    <div className="bg-[#FDFAF6] min-h-screen">

      {/* Hero */}
      <div className="relative h-64 overflow-hidden">
        {/* Collage of fabric images */}
        <div className="absolute inset-0 grid grid-cols-5 grid-rows-1">
          {[
            "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&fit=crop",
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&fit=crop",
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&fit=crop",
            "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&fit=crop",
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&fit=crop",
          ].map((url, i) => (
            <div key={i} className="overflow-hidden">
              <img src={url} alt="" className="w-full h-full object-cover scale-110" />
            </div>
          ))}
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-3 font-medium">Tela Bazaar Collection</p>
          <h1 className="text-5xl font-bold text-white mb-3">
            Ang Aming <span className="italic font-serif text-amber-400">Shop</span>
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-amber-400/50" />
            <p className="text-white/50 text-sm">{products.length} produkto ang available</p>
            <div className="h-px w-12 bg-amber-400/50" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Search + Filters */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
            <div className="flex gap-3 flex-wrap">
              {categories.map((cat) => {
                const active = cat === "All" ? !category : category === cat;
                return (
                  <Link
                    key={cat}
                    href={cat === "All" ? "/shop" : `/shop?category=${cat}`}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                      active
                        ? "bg-amber-500 text-white shadow-md shadow-amber-200"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-amber-300 hover:text-amber-600"
                    }`}
                  >
                    {cat}
                  </Link>
                );
              })}
            </div>
            <form>
              <div className="relative">
                <input
                  name="search"
                  defaultValue={search}
                  placeholder="Hanapin..."
                  className="border border-gray-200 bg-white rounded-full pl-5 pr-14 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition w-56"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-500 text-white text-xs px-3 py-1.5 rounded-full hover:bg-amber-600 transition">
                  Go
                </button>
              </div>
            </form>
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <ScrollReveal key={p.id} delay={(i % 4) * 0.08}>
              <Link href={`/products/${p.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 block">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-amber-500 uppercase tracking-wider mb-1 font-medium">{p.category}</p>
                  <p className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">{p.name}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-amber-600 font-bold text-sm">&#8369;{p.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-300">{p.stock > 0 ? `${p.stock} left` : "Sold out"}</p>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-32">
            <p className="text-5xl mb-4">🧵</p>
            <p className="text-lg font-medium text-gray-400">Walang produktong nahanap.</p>
          </div>
        )}
      </div>
    </div>
  );
}