"use client";

import { useState } from "react";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

// SVG Icons for Before/After
const RestaurantBeforeIcon = () => (
  <svg className="w-16 h-16 text-red-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 9H9c0-1.1.9-2 2-2s2 .9 2 2h-2v7h2c0 1.1-.9 2-2 2s-2-.9-2-2h-2c0 2.21 1.79 4 4 4s4-1.79 4-4h-2z"/>
    <path d="M20 3H4v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V3zm-8 8h-4V5h4v6z"/>
  </svg>
);

const RestaurantAfterIcon = () => (
  <svg className="w-16 h-16 text-green-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const FashionBeforeIcon = () => (
  <svg className="w-16 h-16 text-red-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 3H7.5C6.12 3 5 4.12 5 5.5v15c0 1.38 1.12 2.5 2.5 2.5h9c1.38 0 2.5-1.12 2.5-2.5v-15C19 4.12 17.88 3 16.5 3zm-4 15c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm4-9h-8V5h8v4z"/>
  </svg>
);

const FashionAfterIcon = () => (
  <svg className="w-16 h-16 text-green-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5zM9 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3-8H6c-1.1 0-2 .9-2 2v1h14V7c0-1.1-.9-2-2-2z"/>
  </svg>
);

const PortfolioBeforeIcon = () => (
  <svg className="w-16 h-16 text-red-500" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="7" width="20" height="13" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" fill="none" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const PortfolioAfterIcon = () => (
  <svg className="w-16 h-16 text-green-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L3 14h7v8l10-12h-7V2z"/>
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
  </svg>
);

export default function BeforeAfter() {
  const [activeTab, setActiveTab] = useState(0);

  const comparisons = [
    {
      title: "Restaurant Website Transformation",
      client: "Local Food Business",
      before: {
        icon: RestaurantBeforeIcon,
        issues: [
          "Outdated design from 2015",
          "Not mobile responsive",
          "Slow loading (8+ seconds)",
          "No online ordering system",
          "Poor Google ranking (page 5+)"
        ],
        metrics: {
          traffic: "200 visits/month",
          orders: "5 online orders/month",
          mobile: "Poor experience",
          speed: "8.2 seconds"
        }
      },
      after: {
        icon: RestaurantAfterIcon,
        improvements: [
          "Modern, attractive design",
          "Fully mobile optimized",
          "Fast loading (2 seconds)",
          "Integrated ordering system",
          "First page on Google"
        ],
        metrics: {
          traffic: "800 visits/month",
          orders: "35+ orders/month",
          mobile: "Excellent UX",
          speed: "1.8 seconds"
        }
      },
      results: [
        { label: "Traffic", increase: "+300%" },
        { label: "Orders", increase: "+600%" },
        { label: "Loading Speed", increase: "4x Faster" },
        { label: "Mobile Score", increase: "95/100" }
      ]
    },
    {
      title: "E-commerce Store Redesign",
      client: "Online Fashion Store",
      before: {
        icon: FashionBeforeIcon,
        issues: [
          "Cluttered product pages",
          "Confusing checkout process",
          "No product filters",
          "High cart abandonment",
          "Limited payment options"
        ],
        metrics: {
          traffic: "1000 visits/month",
          conversion: "1.2%",
          cartAbandonment: "78%",
          avgOrder: "₹1,500"
        }
      },
      after: {
        icon: FashionAfterIcon,
        improvements: [
          "Clean, modern product pages",
          "Simple 2-step checkout",
          "Advanced filters & search",
          "Reduced cart abandonment",
          "Multiple payment methods"
        ],
        metrics: {
          traffic: "2500 visits/month",
          conversion: "4.8%",
          cartAbandonment: "42%",
          avgOrder: "₹2,300"
        }
      },
      results: [
        { label: "Conversion Rate", increase: "+300%" },
        { label: "Revenue", increase: "+450%" },
        { label: "Cart Abandonment", increase: "-46%" },
        { label: "Avg Order Value", increase: "+53%" }
      ]
    },
    {
      title: "Business Portfolio Upgrade",
      client: "Consulting Agency",
      before: {
        icon: PortfolioBeforeIcon,
        issues: [
          "Generic template design",
          "No clear call-to-actions",
          "Missing case studies",
          "Poor brand identity",
          "No lead capture system"
        ],
        metrics: {
          leads: "3 leads/month",
          bounceRate: "72%",
          timeOnSite: "45 seconds",
          contactForm: "Low submissions"
        }
      },
      after: {
        icon: PortfolioAfterIcon,
        improvements: [
          "Custom branded design",
          "Strategic CTAs throughout",
          "Detailed case studies",
          "Strong brand presence",
          "Multiple lead magnets"
        ],
        metrics: {
          leads: "22 leads/month",
          bounceRate: "38%",
          timeOnSite: "3 min 20 sec",
          contactForm: "High engagement"
        }
      },
      results: [
        { label: "Leads Generated", increase: "+633%" },
        { label: "Bounce Rate", increase: "-47%" },
        { label: "Time on Site", increase: "+347%" },
        { label: "Form Submissions", increase: "+580%" }
      ]
    }
  ];

  const currentComparison = comparisons[activeTab];

  return (
    <section id="before-after" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Before & After Transformations
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See the dramatic improvements my clients experienced after website redesigns
              </p>
            </div>
          </FadeIn>

          {/* Tabs */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {comparisons.map((comparison, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === index
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {comparison.client}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Comparison Content */}
          <FadeIn key={activeTab} delay={0.1}>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 mb-12">
              <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
                {currentComparison.title}
              </h3>

              {/* Before & After Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* BEFORE */}
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-shrink-0">
                      <currentComparison.before.icon />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-red-600">BEFORE</h4>
                      <p className="text-gray-600 text-sm">The Problems</p>
                    </div>
                  </div>

                  {/* Issues List */}
                  <div className="space-y-3 mb-6">
                    {currentComparison.before.issues.map((issue, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <XIcon />
                        <span className="text-gray-700">{issue}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="border-t pt-4 space-y-2">
                    <h5 className="font-bold text-gray-900 mb-3">Metrics:</h5>
                    {Object.entries(currentComparison.before.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="font-semibold text-red-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AFTER */}
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-shrink-0">
                      <currentComparison.after.icon />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-green-600">AFTER</h4>
                      <p className="text-gray-600 text-sm">The Solutions</p>
                    </div>
                  </div>

                  {/* Improvements List */}
                  <div className="space-y-3 mb-6">
                    {currentComparison.after.improvements.map((improvement, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckIcon />
                        <span className="text-gray-700">{improvement}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="border-t pt-4 space-y-2">
                    <h5 className="font-bold text-gray-900 mb-3">Metrics:</h5>
                    {Object.entries(currentComparison.after.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="font-semibold text-green-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentComparison.results.map((result, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-shadow">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {result.increase}
                    </div>
                    <div className="text-sm text-gray-600">{result.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.3}>
            <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-4">
                Ready for Your Own Transformation?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Let me analyze your current website and show you how we can achieve similar results
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="#book-consultation"
                  className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:scale-105 transition-all duration-300 font-bold shadow-lg"
                >
                  Get Free Website Audit
                </a>
                <a
                  href="#contact"
                  className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:scale-105 transition-all duration-300 font-bold shadow-lg border-2 border-white"
                >
                  Start Your Project
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
