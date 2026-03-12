"use client";

import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

// SVG Icons for Portfolio Projects
const EducationIcon = () => (
  <svg className="w-20 h-20 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
  </svg>
);

const TaskIcon = () => (
  <svg className="w-20 h-20 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
  </svg>
);

const HealthcareIcon = () => (
  <svg className="w-20 h-20 text-red-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
  </svg>
);

const SalaryIcon = () => (
  <svg className="w-20 h-20 text-green-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
  </svg>
);

const InterviewIcon = () => (
  <svg className="w-20 h-20 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
  </svg>
);

const RestaurantIcon = () => (
  <svg className="w-20 h-20 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
  </svg>
);

export default function Portfolio() {
  const projects = [
    {
      title: "Educational Website Design",
      description: "A modern educational platform with responsive design, course management, and interactive learning features.",
      icon: EducationIcon,
      technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Web Design"
    },
    {
      title: "TaskTrackr Website",
      description: "A full-stack task management application with user authentication, real-time updates, and intuitive interface.",
      icon: TaskIcon,
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Full Stack"
    },
    {
      title: "Diabetes Risk Predictor",
      description: "AI-powered web application that predicts diabetes risk based on medical parameters using machine learning algorithms.",
      icon: HealthcareIcon,
      technologies: ["Python", "Machine Learning", "Flask", "React"],
      liveUrl: "#",
      githubUrl: "#",
      category: "AI Prediction"
    },
    {
      title: "SmartSalary Predictor",
      description: "Intelligent salary prediction system using AI to estimate salary ranges based on skills, experience, and location.",
      icon: SalaryIcon,
      technologies: ["Python", "AI/ML", "Data Analysis", "Web App"],
      liveUrl: "#",
      githubUrl: "#",
      category: "AI Prediction"
    },
    {
      title: "AI-Mock Interview App",
      description: "Interactive AI-powered mock interview platform helping candidates prepare for technical interviews with real-time feedback.",
      icon: InterviewIcon,
      technologies: ["React", "AI Integration", "Voice Recognition", "Firebase"],
      liveUrl: "#",
      githubUrl: "#",
      category: "Web Design"
    },
    {
      title: "Restaurant Website",
      description: "Beautiful and responsive restaurant website with online menu, reservation system, and gallery showcase.",
      icon: RestaurantIcon,
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      liveUrl: "https://faranrestaurant.netlify.app/",
      githubUrl: "#",
      category: "Web Design"
    },
  ];

  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Portfolio</h2>
              <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Here are some of my recent projects that showcase my skills and expertise in web development.
              </p>
            </div>
          </FadeIn>

          {/* Portfolio Grid */}
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <StaggerItem key={index}>
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-gray-950/50 transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:scale-105 hover:border-blue-200 dark:hover:border-blue-500 h-full">

                {/* Project Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                  <project.icon />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium mb-3">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <a
                      href={project.liveUrl}
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      Code
                    </a>
                  </div>
                </div>
              </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* View More */}
          <FadeIn delay={0.3}>
            <div className="text-center mt-12">
              <a
                href="#portfolio"
                className="inline-block px-8 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg"
              >
                View All Projects
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
