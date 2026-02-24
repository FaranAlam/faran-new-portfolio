"use client";

import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";
import AnimatedCounter from "../ui/AnimatedCounter";

export default function SuccessStats() {
  const stats = [
    {
      icon: "🚀",
      value: 28,
      suffix: "+",
      label: "Projects Completed",
      color: "from-blue-500 to-cyan-500",
      description: "Delivered on time"
    },
    {
      icon: "👥",
      value: 45,
      suffix: "+",
      label: "Happy Clients",
      color: "from-purple-500 to-pink-500",
      description: "Worldwide"
    },
    {
      icon: "⏰",
      value: 12000,
      suffix: "+",
      label: "Hours Coded",
      color: "from-green-500 to-teal-500",
      description: "Problem solving"
    },
    {
      icon: "⭐",
      value: 98,
      suffix: "%",
      label: "Satisfaction Rate",
      color: "from-yellow-500 to-orange-500",
      description: "Client feedback"
    },
    {
      icon: "💰",
      value: 2,
      suffix: "M+",
      label: "Revenue Generated",
      color: "from-indigo-500 to-purple-500",
      description: "Total earnings"
    },
    {
      icon: "🌍",
      value: 12,
      suffix: "+",
      label: "Countries Served",
      color: "from-red-500 to-pink-500",
      description: "Global reach"
    }
  ];

  const achievements = [
    {
      year: "2024",
      title: "🏆 Top Rated Developer",
      description: "Achieved 100% client satisfaction with 13+ successful projects"
    },
    {
      year: "2024",
      title: "🎓 Faran Digital Academy",
      description: "Launched online academy, trained 20+ students in web development"
    },
    {
      year: "2023-26",
      title: "💼 Multiple Internships",
      description: "Worked at NextGen, DevelopersHub, JayNex, NAVTTC, DECE-FET-IIUI"
    },
    {
      year: "2022",
      title: "🚀 Started Freelancing",
      description: "Began professional journey as a full-stack developer"
    }
  ];

  return (
    <section id="success-stats" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Success by Numbers</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Real results from real work. Here&apos;s what I&apos;ve achieved so far and this is just the beginning!
              </p>
            </div>
          </FadeIn>

          {/* Stats Grid */}
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <div className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-t-4 bg-gradient-to-r ${stat.color}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-5xl">{stat.icon}</div>
                    <div className={`text-4xl font-bold text-white drop-shadow-lg`}>
                      <AnimatedCounter 
                        to={stat.value} 
                        suffix={stat.suffix}
                        duration={2}
                        decimals={0}
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{stat.label}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Timeline Section */}
          <FadeIn delay={0.3}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-16 transition-colors duration-300">
              <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                Journey Highlights
              </h3>
              <div className="space-y-6">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {achievement.year}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {achievement.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Trust Indicators */}
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "✅", label: "On-Time Delivery", value: "100%" },
              { icon: "🔄", label: "Repeat Clients", value: "75%" },
              { icon: "⚡", label: "Avg Response", value: "<1 Hr" },
              { icon: "🎯", label: "Success Rate", value: "100%" }
            ].map((indicator, index) => (
              <StaggerItem key={index}>
                <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl mb-3">{indicator.icon}</div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">{indicator.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{indicator.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* CTA */}
          <FadeIn delay={0.5}>
            <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Be Part of These Success Stories?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join my growing list of satisfied clients and let&apos;s create something amazing together!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="#contact"
                  className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:scale-105 transition-all duration-300 font-bold shadow-lg"
                >
                  Start Your Project
                </a>
                <a
                  href="#book-consultation"
                  className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:scale-105 transition-all duration-300 font-bold shadow-lg border-2 border-white"
                >
                  Book Free Consultation
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
