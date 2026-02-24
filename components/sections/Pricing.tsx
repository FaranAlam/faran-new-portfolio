"use client";

import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

export default function Pricing() {
  const packages = [
    {
      name: "UI Design Plan",
      price: "$25",
      description: "A professional UI design package, starting at $25, includes a modern, user-friendly layout with responsive design and polished visuals tailored for your brand.",
      features: [
        "Modern UI Design",
        "User-Friendly Layout",
        "Responsive Design",
        "Polished Visuals",
        "Brand Customization",
        "Design Files Included"
      ],
      popular: false,
      icon: "🎨"
    },
    {
      name: "Basic Website Plan",
      price: "$50",
      description: "A complete basic website package, starting at $50, includes up to 5 custom pages, responsive layout, contact form integration, and essential SEO optimization.",
      features: [
        "Up to 5 Custom Pages",
        "Responsive Layout",
        "Contact Form Integration",
        "Essential SEO Optimization",
        "Mobile Friendly",
        "Fast Loading Speed"
      ],
      popular: true,
      icon: "💻"
    },
    {
      name: "Full Stack Developer Plan",
      price: "$120",
      description: "A complete full stack development package, starting at $120, includes frontend & backend development, database integration, user authentication, and deployment support.",
      features: [
        "Frontend Development",
        "Backend Development",
        "Database Integration",
        "User Authentication",
        "API Development",
        "Deployment Support"
      ],
      popular: false,
      icon: "🚀"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pricing & Packages</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect package for your project needs
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  pkg.popular ? 'border-4 border-blue-600 transform md:scale-105' : 'border border-gray-200'
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    POPULAR
                  </div>
                )}

                <div className="p-8">
                  {/* Icon */}
                  <div className="text-5xl mb-4">{pkg.icon}</div>

                  {/* Package Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-blue-600">{pkg.price}</span>
                    <span className="text-gray-500 ml-2">starting from</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6">
                    {pkg.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <a
                    href="https://wa.me/923334051830"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full px-6 py-3 rounded-lg font-semibold text-center transition-colors ${
                      pkg.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-blue-600 hover:bg-gray-200'
                    }`}
                  >
                    GET STARTED
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 bg-blue-50 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-gray-600 mb-6">
                Every project is unique. If you need something specific or have special requirements, 
                I&apos;m happy to create a custom package tailored to your needs.
              </p>
              <a
                href="#contact"
                className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Request Custom Quote
              </a>
            </div>
          </div>

          {/* Quote Section */}
          <div className="mt-16 text-center">
            <blockquote className="text-2xl italic text-gray-700 mb-4">
              &ldquo;Code is not just about solving problems—it&apos;s about creating experiences that inspire 
              and empower. My mission is to build digital solutions that make a difference, turning 
              ideas into reality one line of code at a time.&rdquo;
            </blockquote>
            <div className="text-gray-600">
              — <span className="font-semibold">Faran Alam</span>
              <br />
              <span className="text-sm">Full Stack Developer & Computer Engineer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
