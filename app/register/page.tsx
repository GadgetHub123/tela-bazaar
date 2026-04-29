"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "May error. Subukan ulit.");
      setLoading(false);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mag-register</h1>
        <p className="text-gray-400 text-sm mb-8">Gumawa ng account sa Tela Bazaar</p>

        {error && <p className="text-red-500 text-sm mb-4 bg-red-50 px-4 py-2 rounded-xl">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pangalan</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Juan dela Cruz"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-400"
            />
          </div>
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-amber-600 text-white py-3 rounded-full font-medium hover:bg-amber-700 transition disabled:opacity-50"
          >
            {loading ? "Nagre-register..." : "Register"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          May account na?{" "}
          <Link href="/login" className="text-amber-600 hover:underline">Mag-login</Link>
        </p>
      </div>
    </div>
  );
}