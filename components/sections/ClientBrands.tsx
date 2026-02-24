"use client";

import Image from "next/image";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

export default function ClientBrands() {
  const clients = [
    {
      name: "NextGen Dev Hub",
      category: "Tech Company",
      logo: "/images/logos/logo1.jpg",
      isImage: true,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "DevelopersHub",
      category: "Training Institute",
      logo: "💻",
      isImage: false,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "JayNex Technologies",
      category: "Software House",
      logo: "⚡",
      isImage: false,
      color: "from-green-500 to-teal-500"
    },
    {
      name: "NAVTTC",
      category: "Government Institute",
      logo: "🎓",
      isImage: false,
      color: "from-orange-500 to-red-500"
    },
    {
      name: "IIUI DECE-FET",
      category: "University",
      logo: "🏛️",
      isImage: false,
      color: "from-indigo-500 to-purple-500"
    },
    {
      name: "Local Restaurants",
      category: "Food Industry",
      logo: "🍽️",
      isImage: false,
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "E-commerce Stores",
      category: "Online Business",
      logo: "🛒",
      isImage: false,
      color: "from-pink-500 to-red-500"
    },
    {
      name: "Educational Platforms",
      category: "EdTech",
      logo: "📚",
      isImage: false,
      color: "from-cyan-500 to-blue-500"
    }
  ];

  const stats = [
    { icon: "🌟", label: "Trusted By", value: "8+ Clients" },
    { icon: "🏆", label: "Industries Served", value: "5+ Sectors" },
    { icon: "🌍", label: "Countries", value: "5+ Nations" },
    { icon: "💼", label: "Projects", value: "13+ Delivered" }
  ];

  return (
    <section id="clients" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Amazing Clients</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Proud to work with leading organizations, startups, and businesses across multiple industries
              </p>
            </div>
          </FadeIn>

          {/* Stats Row */}
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Client Logos Grid */}
          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {clients.map((client, index) => (
              <StaggerItem key={index}>
                <div className="group relative bg-white rounded-xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${client.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {client.isImage ? (
                      <div className="relative w-16 h-16 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                        <Image
                          src={client.logo}
                          alt={client.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {client.logo}
                      </div>
                    )}
                    <h3 className="font-bold text-gray-900 mb-1 text-sm group-hover:text-blue-600 transition-colors">
                      {client.name}
                    </h3>
                    <p className="text-xs text-gray-500">{client.category}</p>
                  </div>

                  {/* Hover Border Effect */}
                  <div className={`absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-xl transition-all duration-300`}></div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Testimonial Quote */}
          <FadeIn delay={0.3}>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-white text-center shadow-2xl">
              <div className="text-6xl mb-4 opacity-50">&ldquo;</div>
              <p className="text-xl md:text-2xl font-medium mb-6 max-w-3xl mx-auto leading-relaxed">
                Working with talented professionals who deliver quality work on time is rare. 
                Faran exceeded our expectations in every way!
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <div className="text-left">
                  <div className="font-bold">Client Name</div>
                  <div className="text-blue-200 text-sm">CEO, Tech Company</div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.4}>
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Want to join these successful clients?
              </p>
              <a
                href="#contact"
                className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:scale-105"
              >
                Let&apos;s Work Together
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
