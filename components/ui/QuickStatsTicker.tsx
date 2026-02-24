"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function QuickStatsTicker() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show ticker after scrolling past hero section
      if (window.pageYOffset > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { icon: "🚀", label: "Projects", value: "13+" },
    { icon: "⭐", label: "Satisfaction", value: "100%" },
    { icon: "👥", label: "Clients", value: "8+" },
    { icon: "💼", label: "Experience", value: "2+ Years" },
    { icon: "🎓", label: "Certifications", value: "6+" },
    { icon: "🌍", label: "Countries", value: "5+" },
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-16 left-0 right-0 z-[90] bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-200"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 overflow-x-auto scrollbar-hide">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 px-4 border-r border-gray-200 last:border-r-0 flex-shrink-0"
            >
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <div className="text-lg font-bold text-blue-600">{stat.value}</div>
                <div className="text-xs text-gray-600 whitespace-nowrap">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scrolling marquee for mobile */}
      <div className="md:hidden overflow-hidden py-2 bg-blue-50">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-8 whitespace-nowrap"
        >
          {[...stats, ...stats].map((stat, index) => (
            <div key={index} className="inline-flex items-center gap-2">
              <span className="text-xl">{stat.icon}</span>
              <span className="font-semibold text-sm">
                {stat.value} {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
