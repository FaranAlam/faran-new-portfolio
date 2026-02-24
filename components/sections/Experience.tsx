"use client";

import Image from "next/image";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

export default function Experience() {
  const experiences = [
    {
      title: "Freelance Web Developer",
      company: "Self-Employed",
      period: "Since 2022",
      location: "Remote",
      description: "Providing professional web development services as a freelancer, building custom websites and web applications for clients worldwide using modern technologies and best practices.",
      type: "Freelance",
      icon: "/images/icons/briefcase.svg"
    },
    {
      title: "Web Developer Intern",
      company: "National Highway Authority (NHA)",
      period: "14 July, 2025 - 08 Sep, 2025",
      location: "Pakistan",
      description: "Worked on responsive web applications, focusing on front-end development, clean coding, and enhancing user experience during my internship at NHA.",
      type: "Internship",
      icon: "/images/icons/rocket.svg"
    },
    {
      title: "Full Stack Developer Intern",
      company: "DevelopersHub Corporation",
      period: "01 July, 2025 – 31 August, 2025",
      location: "Remote",
      description: "Contributed to full-stack development projects by building responsive UIs with modern design principles and implementing secure, scalable backend solutions. Gained hands-on experience with front-end frameworks, REST APIs, and database integration.",
      type: "Internship",
      icon: "/images/icons/rocket.svg"
    },
    {
      title: "Frontend Developer Intern",
      company: "Volunteer Force Of Pakistan (JayNex IT)",
      period: "01 July, 2025 – 31 August, 2025",
      location: "Pakistan",
      description: "Developed responsive user interfaces using React, HTML, CSS, and JavaScript, ensuring cross-browser compatibility and smooth user experiences.",
      type: "Internship",
      icon: "/images/icons/code.svg"
    },
    {
      title: "Web Developer Intern",
      company: "NextGen Learners",
      period: "01 July, 2025 – 31 July, 2025",
      location: "Remote",
      description: "Contributed to building and maintaining web applications by developing responsive front-end interfaces with React, HTML, CSS, and JavaScript, while also assisting in backend integration to deliver functional and user-friendly solutions.",
      type: "Internship",
      icon: "/images/icons/education.svg"
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">My Work Experience</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
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
                    <div className={`bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                    }`}>
                      {/* Icon */}
                      <div className={`mb-3 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        {exp.icon.startsWith("/") ? (
                          <Image src={exp.icon} alt={exp.title} width={40} height={40} className="w-10 h-10" />
                        ) : (
                          <span className="text-4xl">{exp.icon}</span>
                        )}
                      </div>
                      
                      {/* Title & Company */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {exp.title}
                      </h3>
                      <div className="text-blue-600 font-semibold mb-2">
                        {exp.company}
                      </div>
                      
                      {/* Period & Location */}
                      <div className="flex flex-wrap gap-2 mb-3 text-sm text-gray-500 justify-start md:justify-end">
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
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium mb-3">
                        {exp.type}
                      </span>

                      {/* Description */}
                      <p className="text-gray-600 text-sm">
                        {exp.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow"></div>

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
