"use client";

import { useState } from "react";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

// SVG Icons for Newsletter
const MailIcon = () => (
  <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const RocketIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const LightbulbIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 1.33.46 2.55 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CheckSmallIcon = () => (
  <svg className="w-4 h-4 text-blue-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

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
        // Subscription failed
        // Reset status after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      // Network error
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="newsletter" className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <MailIcon />
          </div>

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
                {status === "loading" ? (
                  "Subscribing..."
                ) : (
                  <span className="inline-flex items-center gap-2">
                    Subscribe
                    <ArrowRightIcon />
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Status Messages */}
          {status === "success" && (
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg inline-block">
              <span className="inline-flex items-center gap-2">
                <CheckIcon />
                Successfully subscribed! Check your email.
              </span>
            </div>
          )}

          {status === "error" && (
            <div className="bg-red-500 text-white px-6 py-3 rounded-lg inline-block">
              <span className="inline-flex items-center gap-2">
                <XIcon />
                Something went wrong. Please try again.
              </span>
            </div>
          )}

          {/* Info */}
          <p className="text-blue-100 text-sm mt-4">
            <span className="inline-flex items-center gap-2">
              <CheckSmallIcon />
              No spam, unsubscribe anytime
            </span>
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="flex justify-center mb-3">
                <BookIcon />
              </div>
              <h3 className="font-semibold mb-2">Weekly Tutorials</h3>
              <p className="text-sm text-blue-100">
                Learn new web development skills every week
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="flex justify-center mb-3">
                <RocketIcon />
              </div>
              <h3 className="font-semibold mb-2">Project Updates</h3>
              <p className="text-sm text-blue-100">
                Stay updated with my latest projects and case studies
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div className="flex justify-center mb-3">
                <LightbulbIcon />
              </div>
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
