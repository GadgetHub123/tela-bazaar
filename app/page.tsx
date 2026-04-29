import { prisma } from "@/lib/prisma";
import ScrollReveal from "@/components/ScrollReveal";
import HeroSection from "@/components/HeroSection";
import PromoSection from "@/components/PromoSection";
import Link from "next/link";

export default async function HomePage() {
  const products = await prisma.product.findMany({ take: 8 });

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {[
            "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600",
            "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1600",
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1600",
            "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=1600",
            "https://images.unsplash.com/photo-1615486511262-c7fa02f26c4a?w=1600",
          ].map((url, i) => (
            <div key={i} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${url})`, animation: `heroSlide 20s infinite`, animationDelay: `${i * 4}s`, opacity: 0 }} />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <HeroSection />
      </section>

      {/* Promo — Premium Fabrics */}
      <PromoSection products={products} />

      {/* Split Promo */}
      <section className="grid md:grid-cols-2 min-h-[500px]">
        <ScrollReveal className="relative overflow-hidden bg-amber-50 flex flex-col items-center justify-center py-20 px-10 text-center">
          <p className="text-xs uppercase tracking-widest text-amber-600 mb-3">Para sa Pananahi</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Sinulid &amp; Accessories</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-xs">Kumpleto ang aming koleksyon para sa lahat ng iyong pananahi na proyekto.</p>
          <Link href="/shop?category=Sinulid" className="text-sm text-amber-600 hover:underline font-medium">Tingnan →</Link>
          <div className="mt-8 text-6xl">🪡</div>
        </ScrollReveal>
        <ScrollReveal delay={0.15} className="relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800" alt="Clothing" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-10">
            <p className="text-xs uppercase tracking-widest text-amber-300 mb-3">Damit at Pananamit</p>
            <h2 className="text-3xl font-bold text-white mb-3">Clothing Collection</h2>
            <p className="text-white/60 text-sm mb-6">Handa nang isuot. Angkop sa lahat ng okasyon.</p>
            <Link href="/shop?category=Clothing" className="bg-white text-gray-900 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-amber-400 hover:text-white transition">
              Shop Now
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-amber-500 mb-3">Mga Piling Produkto</p>
            <h2 className="text-4xl font-bold text-gray-900">Bestsellers</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <ScrollReveal key={p.id} delay={(i % 4) * 0.1}>
              <Link href={`/products/${p.id}`} className="group block">
                <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-3">
                  <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <p className="text-xs text-amber-500 uppercase tracking-wider mb-0.5">{p.category}</p>
                <p className="font-semibold text-gray-900 text-sm">{p.name}</p>
                <p className="text-amber-600 font-bold text-sm">&#8369;{p.price.toFixed(2)}</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <div className="text-center mt-12">
            <Link href="/shop" className="inline-block border border-gray-300 text-gray-700 px-10 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition">
              Tingnan Lahat ng Produkto
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Bottom Banner */}
      <ScrollReveal>
        <section className="bg-[#1d1d1f] py-16 px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-amber-400 mb-3">Tela Bazaar</p>
          <h2 className="text-3xl font-bold text-white mb-3">Mura. Maganda. Matibay.</h2>
          <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">Ang pinakamahusay na tela sa pinakamababang presyo. Para sa bawat Pilipino.</p>
          <Link href="/shop" className="inline-block bg-amber-500 hover:bg-amber-400 text-white px-10 py-3 rounded-full text-sm font-semibold transition">
            Mamili Na
          </Link>
        </section>
      </ScrollReveal>

      <style>{`
        @keyframes heroSlide {
          0% { opacity: 0; }
          5% { opacity: 1; }
          25% { opacity: 1; }
          30% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>

    </div>
  );
}