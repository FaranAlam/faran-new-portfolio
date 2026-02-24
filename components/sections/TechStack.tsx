"use client";

import Image from "next/image";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

export default function TechStack() {
  const technologies = {
    "Frontend": [
      { name: "HTML5", icon: "/images/tech-stack/html5.svg", color: "bg-orange-100 text-orange-600 border-orange-200" },
      { name: "CSS3", icon: "/images/tech-stack/css3.svg", color: "bg-blue-100 text-blue-600 border-blue-200" },
      { name: "JavaScript", icon: "/images/tech-stack/javascript.svg", color: "bg-yellow-100 text-yellow-600 border-yellow-200" },
      { name: "React.js", icon: "/images/tech-stack/react.svg", color: "bg-cyan-100 text-cyan-600 border-cyan-200" },
      { name: "Next.js", icon: "/images/tech-stack/nextjs.svg", color: "bg-gray-100 text-gray-900 border-gray-200" },
      { name: "Tailwind CSS", icon: "/images/tech-stack/tailwind.svg", color: "bg-teal-100 text-teal-600 border-teal-200" },
      { name: "TypeScript", icon: "/images/tech-stack/typescript.svg", color: "bg-blue-100 text-blue-700 border-blue-300" },
    ],
    "Backend": [
      { name: "Node.js", icon: "/images/tech-stack/nodejs.svg", color: "bg-green-100 text-green-600 border-green-200" },
      { name: "Express.js", icon: "/images/tech-stack/express.svg", color: "bg-gray-100 text-gray-700 border-gray-200" },
      { name: "MongoDB", icon: "/images/tech-stack/mongodb.svg", color: "bg-green-100 text-green-700 border-green-300" },
      { name: "PostgreSQL", icon: "/images/tech-stack/postgresql.svg", color: "bg-blue-100 text-blue-600 border-blue-200" },
      { name: "Redis", icon: "/images/tech-stack/redis.svg", color: "bg-red-100 text-red-600 border-red-200" },
      { name: "GraphQL", icon: "/images/tech-stack/graphql.svg", color: "bg-pink-100 text-pink-600 border-pink-200" },
    ],
    "Tools & DevOps": [
      { name: "Git", icon: "/images/tech-stack/git.svg", color: "bg-red-100 text-red-600 border-red-200" },
      { name: "Docker", icon: "/images/tech-stack/docker.svg", color: "bg-blue-100 text-blue-600 border-blue-200" },
      { name: "VS Code", icon: "/images/icons/code.svg", color: "bg-blue-100 text-blue-700 border-blue-200" },
      { name: "GitHub", icon: "/images/icons/rocket.svg", color: "bg-gray-100 text-gray-900 border-gray-300" },
      { name: "Postman", icon: "/images/icons/tools.svg", color: "bg-orange-100 text-orange-600 border-orange-200" },
      { name: "Vercel", icon: "/images/icons/rocket.svg", color: "bg-black text-white border-gray-800" },
    ],
    "Design & Others": [
      { name: "Figma", icon: "/images/icons/design.svg", color: "bg-purple-100 text-purple-600 border-purple-200" },
      { name: "Canva", icon: "/images/icons/design.svg", color: "bg-cyan-100 text-cyan-600 border-cyan-200" },
      { name: "Framer Motion", icon: "/images/icons/sparkles.svg", color: "bg-pink-100 text-pink-600 border-pink-200" },
      { name: "SEO", icon: "/images/icons/target.svg", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
      { name: "Responsive", icon: "/images/icons/mobile.svg", color: "bg-green-100 text-green-600 border-green-200" },
      { name: "Performance", icon: "/images/icons/lightning.svg", color: "bg-red-100 text-red-600 border-red-200" },
    ]
  };

  return (
    <section id="tech-stack" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Technologies I Work With</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A comprehensive toolkit to build modern, scalable, and high-performance web applications
              </p>
            </div>
          </FadeIn>

          {/* Tech Categories */}
          <div className="space-y-12">
            {Object.entries(technologies).map(([category, techs], catIndex) => (
              <div key={catIndex}>
                <FadeIn delay={catIndex * 0.1}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                    {category}
                  </h3>
                </FadeIn>

                <StaggerContainer staggerDelay={0.05} className="flex flex-wrap gap-4">
                  {techs.map((tech, techIndex) => (
                    <StaggerItem key={techIndex}>
                      <div className={`${tech.color} px-6 py-4 rounded-xl border-2 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer`}>
                        <div className="flex items-center gap-3">
                          {tech.icon.startsWith("/") ? (
                            <Image src={tech.icon} alt={tech.name} width={32} height={32} className="object-contain" />
                          ) : (
                            <span className="text-3xl">{tech.icon}</span>
                          )}
                          <span className="font-semibold text-sm whitespace-nowrap">
                            {tech.name}
                          </span>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <FadeIn delay={0.5}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
                <div className="text-gray-700 text-sm">Technologies</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-2">5+</div>
                <div className="text-gray-700 text-sm">Frameworks</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="text-3xl font-bold text-purple-600 mb-2">10+</div>
                <div className="text-gray-700 text-sm">Tools</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                <div className="text-3xl font-bold text-orange-600 mb-2">2+</div>
                <div className="text-gray-700 text-sm">Years Experience</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
