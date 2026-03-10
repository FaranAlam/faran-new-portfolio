"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Tanjila Akter",
      role: "Graphic Designer",
      initials: "TA",
      rating: 5,
      text: "Faran Alam is a highly skilled and creative web developeDr. He designed my portfolio with great professionalism and attention to detail. Truly impressive work.",
      gradient: "from-purple-400 to-purple-700"
    },
    {
      name: "Dennis Uka",
      role: "Inventory Specialist, Emmatos Superstore",
      initials: "DU",
      rating: 5,
      text: "Great experience working with Faran. He delivers clean, responsive websites, communicates well, and meets deadlines. Highly recommended for anyone needing a reliable web developer.",
      gradient: "from-pink-300 to-red-500"
    },
    {
      name: "Sabah Batool",
      role: "Student, IIUI",
      initials: "SB",
      rating: 5,
      text: "Respected Sir Faran provided excellent service and guidance throughout our work together. His expertise in basic computer skills helped clarify my concepts, and I appreciate his supportive approach. I highly recommend his services.",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      name: "Husna Bibi",
      role: "Teacher, Bait-ul-Mal School, Karachi",
      initials: "HB",
      rating: 5,
      text: "Big thanks to Faran for delivering a high-quality portfolio website. His technical knowledge and design sense are truly commendable.",
      gradient: "from-green-400 to-teal-500"
    },
    {
      name: "Shanzey Shafique",
      role: "Project Manager",
      initials: "SS",
      rating: 5,
      text: "I had the opportunity(Volunteer Force Pakistan) to work with him during our web development internship, and he consistently demonstrated strong technical skills and a high level of dedication. He is hardworking and always willing to take on new tasks. He approaches his work with honesty and responsibility, ensuring that tasks are completed properly. His attitude and work ethic make him a valuable team member in any development environment.",
      gradient: "from-orange-400 to-red-500"
    },
    {
      name: "Laraib Jehanzeb",
      role: "President, Leading Stars",
      initials: "LJ",
      rating: 5,
      text: "Many thanks to Faran Alam for creating the Leading Stars website. His professionalism, technical knowledge, and excellent design sense made the process smooth and successful.",
      gradient: "from-indigo-400 to-purple-600"
    },
    {
      name: "Eiman Aftab",
      role: "Student, IIUI",
      initials: "EA",
      rating: 5,
      text: "I am impressed with the initial onboarding process. Your teaching approach seems engaging and supportive, setting a positive tone for the learning journey. Looking forward to starting the course!",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      name: "Zunaira Abdul Rehman",
      role: "Student, AAUBC",
      initials: "ZA",
      rating: 5,
      text: "It was a great experience working with Faran Alam.The level of professionalism, cooperation, and support throughout the work process was excellent. Communication was clear, and everything was guided in detail, ensuring a deep understanding of every aspect of the project.",
      gradient: "from-pink-400 to-rose-500"
    },
    {
      name: "Areesha Awais",
      role: "Student, AAUBC",
      initials: "AA",
      rating: 5,
      text: "Working with Faran has been an excellent experience. He demonstrated remarkable technical expertise, professionalism, and commitment, delivering a portfolio website of exceptional quality.",
      gradient: "from-sky-400 to-blue-600"
    },
    {
      name: "Huma Tehreem",
      role: "Teacher",
      initials: "HT",
      rating: 5,
      text: "Faran did an excellent job with keyword optimization for my website. He has strong SEO expertise and carefully selected and implemented relevant keywords without affecting content quality. His work improved the overall structure and visibility of my site. Communication was clear, deadlines were met, and the entire process was smooth and professional. I highly recommend Faran to anyone looking for a reliable and skilled web developer for SEO and keyword optimization.",
      gradient: "from-violet-400 to-purple-500"
    }
  ];

  // Duplicate testimonials for seamless infinite scroll on desktop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Navigation functions
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-scroll effect for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Continuous auto-scroll for desktop
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3000); // Smooth continuous movement every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle seamless loop reset
  useEffect(() => {
    if (currentIndex === testimonials.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 1500); // Wait for transition to complete
    }
  }, [currentIndex, testimonials.length]);

  return (
    <section id="testimonials" className="py-28 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto overflow-hidden">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What People Say</h2>
            <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real feedback from clients I&apos;ve worked with
            </p>
          </motion.div>

          {/* Auto-scrolling Testimonials */}
          <div className="relative px-0 md:px-0">
            {/* Mobile View: Slider */}
            <div className="md:hidden overflow-hidden py-8">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg w-full flex-shrink-0"
                  >
                    <div className="flex flex-col h-full">
                      {/* Stars */}
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(testimonial.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      {/* Quote icon */}
                      <div className="text-3xl text-blue-600 dark:text-blue-400 mb-3">&ldquo;</div>

                      {/* Text */}
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-grow leading-relaxed">{testimonial.text}</p>

                      {/* Divider */}
                      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-4"></div>

                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0`}>
                          {testimonial.initials}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-900 dark:text-white text-base">{testimonial.name}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: Navigation Arrows and Dots at Bottom */}
            <div className="md:hidden flex items-center justify-between gap-4">
              {/* Left Arrow */}
              <button
                onClick={prevTestimonial}
                className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Indicator Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'w-8 bg-blue-600 dark:bg-blue-400' : 'w-2 bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={nextTestimonial}
                className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Desktop View: Continuous Sliding Carousel */}
            <div className="hidden md:block overflow-hidden py-8">
              <div 
                ref={containerRef}
                className="flex gap-6"
                style={{ 
                  transform: `translateX(calc(-${currentIndex} * (33.333% + 1.5rem)))`,
                  transition: isTransitioning ? 'transform 1500ms ease-in-out' : 'none',
                }}
              >
                {duplicatedTestimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl dark:hover:shadow-gray-950/50 transition-shadow w-[calc(33.333%-1rem)] flex-shrink-0"
                  >
                    <div className="flex flex-col h-full">
                      {/* Stars */}
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(testimonial.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      {/* Quote icon */}
                      <div className="text-3xl text-blue-600 dark:text-blue-400 mb-3">&ldquo;</div>

                      {/* Text */}
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-grow leading-relaxed">{testimonial.text}</p>

                      {/* Divider */}
                      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-4"></div>

                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0`}>
                          {testimonial.initials}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-900 dark:text-white text-base">{testimonial.name}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicator Dots - Desktop Only */}
            <div className="hidden md:flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === (currentIndex % testimonials.length) ? 'w-8 bg-blue-600 dark:bg-blue-400' : 'w-2 bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      </section>
  );
}
