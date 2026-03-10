"use client";

import { useState } from "react";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

// SVG Icons for Book Consultation
const CoffeeIcon = () => (
  <svg className="w-10 h-10 text-blue-600 dark:text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-10 h-10 text-blue-600 dark:text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const DiamondIcon = () => (
  <svg className="w-10 h-10 text-blue-600 dark:text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2 2 9l10 13 10-13-10-7z" />
    <path d="M2 9h20" />
    <path d="M12 2v20" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 text-green-400 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const HandIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22a4 4 0 0 1-4-4v-7" />
    <path d="M8 11V5a2 2 0 0 1 4 0v7" />
    <path d="M12 12V6a2 2 0 1 1 4 0v6" />
    <path d="M16 12V7a2 2 0 1 1 4 0v7a4 4 0 0 1-4 4h-4" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-8 h-8 text-blue-600 dark:text-blue-200" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 2v11h3v9l7-12h-4l4-8z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-8 h-8 text-blue-600 dark:text-blue-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const BadgeIcon = () => (
  <svg className="w-8 h-8 text-blue-600 dark:text-blue-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="5" />
    <path d="M8.21 13.89 7 22l5-2.5L17 22l-1.21-8.11" />
  </svg>
);

const GiftIcon = () => (
  <svg className="w-8 h-8 text-blue-600 dark:text-blue-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="8" width="18" height="13" rx="2" ry="2" />
    <path d="M12 8v13" />
    <path d="M3 12h18" />
    <path d="M7.5 8C6 8 5 6.5 5 5s1-3 2.5-3S10 3.5 10 5" />
    <path d="M16.5 8C18 8 19 6.5 19 5s-1-3-2.5-3S14 3.5 14 5" />
  </svg>
);

interface ServiceItem {
  title: string;
  duration: string;
  price: string;
  description: string;
  icon: () => JSX.Element;
  features: string[];
  popular: boolean;
}

interface BenefitItem {
  icon: () => JSX.Element;
  title: string;
  desc: string;
}

export default function BookConsultation() {
  const [selectedService, setSelectedService] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const services: ServiceItem[] = [
    {
      title: "Quick 15-Min Call",
      duration: "15 minutes",
      price: "FREE",
      description: "Perfect for quick questions, project scope discussion, or getting to know each other.",
      icon: CoffeeIcon,
      features: [
        "Project feasibility check",
        "Technology recommendations",
        "Rough timeline estimate",
        "No commitment required"
      ],
      popular: false
    },
    {
      title: "Strategy Session",
      duration: "30 minutes",
      price: "$25",
      description: "Deep dive into your project requirements with actionable recommendations and roadmap.",
      icon: TargetIcon,
      features: [
        "Detailed project analysis",
        "Complete tech stack suggestion",
        "Timeline & milestone planning",
        "Priority recommendations",
        "Written summary provided"
      ],
      popular: true
    },
    {
      title: "Premium Consultation",
      duration: "60 minutes",
      price: "$50",
      description: "Comprehensive consultation with live problem-solving, code review, and personalized guidance.",
      icon: DiamondIcon,
      features: [
        "Everything in Strategy Session",
        "Live code review/debugging",
        "Architecture planning",
        "Performance optimization tips",
        "Follow-up support for 7 days"
      ],
      popular: false
    }
  ];

  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "2:00 PM - 3:00 PM",
    "4:00 PM - 5:00 PM",
    "6:00 PM - 7:00 PM"
  ];

  const handleBooking = () => {
    if (!selectedService) {
      alert("Please select a service!");
      return;
    }
    const message = `Hi Faran! I want to book a ${selectedService}${selectedTime ? ` at ${selectedTime}` : ''}`;
    const whatsappUrl = `https://wa.me/923334051830?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="book-consultation" className="py-20 bg-gradient-to-br from-blue-50 to-gray-50 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.35) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Book a Consultation</h2>
              <div className="w-20 h-1 bg-blue-400 mx-auto mb-4"></div>
              <p className="text-blue-700 dark:text-blue-100 max-w-2xl mx-auto">
                Get expert guidance for your project. Choose the consultation package that fits your needs.
              </p>
            </div>
          </FadeIn>

          {/* Service Cards */}
          <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <div 
                  onClick={() => setSelectedService(service.title)}
                  className={`relative bg-white/90 dark:bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 border-2 h-full ${
                    selectedService === service.title 
                      ? 'border-blue-400 bg-blue-50 dark:bg-white/20 shadow-2xl' 
                      : 'border-gray-200 dark:border-white/20 hover:border-blue-400/50'
                  }`}
                >
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      <span className="inline-flex items-center gap-1">
                        <StarIcon />
                        POPULAR
                      </span>
                    </div>
                  )}

                  {/* Icon & Title */}
                  <div className="text-center mb-4">
                    <div className="flex justify-center mb-3">
                      <service.icon />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                    <div className="text-blue-600 dark:text-blue-200 text-sm mb-3">{service.duration}</div>
                    <div className="text-4xl font-bold text-blue-400">{service.price}</div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 dark:text-blue-100 text-sm mb-4 text-center">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-blue-100">
                        <CheckIcon />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Select Indicator */}
                  {selectedService === service.title && (
                    <div className="mt-4 text-center">
                      <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold">
                        <span className="inline-flex items-center gap-2">
                          <CheckIcon />
                          Selected
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Time Slot Selection */}
          <FadeIn delay={0.3}>
            <div className="bg-white/90 dark:bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 border border-gray-200 dark:border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Select Preferred Time (Optional)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTime(slot)}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      selectedTime === slot
                        ? 'bg-blue-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 dark:bg-white/20 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/30'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Book Button */}
          <FadeIn delay={0.4}>
            <div className="text-center">
              <button
                onClick={handleBooking}
                disabled={!selectedService}
                className={`px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl ${
                  selectedService
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-110 hover:shadow-blue-500/50'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {selectedService ? (
                  <span className="inline-flex items-center gap-2">
                    <CalendarIcon />
                    Book via WhatsApp
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <HandIcon />
                    Select a Service First
                  </span>
                )}
              </button>
              <p className="text-blue-700 dark:text-blue-200 text-sm mt-4">
                Booking confirmation will be done via WhatsApp
              </p>
            </div>
          </FadeIn>

          {/* Benefits */}
          <FadeIn delay={0.5}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
              {([
                { icon: BoltIcon, title: "Fast Response", desc: "Reply within 1 hour" },
                { icon: LockIcon, title: "Confidential", desc: "NDA available" },
                { icon: BadgeIcon, title: "Satisfaction", desc: "Money-back guarantee" },
                { icon: GiftIcon, title: "Bonus", desc: "Free resource pack" }
              ] as BenefitItem[]).map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <benefit.icon />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">{benefit.title}</h4>
                  <p className="text-blue-700 dark:text-blue-200 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
