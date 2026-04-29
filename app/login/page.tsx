"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError("Mali ang email o password.");
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mag-login</h1>
        <p className="text-gray-400 text-sm mb-8">Maligayang pagbabalik sa Tela Bazaar</p>

        {error && <p className="text-red-500 text-sm mb-4 bg-red-50 px-4 py-2 rounded-xl">{error}</p>}

        <div className="space-y-4">
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
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-amber-600 text-white py-3 rounded-full font-medium hover:bg-amber-700 transition disabled:opacity-50"
          >
            {loading ? "Naglo-login..." : "Login"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Wala pang account?{" "}
          <Link href="/register" className="text-amber-600 hover:underline">Mag-register</Link>
        </p>
      </div>
    </div>
  );
}