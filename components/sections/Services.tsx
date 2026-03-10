"use client";

import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

// SVG Icon Components for Services
const UIUXIcon = () => (
  <svg className="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const WebDevIcon = () => (
  <svg className="w-12 h-12 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const FullStackIcon = () => (
  <svg className="w-12 h-12 text-pink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1"/>
    <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"/>
  </svg>
);

const ResponsiveIcon = () => (
  <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="1"/>
    <line x1="7" y1="21" x2="17" y2="21"/>
    <line x1="9" y1="17" x2="9" y2="21"/>
    <line x1="15" y1="17" x2="15" y2="21"/>
  </svg>
);

const MaintenanceIcon = () => (
  <svg className="w-12 h-12 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 1 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);

const EducationIcon = () => (
  <svg className="w-12 h-12 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="12 2 2 7 2 12 12 16.5 22 12 22 7 12 2"></polyline>
    <polyline points="2 12 12 16.5 22 12"></polyline>
    <polyline points="12 16.5 12 22"></polyline>
    <polyline points="9 19 15 19"></polyline>
  </svg>
);

export default function Services() {
  const services = [
    {
      icon: UIUXIcon,
      title: "UI & UX Design",
      description: "As a UI/UX Designer, I've melded user-centric design principles with a keen eye for aesthetics to craft seamless digital experiences.",
      features: ["Responsive Design", "Wireframing", "Prototyping", "User Testing"],
      price: "$25"
    },
    {
      icon: WebDevIcon,
      title: "Web Development",
      description: "I've translated ideas into robust, user-friendly websites and applications, navigating through intricate coding challenges and staying abreast of evolving technologies.",
      features: ["Custom Websites", "E-commerce Solutions", "Landing Pages", "Portfolio Sites"],
      price: "$50"
    },
    {
      icon: FullStackIcon,
      title: "Full Stack Development",
      description: "I create complete web solutions by combining front-end and back-end expertise. Developing responsive, scalable, and efficient web applications.",
      features: ["React & Node.js", "Database Integration", "API Development", "Authentication"],
      price: "$120"
    },
    {
      icon: ResponsiveIcon,
      title: "Responsive Design",
      description: "Building websites that work perfectly on all devices - from mobile phones to desktop computers with optimal user experience.",
      features: ["Mobile-First Design", "Cross-Browser Compatible", "Fast Loading", "SEO Optimized"]
    },
    {
      icon: MaintenanceIcon,
      title: "Website Maintenance",
      description: "Ongoing support and maintenance for your website including updates, bug fixes, and performance optimization.",
      features: ["Regular Updates", "Bug Fixes", "Performance Monitoring", "Security Patches"]
    },
    {
      icon: EducationIcon,
      title: "Tech Education",
      description: "Teaching web development through Faran Digital Academy. Offering comprehensive courses in web design and full stack development.",
      features: ["Live Classes", "Real Projects", "Certificates", "Expert Support"]
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Services</h2>
              <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Offering a wide range of services to help bring your ideas to life and grow your business.
              </p>
            </div>
          </FadeIn>

          {/* Services Grid */}
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-xl dark:hover:shadow-gray-950/50 transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:scale-105 hover:border-blue-200 dark:hover:border-blue-500 h-full">

                {/* Icon */}
                <div className="mb-4">
                  <service.icon />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {service.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <svg
                        className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2"
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
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{service.price}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Starting from</div>
                  </div>
                )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* CTA */}
          <FadeIn delay={0.3}>
            <div className="text-center mt-12">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Interested in working together?
              </p>
              <a
                href="#contact"
                className="inline-block px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg"
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
