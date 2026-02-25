'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import { Check, X } from 'lucide-react';

// SVG Icons for Rate Calculator
const RocketIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
    <path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 13.12l2.03 1.66c.38.31.82.53 1.29.65l1.56.42c-.61.15-1.16.42-1.63.78-.43.33-.77.75-1 1.23-.23.48-.35 1-.35 1.54v.83l1.56-.83c1.53-.81 3.35-.99 5.08-.5l.42.12V21l1.5-3.63c.11-.28 2.85-7.03 2.85-7.03 0-3.78-3.06-6.84-6.84-6.84h-.82l1.35-.71c.55-.29.91-.87.91-1.5 0-1.04-.84-1.88-1.88-1.88-.83 0-1.53.53-1.79 1.27l-.97 2.65z" fill="url(#rocket-grad)" />
    <defs>
      <linearGradient id="rocket-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

const BoltIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
    <path d="M7 2v11h3v9l7-12h-4l4-8z" fill="url(#bolt-grad)" />
    <defs>
      <linearGradient id="bolt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" fill="url(#building-grad)" />
    <defs>
      <linearGradient id="building-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
  </svg>
);

const CrownIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" fill="url(#crown-grad)" />
    <defs>
      <linearGradient id="crown-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
  </svg>
);

const PackageIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const LightbulbIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 1.33.46 2.55 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

interface Package {
  name: string;
  description: string;
  basePrice: number;
  features: { name: string; included: boolean }[];
  bestFor: string;
  deliveryTime: string;
  icon: () => JSX.Element;
  popular?: boolean;
}

const packages: Package[] = [
  {
    name: 'Small Project',
    description: 'Perfect for startups and testing ideas',
    basePrice: 50000,
    features: [
      { name: 'Frontend Development', included: true },
      { name: 'Basic Backend', included: true },
      { name: 'Database Design', included: true },
      { name: 'Responsive Design', included: true },
      { name: 'Testing & QA', included: false },
      { name: 'Deployment Setup', included: false },
      { name: 'Documentation', included: false },
      { name: 'Maintenance (3 months)', included: false },
    ],
    bestFor: 'MVPs, Landing Pages, Simple Apps',
    deliveryTime: '2-3 weeks',
    icon: RocketIcon,
  },
  {
    name: 'Medium Project',
    description: 'For growing businesses needing more features',
    basePrice: 75000,
    features: [
      { name: 'Full-Stack Development', included: true },
      { name: 'Advanced Backend Features', included: true },
      { name: 'Database Optimization', included: true },
      { name: 'Responsive Design', included: true },
      { name: 'Testing & QA', included: true },
      { name: 'Deployment Setup', included: true },
      { name: 'Documentation', included: true },
      { name: 'Maintenance (3 months)', included: false },
    ],
    bestFor: 'SaaS, E-commerce, Web Applications',
    deliveryTime: '4-6 weeks',
    icon: BoltIcon,
    popular: true,
  },
  {
    name: 'Large Project',
    description: 'Enterprise-grade solutions with advanced features',
    basePrice: 125000,
    features: [
      { name: 'Full-Stack Development', included: true },
      { name: 'Microservices Architecture', included: true },
      { name: 'Advanced DevOps Setup', included: true },
      { name: 'UI/UX Design', included: true },
      { name: 'Testing, QA & Security Audit', included: true },
      { name: 'CI/CD Pipeline', included: true },
      { name: 'Complete Documentation', included: true },
      { name: 'Maintenance (6 months)', included: true },
    ],
    bestFor: 'Enterprise Apps, Complex Systems',
    deliveryTime: '8-12 weeks',
    icon: BuildingIcon,
  },
  {
    name: 'Custom Enterprise',
    description: 'Tailored solutions for unique requirements',
    basePrice: 200000,
    features: [
      { name: 'Custom Architecture Design', included: true },
      { name: 'Advanced AI/ML Features', included: true },
      { name: 'Real-time Infrastructure', included: true },
      { name: 'Dedicated Design Team', included: true },
      { name: 'Advanced Security & Compliance', included: true },
      { name: 'DevOps & Cloud Management', included: true },
      { name: 'Strategic Documentation', included: true },
      { name: 'Year-long Support & Maintenance', included: true },
    ],
    bestFor: 'High-Scale Systems, Custom Requirements',
    deliveryTime: '3+ months',
    icon: CrownIcon,
  },
];

interface AddOn {
  name: string;
  price: number;
  description: string;
}

const addOns: AddOn[] = [
  { name: 'AI Integration', price: 25000, description: 'ChatGPT, NLP, or custom ML model' },
  { name: 'Mobile App', price: 35000, description: 'iOS/Android app for your platform' },
  { name: 'API Development', price: 20000, description: 'Custom REST/GraphQL APIs' },
  { name: 'Performance Optimization', price: 15000, description: 'Speed & scalability improvements' },
];

