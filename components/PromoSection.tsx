"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export default function PromoSection({ products }: { products: Product[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const card0 = useRef<HTMLAnchorElement>(null);
  const card1 = useRef<HTMLAnchorElement>(null);
  const card2 = useRef<HTMLAnchorElement>(null);
  const card3 = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Text fade in
    gsap.fromTo(textRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" }
      }
    );

    // Each card parallax at different speeds
    const cards = [card0, card1, card2, card3];
    const speeds = [-40, -70, -50, -60];

    cards.forEach((card, i) => {
      if (!card.current) return;
      gsap.fromTo(card.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%", delay: i * 0.1 }
        }
      );
      gsap.to(card.current, {
        y: speeds[i],
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const cardRefs = [card0, card1, card2, card3];

  return (
    <section ref={sectionRef} className="bg-[#1d1d1f] py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Text */}
        <div ref={textRef} className="text-center mb-20" style={{ opacity: 0 }}>
          <p className="text-xs uppercase tracking-widest text-amber-400 mb-4">Bagong Koleksyon</p>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Premium <span className="italic font-serif text-amber-400">Fabrics.</span>
          </h2>
          <p className="text-gray-400 max-w-sm mx-auto mb-8 text-sm leading-relaxed">
            Mataas na kalidad na tela para sa bawat okasyon. Mula casual hanggang formal.
          </p>
          <div className="flex gap-6 justify-center">
            <Link href="/shop?category=Fabrics" className="text-sm text-amber-400 hover:text-amber-300 transition font-medium">
              Tingnan ang Fabrics →
            </Link>
            <Link href="/shop" className="text-sm text-white/40 hover:text-white transition">
              Shop All
            </Link>
          </div>
        </div>

        {/* Cards with individual parallax */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
          {products.slice(0, 4).map((p, i) => (
            <Link
              key={p.id}
              ref={cardRefs[i]}
              href={`/products/${p.id}`}
              className="group relative rounded-3xl overflow-hidden block"
              style={{ opacity: 0, marginTop: i % 2 === 1 ? "60px" : "0px" }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-gray-800">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 brightness-75 group-hover:brightness-90"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <p className="text-xs text-amber-400 uppercase tracking-wider mb-1">{p.category}</p>
                <p className="text-white text-sm font-semibold mb-0.5">{p.name}</p>
                <p className="text-amber-400 text-xs font-bold">&#8369;{p.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}