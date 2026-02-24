"use client";

import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

export default function CaseStudies() {
  const caseStudies = [
    {
      title: "Restaurant Website - 300% Traffic Increase",
      client: "Local Restaurant Business",
      category: "Web Design",
      duration: "3 weeks",
      image: "🍽️",
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
      image: "🎓",
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
      image: "📋",
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
    <section id="case-studies" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Case Studies</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Real projects, real results. See how I helped businesses achieve their goals
              </p>
            </div>
          </FadeIn>

          {/* Case Studies */}
          <StaggerContainer staggerDelay={0.2} className="space-y-16">
            {caseStudies.map((study, index) => (
              <StaggerItem key={index}>
                <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${study.color} p-8 text-white`}>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="text-6xl">{study.image}</div>
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                          <div className="flex flex-wrap gap-3 text-sm">
                            <span className="bg-white/20 px-3 py-1 rounded-full">{study.client}</span>
                            <span className="bg-white/20 px-3 py-1 rounded-full">{study.category}</span>
                            <span className="bg-white/20 px-3 py-1 rounded-full">⏱️ {study.duration}</span>
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
                        <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <span className="text-2xl">🎯</span> Challenge
                        </h4>
                        <p className="text-gray-600 leading-relaxed">{study.challenge}</p>
                      </div>

                      {/* Solution */}
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <span className="text-2xl">💡</span> Solution
                        </h4>
                        <p className="text-gray-600 leading-relaxed">{study.solution}</p>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="text-2xl">📊</span> Results
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {study.results.map((result, idx) => (
                          <div key={idx} className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className={`text-3xl font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent mb-2`}>
                              {result.metric}
                            </div>
                            <div className="text-gray-600 text-sm">{result.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
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
            <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Want Similar Results for Your Business?
              </h3>
              <p className="text-gray-600 mb-6">
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
