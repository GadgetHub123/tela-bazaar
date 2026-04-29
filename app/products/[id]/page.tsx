import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { reviews: { include: { user: true } } },
  });

  if (!product) return notFound();

  const avg =
    product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
      : null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm text-amber-600 uppercase tracking-widest mb-2">{product.category}</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          {avg && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (<span key={s}>{s <= Math.round(avg) ? "★" : "☆"}</span>))}
              </div>
              <span className="text-sm text-gray-400">({product.reviews.length} reviews)</span>
            </div>
          )}
          <p className="text-3xl font-bold text-amber-600 mb-4">&#8369;{product.price.toFixed(2)}</p>
          <p className="text-gray-500 mb-6">{product.description}</p>
          <p className="text-sm text-gray-400 mb-8">
            {product.stock > 0 ? (<span className="text-green-500">{product.stock} in stock</span>) : (<span className="text-red-400">Out of stock</span>)}
          </p>
          <AddToCartButton product={product} />
        </div>
      </div>
      {product.reviews.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((r) => (
              <div key={r.id} className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm">{r.user.name[0]}</div>
                  <span className="font-medium text-gray-900 text-sm">{r.user.name}</span>
                  <div className="flex text-amber-400 text-sm">
                    {[1, 2, 3, 4, 5].map((s) => (<span key={s}>{s <= r.rating ? "★" : "☆"}</span>))}
                  </div>
                </div>
                {r.comment && <p className="text-gray-500 text-sm">{r.comment}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}