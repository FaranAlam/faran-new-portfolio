"use client";

import { useState } from "react";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

// SVG Icons for Free Resources
const LockIcon = () => (
  <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const MapIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);

const AtomIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1" />
    <path d="M20 12c0 4.4-3.6 8-8 8" />
    <path d="M4 12c0-4.4 3.6-8 8-8" />
    <path d="M12 4c4.4 0 8 3.6 8 8" />
    <path d="M12 20c-4.4 0-8-3.6-8-8" />
  </svg>
);

const PaletteIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="13.5" cy="6.5" r=".5" />
    <circle cx="17.5" cy="10.5" r=".5" />
    <circle cx="8.5" cy="7.5" r=".5" />
    <circle cx="6.5" cy="12.5" r=".5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const NoteIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h10l6 6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
    <path d="M14 4v6h6" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const RocketIcon = () => (
  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const HandshakeIcon = () => (
  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 11l-3-3a2 2 0 0 0-3 0l-2 2" />
    <path d="M12 11l3-3a2 2 0 0 1 3 0l2 2" />
    <path d="M5 13l2 2" />
    <path d="M17 13l-2 2" />
    <path d="M7 15l2 2" />
    <path d="M15 15l-2 2" />
  </svg>
);

interface ResourceItem {
  title: string;
  description: string;
  icon: () => JSX.Element;
  type: string;
  downloads: string;
  color: string;
}

export default function FreeResources() {
  const [email, setEmail] = useState("");
  const [downloadStatus, setDownloadStatus] = useState("");

  const handleDownload = (resourceName: string) => {
    if (!email) {
      setDownloadStatus("Please enter your email first!");
      return;
    }
    // Simulate download
    setDownloadStatus(`Sent: ${resourceName} to ${email}.`);
    setTimeout(() => setDownloadStatus(""), 3000);
  };

  const resources: ResourceItem[] = [
    {
      title: "Web Development Roadmap 2026",
      description: "Complete step-by-step guide to become a full-stack developer in 6 months. Includes learning path, resources, and project ideas.",
      icon: MapIcon,
      type: "PDF Guide",
      downloads: "1200+",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "React Components Library",
      description: "50+ reusable React components with Tailwind CSS. Copy-paste ready code for faster development.",
      icon: AtomIcon,
      type: "Code Package",
      downloads: "890+",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      title: "Portfolio Website Template",
      description: "Professional portfolio template with dark mode, responsive design, and smooth animations. Built with Next.js.",
      icon: PaletteIcon,
      type: "Full Template",
      downloads: "2100+",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "JavaScript Interview Prep",
      description: "100+ interview questions with detailed answers. Covers ES6+, async programming, and common patterns.",
      icon: NoteIcon,
      type: "PDF Ebook",
      downloads: "1500+",
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "SEO Checklist for Developers",
      description: "Complete technical SEO checklist to optimize your website for search engines. Boost your rankings!",
      icon: SearchIcon,
      type: "Checklist",
      downloads: "750+",
      color: "from-green-500 to-green-600"
    },
    {
      title: "UI/UX Design System",
      description: "Complete design system with colors, typography, components, and best practices for modern web design.",
      icon: TargetIcon,
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
                  <p className={`mt-4 text-center font-semibold ${downloadStatus.startsWith('Sent:') ? 'text-green-600' : 'text-red-600'}`}>
                    {downloadStatus}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-3 text-center">
                  <span className="inline-flex items-center gap-2">
                    <LockIcon />
                    Your email is safe with us. No spam, only valuable content!
                  </span>
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
                      <resource.icon />
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
                      <DownloadIcon />
                      {resource.downloads} downloads
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
                  <div className="flex justify-center mb-3">
                    <HeartIcon />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Give Back to Community</h4>
                  <p className="text-gray-600 text-sm">
                    I learned from free resources. Now it&apos;s my turn to help others.
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <RocketIcon />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Build Your Skills</h4>
                  <p className="text-gray-600 text-sm">
                    Quality resources shouldn&apos;t be behind paywalls. Learn and grow!
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <HandshakeIcon />
                  </div>
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
