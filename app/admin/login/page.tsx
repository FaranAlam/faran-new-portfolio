"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasAdmin, setHasAdmin] = useState(false);

  useEffect(() => {
    const created = searchParams.get("created");
    if (created === "1") {
      setSuccess("Admin account created successfully. Please login.");
    }

    const loadAdminStatus = async () => {
      try {
        const response = await fetch("/api/auth/admin-status");
        const data = await response.json();
        setHasAdmin(response.ok ? Boolean(data.hasAdmin) : false);
      } catch (statusError) {
        console.error("Failed to load admin status:", statusError);
        setHasAdmin(false);
      }
    };

    loadAdminStatus();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("Login result:", result);

      if (result?.error) {
        // Handle error - check if it's a valid error message
        const errorMessage = result.error;
        if (errorMessage && errorMessage !== "undefined" && errorMessage.trim() !== "") {
          setError(errorMessage);
        } else {
          setError("Invalid email or password");
        }
      } else if (result?.ok) {
        router.push("/admin/dashboard/home");
        router.refresh();
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
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

          {/* Logo/Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">Secure access to your portfolio dashboard</p>
          </div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl"
          >
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
              >
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  {error}
                </p>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
              >
                <p className="text-green-400 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  {success}
                </p>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m4.753-4.753L3.596 3.039M9.856 17.6l13.6-13.6" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  href="/admin/forgot-password"
                  className="text-sm text-blue-400 hover:text-blue-300 transition"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m0 0l-2-1m2 1v2.5M14 4l-2 1m0 0L10 4m2 1V2.5M14 4v2.5M4 7l2 1m0 0l2-1m-2 1v2.5" />
                    </svg>
                    Logging in...
                  </>
                ) : (
                  <>Login to Dashboard</>
                )}
              </button>

              {!hasAdmin && (
                <Link
                  href="/admin/signup"
                  className="block text-center mt-3 px-6 py-3 border border-green-500/40 text-green-300 rounded-lg hover:bg-green-500/10 transition"
                >
                  First Time? Create Admin Account
                </Link>
              )}
            </form>
          </motion.div>

        </motion.div>
      </FadeIn>
    </div>
  );
}