export default function RateCalculator() {
  const [pricingMode, setPricingMode] = useState<'packages' | 'hourly'>('packages');
  const [selectedPackage, setSelectedPackage] = useState<number>(1);
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([]);
  const [hourlyHours, setHourlyHours] = useState(40);
  const hourlyRate = 2500; // ₹2500/hour

  const handleAddOnToggle = (index: number) => {
    setSelectedAddOns((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const packageTotal = useMemo(() => {
    let total = packages[selectedPackage].basePrice;
    selectedAddOns.forEach((idx) => {
      total += addOns[idx].price;
    });
    return total;
  }, [selectedPackage, selectedAddOns]);

  const hourlyTotal = useMemo(() => {
    return hourlyHours * hourlyRate;
  }, [hourlyHours]);

  const currentTotal = pricingMode === 'packages' ? packageTotal : hourlyTotal;

  return (
    <section id="rate-calculator" className="py-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn>
          <div className="mb-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Project <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Rate Calculator</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Transparent pricing for your next project
            </p>

            {/* Mode Toggle */}
            <div className="flex justify-center gap-4 mb-8">
              {(['packages', 'hourly'] as const).map((mode) => (
                <motion.button
                  key={mode}
                  onClick={() => {
                    setPricingMode(mode);
                    setSelectedAddOns([]);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    pricingMode === mode
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {mode === 'packages' ? (
                    <>
                      <PackageIcon />
                      Project Packages
                    </>
                  ) : (
                    <>
                      <ClockIcon />
                      Hourly Rate
                    </>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          {pricingMode === 'packages' ? (
            /* Packages View */
            <motion.div key="packages" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {packages.map((pkg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedPackage(idx)}
                    className="relative group cursor-pointer"
                  >
                    {pkg.popular && (
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
                      >
                        <span className="inline-block px-4 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold text-white">
                          Most Popular
                        </span>
                      </motion.div>
                    )}

                    <div
                      className={`h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl border-2 p-6 transition-all transform ${
                        selectedPackage === idx
                          ? 'border-yellow-500 shadow-lg shadow-yellow-500/50'
                          : 'border-gray-700 hover:border-yellow-500/50'
                      }`}
                    >
                      <div className="mb-4">
                        <pkg.icon />
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                      <p className="text-sm text-gray-400 mb-4">{pkg.description}</p>

                      {/* Price */}
                      <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <div className="text-3xl font-bold text-yellow-400">
                          ₹{pkg.basePrice.toLocaleString()}
                        </div>
                        <p className="text-xs text-gray-400">Starting price</p>
                      </div>

                      {/* Details */}
                      <div className="mb-6 space-y-2">
                        <div className="flex items-center gap-1 text-xs">
                          <ClockIcon />
                          <span className="font-semibold text-white">{pkg.deliveryTime}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <UsersIcon />
                          <span className="font-semibold text-white">{pkg.bestFor}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2 mb-6 pb-6 border-b border-gray-700">
                        {pkg.features.map((feature, fidx) => (
                          <div key={fidx} className="flex items-center gap-2">
                            {feature.included ? (
                              <Check size={16} className="text-green-400" />
                            ) : (
                              <X size={16} className="text-gray-600" />
                            )}
                            <span className={`text-sm ${feature.included ? 'text-gray-300' : 'text-gray-600'}`}>
                              {feature.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="block w-full text-center py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
                      >
                        Get Started
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Add-ons Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl border border-gray-700 p-8 mb-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Add-ons</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addOns.map((addon, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleAddOnToggle(idx)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedAddOns.includes(idx)
                          ? 'border-yellow-500 bg-yellow-500/10'
                          : 'border-gray-700 hover:border-yellow-500/50 bg-gray-900/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-white">{addon.name}</p>
                          <p className="text-sm text-gray-400">{addon.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-yellow-400">+₹{addon.price.toLocaleString()}</p>
                          <div
                            className={`w-5 h-5 rounded border mt-2 flex items-center justify-center ${
                              selectedAddOns.includes(idx)
                                ? 'bg-yellow-500 border-yellow-500'
                                : 'border-gray-600'
                            }`}
                          >
                            {selectedAddOns.includes(idx) && <Check size={16} className="text-white" />}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Total */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-yellow-900/20 via-orange-900/20 to-red-900/20 border border-yellow-500/30 rounded-2xl p-8 text-center"
              >
                <p className="text-gray-400 mb-2">Total Project Cost</p>
                <p className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
                  ₹{currentTotal.toLocaleString()}
                </p>
                <p className="text-gray-400 mb-6">
                  {selectedAddOns.length > 0 && `(Base: ₹${packages[selectedPackage].basePrice.toLocaleString()} + Add-ons: ₹${selectedAddOns.reduce((sum, idx) => sum + addOns[idx].price, 0).toLocaleString()})`}
                </p>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-500/50"
                >
                  Contact for Quote
                </motion.a>
              </motion.div>
            </motion.div>
          ) : (
            /* Hourly View */
            <motion.div key="hourly" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl border border-gray-700 p-8 max-w-2xl mx-auto">
                <div className="mb-8">
                  <label className="block text-white font-semibold mb-4">
                    Hours Required: <span className="text-yellow-400">{hourlyHours}h</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="200"
                    value={hourlyHours}
                    onChange={(e) => setHourlyHours(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>1h</span>
                    <span>200h</span>
                  </div>
                </div>

                {/* Rate Details */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Hourly Rate</p>
                    <p className="text-2xl font-bold text-yellow-400">₹{hourlyRate.toLocaleString()}/hr</p>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Total Cost</p>
                    <p className="text-2xl font-bold text-yellow-400">₹{hourlyTotal.toLocaleString()}</p>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="mb-8 p-4 bg-gray-900/50 rounded-lg">
                  <p className="text-white font-semibold mb-3">Cost Breakdown</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>{hourlyHours} hours × ₹{hourlyRate.toLocaleString()}</span>
                      <span className="text-yellow-400">₹{hourlyTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-start gap-2 text-sm text-blue-200">
                    <LightbulbIcon />
                    <p>
                      <span className="font-semibold">Tip:</span> Package pricing offers better value than hourly. A medium project (75k) = ~30 hours of work.
                    </p>
                  </div>
                </div>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full text-center py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg"
                >
                  Book Hours
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center text-gray-400"
        >
          <p className="flex items-center justify-center gap-2">
            <ChatIcon />
            Not sure which package fits your needs? <a href="#contact" className="text-yellow-400 hover:text-yellow-300 font-semibold">Let&apos;s discuss your project</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
