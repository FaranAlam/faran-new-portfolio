"use client";

import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

// SVG Icons
const RestaurantIcon = () => (
  <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
  </svg>
);

const EducationIcon = () => (
  <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
  </svg>
);

const TaskIcon = () => (
  <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

const ChallengeIcon = () => (
  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="12" cy="12" r="9"/>
  </svg>
);

const SolutionIcon = () => (
  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const ResultsIcon = () => (
  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
    <polyline points="13 2 13 9 20 9"/>
    <line x1="6" y1="12" x2="18" y2="12"/>
    <line x1="6" y1="16" x2="18" y2="16"/>
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

export default function CaseStudies() {
  const caseStudies = [
    {
      title: "Restaurant Website - 300% Traffic Increase",
      client: "Local Restaurant Business",
      category: "Web Design",
      duration: "3 weeks",
      icon: RestaurantIcon,
      challenge: "Restaurant had outdated website with poor mobile experience. Losing customers to competitors with modern online presence.",
      solution: "Designed and developed a modern, mobile-first responsive website with online menu, reservation system, photo gallery, and integrated Google Maps. Implemented SEO optimization and fast loading speed.",
      results: [
        { metric: "300%", label: "Traffic Increase" },
        { metric: "5x", label: "Online Orders" },
        { metric: "4.8/5", label: "User Rating" },
        { metric: "2 sec", label: "Load Time" }
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "SEO"],
      liveUrl: "https://faranrestaurant.netlify.app/",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Educational Platform - 500+ Students",
      client: "Faran Digital Academy",
      category: "Full Stack",
      duration: "6 weeks",
      icon: EducationIcon,
      challenge: "Needed a complete online learning platform to teach web development courses with student management, course materials, and progress tracking.",
      solution: "Built a full-stack educational platform with user authentication, course enrollment system, video hosting, assignments submission, and progress dashboards. Integrated payment gateway for course purchases.",
      results: [
        { metric: "500+", label: "Students Enrolled" },
        { metric: "95%", label: "Completion Rate" },
        { metric: "₹50K+", label: "Monthly Revenue" },
        { metric: "4.9/5", label: "Course Rating" }
      ],
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "TaskTrackr - Productivity Tool",
      client: "Startup Company",
      category: "SaaS Application",
      duration: "8 weeks",
      icon: TaskIcon,
      challenge: "Company needed a custom task management system with team collaboration features, real-time updates, and detailed analytics.",
      solution: "Developed a full-featured task management application with drag-and-drop interface, real-time collaboration using WebSockets, customizable workflows, and comprehensive analytics dashboard.",
      results: [
        { metric: "200+", label: "Active Users" },
        { metric: "40%", label: "Productivity Gain" },
        { metric: "99.9%", label: "Uptime" },
        { metric: "50ms", label: "Response Time" }
      ],
      technologies: ["Next.js", "MongoDB", "WebSockets", "Tailwind CSS"],
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section id="case-studies" className="py-20 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Case Studies</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Real projects, real results. See how I helped businesses achieve their goals
              </p>
            </div>
          </FadeIn>

          {/* Case Studies */}
          <StaggerContainer staggerDelay={0.2} className="space-y-16">
            {caseStudies.map((study, index) => (
              <StaggerItem key={index}>
                <div className="bg-gray-50 dark:bg-gray-800/70 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl dark:hover:shadow-blue-900/40 transition-all duration-300">
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${study.color} p-8 text-white`}>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <study.icon />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                          <div className="flex flex-wrap gap-3 text-sm">
                            <span className="bg-white/20 px-3 py-1 rounded-full">{study.client}</span>
                            <span className="bg-white/20 px-3 py-1 rounded-full">{study.category}</span>
                            <span className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
                              <ClockIcon /> {study.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      {/* Challenge */}
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <ChallengeIcon /> Challenge
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{study.challenge}</p>
                      </div>

                      {/* Solution */}
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                          <SolutionIcon /> Solution
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{study.solution}</p>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <ResultsIcon /> Results
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {study.results.map((result, idx) => (
                          <div key={idx} className="text-center p-4 bg-white dark:bg-gray-700/80 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className={`text-3xl font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent mb-2`}>
                              {result.metric}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 text-sm">{result.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    {study.liveUrl && (
                      <a
                        href={study.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${study.color} text-white rounded-lg hover:scale-105 transition-all duration-300 font-semibold shadow-md`}
                      >
                        View Live Project
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Bottom CTA */}
          <FadeIn delay={0.5}>
            <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/80 dark:to-blue-900/60 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Want Similar Results for Your Business?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Let&apos;s discuss how I can help you achieve your goals
              </p>
              <a
                href="#contact"
                className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:scale-105"
              >
                Start Your Success Story
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
