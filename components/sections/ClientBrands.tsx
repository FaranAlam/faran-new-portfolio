"use client";
import Image from "next/image";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

// SVG Icons for Client Brands
const LaptopIcon = () => (
  <svg className="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="12" rx="2" ry="2" />
    <path d="M2 20h20" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
  </svg>
);

const GraduationCapIcon = () => (
  <svg className="w-12 h-12 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
  </svg>
);

const UniversityIcon = () => (
  <svg className="w-12 h-12 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3L2 9l10 6 10-6-10-6z" />
    <path d="M4 12v6h16v-6" />
    <path d="M7 12v6" />
    <path d="M17 12v6" />
  </svg>
);

const RestaurantIcon = () => (
  <svg className="w-12 h-12 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 2v7" />
    <path d="M5 2v7" />
    <path d="M11 2v7" />
    <path d="M7 9v13" />
    <path d="M17 2v20" />
    <path d="M14 6h6" />
  </svg>
);

const CartIcon = () => (
  <svg className="w-12 h-12 text-pink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const BooksIcon = () => (
  <svg className="w-12 h-12 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 4h6a3 3 0 0 1 3 3v13H6a3 3 0 0 0-3 3z" />
    <path d="M21 4h-6a3 3 0 0 0-3 3v13h6a3 3 0 0 1 3 3z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M7 4h10v3a5 5 0 0 1-10 0V4z" />
    <path d="M5 4h2v3a5 5 0 0 1-2 4" />
    <path d="M19 4h-2v3a5 5 0 0 0 2 4" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
  </svg>
);

interface Client {
  name: string;
  category: string;
  logo: string;
  isImage: boolean;
  color: string;
  icon?: () => JSX.Element;
}

interface ClientStat {
  icon: () => JSX.Element;
  label: string;
  value: string;
}

export default function ClientBrands() {
  const clients: Client[] = [
    {
      name: "NextGen Dev Hub",
      category: "Tech Company",
      logo: "",
      isImage: false,
      icon: LaptopIcon,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "DevelopersHub",
      category: "Training Institute",
      logo: "",
      isImage: false,
      icon: LaptopIcon,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "JayNex Technologies",
      category: "Software House",
      logo: "",
      isImage: false,
      icon: BoltIcon,
      color: "from-green-500 to-teal-500"
    },
    {
      name: "NAVTTC",
      category: "Government Institute",
      logo: "",
      isImage: false,
      icon: GraduationCapIcon,
      color: "from-orange-500 to-red-500"
    },
    {
      name: "IIUI DECE-FET",
      category: "University",
      logo: "",
      isImage: false,
      icon: UniversityIcon,
      color: "from-indigo-500 to-purple-500"
    },
    {
      name: "Local Restaurants",
      category: "Food Industry",
      logo: "",
      isImage: false,
      icon: RestaurantIcon,
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "E-commerce Stores",
      category: "Online Business",
      logo: "",
      isImage: false,
      icon: CartIcon,
      color: "from-pink-500 to-red-500"
    },
    {
      name: "Educational Platforms",
      category: "EdTech",
      logo: "",
      isImage: false,
      icon: BooksIcon,
      color: "from-cyan-500 to-blue-500"
    }
  ];

  const stats: ClientStat[] = [
    { icon: StarIcon, label: "Trusted By", value: "8+ Clients" },
    { icon: TrophyIcon, label: "Industries Served", value: "5+ Sectors" },
    { icon: GlobeIcon, label: "Countries", value: "5+ Nations" },
    { icon: BriefcaseIcon, label: "Projects", value: "13+ Delivered" }
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
                  <div className="flex justify-center mb-2">
                    <stat.icon />
                  </div>
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
                      <div className="mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center text-blue-600">
                        {client.icon && <client.icon />}
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
                Faran is an exceptionally talented developer. Having worked with us at RSG Pakistan for several months, he has consistently delivered high-quality work and demonstrated a deep understanding of web technologies. His dedication to the ISCB-SC RSG Pakistan team is truly commendable.
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/testimonials/rsg pakistan.jpg"
                    alt="RSG Pakistan Logo"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-bold">Javaria Bahadur</div>
                  <div className="text-blue-200 text-sm">President of RSG Pakistan</div>
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
