"use client";

import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

// SVG Icons
const FastDeliveryIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 12 20.3 9.3 16.7 12.9 6.3 2.5 2.5 6.3 12.9 16.7 9.3 20.3 12 23"></polyline>
  </svg>
);

const QualityCodeIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const GoalOrientedIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="12" cy="12" r="9"/>
  </svg>
);

const CommunicationIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const LifetimeSupportIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
  </svg>
);

const AffordablePricingIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="8"/>
    <path d="M12 6v12M9 9h6a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-6"/>
  </svg>
);

const ResponsiveDesignIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const ModernTechIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2L3 14h7v8l10-12h-7V2z"/>
  </svg>
);

export default function WhyChooseMe() {
  const benefits = [
    {
      icon: FastDeliveryIcon,
      title: "Fast Delivery",
      description: "Quick turnaround time without compromising quality. Most projects delivered within 2-4 weeks.",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: QualityCodeIcon,
      title: "Quality Code",
      description: "Clean, maintainable, and well-documented code following industry best practices and standards.",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      icon: GoalOrientedIcon,
      title: "Goal-Oriented",
      description: "Focused on achieving your business objectives with solutions that drive real results and ROI.",
      gradient: "from-green-400 to-green-600"
    },
    {
      icon: CommunicationIcon,
      title: "Clear Communication",
      description: "Regular updates, transparent progress tracking, and always available for discussions and feedback.",
      gradient: "from-purple-400 to-purple-600"
    },
    {
      icon: LifetimeSupportIcon,
      title: "Lifetime Support",
      description: "Post-launch support and maintenance to ensure your website runs smoothly and stays updated.",
      gradient: "from-pink-400 to-pink-600"
    },
    {
      icon: AffordablePricingIcon,
      title: "Affordable Pricing",
      description: "Competitive rates with flexible payment options. Quality work that fits your budget.",
      gradient: "from-indigo-400 to-indigo-600"
    },
    {
      icon: ResponsiveDesignIcon,
      title: "Responsive Design",
      description: "Mobile-first approach ensuring perfect functionality across all devices and screen sizes.",
      gradient: "from-cyan-400 to-cyan-600"
    },
    {
      icon: ModernTechIcon,
      title: "Modern Tech Stack",
      description: "Using latest technologies like React, Next.js, Node.js for fast, scalable applications.",
      gradient: "from-red-400 to-red-600"
    }
  ];

  return (
    <section id="why-choose-me" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Me?</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                What sets me apart and makes me the right choice for your next project
              </p>
            </div>
          </FadeIn>

          {/* Benefits Grid */}
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <StaggerItem key={index}>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full group">
                  {/* Icon with Gradient Background */}
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Bottom CTA */}
          <FadeIn delay={0.5}>
            <div className="mt-16 text-center bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Work Together?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Let&apos;s discuss your project and see how I can help you achieve your goals. Free consultation available!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold shadow-md hover:scale-105 hover:shadow-xl"
                >
                  Start Your Project
                </a>
                <a
                  href="https://wa.me/923334051830?text=Hello%20Faran!%20I%20want%20to%20discuss%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 font-semibold shadow-md hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Me
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
