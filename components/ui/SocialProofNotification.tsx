"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: number;
  message: string;
  action: string;
  time: string;
  icon: string;
}

export default function SocialProofNotification() {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [notificationIndex, setNotificationIndex] = useState(0);

  const notifications: Notification[] = [
    {
      id: 1,
      message: "Someone from Karachi",
      action: "just booked a consultation",
      time: "2 minutes ago",
      icon: "🎯"
    },
    {
      id: 2,
      message: "Ahmed from Lahore",
      action: "downloaded Web Dev Roadmap",
      time: "5 minutes ago",
      icon: "📚"
    },
    {
      id: 3,
      message: "Sarah from USA",
      action: "viewed your portfolio",
      time: "8 minutes ago",
      icon: "👀"
    },
    {
      id: 4,
      message: "Someone from Islamabad",
      action: "requested a quote",
      time: "12 minutes ago",
      icon: "💼"
    },
    {
      id: 5,
      message: "Hassan from UK",
      action: "joined the academy",
      time: "15 minutes ago",
      icon: "🎓"
    },
    {
      id: 6,
      message: "Ayesha from Dubai",
      action: "purchased a template",
      time: "20 minutes ago",
      icon: "🎨"
    }
  ];

  useEffect(() => {
    // Show first notification after 5 seconds
    const initialTimer = setTimeout(() => {
      setCurrentNotification(notifications[0]);
      setNotificationIndex(1);
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, []);

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
          className="fixed bottom-6 left-6 z-50 max-w-sm"
        >
          <div className="bg-white rounded-xl shadow-2xl p-4 flex items-start gap-3 border border-gray-200">
            {/* Icon */}
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
              {currentNotification.icon}
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
