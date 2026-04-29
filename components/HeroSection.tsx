"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

const words = ["Maganda", "Matibay", "Maayos", "Makulay", "Makabago", "Maginhawa"];

export default function HeroSection() {
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(badgeRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .fromTo(headingRef.current, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" }, "-=0.2")
      .fromTo(wordRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3")
      .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2")
      .fromTo(btnsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(wordRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          setIndex((prev) => (prev + 1) % words.length);
          gsap.fromTo(wordRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
          );
        },
      });
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Parallax — text moves up faster than scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (contentRef.current) {
        gsap.set(contentRef.current, { y: -scrollY * 0.35 });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={contentRef} className="relative text-center text-white px-6 max-w-4xl mx-auto will-change-transform">
      <p ref={badgeRef} className="text-xs uppercase tracking-[0.3em] text-amber-300 mb-6" style={{ opacity: 0 }}>
        Presyong Tiangge · Premium Quality
      </p>
      <h1 ref={headingRef} className="font-bold leading-tight mb-6 whitespace-nowrap text-5xl md:text-7xl" style={{ opacity: 0 }}>
        Mura at{" "}
        <span ref={wordRef} className="inline-block italic font-serif text-amber-300" style={{ opacity: 0 }}>
          {words[index]}
        </span>
      </h1>
      <p ref={descRef} className="text-lg text-white/70 max-w-md mx-auto mb-10 leading-relaxed" style={{ opacity: 0 }}>
        Simpleng tela at damit, presyong tiangge. Para sa pang-araw-araw na pananamit at proyekto.
      </p>
      <div ref={btnsRef} className="flex flex-wrap gap-4 justify-center" style={{ opacity: 0 }}>
        <Link href="/shop" className="bg-amber-500 hover:bg-amber-400 text-white px-10 py-4 rounded-full font-semibold transition text-sm tracking-wide">
          Mamili na
        </Link>
        <Link href="/shop?category=Fabrics" className="border border-white/40 hover:border-white text-white px-10 py-4 rounded-full font-semibold transition text-sm tracking-wide backdrop-blur-sm">
          Browse Fabrics
        </Link>
      </div>
    </div>
  );
}