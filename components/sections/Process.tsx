"use client";

import Image from "next/image";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Discovery & Planning",
      description: "We start by understanding your business goals, target audience, and project requirements. I conduct thorough research to create a solid foundation for your project.",
      icon: "🔍",
      color: "from-blue-500 to-blue-600"
    },
    {
      number: "02",
      title: "Design & Prototype",
      description: "Creating wireframes and mockups that bring your vision to life. I focus on user experience and modern design principles to ensure an intuitive interface.",
      icon: "🎨",
      color: "from-purple-500 to-purple-600"
    },
    {
      number: "03",
      title: "Development",
      description: "Writing clean, efficient code using the latest technologies. I build responsive, fast, and scalable web applications with attention to every detail.",
      icon: "💻",
      color: "from-green-500 to-green-600"
    },
    {
      number: "04",
      title: "Testing & Launch",
      description: "Rigorous testing across devices and browsers to ensure everything works perfectly. After your approval, I deploy your project and provide ongoing support.",
      icon: "🚀",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section id="process" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">My Work Process</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A streamlined approach to deliver exceptional results on time and within budget
              </p>
            </div>
          </FadeIn>

          {/* Process Steps */}
          <StaggerContainer staggerDelay={0.15} className="space-y-8">
            {steps.map((step, index) => (
              <StaggerItem key={index}>
                <div className="relative">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute left-12 top-24 w-0.5 h-full bg-gradient-to-b from-blue-200 to-transparent"></div>
                  )}

                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} flex flex-col items-center justify-center text-white shadow-lg`}>
                        <div className="mb-1">
                          {step.icon.startsWith("/") ? (
                            <Image src={step.icon} alt={step.title} width={32} height={32} className="w-8 h-8" />
                          ) : (
                            <span className="text-3xl">{step.icon}</span>
                          )}
                        </div>
                        <div className="text-xs font-bold">{step.number}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Bottom CTA */}
          <FadeIn delay={0.5}>
            <div className="text-center mt-16">
              <p className="text-gray-600 mb-6 text-lg">
                Ready to see this process in action?
              </p>
              <a
                href="#contact"
                className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:scale-105 hover:shadow-xl"
              >
                Let&apos;s Get Started
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
