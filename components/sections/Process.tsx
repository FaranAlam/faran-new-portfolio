"use client";

import Image from "next/image";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

// SVG Icons for Work Process
const SearchIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const PaletteIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="13.5" cy="6.5" r=".5" />
    <circle cx="17.5" cy="10.5" r=".5" />
    <circle cx="8.5" cy="7.5" r=".5" />
    <circle cx="6.5" cy="12.5" r=".5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const CodeIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const RocketLaunchIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

interface Step {
  number: string;
  title: string;
  description: string;
  icon: () => JSX.Element;
  color: string;
}

export default function Process() {
  const steps: Step[] = [
    {
      number: "01",
      title: "Discovery & Planning",
      description: "We start by understanding your business goals, target audience, and project requirements. I conduct thorough research to create a solid foundation for your project.",
      icon: SearchIcon,
      color: "from-blue-500 to-blue-600"
    },
    {
      number: "02",
      title: "Design & Prototype",
      description: "Creating wireframes and mockups that bring your vision to life. I focus on user experience and modern design principles to ensure an intuitive interface.",
      icon: PaletteIcon,
      color: "from-purple-500 to-purple-600"
    },
    {
      number: "03",
      title: "Development",
      description: "Writing clean, efficient code using the latest technologies. I build responsive, fast, and scalable web applications with attention to every detail.",
      icon: CodeIcon,
      color: "from-green-500 to-green-600"
    },
    {
      number: "04",
      title: "Testing & Launch",
      description: "Rigorous testing across devices and browsers to ensure everything works perfectly. After your approval, I deploy your project and provide ongoing support.",
      icon: RocketLaunchIcon,
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section id="process" className="py-20 bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">My Work Process</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
                          <step.icon />
                        </div>
                        <div className="text-xs font-bold">{step.number}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white dark:bg-gray-800/70 rounded-xl p-6 shadow-sm hover:shadow-xl dark:hover:shadow-blue-900/40 transition-all duration-300 hover:scale-105">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
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
