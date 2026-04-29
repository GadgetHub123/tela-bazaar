"use client";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={product.stock === 0}
      className="flex items-center gap-2 bg-amber-600 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ShoppingBag size={18} />
      {added ? "Naidagdag na!" : "Idagdag sa Cart"}
    </button>
  );
}