"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// SVG Icons for Social Proof
const TargetIcon = () => (
  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const GraduationCapIcon = () => (
  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
  </svg>
);

const PaletteIcon = () => (
  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="13.5" cy="6.5" r=".5" />
    <circle cx="17.5" cy="10.5" r=".5" />
    <circle cx="8.5" cy="7.5" r=".5" />
    <circle cx="6.5" cy="12.5" r=".5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const RocketIcon = () => (
  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="18" y="3" width="4" height="18" rx="1" />
    <rect x="10" y="8" width="4" height="13" rx="1" />
    <rect x="2" y="13" width="4" height="8" rx="1" />
  </svg>
);

interface Notification {
  id: number;
  message: string;
  action: string;
  time: string;
  icon: () => JSX.Element;
}

export default function SocialProofNotification() {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [notificationIndex, setNotificationIndex] = useState(0);

  const notifications = useMemo<Notification[]>(
    () => [
      {
        id: 1,
        message: "Someone from Karachi",
        action: "just booked a consultation",
        time: "2 minutes ago",
        icon: TargetIcon
      },
      {
        id: 2,
        message: "Ahmed from Lahore",
        action: "downloaded Web Dev Roadmap",
        time: "5 minutes ago",
        icon: BookIcon
      },
      {
        id: 3,
        message: "Sarah from USA",
        action: "viewed your portfolio",
        time: "8 minutes ago",
        icon: EyeIcon
      },
      {
        id: 4,
        message: "Someone from Islamabad",
        action: "requested a quote",
        time: "12 minutes ago",
        icon: BriefcaseIcon
      },
      {
        id: 5,
        message: "Hassan from UK",
        action: "joined the academy",
        time: "15 minutes ago",
        icon: GraduationCapIcon
      },
      {
        id: 6,
        message: "Ayesha from Dubai",
        action: "purchased a template",
        time: "20 minutes ago",
        icon: PaletteIcon
      },
      {
        id: 7,
        message: "Umair from Peshawar",
        action: "started a full-stack project",
        time: "25 minutes ago",
        icon: RocketIcon
      },
      {
        id: 8,
        message: "Bilal from Multan",
        action: "checked pricing packages",
        time: "28 minutes ago",
        icon: ChartIcon
      },
      {
        id: 9,
        message: "Nida from Rawalpindi",
        action: "booked a UI/UX review",
        time: "32 minutes ago",
        icon: PaletteIcon
      },
      {
        id: 10,
        message: "Ali from Canada",
        action: "downloaded Interview Prep",
        time: "35 minutes ago",
        icon: BookIcon
      }
    ],
    []
  );

  useEffect(() => {
    // Show first notification after 5 seconds
    const initialTimer = setTimeout(() => {
      setCurrentNotification(notifications[0]);
      setNotificationIndex(1);
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, [notifications]);

  useEffect(() => {
    if (currentNotification) {
      // Hide after 5 seconds
      const hideTimer = setTimeout(() => {
        setCurrentNotification(null);
      }, 5000);

      return () => clearTimeout(hideTimer);
    } else if (notificationIndex < notifications.length) {
      // Show next notification after 15 seconds
      const showTimer = setTimeout(() => {
        setCurrentNotification(notifications[notificationIndex]);
        setNotificationIndex(prev => prev + 1);
      }, 15000);

      return () => clearTimeout(showTimer);
    } else {
      // Reset and loop
      const resetTimer = setTimeout(() => {
        setNotificationIndex(0);
        setCurrentNotification(notifications[0]);
        setNotificationIndex(1);
      }, 15000);

      return () => clearTimeout(resetTimer);
    }
  }, [currentNotification, notificationIndex, notifications]);

  return (
    <AnimatePresence>
      {currentNotification && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="fixed bottom-20 left-4 z-40 w-[75vw] max-w-[75vw] md:bottom-6 md:left-6 md:w-auto md:max-w-sm"
        >
          <div className="bg-white rounded-xl shadow-2xl p-4 flex items-start gap-3 border border-gray-200">
            {/* Icon */}
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
              <currentNotification.icon />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 font-semibold">
                {currentNotification.message}
              </p>
              <p className="text-sm text-gray-600">
                {currentNotification.action}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {currentNotification.time}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setCurrentNotification(null)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-bl-xl"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
