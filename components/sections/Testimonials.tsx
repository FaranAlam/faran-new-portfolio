"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Tanjila Akter",
      role: "Graphic Designer",
      initials: "TA",
      rating: 5,
      text: "Faran Alam is a highly skilled and creative web developer. He designed my portfolio with great professionalism and attention to detail. Truly impressive work.",
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
    }
  ];

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Slow speed

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when halfway through (seamless loop)
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      requestAnimationFrame(scroll);
    };

    const animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section id="testimonials" className="py-28 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">💬 What People Say</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real feedback from clients I&apos;ve worked with
            </p>
          </motion.div>

          {/* Auto-scrolling Testimonials */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden scrollbar-hide py-8"
            style={{ 
              scrollBehavior: 'auto',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow w-[calc(33.333%-16px)] flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col h-full">
                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(testimonial.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote icon */}
                  <div className="text-3xl text-blue-600 mb-3">&ldquo;</div>

                  {/* Text */}
                  <p className="text-sm text-gray-700 mb-4 flex-grow leading-relaxed">{testimonial.text}</p>

                  {/* Divider */}
                  <div className="h-px bg-gray-200 mb-4"></div>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0`}>
                      {testimonial.initials}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 text-base">{testimonial.name}</div>
                      <div className="text-xs text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
