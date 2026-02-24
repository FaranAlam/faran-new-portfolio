"use client";

import Image from "next/image";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

export default function Services() {
  const services = [
    {
      icon: "/images/icons/design.svg",
      title: "UI & UX Design",
      description: "As a UI/UX Designer, I've melded user-centric design principles with a keen eye for aesthetics to craft seamless digital experiences.",
      features: ["Responsive Design", "Wireframing", "Prototyping", "User Testing"],
      price: "$25"
    },
    {
      icon: "/images/icons/code.svg",
      title: "Web Development",
      description: "I've translated ideas into robust, user-friendly websites and applications, navigating through intricate coding challenges and staying abreast of evolving technologies.",
      features: ["Custom Websites", "E-commerce Solutions", "Landing Pages", "Portfolio Sites"],
      price: "$50"
    },
    {
      icon: "/images/icons/rocket.svg",
      title: "Full Stack Development",
      description: "I create complete web solutions by combining front-end and back-end expertise. Developing responsive, scalable, and efficient web applications.",
      features: ["React & Node.js", "Database Integration", "API Development", "Authentication"],
      price: "$120"
    },
    {
      icon: "/images/icons/mobile.svg",
      title: "Responsive Design",
      description: "Building websites that work perfectly on all devices - from mobile phones to desktop computers with optimal user experience.",
      features: ["Mobile-First Design", "Cross-Browser Compatible", "Fast Loading", "SEO Optimized"]
    },
    {
      icon: "/images/icons/tools.svg",
      title: "Website Maintenance",
      description: "Ongoing support and maintenance for your website including updates, bug fixes, and performance optimization.",
      features: ["Regular Updates", "Bug Fixes", "Performance Monitoring", "Security Patches"]
    },
    {
      icon: "/images/icons/education.svg",
      title: "Tech Education",
      description: "Teaching web development through Faran Digital Academy. Offering comprehensive courses in web design and full stack development.",
      features: ["Live Classes", "Real Projects", "Certificates", "Expert Support"]
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Services</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Offering a wide range of services to help bring your ideas to life and grow your business.
              </p>
            </div>
          </FadeIn>

          {/* Services Grid */}
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105 hover:border-blue-200 h-full">

                {/* Icon */}
                <div className="mb-4">
                  {service.icon.startsWith("/") ? (
                    <Image src={service.icon} alt={service.title} width={48} height={48} className="w-12 h-12" />
                  ) : (
                    <div className="text-5xl">{service.icon}</div>
                  )}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 text-blue-600 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* Pricing */}
                {service.price && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                    <div className="text-xs text-gray-500">Starting from</div>
                  </div>
                )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* CTA */}
          <FadeIn delay={0.3}>
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Interested in working together?
              </p>
              <a
                href="#contact"
                className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg"
              >
                Get a Quote
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
