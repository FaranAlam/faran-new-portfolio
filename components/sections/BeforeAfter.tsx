"use client";

import { useState } from "react";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

export default function BeforeAfter() {
  const [activeTab, setActiveTab] = useState(0);

  const comparisons = [
    {
      title: "Restaurant Website Transformation",
      client: "Local Food Business",
      before: {
        image: "🍔",
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
        image: "🎉",
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
        image: "👔",
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
        image: "✨",
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
        image: "💼",
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
        image: "🚀",
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
                    <div className="text-5xl">{currentComparison.before.image}</div>
                    <div>
                      <h4 className="text-2xl font-bold text-red-600">BEFORE</h4>
                      <p className="text-gray-600 text-sm">The Problems</p>
                    </div>
                  </div>

                  {/* Issues List */}
                  <div className="space-y-3 mb-6">
                    {currentComparison.before.issues.map((issue, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✗</span>
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
                    <div className="text-5xl">{currentComparison.after.image}</div>
                    <div>
                      <h4 className="text-2xl font-bold text-green-600">AFTER</h4>
                      <p className="text-gray-600 text-sm">The Solutions</p>
                    </div>
                  </div>

                  {/* Improvements List */}
                  <div className="space-y-3 mb-6">
                    {currentComparison.after.improvements.map((improvement, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
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
