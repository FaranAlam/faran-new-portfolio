"use client";

import { useState } from "react";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Which technologies do you work with?",
      answer: "I build with HTML, CSS, JavaScript, React, Node.js/Express, MongoDB, MySQL, and modern tooling like Git, Docker, and cloud deployments."
    },
    {
      question: "Do you offer full-stack development?",
      answer: "Yes — from UI/UX and responsive frontends to secure backends, API integrations, and databases."
    },
    {
      question: "Can you integrate payments or authentication?",
      answer: "Absolutely. I integrate Stripe/PayPal and secure auth (JWT/session/OAuth) with best practices."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "I offer maintenance plans for updates, monitoring, backups, and minor feature additions."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity. A simple website takes 1-2 weeks, while complex web applications can take 4-8 weeks. I'll provide a detailed timeline after understanding your requirements."
    },
    {
      question: "Will my website be mobile-friendly?",
      answer: "Yes! Every website I build is fully responsive and optimized for all devices - smartphones, tablets, and desktops. Mobile-first design is my standard approach."
    },
    {
      question: "What's your pricing structure?",
      answer: "Pricing depends on project scope, features, and timeline. I offer both fixed-price projects and hourly rates. Contact me for a free consultation and customized quote."
    },
    {
      question: "Do you work with existing codebases?",
      answer: "Yes! I can debug, optimize, add features, or refactor existing projects. I'm comfortable working with legacy code and modern frameworks."
    },
    {
      question: "Can you help with SEO and performance optimization?",
      answer: "Absolutely! I implement SEO best practices, optimize page load speeds, implement caching strategies, and ensure your site performs well on Google PageSpeed and Lighthouse metrics."
    },
    {
      question: "What if I need changes after the project is completed?",
      answer: "I provide a warranty period for bug fixes and offer flexible support packages for updates and new features. Your satisfaction is my priority."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Quick answers about my services and process
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800/70 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="font-semibold text-gray-900 dark:text-white pr-8">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-blue-600 transform transition-transform flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-5 text-gray-600 dark:text-gray-300 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12 p-8 bg-blue-50 dark:bg-gray-800/70 rounded-xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Feel free to reach out, and I&apos;ll get back to you within 24 hours.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
