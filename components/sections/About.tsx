"use client";

import Image from "next/image";
import FadeIn from "../animations/FadeIn";

export default function About() {

  return (
    <section id="about" className="py-20 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
              <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <FadeIn direction="left">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/hero/story.jpg"
                    alt="Faran Alam"
                    width={520}
                    height={520}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-600 dark:bg-blue-500 rounded-2xl -z-10"></div>
              </div>
            </FadeIn>

            {/* Content */}
            <FadeIn direction="right" delay={0.2}>
              <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Computer Engineer & Full Stack Developer
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                I&apos;m Faran Alam, a Computer Engineering student at International Islamic University Islamabad (IIUI) 
                and a certified Full Stack Developer. My journey is defined by a passion for bridging the gap between 
                complex engineering and intuitive web design.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                From developing IoT-integrated dashboards to optimizing SEO for modern businesses, I strive to build 
                digital solutions that are both powerful and user-friendly. Since 2022, I have focused on building 
                high-performance web applications that solve real-world problems.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                By combining my Full-Stack expertise with modern SEO strategies, I ensure every project is not just 
                visually stunning but also technically optimized for growth.
              </p>

              {/* CTA Button */}
              <a
                href="/resume.pdf"
                className="inline-block mt-8 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg"
              >
                Download Resume
              </a>
            </div>
          </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
