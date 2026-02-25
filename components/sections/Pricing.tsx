"use client";

import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

// SVG Icons for Pricing
const PaletteIcon = () => (
  <svg className="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="13.5" cy="6.5" r=".5" />
    <circle cx="17.5" cy="10.5" r=".5" />
    <circle cx="8.5" cy="7.5" r=".5" />
    <circle cx="6.5" cy="12.5" r=".5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const LaptopIcon = () => (
  <svg className="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="12" rx="2" ry="2" />
    <path d="M2 20h20" />
  </svg>
);

const RocketIcon = () => (
  <svg className="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const LightbulbIcon = () => (
  <svg className="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 1.33.46 2.55 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
  </svg>
);

interface PackageItem {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  icon: () => JSX.Element;
}

export default function Pricing() {
  const packages: PackageItem[] = [
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
      icon: PaletteIcon
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
      icon: LaptopIcon
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
      icon: RocketIcon
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
                  <div className="text-5xl mb-4">
                    <pkg.icon />
                  </div>

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
                        <CheckCircleIcon />
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
              <div className="flex justify-center mb-4">
                <LightbulbIcon />
              </div>
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
