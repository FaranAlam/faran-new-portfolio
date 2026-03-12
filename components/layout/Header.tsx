"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSectionsDropdownOpen, setIsSectionsDropdownOpen] = useState(-1);
  const [activeSection, setActiveSection] = useState("hero");

  const sectionsMenu = [
    {
      category: "📚 Learn About Me",
      items: [
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Code Preview", href: "#code-preview" },
        { name: "Tech Stack", href: "#tech-stack" },
      ]
    },
    {
      category: "💼 My Work & Services",
      items: [
        { name: "Services", href: "#services" },
        { name: "Why Choose Me", href: "#why-choose-me" },
        { name: "Case Studies", href: "#case-studies" },
        { name: "Before & After", href: "#before-after" },
      ]
    },
    {
      category: "🎯 Expertise & Proof",
      items: [
        { name: "3D Projects", href: "#project-cards-3d" },
        { name: "Skills Radar", href: "#skills-radar-chart" },
        { name: "Experience", href: "#experience" },
        { name: "Success Stats", href: "#success-stats" },
      ]
    },
    {
      category: "🏆 Credentials",
      items: [
        { name: "Achievements", href: "#achievements" },
        { name: "Education", href: "#education" },
        { name: "Certifications", href: "#certifications" },
        { name: "Clients", href: "#clients" },
      ]
    },
    {
      category: "📖 Portfolio & Learning",
      items: [
        { name: "Portfolio", href: "#portfolio" },
        { name: "Academy", href: "#academy" },
        { name: "Free Resources", href: "#free-resources" },
        { name: "Blog", href: "#blog" },
      ]
    },
    {
      category: "💰 Hiring & Booking",
      items: [
        { name: "Pricing", href: "#pricing" },
        { name: "Rate Calculator", href: "#rate-calculator" },
        { name: "Book Consultation", href: "#book-consultation" },
        { name: "Testimonials", href: "#testimonials" },
      ]
    }
  ];

  // Intersection Observer for scroll spy
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Get all sections
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Close dropdowns on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSectionsDropdownOpen(-1);
      setIsMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getSectionId = (href: string) => {
    return href.replace("#", "");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm dark:shadow-gray-900/50 dark:border-b dark:border-gray-800">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-600 group-hover:border-blue-700 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <Image
                src="/images/logos/logo1.jpg"
                alt="Faran Alam Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              Faran<span className="text-blue-600">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Home */}
            <a
              href="#hero"
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                activeSection === "hero"
                  ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Home
            </a>

            {/* Category Dropdowns */}
            {sectionsMenu.map((menu, idx) => (
              <div key={idx} className="relative group">
                <button
                  className="text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {menu.category.split(" ").slice(1).join(" ")}
                  <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {/* Dropdown */}
                <div 
                  className="absolute left-0 mt-0 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-[9999]"
                >
                  <div className="py-2">
                    {menu.items.map((item, itemIdx) => {
                      const sectionId = getSectionId(item.href);
                      const isActive = activeSection === sectionId;
                      return (
                        <a
                          key={itemIdx}
                          href={item.href}
                          className={`block px-4 py-2.5 text-sm transition-all duration-200 ${
                            isActive
                              ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold border-l-4 border-blue-600"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-l-4 border-transparent"
                          }`}
                        >
                          {item.name}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Contact */}
            <a
              href="#contact"
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                activeSection === "contact"
                  ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            className="lg:hidden mt-4 pb-4 space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Home */}
            <a
              href="#hero"
              className={`block py-2 px-3 rounded-lg transition-all duration-300 ${
                activeSection === "hero"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>

            {/* Category Dropdowns */}
            {sectionsMenu.map((menu, idx) => (
              <div key={idx} className="border-t border-gray-200 dark:border-gray-700 pt-2">
                <button
                  onClick={() => setIsSectionsDropdownOpen(isSectionsDropdownOpen === idx ? -1 : idx)}
                  className="w-full text-left py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium flex items-center justify-between"
                >
                  {menu.category.split(" ").slice(1).join(" ")}
                  <svg 
                    className="w-4 h-4 transition-transform duration-300" 
                    style={{transform: isSectionsDropdownOpen === idx ? "rotate(180deg)" : "rotate(0deg)"}} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {isSectionsDropdownOpen === idx && (
                  <motion.div 
                    className="mt-2 space-y-1 bg-gray-50 dark:bg-gray-800/80 rounded-lg p-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {menu.items.map((item) => {
                      const sectionId = getSectionId(item.href);
                      const isActive = activeSection === sectionId;
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsSectionsDropdownOpen(-1);
                          }}
                          className={`block px-3 py-2 text-sm rounded-lg transition-all duration-200 border-l-4 ${
                            isActive
                              ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold border-blue-600"
                              : "text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 border-transparent"
                          }`}
                        >
                          {item.name}
                        </a>
                      );
                    })}
                  </motion.div>
                )}
              </div>
            ))}

            {/* Contact */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
              <a
                href="#contact"
                className={`block py-2 px-3 rounded-lg transition-all duration-300 ${
                  activeSection === "contact"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
