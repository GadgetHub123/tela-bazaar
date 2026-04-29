"use client";
import { useState } from "react";
import { Pencil, Trash2, Plus, X, Check } from "lucide-react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
};

const emptyForm = { name: "", description: "", price: "", stock: "", category: "Fabrics", imageUrl: "" };

export default function AdminProductsClient({ products: initial }: { products: Product[] }) {
  const [products, setProducts] = useState(initial);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openAdd = () => {
    setEditProduct(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({ name: p.name, description: p.description, price: String(p.price), stock: String(p.stock), category: p.category, imageUrl: p.imageUrl });
    setShowModal(true);
  };

  const handleSave = async () => {
    setLoading(true);
    if (editProduct) {
      const res = await fetch(`/api/products/${editProduct.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock) }),
      });
      const updated = await res.json();
      setProducts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
    } else {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock) }),
      });
      const created = await res.json();
      setProducts((prev) => [...prev, created]);
    }
    setShowModal(false);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setDeleteId(id);
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  const categories = ["Fabrics", "Clothing", "Sinulid", "Accessories"];
  const categoryStats = categories.map((cat) => ({ name: cat, count: products.filter((p) => p.category === cat).length }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-400 text-sm mt-1">{products.length} produkto</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {categoryStats.map((c) => (
          <div key={c.name} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <p className="text-2xl font-bold text-gray-900">{c.count}</p>
            <p className="text-xs text-gray-400 mt-1">{c.name}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Product</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Stock</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-400 line-clamp-1 max-w-xs">{p.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-amber-50 text-amber-700 text-xs px-3 py-1 rounded-full">{p.category}</span>
                </td>
                <td className="px-6 py-4 font-semibold text-amber-600">&#8369;{p.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-gray-700 font-medium">{p.stock}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${p.stock > 50 ? "bg-green-100 text-green-700" : p.stock > 10 ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"}`}>
                    {p.stock > 50 ? "In Stock" : p.stock > 10 ? "Low Stock" : "Critical"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(p)} className="p-2 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 transition">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} disabled={deleteId === p.id} className="p-2 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 transition disabled:opacity-50">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{editProduct ? "Edit Product" : "Add Product"}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Product Name", key: "name", type: "text", placeholder: "e.g. Katsa White" },
                { label: "Image URL", key: "imageUrl", type: "text", placeholder: "https://..." },
                { label: "Price (₱)", key: "price", type: "number", placeholder: "e.g. 150" },
                { label: "Stock", key: "stock", type: "number", placeholder: "e.g. 100" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-gray-500 mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400 transition"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400 transition"
                >
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the product..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-400 transition resize-none"
                />
              </div>
              {form.imageUrl && (
                <div className="w-full h-32 rounded-xl overflow-hidden bg-gray-100">
                  <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition">
                Cancel
              </button>
              <button onClick={handleSave} disabled={loading} className="flex-1 bg-amber-500 text-white py-2.5 rounded-full text-sm font-medium hover:bg-amber-600 transition disabled:opacity-50 flex items-center justify-center gap-2">
                <Check size={16} />
                {loading ? "Saving..." : editProduct ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}