"use client";

import { useState } from "react";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Real API call to backend
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'footer', // Track where subscription came from
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setEmail("");
        // Reset status after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        console.error("Subscription failed:", result.error);
        // Reset status after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="newsletter" className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="text-6xl mb-6">📩</div>

          {/* Header */}
          <h2 className="text-4xl font-bold text-white mb-4">
            Subscribe to My Newsletter
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest articles, tutorials, and project updates delivered straight to your inbox
          </p>

          {/* Subscription Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe →"}
              </button>
            </div>
          </form>

          {/* Status Messages */}
          {status === "success" && (
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg inline-block">
              ✓ Successfully subscribed! Check your email.
            </div>
          )}

          {status === "error" && (
            <div className="bg-red-500 text-white px-6 py-3 rounded-lg inline-block">
              ✗ Something went wrong. Please try again.
            </div>
          )}

          {/* Info */}
          <p className="text-blue-100 text-sm mt-4">
            ✓ No spam, unsubscribe anytime
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-semibold mb-2">Weekly Tutorials</h3>
              <p className="text-sm text-blue-100">
                Learn new web development skills every week
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-semibold mb-2">Project Updates</h3>
              <p className="text-sm text-blue-100">
                Stay updated with my latest projects and case studies
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="font-semibold mb-2">Tips & Tricks</h3>
              <p className="text-sm text-blue-100">
                Get insider tips on coding and web development
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
