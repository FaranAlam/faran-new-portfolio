"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.pageYOffset;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (scrollHeight > 0) {
        const progress = (currentScroll / scrollHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress();

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-[100]">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: 0 }}
          transition={{ duration: 0.1 }}
        >
          {/* Shimmer Effect */}
          <motion.div
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </motion.div>
      </div>

      {/* Percentage Indicator (shows on scroll) */}
      {scrollProgress > 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-40 md:top-40 right-4 md:right-4 z-[98] bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-xs font-bold text-blue-600 border-2 border-blue-100"
        >
          {Math.round(scrollProgress)}%
        </motion.div>
      )}
    </>
  );
}
