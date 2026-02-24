"use client";

import Image from "next/image";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

export default function Achievements() {
  const milestones = [
    {
      year: "2022",
      title: "Started Freelancing Journey",
      description: "Began professional web development career, completed first client project successfully.",
      icon: "/images/icons/rocket.svg",
      color: "from-blue-500 to-blue-600"
    },
    {
      year: "2023",
      title: "Launched Faran Digital Academy",
      description: "Started teaching web development to aspiring developers. Trained 20+ students in web design.",
      icon: "/images/icons/education.svg",
      color: "from-purple-500 to-purple-600"
    },
    {
      year: "2024",
      title: "Full Stack Certification",
      description: "Earned NAVTTC Full Stack Development certification. Completed Computer Vision course from IIUI.",
      icon: "/images/icons/star.svg",
      color: "from-green-500 to-green-600"
    },
    {
      year: "2025",
      title: "Multiple Internships",
      description: "Gained industry experience through 5 internships: NHA, DevelopersHub, JayNex IT, and NextGen Learners.",
      icon: "/images/icons/briefcase.svg",
      color: "from-orange-500 to-orange-600"
    },
    {
      year: "2026",
      title: "13+ Projects Milestone",
      description: "Successfully delivered 13+ projects with 100% client satisfaction. Serving 8+ happy clients globally.",
      icon: "/images/icons/sparkles.svg",
      color: "from-pink-500 to-pink-600"
    }
  ];

  const achievements = [
    {
      icon: "/images/icons/target.svg",
      title: "100% Client Satisfaction",
      description: "Perfect track record with all clients"
    },
    {
      icon: "/images/icons/star.svg",
      title: "6+ Certifications",
      description: "Verified credentials from top institutions"
    },
    {
      icon: "/images/icons/rocket.svg",
      title: "13+ Projects Delivered",
      description: "Successfully completed diverse projects"
    },
    {
      icon: "/images/icons/person.svg",
      title: "20+ Students Trained",
      description: "Teaching next-gen developers"
    }
  ];

  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">My Journey & Achievements</h2>
              <div className="w-20 h-1 bg-blue-400 mx-auto mb-4"></div>
              <p className="text-blue-100 max-w-2xl mx-auto">
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
                      <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 ${
                        index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                      }`}>
                        {/* Year Badge */}
                        <div className={`inline-block px-4 py-2 bg-gradient-to-r ${milestone.color} rounded-full text-white font-bold text-sm mb-3`}>
                          {milestone.year}
                        </div>

                        {/* Icon */}
                        <div className={`mb-3 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                          {milestone.icon.startsWith("/") ? (
                            <Image src={milestone.icon} alt={milestone.title} width={48} height={48} className="w-12 h-12" />
                          ) : (
                            <span className="text-5xl">{milestone.icon}</span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {milestone.title}
                        </h3>

                        {/* Description */}
                        <p className="text-blue-100 leading-relaxed">
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
              <h3 className="text-3xl font-bold text-white text-center mb-10">Key Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20"
                  >
                    <div className="mb-4 flex justify-center">
                      {achievement.icon.startsWith("/") ? (
                        <Image src={achievement.icon} alt={achievement.title} width={48} height={48} className="w-12 h-12" />
                      ) : (
                        <span className="text-5xl">{achievement.icon}</span>
                      )}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{achievement.title}</h4>
                    <p className="text-blue-100 text-sm">{achievement.description}</p>
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
