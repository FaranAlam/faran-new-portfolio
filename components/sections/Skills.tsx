"use client";

import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

const IconFrontend = () => (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  );

  const IconBackend = () => (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v6m0 6v6M5.6 5.6l4.2 4.2m5.2 5.2l4.2 4.2M1 12h6m6 0h6M5.6 18.4l4.2-4.2m5.2-5.2l4.2-4.2"/>
    </svg>
  );

  const IconTools = () => (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  );

  export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <IconFrontend />,
      iconBg: "bg-gradient-to-br from-blue-500 to-purple-500",
      skills: [
        { name: "HTML5", level: 95, color: "bg-orange-500" },
        { name: "CSS3/SCSS", level: 90, color: "bg-blue-500" },
        { name: "Tailwind CSS", level: 95, color: "bg-cyan-500" },
        { name: "JavaScript", level: 85, color: "bg-yellow-500" },
        { name: "React.js", level: 80, color: "bg-blue-400" },
        { name: "Next.js", level: 75, color: "bg-gray-800" },
      ]
    },
    {
      title: "Backend Development",
      icon: <IconBackend />,
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
      skills: [
        { name: "Node.js", level: 78, color: "bg-green-600" },
        { name: "Express.js", level: 75, color: "bg-gray-600" },
        { name: "MongoDB", level: 80, color: "bg-green-500" },
        { name: "REST APIs", level: 82, color: "bg-blue-600" },
        { name: "Authentication", level: 75, color: "bg-purple-500" },
      ]
    },
    {
      title: "Tools & Others",
      icon: <IconTools />,
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
      skills: [
        { name: "Git & GitHub", level: 85, color: "bg-gray-700" },
        { name: "VS Code", level: 90, color: "bg-blue-600" },
        { name: "Figma", level: 70, color: "bg-purple-600" },
        { name: "Postman", level: 80, color: "bg-orange-600" },
        { name: "Docker", level: 65, color: "bg-blue-500" },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Technical Skills</h2>
              <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                My expertise across the full development stack
              </p>
            </div>
          </FadeIn>

          {/* Skills Grid */}
          <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, catIndex) => (
              <StaggerItem key={catIndex}>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 shadow-sm hover:shadow-xl dark:hover:shadow-gray-900/50 transition-all duration-300 hover:scale-105 h-full">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`${category.iconBg} p-3 rounded-lg text-white shadow-lg`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {skill.name}
                          </span>
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Additional Info */}
          <FadeIn delay={0.5}>
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 border border-blue-100 dark:border-blue-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Always Learning & Growing
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
                  I&apos;m constantly updating my skills and learning new technologies to stay ahead in the ever-evolving world of web development. Currently exploring AI integration, advanced animations, and modern DevOps practices.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {["TypeScript", "GraphQL", "Web3", "AI/ML", "Cloud Services", "Microservices"].map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
