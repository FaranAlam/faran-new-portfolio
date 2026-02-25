"use client";

import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

// SVG Icons for Education
const GraduationCapIcon = () => (
  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
  </svg>
);

const BooksIcon = () => (
  <svg className="w-8 h-8 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 4h6a3 3 0 0 1 3 3v13H6a3 3 0 0 0-3 3z" />
    <path d="M21 4h-6a3 3 0 0 0-3 3v13h6a3 3 0 0 1 3 3z" />
  </svg>
);

const BookOpenIcon = () => (
  <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
  icon: () => JSX.Element;
  status: string;
}

export default function Education() {
  const education: EducationItem[] = [
    {
      degree: "Bachelor of Science in Computer Engineering",
      institution: "International Islamic University Islamabad (IIUI)",
      period: "Sep 2022 - Present",
      location: "Islamabad, Pakistan",
      description: "Currently pursuing BS in Computer Engineering, focusing on software development, computer architecture, algorithms, and modern web technologies. Actively engaged in projects involving full-stack development and system design.",
      tags: ["Full-Stack Development", "Data Structures", "Web Technologies"],
      icon: GraduationCapIcon,
      status: "In Progress"
    },
    {
      degree: "Intermediate (FSc / HSSC)",
      institution: "Wisdom Science College, Chokara Karak",
      period: "Jan 2020 - Dec 2022",
      location: "Karak, Pakistan",
      description: "Completed intermediate education with focus on science subjects. Built strong foundation in mathematics, physics, and computer science which paved the way for engineering studies.",
      tags: ["English Medium", "Science Group", "Computer Science"],
      icon: BooksIcon,
      status: "Completed"
    },
    {
      degree: "Matriculation (SSC)",
      institution: "Wisdom Science College, Chokara Karak",
      period: "Jan 2018 - Dec 2020",
      location: "Karak, Pakistan",
      description: "Successfully completed secondary education with strong academic performance. Developed interest in technology and programming during this period.",
      tags: ["English Medium", "Science Stream"],
      icon: BookOpenIcon,
      status: "Completed"
    }
  ];

  return (
    <section id="education" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Education & Qualifications</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                My academic journey and educational background
              </p>
            </div>
          </FadeIn>

          {/* Education Timeline */}
          <StaggerContainer staggerDelay={0.15} className="space-y-8">
            {education.map((edu, index) => (
              <StaggerItem key={index}>
              <div
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105 hover:border-blue-200"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
                      <edu.icon />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {edu.degree}
                        </h3>
                        <div className="text-blue-600 font-semibold mb-1">
                          {edu.institution}
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {edu.period}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {edu.location}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        edu.status === 'In Progress' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {edu.status}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-4">
                      {edu.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {edu.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
