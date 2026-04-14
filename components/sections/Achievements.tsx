"use client";

import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

// SVG Icons for Journey & Achievements
const RocketLaunchIcon = () => (
  <svg className="w-12 h-12 text-blue-600 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const GraduationCapIcon = () => (
  <svg className="w-12 h-12 text-blue-600 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
  </svg>
);

const StarBadgeIcon = () => (
  <svg className="w-12 h-12 text-blue-600 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
);

const BriefcaseWorkIcon = () => (
  <svg className="w-12 h-12 text-blue-600 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-12 h-12 text-blue-600 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-12 h-12 text-blue-600 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const UserCheckIcon = () => (
  <svg className="w-12 h-12 text-blue-600 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </svg>
);

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: () => JSX.Element;
  color: string;
}

interface Achievement {
  icon: () => JSX.Element;
  title: string;
  description: string;
}

export default function Achievements() {
  const milestones: Milestone[] = [
    {
      year: "2022",
      title: "Started Freelancing Journey",
      description: "Began professional web development career, completed first client project successfully.",
      icon: RocketLaunchIcon,
      color: "from-blue-500 to-blue-600"
    },
    {
      year: "2023",
      title: "Launched Faran Digital Academy",
      description: "Started teaching web development to aspiring developers. Trained 20+ students in web design.",
      icon: GraduationCapIcon,
      color: "from-purple-500 to-purple-600"
    },
    {
      year: "2024",
      title: "Full Stack Certification",
      description: "Earned NAVTTC Full Stack Development certification. Completed Computer Vision course from IIUI.",
      icon: StarBadgeIcon,
      color: "from-green-500 to-green-600"
    },
    {
      year: "2025",
      title: "Multiple Internships",
      description: "Gained industry experience through 5 internships: NHA, DevelopersHub, JayNex IT, and NextGen Learners.",
      icon: BriefcaseWorkIcon,
      color: "from-orange-500 to-orange-600"
    },
    {
      year: "2026",
      title: "13+ Projects Milestone",
      description: "Successfully delivered 13+ projects with 100% client satisfaction. Serving 8+ happy clients globally.",
      icon: SparklesIcon,
      color: "from-pink-500 to-pink-600"
    },
    {
      year: "2026",
      title: "Job at xSEL Sarwar English Lab",
      description: "Currently building an 'Advanced Full-Stack E-Learning Ecosystem' for Sarwar English Lab. This comprehensive platform features a high-conversion admissions website and powerful LMS dashboards. Developed using Next.js, MongoDB Atlas, and NextAuth for optimal performance, security, and scalability.",
      icon: BriefcaseWorkIcon,
      color: "from-orange-500 to-orange-600"
    },
  ];

  const achievements: Achievement[] = [
    {
      icon: TargetIcon,
      title: "100% Client Satisfaction",
      description: "Perfect track record with all clients"
    },
    {
      icon: StarBadgeIcon,
      title: "6+ Certifications",
      description: "Verified credentials from top institutions"
    },
    {
      icon: RocketLaunchIcon,
      title: "13+ Projects Delivered",
      description: "Successfully completed diverse projects"
    },
    {
      icon: UserCheckIcon,
      title: "20+ Students Trained",
      description: "Teaching next-gen developers"
    }
  ];

  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-blue-50 to-gray-50 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.35) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">My Journey & Achievements</h2>
              <div className="w-20 h-1 bg-blue-400 mx-auto mb-4"></div>
              <p className="text-blue-700 dark:text-blue-100 max-w-2xl mx-auto">
                Milestones that define my growth as a developer and educator
              </p>
            </div>
          </FadeIn>

          {/* Timeline */}
          <div className="relative">
            {/* Center Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400"></div>

            {/* Timeline Items */}
            <StaggerContainer staggerDelay={0.15} className="space-y-12">
              {milestones.map((milestone, index) => (
                <StaggerItem key={index}>
                  <div className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Content */}
                    <div className="flex-1">
                      <div className={`bg-white/90 dark:bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-white/20 ${
                        index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                      }`}>
                        {/* Year Badge */}
                        <div className={`inline-block px-4 py-2 bg-gradient-to-r ${milestone.color} rounded-full text-white font-bold text-sm mb-3`}>
                          {milestone.year}
                        </div>

                        {/* Icon */}
                        <div className={`mb-3 flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} justify-start`}>
                          <milestone.icon />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          {milestone.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-700 dark:text-blue-100 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full border-4 border-blue-400 shadow-lg z-10"></div>

                    {/* Spacer */}
                    <div className="flex-1 hidden md:block"></div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Key Achievements Grid */}
          <FadeIn delay={0.5}>
            <div className="mt-20">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">Key Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-white/90 dark:bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-gray-100 dark:hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-white/20"
                  >
                    <div className="mb-4 flex justify-center">
                      <achievement.icon />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{achievement.title}</h4>
                    <p className="text-gray-700 dark:text-blue-100 text-sm">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
