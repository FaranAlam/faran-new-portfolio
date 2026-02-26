"use client";

import Image from "next/image";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";
import TypingEffect from "../ui/TypingEffect";

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <FadeIn direction="down" duration={0.6}>
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                  Hi, I&apos;m <span className="text-blue-600">Faran Alam</span>
                </h1>
              </div>
            </FadeIn>
            
            <FadeIn direction="left" delay={0.2} duration={0.6}>
              <h2 className="text-2xl md:text-3xl text-gray-700 mb-6">
                <TypingEffect
                  texts={[
                    "Full Stack Developer",
                    "Computer Engineer",
                    "React & Next.js Expert",
                    "UI/UX Enthusiast",
                    "Problem Solver",
                  ]}
                  typingSpeed={100}
                  deletingSpeed={50}
                  delayBetweenTexts={2000}
                />
              </h2>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.3} duration={0.6}>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                Computer Engineering student at IIUI and certified Full Stack Developer. 
                Building digital solutions that bridge the gap between complex engineering and intuitive web design since 2022.
              </p>
            </FadeIn>
            
            {/* CTA Buttons */}
            <FadeIn direction="up" delay={0.4} duration={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href="#portfolio"
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg"
                >
                  Get In Touch
                </a>
              </div>
            </FadeIn>

            {/* Stats */}
            <StaggerContainer staggerDelay={0.15} className="flex flex-wrap gap-8 mt-12 justify-center md:justify-start">
              <StaggerItem>
                <div>
                  <div className="text-3xl font-bold text-blue-600">13+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div>
                  <div className="text-3xl font-bold text-blue-600">2+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div>
                  <div className="text-3xl font-bold text-blue-600">8+</div>
                  <div className="text-gray-600">Happy Clients</div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Image/Illustration */}
          <FadeIn direction="right" delay={0.3} duration={0.8} className="flex-1 flex justify-center">
            <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero/story2.jpg"
                alt="Faran Alam - Full Stack Developer"
                fill
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <FadeIn delay={0.8} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </FadeIn>
    </section>
  );
}
