"use client";

import { useEffect, useRef, useState } from "react";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

// Icons
const BookIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.746 10-10.747 0-5.002-4.5-10.747-10-10.747z" />
  </svg>
);

const CodeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm6-10V7a3 3 0 00-6 0v4a3 3 0 006 0z" />
  </svg>
);

interface EngineeringSemester {
  semesterNum: number;
  courses: {
    name: string;
    files: {
      type: "Slides" | "Lab Manual" | "Assignment" | "Notes" | "Project" | "Other";
      downloadCount: number;
    }[];
  }[];
}

interface DeveloperCourse {
  name: string;
  resourceId: string;
  files: {
    type: "Tutorial" | "Codebase" | "Cheatsheet" | "Project" | "Resource";
    downloadCount: number;
  }[];
}

export default function FreeResources() {
  const [activeTab, setActiveTab] = useState<"developer" | "engineer">("developer");
  const [email, setEmail] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [downloadStatus, setDownloadStatus] = useState("");
  const [expandedSemester, setExpandedSemester] = useState<number | null>(null);
  const [expandedResource, setExpandedResource] = useState<string | null>(null);
  const [resourceFiles, setResourceFiles] = useState<Record<string, string[]>>({});
  const [loadingResource, setLoadingResource] = useState<string | null>(null);
  const statusRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!downloadStatus || !statusRef.current) return;
    statusRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [downloadStatus]);

  // Engineering Curriculum Data - 7 Semesters
  const engineeringData: EngineeringSemester[] = [
    {
      semesterNum: 1,
      courses: [
        { name: "Arabic – I", files: [{ type: "Slides", downloadCount: 340 }, { type: "Notes", downloadCount: 210 }, { type: "Other", downloadCount: 85 }] },
        { name: "Calculus & Analytical Geometry", files: [{ type: "Slides", downloadCount: 520 }, { type: "Assignment", downloadCount: 180 }, { type: "Notes", downloadCount: 290 }, { type: "Other", downloadCount: 145 }] },
        { name: "Applied Physics", files: [{ type: "Lab Manual", downloadCount: 410 }, { type: "Slides", downloadCount: 380 }, { type: "Notes", downloadCount: 250 }, { type: "Other", downloadCount: 130 }] },
        { name: "Functional English", files: [{ type: "Notes", downloadCount: 165 }, { type: "Assignment", downloadCount: 140 }, { type: "Other", downloadCount: 70 }] },
        { name: "Islamic Studies", files: [{ type: "Slides", downloadCount: 290 }, { type: "Notes", downloadCount: 200 }, { type: "Other", downloadCount: 95 }] },
        { name: "Information and Communication Technologies", files: [{ type: "Slides", downloadCount: 450 }, { type: "Lab Manual", downloadCount: 280 }, { type: "Other", downloadCount: 115 }] },
        { name: "Computer Engineering Workshop", files: [{ type: "Project", downloadCount: 320 }, { type: "Lab Manual", downloadCount: 270 }, { type: "Other", downloadCount: 105 }] },
      ]
    },
    {
      semesterNum: 2,
      courses: [
        { name: "Arabic-II", files: [{ type: "Slides", downloadCount: 310 }, { type: "Notes", downloadCount: 190 }, { type: "Other", downloadCount: 80 }] },
        { name: "Circuit Analysis", files: [{ type: "Slides", downloadCount: 580 }, { type: "Notes", downloadCount: 340 }, { type: "Assignment", downloadCount: 220 }, { type: "Other", downloadCount: 155 }] },
        { name: "Circuit Analysis Lab", files: [{ type: "Lab Manual", downloadCount: 470 }, { type: "Project", downloadCount: 290 }, { type: "Other", downloadCount: 125 }] },
        { name: "Electronic Device and Circuit", files: [{ type: "Slides", downloadCount: 520 }, { type: "Notes", downloadCount: 310 }, { type: "Assignment", downloadCount: 180 }, { type: "Other", downloadCount: 140 }] },
        { name: "Electronic Device and Circuit Lab", files: [{ type: "Lab Manual", downloadCount: 430 }, { type: "Project", downloadCount: 260 }, { type: "Other", downloadCount: 110 }] },
        { name: "Fundamental of Programming", files: [{ type: "Slides", downloadCount: 750 }, { type: "Notes", downloadCount: 420 }, { type: "Assignment", downloadCount: 310 }, { type: "Other", downloadCount: 185 }] },
        { name: "FOP Lab task", files: [{ type: "Lab Manual", downloadCount: 520 }, { type: "Project", downloadCount: 350 }, { type: "Other", downloadCount: 160 }] },
        { name: "Linear Algebra", files: [{ type: "Slides", downloadCount: 440 }, { type: "Notes", downloadCount: 270 }, { type: "Assignment", downloadCount: 150 }, { type: "Other", downloadCount: 120 }] },
      ]
    },
    {
      semesterNum: 3,
      courses: [
        { name: "Complex Variable", files: [{ type: "Slides", downloadCount: 380 }, { type: "Notes", downloadCount: 240 }, { type: "Assignment", downloadCount: 160 }, { type: "Other", downloadCount: 105 }] },
        { name: "Discrete Structure", files: [{ type: "Slides", downloadCount: 620 }, { type: "Notes", downloadCount: 380 }, { type: "Assignment", downloadCount: 270 }, { type: "Other", downloadCount: 165 }] },
        { name: "Digital Logic Design (DLD)", files: [{ type: "Slides", downloadCount: 680 }, { type: "Notes", downloadCount: 420 }, { type: "Assignment", downloadCount: 290 }, { type: "Other", downloadCount: 175 }] },
        { name: "DLD Lab", files: [{ type: "Lab Manual", downloadCount: 550 }, { type: "Project", downloadCount: 340 }, { type: "Other", downloadCount: 145 }] },
        { name: "Object Oriented Programming (OOP)", files: [{ type: "Slides", downloadCount: 820 }, { type: "Notes", downloadCount: 510 }, { type: "Assignment", downloadCount: 380 }, { type: "Project", downloadCount: 290 }, { type: "Other", downloadCount: 215 }] },
        { name: "Pakistan Studies", files: [{ type: "Slides", downloadCount: 290 }, { type: "Notes", downloadCount: 180 }, { type: "Other", downloadCount: 75 }] },
      ]
    },
    {
      semesterNum: 4,
      courses: [
        { name: "Applied Social Sciences Lab (ASSL)", files: [{ type: "Lab Manual", downloadCount: 320 }, { type: "Project", downloadCount: 210 }, { type: "Other", downloadCount: 105 }] },
        { name: "Computer Architecture and Organization", files: [{ type: "Slides", downloadCount: 720 }, { type: "Notes", downloadCount: 450 }, { type: "Assignment", downloadCount: 310 }, { type: "Other", downloadCount: 190 }] },
        { name: "Computer Architecture and Organization Lab", files: [{ type: "Lab Manual", downloadCount: 480 }, { type: "Project", downloadCount: 300 }, { type: "Other", downloadCount: 140 }] },
        { name: "Data Structure", files: [{ type: "Slides", downloadCount: 850 }, { type: "Notes", downloadCount: 520 }, { type: "Assignment", downloadCount: 420 }, { type: "Project", downloadCount: 350 }, { type: "Other", downloadCount: 235 }] },
        { name: "Data Structure Lab", files: [{ type: "Lab Manual", downloadCount: 620 }, { type: "Project", downloadCount: 410 }, { type: "Other", downloadCount: 195 }] },
        { name: "Differential Equation", files: [{ type: "Slides", downloadCount: 410 }, { type: "Notes", downloadCount: 280 }, { type: "Assignment", downloadCount: 180 }, { type: "Other", downloadCount: 120 }] },
        { name: "Numerical Methods", files: [{ type: "Slides", downloadCount: 520 }, { type: "Notes", downloadCount: 340 }, { type: "Assignment", downloadCount: 220 }, { type: "Other", downloadCount: 135 }] },
        { name: "Numerical Methods Lab", files: [{ type: "Lab Manual", downloadCount: 380 }, { type: "Project", downloadCount: 240 }, { type: "Other", downloadCount: 100 }] },
        { name: "Signal and System", files: [{ type: "Slides", downloadCount: 610 }, { type: "Notes", downloadCount: 390 }, { type: "Assignment", downloadCount: 260 }, { type: "Other", downloadCount: 155 }] },
        { name: "Signal and System Lab", files: [{ type: "Lab Manual", downloadCount: 470 }, { type: "Project", downloadCount: 310 }, { type: "Other", downloadCount: 130 }] },
      ]
    },
    {
      semesterNum: 5,
      courses: [
        { name: "Computer Networks", files: [{ type: "Slides", downloadCount: 760 }, { type: "Notes", downloadCount: 480 }, { type: "Assignment", downloadCount: 340 }, { type: "Other", downloadCount: 195 }] },
        { name: "Computer Networks Lab", files: [{ type: "Lab Manual", downloadCount: 520 }, { type: "Project", downloadCount: 360 }, { type: "Other", downloadCount: 145 }] },
        { name: "Digital Signal Processing", files: [{ type: "Slides", downloadCount: 640 }, { type: "Notes", downloadCount: 410 }, { type: "Assignment", downloadCount: 280 }, { type: "Other", downloadCount: 170 }] },
        { name: "Digital Signal Processing Lab", files: [{ type: "Lab Manual", downloadCount: 450 }, { type: "Project", downloadCount: 310 }, { type: "Other", downloadCount: 135 }] },
        { name: "Engineering Economics", files: [{ type: "Slides", downloadCount: 380 }, { type: "Notes", downloadCount: 240 }, { type: "Other", downloadCount: 105 }] },
        { name: "Microprocessor", files: [{ type: "Slides", downloadCount: 680 }, { type: "Notes", downloadCount: 420 }, { type: "Assignment", downloadCount: 300 }, { type: "Other", downloadCount: 175 }] },
        { name: "Microprocessor Lab", files: [{ type: "Lab Manual", downloadCount: 510 }, { type: "Project", downloadCount: 350 }, { type: "Other", downloadCount: 155 }] },
        { name: "Operating System", files: [{ type: "Slides", downloadCount: 820 }, { type: "Notes", downloadCount: 510 }, { type: "Assignment", downloadCount: 380 }, { type: "Other", downloadCount: 215 }] },
        { name: "Operating System Lab", files: [{ type: "Lab Manual", downloadCount: 590 }, { type: "Project", downloadCount: 420 }, { type: "Other", downloadCount: 195 }] },
      ]
    },
    {
      semesterNum: 6,
      courses: [
        { name: "AI and ML", files: [{ type: "Slides", downloadCount: 920 }, { type: "Notes", downloadCount: 580 }, { type: "Assignment", downloadCount: 420 }, { type: "Other", downloadCount: 240 }] },
        { name: "AI and ML Lab", files: [{ type: "Lab Manual", downloadCount: 640 }, { type: "Project", downloadCount: 470 }, { type: "Other", downloadCount: 200 }] },
        { name: "Database Management System", files: [{ type: "Slides", downloadCount: 780 }, { type: "Notes", downloadCount: 490 }, { type: "Assignment", downloadCount: 350 }, { type: "Other", downloadCount: 205 }] },
        { name: "Database Management System Lab", files: [{ type: "Lab Manual", downloadCount: 580 }, { type: "Project", downloadCount: 400 }, { type: "Other", downloadCount: 180 }] },
        { name: "Probability and Statistics", files: [{ type: "Slides", downloadCount: 520 }, { type: "Notes", downloadCount: 330 }, { type: "Assignment", downloadCount: 240 }, { type: "Other", downloadCount: 140 }] },
        { name: "Software Engineering", files: [{ type: "Slides", downloadCount: 640 }, { type: "Notes", downloadCount: 400 }, { type: "Assignment", downloadCount: 290 }, { type: "Other", downloadCount: 165 }] },
        { name: "System Programming", files: [{ type: "Slides", downloadCount: 550 }, { type: "Notes", downloadCount: 350 }, { type: "Assignment", downloadCount: 240 }, { type: "Other", downloadCount: 145 }] },
        { name: "System Programming Lab", files: [{ type: "Lab Manual", downloadCount: 420 }, { type: "Project", downloadCount: 300 }, { type: "Other", downloadCount: 120 }] },
      ]
    },
    {
      semesterNum: 7,
      courses: [
        { name: "Computer Vision", files: [{ type: "Slides", downloadCount: 780 }, { type: "Notes", downloadCount: 480 }, { type: "Assignment", downloadCount: 340 }, { type: "Other", downloadCount: 200 }] },
        { name: "Computer Vision Lab", files: [{ type: "Lab Manual", downloadCount: 550 }, { type: "Project", downloadCount: 380 }, { type: "Other", downloadCount: 165 }] },
        { name: "Digital System Design", files: [{ type: "Slides", downloadCount: 620 }, { type: "Notes", downloadCount: 390 }, { type: "Assignment", downloadCount: 270 }, { type: "Other", downloadCount: 160 }] },
        { name: "Digital System Design Lab", files: [{ type: "Lab Manual", downloadCount: 480 }, { type: "Project", downloadCount: 320 }, { type: "Other", downloadCount: 130 }] },
        { name: "Engineering Project Management", files: [{ type: "Slides", downloadCount: 450 }, { type: "Notes", downloadCount: 280 }, { type: "Other", downloadCount: 120 }] },
        { name: "Final Year Project - I", files: [{ type: "Project", downloadCount: 520 }, { type: "Notes", downloadCount: 320 }, { type: "Other", downloadCount: 165 }] },
        { name: "Professional Ethics", files: [{ type: "Slides", downloadCount: 380 }, { type: "Notes", downloadCount: 230 }, { type: "Other", downloadCount: 105 }] },
        { name: "Technical Report Writing", files: [{ type: "Slides", downloadCount: 420 }, { type: "Notes", downloadCount: 260 }, { type: "Other", downloadCount: 115 }] },
      ]
    },
    {
      semesterNum: 8,
      courses: [
        { name: "Al Quran Al Karim", files: [{ type: "Slides", downloadCount: 310 }, { type: "Notes", downloadCount: 190 }, { type: "Other", downloadCount: 85 }] },
        { name: "Cloud Computing", files: [{ type: "Slides", downloadCount: 850 }, { type: "Notes", downloadCount: 520 }, { type: "Assignment", downloadCount: 380 }, { type: "Other", downloadCount: 220 }] },
        { name: "Cloud Computing Lab", files: [{ type: "Lab Manual", downloadCount: 620 }, { type: "Project", downloadCount: 420 }, { type: "Other", downloadCount: 185 }] },
        { name: "Engineering Entrepreneurship", files: [{ type: "Slides", downloadCount: 480 }, { type: "Notes", downloadCount: 310 }, { type: "Assignment", downloadCount: 220 }, { type: "Other", downloadCount: 155 }] },
        { name: "Final Year Project - II", files: [{ type: "Project", downloadCount: 680 }, { type: "Notes", downloadCount: 410 }, { type: "Assignment", downloadCount: 290 }, { type: "Other", downloadCount: 215 }] },
        { name: "Mobile Application Development", files: [{ type: "Slides", downloadCount: 920 }, { type: "Notes", downloadCount: 580 }, { type: "Project", downloadCount: 470 }, { type: "Other", downloadCount: 275 }] },
        { name: "Neural Networks", files: [{ type: "Slides", downloadCount: 760 }, { type: "Notes", downloadCount: 480 }, { type: "Assignment", downloadCount: 350 }, { type: "Project", downloadCount: 290 }, { type: "Other", downloadCount: 245 }] },
      ]
    }
  ];

  // Developer Topics Data
  const developerTopics: DeveloperCourse[] = [
    { name: "Web Development Roadmap 2026", resourceId: "web-development-roadmap-2026", files: [{ type: "Tutorial", downloadCount: 1240 }, { type: "Resource", downloadCount: 890 }, { type: "Cheatsheet", downloadCount: 650 }] },
    { name: "React Components Library", resourceId: "react-components-library", files: [{ type: "Codebase", downloadCount: 1820 }, { type: "Tutorial", downloadCount: 1320 }, { type: "Project", downloadCount: 950 }] },
    { name: "Portfolio Website Template", resourceId: "portfolio-website-template", files: [{ type: "Codebase", downloadCount: 2100 }, { type: "Tutorial", downloadCount: 1450 }, { type: "Project", downloadCount: 1200 }] },
    { name: "JavaScript Interview Prep", resourceId: "javascript-interview-prep", files: [{ type: "Tutorial", downloadCount: 1650 }, { type: "Cheatsheet", downloadCount: 1320 }, { type: "Resource", downloadCount: 920 }] },
    { name: "SEO Checklist for Developers", resourceId: "seo-checklist-for-developers", files: [{ type: "Cheatsheet", downloadCount: 980 }, { type: "Resource", downloadCount: 750 }, { type: "Tutorial", downloadCount: 640 }] },
    { name: "UI/UX Design System", resourceId: "ui-ux-design-system", files: [{ type: "Tutorial", downloadCount: 1550 }, { type: "Codebase", downloadCount: 1200 }, { type: "Resource", downloadCount: 890 }] },
    { name: "Database Design Best Practices", resourceId: "database-design-best-practices", files: [{ type: "Tutorial", downloadCount: 1100 }, { type: "Cheatsheet", downloadCount: 840 }, { type: "Resource", downloadCount: 720 }] },
    { name: "API Development Fundamentals", resourceId: "api-development-fundamentals", files: [{ type: "Tutorial", downloadCount: 1380 }, { type: "Codebase", downloadCount: 1050 }, { type: "Resource", downloadCount: 820 }] },
  ];


  const getResourceKey = (resourceId: string, courseSlug: string) => `${resourceId}/${courseSlug}`;

  // Handle verification with API
  const handleVerifyEmail = async () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setDownloadStatus("❌ Please enter a valid email address!");
      setTimeout(() => setDownloadStatus(""), 3000);
      return;
    }

    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase() })
      });

      const data = await response.json();

      if (response.ok) {
        setVerifiedEmail(email.toLowerCase());
        setDownloadStatus("✅ " + data.message);
        setTimeout(() => setDownloadStatus(""), 3000);
      } else {
        setDownloadStatus("❌ " + data.message);
        setTimeout(() => setDownloadStatus(""), 4000);
      }
    } catch (error) {
      setDownloadStatus("❌ Verification failed. Please try again.");
      setTimeout(() => setDownloadStatus(""), 3000);
    }
  };

  const handleDownload = async (resourceId: string, courseSlug: string, fileName: string) => {
    if (!verifiedEmail) {
      setDownloadStatus("❌ Please verify your IIUI email first!");
      setTimeout(() => setDownloadStatus(""), 3000);
      return;
    }

    try {
      setDownloadStatus("⬇️ Downloading...");
      
      const params = new URLSearchParams({
        resourceId,
        courseSlug,
        fileName,
        email: verifiedEmail
      });
      
      const downloadUrl = `/api/approved-download?${params.toString()}`;
      
      // Fetch file as blob for more reliable download
      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error('Download failed');
      }
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Trigger download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(blobUrl);
      
      setDownloadStatus("✅ Download started!");
      setTimeout(() => setDownloadStatus(""), 3000);
    } catch (error) {
      setDownloadStatus("❌ Download failed. Please try again.");
      setTimeout(() => setDownloadStatus(""), 3000);
    }
  };

  const handlePreview = async (resourceId: string, courseSlug: string, fileName: string) => {
    // Check if file can be previewed in browser
    const ext = fileName.toLowerCase().split('.').pop();
    const previewableExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'txt'];
    
    const params = new URLSearchParams({
      resourceId,
      courseSlug,
      fileName,
      email: verifiedEmail,
      preview: 'true'
    });
    
    const previewUrl = `/api/approved-download?${params.toString()}`;
    
    if (previewableExtensions.includes(ext || '')) {
      // Open in new tab for preview
      window.open(previewUrl, '_blank');
    } else {
      // Download non-previewable files using blob
      try {
        setDownloadStatus("⬇️ Downloading...");
        const response = await fetch(previewUrl);
        if (!response.ok) throw new Error('Download failed');
        
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        window.URL.revokeObjectURL(blobUrl);
        setDownloadStatus("✅ Download started!");
        setTimeout(() => setDownloadStatus(""), 3000);
      } catch (error) {
        setDownloadStatus("❌ Download failed.");
        setTimeout(() => setDownloadStatus(""), 3000);
      }
    }
  };

  const fetchResourceFiles = async (resourceId: string, courseSlug: string) => {
    if (!verifiedEmail) {
      setDownloadStatus("❌ Please verify your IIUI email first!");
      setTimeout(() => setDownloadStatus(""), 3000);
      return;
    }

    const key = getResourceKey(resourceId, courseSlug);
    setLoadingResource(key);

    try {
      const params = new URLSearchParams({
        email: verifiedEmail,
        resourceId,
        courseSlug
      });
      const response = await fetch(`/api/download?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setResourceFiles((prev) => ({ ...prev, [key]: data.availableFiles || [] }));
      } else {
        setDownloadStatus("❌ " + data.message);
        setTimeout(() => setDownloadStatus(""), 4000);
      }
    } catch (error) {
      setDownloadStatus("❌ Failed to load files.");
      setTimeout(() => setDownloadStatus(""), 3000);
    } finally {
      setLoadingResource(null);
    }
  };

  const handleToggleResource = async (resourceId: string, courseSlug: string) => {
    const key = getResourceKey(resourceId, courseSlug);
    const shouldExpand = expandedResource !== key;
    setExpandedResource(shouldExpand ? key : null);

    if (shouldExpand && !resourceFiles[key]) {
      await fetchResourceFiles(resourceId, courseSlug);
    }
  };

  return (
    <section id="free-resources" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Free Learning Resources</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Access comprehensive study materials compiled from my computer engineering journey and full-stack development expertise.
              </p>
            </div>
          </FadeIn>

          {/* Email Verification */}
          <FadeIn delay={0.2}>
            <div className="max-w-2xl mx-auto mb-12">
              <div className="bg-white dark:bg-gray-800/70 rounded-2xl p-6 shadow-lg border-2 border-blue-100 dark:border-blue-500/30">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email to access resources"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-600 focus:outline-none transition-colors bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    disabled={!!verifiedEmail}
                  />
                  <button
                    onClick={handleVerifyEmail}
                    disabled={!!verifiedEmail}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
                      verifiedEmail
                        ? "bg-green-600 text-white"
                        : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
                    }`}
                  >
                    <LockIcon />
                    {verifiedEmail ? "✓ Verified" : "Verify Email"}
                  </button>
                </div>
                {downloadStatus && (
                  <p className={`mt-4 text-center font-semibold text-sm ${
                    downloadStatus.includes("✅") ? "text-green-600" : "text-red-600"
                  }`} ref={statusRef}>
                    {downloadStatus}
                  </p>
                )}
              </div>
            </div>
          </FadeIn>

          {/* Tab Toggle */}
          <FadeIn delay={0.3}>
            <div className="flex justify-center gap-4 mb-12">
              <button
                onClick={() => setActiveTab("developer")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === "developer"
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-600"
                }`}
              >
                <CodeIcon />
                Full Stack Developer
              </button>
              <button
                onClick={() => setActiveTab("engineer")}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === "engineer"
                    ? "bg-purple-600 text-white shadow-lg scale-105"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-600"
                }`}
              >
                <BookIcon />
                Computer Engineer
              </button>
            </div>
          </FadeIn>

          {/* Developer Resources Tab */}
          {activeTab === "developer" && (
            <div>
              <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {developerTopics.map((topic, idx) => (
                  <StaggerItem key={idx}>
                    <div className="bg-white dark:bg-gray-800/70 rounded-xl p-5 shadow-md hover:shadow-xl dark:hover:shadow-blue-900/40 transition-all duration-300 border-l-4 border-blue-600">
                      <button
                        type="button"
                        onClick={() => handleToggleResource("developer", topic.resourceId)}
                        className="w-full text-left"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{topic.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Click to view files</p>
                          </div>
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                            Files
                          </span>
                        </div>
                      </button>

                      {expandedResource === getResourceKey("developer", topic.resourceId) && (
                        <div className="mt-4 pt-4 border-t-2 border-gray-100 dark:border-gray-700 space-y-2">
                          {loadingResource === getResourceKey("developer", topic.resourceId) && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">Loading files...</p>
                          )}
                          {(resourceFiles[getResourceKey("developer", topic.resourceId)] || []).length === 0 && loadingResource !== getResourceKey("developer", topic.resourceId) && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">No files uploaded yet.</p>
                          )}
                          {(resourceFiles[getResourceKey("developer", topic.resourceId)] || []).map((fileName) => (
                            <div
                              key={fileName}
                              className="p-3 bg-blue-50 rounded-lg border border-blue-100"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <DownloadIcon />
                                  <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{fileName}</span>
                                </div>
                              </div>
                             <div className="flex gap-2">
                                <button
                                  onClick={() => handlePreview("developer", topic.resourceId, fileName)}
                                  className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-500/40 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-xs font-semibold"
                                >
                                  👁️ Preview
                                </button>
                                <button
                                  onClick={() => handleDownload("developer", topic.resourceId, fileName)}
                                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-semibold"
                                >
                                  ⬇️ Download
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          )}

          {/* Engineer Resources Tab */}
          {activeTab === "engineer" && (
            <div>
              <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {engineeringData.map((semester, semIdx) => (
                  <StaggerItem key={semIdx}>
                    <div className="bg-white dark:bg-gray-800/70 rounded-xl shadow-md hover:shadow-xl dark:hover:shadow-blue-900/40 transition-all duration-300 border-l-4 border-purple-600 overflow-hidden">
                      {/* Semester Header */}
                      <div
                        onClick={() => setExpandedSemester(expandedSemester === semester.semesterNum ? null : semester.semesterNum)}
                        className="p-5 cursor-pointer hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              Semester {semester.semesterNum}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{semester.courses.length} courses</p>
                          </div>
                          <svg
                            className={`w-6 h-6 text-purple-600 transition-transform ${
                              expandedSemester === semester.semesterNum ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </div>
                      </div>

                      {/* Courses List */}
                      {expandedSemester === semester.semesterNum && (
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 space-y-3">
                          {semester.courses.map((course, courseIdx) => (
                            <div key={courseIdx} className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-2 border-purple-300">
                              <button
                                type="button"
                                onClick={() => handleToggleResource(`semester-${semester.semesterNum}`, course.name)}
                                className="w-full text-left"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <DownloadIcon />
                                    <span className="font-semibold text-gray-900 dark:text-white">{course.name}</span>
                                  </div>
                                  <span className="text-xs text-gray-600 dark:text-gray-300">Click to view files</span>
                                </div>
                              </button>

                              {expandedResource === getResourceKey(`semester-${semester.semesterNum}`, course.name) && (
                                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2">
                                  {loadingResource === getResourceKey(`semester-${semester.semesterNum}`, course.name) && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Loading files...</p>
                                  )}
                                  {(resourceFiles[getResourceKey(`semester-${semester.semesterNum}`, course.name)] || []).length === 0 && loadingResource !== getResourceKey(`semester-${semester.semesterNum}`, course.name) && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">No files uploaded yet.</p>
                                  )}
                                  {(resourceFiles[getResourceKey(`semester-${semester.semesterNum}`, course.name)] || []).map((fileName) => (
                                    <div
                                      key={fileName}
                                      className="p-3 bg-purple-50 rounded-lg border border-purple-100"
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">{fileName}</span>
                                      </div>
                                      <div className="flex gap-2">
                                        <button
                                          onClick={() => handlePreview(`semester-${semester.semesterNum}`, course.name, fileName)}
                                          className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-purple-300 dark:border-purple-500/40 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors text-xs font-semibold"
                                        >
                                          👁️ Preview
                                        </button>
                                        <button
                                          onClick={() => handleDownload(`semester-${semester.semesterNum}`, course.name, fileName)}
                                          className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xs font-semibold"
                                        >
                                          ⬇️ Download
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          )}

          {/* Info Box */}
          <FadeIn delay={0.5}>
            <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">7+</div>
                  <p className="text-blue-100">Semesters of Data</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">100+</div>
                  <p className="text-blue-100">Courses & Topics</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">∞</div>
                  <p className="text-blue-100">Free Forever</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
