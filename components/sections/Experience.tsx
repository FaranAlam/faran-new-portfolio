"use client";

import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

// SVG Icons for Work Experience
const BriefcaseIcon = () => (
  <svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const RocketIcon = () => (
  <svg className="w-10 h-10 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const CodeBracketsIcon = () => (
  <svg className="w-10 h-10 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const BookOpenIcon = () => (
  <svg className="w-10 h-10 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  type: string;
  icon: () => JSX.Element;
}

export default function Experience() {
  const experiences: Experience[] = [
    {
      title: "Freelance Web Developer",
      company: "Self-Employed",
      period: "Since 2022",
      location: "Remote",
      description: "Providing professional web development services as a freelancer, building custom websites and web applications for clients worldwide using modern technologies and best practices.",
      type: "Freelance",
      icon: BriefcaseIcon
    },
    {
      title: "Web Developer Intern",
      company: "National Highway Authority (NHA)",
      period: "14 July, 2025 - 08 Sep, 2025",
      location: "Pakistan",
      description: "Worked on responsive web applications, focusing on front-end development, clean coding, and enhancing user experience during my internship at NHA.",
      type: "Internship",
      icon: RocketIcon
    },
    {
      title: "Full Stack Developer Intern",
      company: "DevelopersHub Corporation",
      period: "01 July, 2025 – 31 August, 2025",
      location: "Remote",
      description: "Contributed to full-stack development projects by building responsive UIs with modern design principles and implementing secure, scalable backend solutions. Gained hands-on experience with front-end frameworks, REST APIs, and database integration.",
      type: "Internship",
      icon: RocketIcon
    },
    {
      title: "Frontend Developer Intern",
      company: "Volunteer Force Of Pakistan (JayNex IT)",
      period: "01 July, 2025 – 31 August, 2025",
      location: "Pakistan",
      description: "Developed responsive user interfaces using React, HTML, CSS, and JavaScript, ensuring cross-browser compatibility and smooth user experiences.",
      type: "Internship",
      icon: CodeBracketsIcon
    },
    {
      title: "Web Developer Intern",
      company: "NextGen Learners",
      period: "01 July, 2025 – 31 July, 2025",
      location: "Remote",
      description: "Contributed to building and maintaining web applications by developing responsive front-end interfaces with React, HTML, CSS, and JavaScript, while also assisting in backend integration to deliver functional and user-friendly solutions.",
      type: "Internship",
      icon: BookOpenIcon
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">My Work Experience</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Professional journey and hands-on experience in web development
              </p>
            </div>
          </FadeIn>

          {/* Timeline */}
          <div className="relative">
            {/* Central Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-200"></div>

            {/* Experience Items */}
            <StaggerContainer staggerDelay={0.15} className="space-y-12">
              {experiences.map((exp, index) => (
                <StaggerItem key={index}>
                  <div
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1">
                    <div className={`bg-gray-50 dark:bg-gray-800/70 rounded-xl p-6 shadow-sm hover:shadow-lg dark:hover:shadow-blue-900/40 transition-all duration-300 hover:scale-105 ${
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                    }`}>
                      {/* Icon */}
                      <div className={`mb-3 flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} justify-start`}>
                        <exp.icon />
                      </div>
                      
                      {/* Title & Company */}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {exp.title}
                      </h3>
                      <div className="text-blue-600 font-semibold mb-2">
                        {exp.company}
                      </div>
                      
                      {/* Period & Location */}
                      <div className="flex flex-wrap gap-2 mb-3 text-sm text-gray-500 dark:text-gray-400 justify-start md:justify-end">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {exp.period}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {exp.location}
                        </span>
                      </div>

                      {/* Type Badge */}
                      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium mb-3">
                        {exp.type}
                      </span>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {exp.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900 shadow"></div>

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block"></div>
                </div>
              </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
