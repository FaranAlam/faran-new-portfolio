"use client";

import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";
import AnimatedCounter from "../ui/AnimatedCounter";

// SVG Icons for Success Stats
const RocketIcon = () => (
  <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const MoneyIcon = () => (
  <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="6" width="20" height="12" rx="2" ry="2" />
    <circle cx="12" cy="12" r="3" />
    <path d="M6 10h0" />
    <path d="M18 14h0" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M7 4h10v3a5 5 0 0 1-10 0V4z" />
    <path d="M5 4h2v3a5 5 0 0 1-2 4" />
    <path d="M19 4h-2v3a5 5 0 0 0 2 4" />
  </svg>
);

const GraduationCapIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="8 12 11 15 16 9" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12a9 9 0 1 1-2.64-6.36" />
    <polyline points="21 3 21 9 15 9" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

interface StatItem {
  icon: () => JSX.Element;
  value: number;
  suffix: string;
  label: string;
  color: string;
  description: string;
}

interface AchievementItem {
  year: string;
  title: string;
  description: string;
  icon: () => JSX.Element;
}

interface IndicatorItem {
  icon: () => JSX.Element;
  label: string;
  value: string;
}

export default function SuccessStats() {
  const stats: StatItem[] = [
    {
      icon: RocketIcon,
      value: 28,
      suffix: "+",
      label: "Projects Completed",
      color: "from-blue-500 to-cyan-500",
      description: "Delivered on time"
    },
    {
      icon: UsersIcon,
      value: 45,
      suffix: "+",
      label: "Happy Clients",
      color: "from-purple-500 to-pink-500",
      description: "Worldwide"
    },
    {
      icon: ClockIcon,
      value: 12000,
      suffix: "+",
      label: "Hours Coded",
      color: "from-green-500 to-teal-500",
      description: "Problem solving"
    },
    {
      icon: StarIcon,
      value: 98,
      suffix: "%",
      label: "Satisfaction Rate",
      color: "from-yellow-500 to-orange-500",
      description: "Client feedback"
    },
    {
      icon: MoneyIcon,
      value: 2,
      suffix: "M+",
      label: "Revenue Generated",
      color: "from-indigo-500 to-purple-500",
      description: "Total earnings"
    },
    {
      icon: GlobeIcon,
      value: 12,
      suffix: "+",
      label: "Countries Served",
      color: "from-red-500 to-pink-500",
      description: "Global reach"
    }
  ];

  const achievements: AchievementItem[] = [
    {
      year: "2024",
      title: "Top Rated Developer",
      icon: TrophyIcon,
      description: "Achieved 100% client satisfaction with 13+ successful projects"
    },
    {
      year: "2024",
      title: "Faran Digital Academy",
      icon: GraduationCapIcon,
      description: "Launched online academy, trained 20+ students in web development"
    },
    {
      year: "2023-26",
      title: "Multiple Internships",
      icon: BriefcaseIcon,
      description: "Worked at NextGen, DevelopersHub, JayNex, NAVTTC, DECE-FET-IIUI"
    },
    {
      year: "2022",
      title: "Started Freelancing",
      icon: RocketIcon,
      description: "Began professional journey as a full-stack developer"
    }
  ];

  const indicators: IndicatorItem[] = [
    { icon: CheckCircleIcon, label: "On-Time Delivery", value: "100%" },
    { icon: RefreshIcon, label: "Repeat Clients", value: "75%" },
    { icon: BoltIcon, label: "Avg Response", value: "<1 Hr" },
    { icon: TargetIcon, label: "Success Rate", value: "100%" }
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
                    <div className="text-5xl">
                      <stat.icon />
                    </div>
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
                    <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex flex-col items-center justify-center text-white font-bold shadow-lg">
                      <achievement.icon />
                      <span className="text-xs mt-1">{achievement.year}</span>
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
            {indicators.map((indicator, index) => (
              <StaggerItem key={index}>
                <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-center mb-3">
                    <indicator.icon />
                  </div>
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
