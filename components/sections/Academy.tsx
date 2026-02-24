"use client";

import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";
import { motion } from "framer-motion";

export default function Academy() {
  const course = {
    title: "Web Designing",
    level: "Beginner",
    description: "Learn modern web design from scratch to create stunning websites",
    duration: "12 Weeks",
    timing: "1 hr/day, 3 days/week",
    fees: "5000 PKR",
    mode: "Online",
    certificate: "Included",
    instructor: {
      name: "Faran Alam",
      title: "Full Stack Developer & HOD",
      bio: "Experienced web developer with expertise in modern web technologies. Dedicated to teaching and mentoring the next generation of web designers.",
      image: "👨‍💻"
    },
    curriculum: [
      { week: 1, title: "Introduction to Web & Internet Basics" },
      { week: 2, title: "HTML Basics" },
      { week: 3, title: "Intermediate HTML" },
      { week: 4, title: "CSS Basics" },
      { week: 5, title: "CSS Layout" },
      { week: 6, title: "Responsive Web Design" },
      { week: 7, title: "CSS Advanced" },
      { week: 8, title: "JavaScript Basics (Optional)" },
      { week: 9, title: "CSS Frameworks" },
      { week: 10, title: "Introduction to React.js" },
      { week: 11, title: "Final Project Work" },
      { week: 12, title: "Portfolio & Freelancing" }
    ],
    benefits: [
      { icon: "/images/icons/lightbulb.svg", title: "Live Classes", description: "Interactive sessions with instructor" },
      { icon: "/images/icons/briefcase.svg", title: "Real Projects", description: "Build portfolio-ready projects" },
      { icon: "/images/icons/education.svg", title: "Certificate", description: "Completion certificate included" },
      { icon: "/images/icons/chat.svg", title: "Expert Support", description: "Get help when you need it" }
    ]
  };

  return (
    <section id="academy" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Faran Digital Academy</h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Master the art of web design with industry-expert instruction
            </p>
          </motion.div>

          {/* Course Card */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Course Info */}
              <div className="p-8 lg:p-12">
                {/* Badge */}
                <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                  {course.level}
                </span>

                {/* Title */}
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                  {course.description}
                </p>

                {/* Course Details */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      ⏱️
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Duration</div>
                      <div className="font-semibold text-gray-900">{course.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      🕐
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Class Timing</div>
                      <div className="font-semibold text-gray-900">{course.timing}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      📊
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Level</div>
                      <div className="font-semibold text-gray-900">{course.level}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      💰
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Fees</div>
                      <div className="font-semibold text-gray-900">{course.fees}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      💻
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Mode</div>
                      <div className="font-semibold text-gray-900">{course.mode}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      🎓
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Certificate</div>
                      <div className="font-semibold text-gray-900">{course.certificate}</div>
                    </div>
                  </div>
                </div>

                {/* Instructor */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Your Instructor</h4>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
                      {course.instructor.image}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{course.instructor.name}</div>
                      <div className="text-sm text-purple-600 mb-2">{course.instructor.title}</div>
                      <p className="text-sm text-gray-600">{course.instructor.bio}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfwakRPuNxSKd7xXhG2Eix7l73KdneCd0Ys0Z6T1QpoLW7IMg/viewform?usp=header"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-8 px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold text-center"
                >
                  REGISTER NOW
                </a>
              </div>

              {/* Right Side - Curriculum & Benefits */}
              <div className="bg-gray-50 p-8 lg:p-12">
                {/* Curriculum */}
                <h4 className="font-semibold text-gray-900 mb-6">Course Curriculum</h4>
                <div className="space-y-3 mb-8 max-h-96 overflow-y-auto">
                  {course.curriculum.map((item, index) => (
                    <motion.div
                      key={item.week}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 flex-shrink-0">
                        {item.week}
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Week {item.week}</div>
                        <div className="font-medium text-gray-900">{item.title}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Benefits */}
                <h4 className="font-semibold text-gray-900 mb-6">What You&apos;ll Get</h4>
                <div className="grid grid-cols-2 gap-4">
                  {course.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <div className="text-3xl mb-2">{benefit.icon}</div>
                      <div className="font-semibold text-gray-900 text-sm">{benefit.title}</div>
                      <div className="text-xs text-gray-600 mt-1">{benefit.description}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-8 p-4 bg-purple-100 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">Join hundreds of students</div>
                  <div className="text-sm text-gray-700">learning web design</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
