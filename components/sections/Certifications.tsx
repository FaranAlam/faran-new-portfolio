"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedCert) {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);
  const certifications = [
    {
      title: "Web Development Internship",
      issuer: "National Highway Authority (NHA)",
      date: "2025",
      image: "/images/certifications/NHA-internship-certificate.jpg",
      icon: "✔",
      verified: true
    },
    {
      title: "Web Development Internship",
      issuer: "NextGen Learners",
      date: "2025",
      image: "/images/certifications/NextGenLearner-internship-certificate.jpg",
      icon: "✔",
      verified: true
    },
    {
      title: "Full Stack Development Internship",
      issuer: "DevelopersHub Corporation",
      date: "2025",
      image: "/images/certifications/DevelopersHub-internship-certificate.jpg",
      icon: "✔",
      verified: true
    },
    {
      title: "Responsive Web Designing Internship",
      issuer: "JayNex IT",
      date: "2025",
      image: "/images/certifications/Jaynext-IT-internshipe-Certificate.jpg",
      icon: "✔",
      verified: true
    },
    {
      title: "Full Stack Development Certification",
      issuer: "NAVTTC",
      date: "2024",
      image: "/images/certifications/full stack developement certificate navttc.jpg",
      icon: "✔",
      verified: true
    },
    {
      title: "Building Real Systems using Computer Vision",
      issuer: "DECE-FET IIUI",
      date: "2024",
      image: "/images/certifications/bulding real system using computer vision.jpeg",
      icon: "✔",
      verified: true
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Certifications & Achievements</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Completed online courses and earned verified certificates to strengthen my skills
              </p>
            </div>
          </FadeIn>

          {/* Certifications Grid */}
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <StaggerItem key={index}>
                <div className="bg-gray-50 dark:bg-gray-800/70 rounded-xl overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-blue-900/40 transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:scale-105 hover:border-blue-200 dark:hover:border-blue-500 h-full">

                {/* Certificate Image */}
                <div className="aspect-video bg-gray-200 relative overflow-hidden group/image">
                  {cert.image && (
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover group-hover/image:scale-110 transition-transform duration-300"
                    />
                  )}
                  {/* Verified Badge */}
                  {cert.verified && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <div className="text-blue-600 font-semibold mb-2">
                    {cert.issuer}
                  </div>

                  {/* Date */}
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {cert.date}
                  </div>

                  {/* View Button */}
                  <button 
                    onClick={() => setSelectedCert(cert.image)}
                    className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm font-medium hover:scale-105"
                  >
                    View Certificate
                  </button>
                </div>
              </div>
            </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Stats */}
          <FadeIn delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">6+</div>
              <div className="text-gray-600 dark:text-gray-300">Certifications</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
              <div className="text-gray-600 dark:text-gray-300">Internships</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-300">Verified</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2022</div>
              <div className="text-gray-600 dark:text-gray-300">Started</div>
            </div>
          </div>
        </FadeIn>
        </div>
      </div>
      {/* Full Screen Modal */}
      {selectedCert && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedCert(null)}
            className="absolute top-4 right-4 bg-white dark:bg-gray-800 text-black dark:text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-all z-60"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Certificate Image Container */}
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
            <Image
              src={selectedCert}
              alt="Certificate Full View"
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Keyboard close hint */}
          <div className="absolute bottom-4 left-4 text-white text-sm opacity-75">
            Press ESC or click outside to close
          </div>
        </div>
      )}    </section>
  );
}
