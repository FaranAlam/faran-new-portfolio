"use client";

import { useState } from "react";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

export default function FreeResources() {
  const [email, setEmail] = useState("");
  const [downloadStatus, setDownloadStatus] = useState("");

  const handleDownload = (resourceName: string) => {
    if (!email) {
      setDownloadStatus("Please enter your email first!");
      return;
    }
    // Simulate download
    setDownloadStatus(`✅ ${resourceName} sent to ${email}!`);
    setTimeout(() => setDownloadStatus(""), 3000);
  };

  const resources = [
    {
      title: "Web Development Roadmap 2026",
      description: "Complete step-by-step guide to become a full-stack developer in 6 months. Includes learning path, resources, and project ideas.",
      icon: "🗺️",
      type: "PDF Guide",
      downloads: "1200+",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "React Components Library",
      description: "50+ reusable React components with Tailwind CSS. Copy-paste ready code for faster development.",
      icon: "⚛️",
      type: "Code Package",
      downloads: "890+",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      title: "Portfolio Website Template",
      description: "Professional portfolio template with dark mode, responsive design, and smooth animations. Built with Next.js.",
      icon: "🎨",
      type: "Full Template",
      downloads: "2100+",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "JavaScript Interview Prep",
      description: "100+ interview questions with detailed answers. Covers ES6+, async programming, and common patterns.",
      icon: "📝",
      type: "PDF Ebook",
      downloads: "1500+",
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "SEO Checklist for Developers",
      description: "Complete technical SEO checklist to optimize your website for search engines. Boost your rankings!",
      icon: "🔍",
      type: "Checklist",
      downloads: "750+",
      color: "from-green-500 to-green-600"
    },
    {
      title: "UI/UX Design System",
      description: "Complete design system with colors, typography, components, and best practices for modern web design.",
      icon: "🎯",
      type: "Figma File",
      downloads: "960+",
      color: "from-pink-500 to-red-500"
    }
  ];

  return (
    <section id="free-resources" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Free Resources for Developers</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Download premium templates, guides, and tools - completely FREE! Just enter your email and start learning.
              </p>
            </div>
          </FadeIn>

          {/* Email Input */}
          <FadeIn delay={0.2}>
            <div className="max-w-2xl mx-auto mb-16">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email to download resources"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
                  />
                  <button
                    onClick={() => handleDownload("Selected Resource")}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold shadow-md hover:scale-105 whitespace-nowrap"
                  >
                    Get Access
                  </button>
                </div>
                {downloadStatus && (
                  <p className={`mt-4 text-center font-semibold ${downloadStatus.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                    {downloadStatus}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-3 text-center">
                  🔒 Your email is safe with us. No spam, only valuable content!
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Resources Grid */}
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <StaggerItem key={index}>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full flex flex-col">
                  {/* Icon & Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${resource.color} flex items-center justify-center text-3xl`}>
                      {resource.icon}
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {resource.type}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-1">
                    {resource.description}
                  </p>

                  {/* Stats & Download */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      ⬇️ {resource.downloads} downloads
                    </span>
                    <button
                      onClick={() => handleDownload(resource.title)}
                      className={`px-4 py-2 bg-gradient-to-r ${resource.color} text-white rounded-lg hover:scale-105 transition-all duration-300 font-semibold text-sm shadow-md`}
                    >
                      Download
                    </button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Why Free Section */}
          <FadeIn delay={0.5}>
            <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Why Am I Giving These Away for FREE?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">💝</div>
                  <h4 className="font-bold text-gray-900 mb-2">Give Back to Community</h4>
                  <p className="text-gray-600 text-sm">
                    I learned from free resources. Now it&apos;s my turn to help others.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🚀</div>
                  <h4 className="font-bold text-gray-900 mb-2">Build Your Skills</h4>
                  <p className="text-gray-600 text-sm">
                    Quality resources shouldn&apos;t be behind paywalls. Learn and grow!
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🤝</div>
                  <h4 className="font-bold text-gray-900 mb-2">Connect & Collaborate</h4>
                  <p className="text-gray-600 text-sm">
                    Let&apos;s stay in touch and grow together as developers.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
