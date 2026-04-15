"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";
import { motion } from "framer-motion";

export default function AdminSignupPage() {
  const router = useRouter();
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch("/api/auth/admin-status");
        const data = await res.json();
        if (res.ok && data.hasAdmin) {
          router.replace("/admin/login");
          return;
        }
      } catch (err) {
        console.error("Failed to check admin status:", err);
      } finally {
        setCheckingStatus(false);
      }
    };

    checkStatus();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/admin-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to create admin account");
      } else {
        router.replace("/admin/login?created=1");
      }
    } catch (err) {
      console.error("Admin signup error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingStatus) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-10 h-10 animate-spin text-blue-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m0 0l-2-1m2 1v2.5M14 4l-2 1m0 0L10 4m2 1V2.5M14 4v2.5M4 7l2 1m0 0l2-1m-2 1v2.5" />
          </svg>
          <p className="text-slate-300">Checking setup...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-600/20 rounded-full filter blur-3xl" />

      <FadeIn>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="flex justify-center mb-5">
            <Image
              src="/images/logos/logo1.jpg"
              alt="Faran Portfolio Logo"
              width={120}
              height={120}
              sizes="(max-width: 640px) 88px, 112px"
              className="w-[88px] h-[88px] sm:w-[112px] sm:h-[112px] rounded-2xl shadow-xl border border-slate-700"
              priority
            />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Create Admin</h1>
            <p className="text-gray-400">First-time setup for admin dashboard</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>

              <p className="text-xs text-slate-400">
                Use a strong password with uppercase, lowercase, number, and special character.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating admin..." : "Create Admin Account"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-700 text-center">
              <Link href="/admin/login" className="text-sm text-blue-400 hover:text-blue-300 transition">
                Back to Login
              </Link>
            </div>
          </div>
        </motion.div>
      </FadeIn>
    </div>
  );
}
