"use client";

import { useState } from "react";
import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

export default function BookConsultation() {
  const [selectedService, setSelectedService] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const services = [
    {
      title: "Quick 15-Min Call",
      duration: "15 minutes",
      price: "FREE",
      description: "Perfect for quick questions, project scope discussion, or getting to know each other.",
      icon: "☕",
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
      icon: "🎯",
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
      icon: "💎",
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
    <section id="book-consultation" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
      {/* Background Effects */}
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
              <h2 className="text-4xl font-bold text-white mb-4">Book a Consultation</h2>
              <div className="w-20 h-1 bg-blue-400 mx-auto mb-4"></div>
              <p className="text-blue-100 max-w-2xl mx-auto">
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
                  className={`relative bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 border-2 h-full ${
                    selectedService === service.title 
                      ? 'border-blue-400 bg-white/20 shadow-2xl' 
                      : 'border-white/20 hover:border-blue-400/50'
                  }`}
                >
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      ⭐ POPULAR
                    </div>
                  )}

                  {/* Icon & Title */}
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-3">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                    <div className="text-blue-200 text-sm mb-3">{service.duration}</div>
                    <div className="text-4xl font-bold text-blue-400">{service.price}</div>
                  </div>

                  {/* Description */}
                  <p className="text-blue-100 text-sm mb-4 text-center">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-blue-100">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Select Indicator */}
                  {selectedService === service.title && (
                    <div className="mt-4 text-center">
                      <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold">
                        ✓ Selected
                      </span>
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Time Slot Selection */}
          <FadeIn delay={0.3}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
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
                        : 'bg-white/20 text-white hover:bg-white/30'
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
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {selectedService ? '📅 Book via WhatsApp' : '👆 Select a Service First'}
              </button>
              <p className="text-blue-200 text-sm mt-4">
                Booking confirmation will be done via WhatsApp
              </p>
            </div>
          </FadeIn>

          {/* Benefits */}
          <FadeIn delay={0.5}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: "⚡", title: "Fast Response", desc: "Reply within 1 hour" },
                { icon: "🔒", title: "Confidential", desc: "NDA available" },
                { icon: "💯", title: "Satisfaction", desc: "Money-back guarantee" },
                { icon: "🎁", title: "Bonus", desc: "Free resource pack" }
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-2">{benefit.icon}</div>
                  <h4 className="font-bold text-white mb-1">{benefit.title}</h4>
                  <p className="text-blue-200 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
