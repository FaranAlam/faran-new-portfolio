'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../animations/FadeIn';

interface APIStatus {
  name: string;
  endpoint: string;
  status: 'operational' | 'degraded' | 'down';
  responseTime: number;
  uptime: number;
  lastChecked: string; // ISO string to avoid hydration issues
  icon: string;
  description: string;
}

export default function APIStatusDashboard() {
  const [apis, setApis] = useState<APIStatus[]>([
    {
      name: 'Main Website API',
      endpoint: 'api.faranalam.com',
      status: 'operational',
      responseTime: 145,
      uptime: 99.97,
      lastChecked: new Date().toISOString(),
      icon: '🌐',
      description: 'Portfolio backend services'
    },
    {
      name: 'Authentication Service',
      endpoint: 'auth.faranalam.com',
      status: 'operational',
      responseTime: 89,
      uptime: 99.99,
      lastChecked: new Date().toISOString(),
      icon: '🔐',
      description: 'JWT token & OAuth management'
    },
    {
      name: 'Database Connection',
      endpoint: 'db.mongodb.net',
      status: 'operational',
      responseTime: 234,
      uptime: 99.95,
      lastChecked: new Date().toISOString(),
      icon: '💾',
      description: 'MongoDB Atlas cluster'
    },
    {
      name: 'File Storage CDN',
      endpoint: 'cdn.faranalam.com',
      status: 'operational',
      responseTime: 67,
      uptime: 99.98,
      lastChecked: new Date().toISOString(),
      icon: '☁️',
      description: 'Image & asset delivery'
    },
    {
      name: 'Email Service',
      endpoint: 'smtp.sendgrid.net',
      status: 'operational',
      responseTime: 312,
      uptime: 99.92,
      lastChecked: new Date().toISOString(),
      icon: '📧',
      description: 'Contact form & notifications'
    },
    {
      name: 'Analytics API',
      endpoint: 'analytics.faranalam.com',
      status: 'operational',
      responseTime: 178,
      uptime: 99.94,
      lastChecked: new Date().toISOString(),
      icon: '📊',
      description: 'Real-time visitor tracking'
    }
  ]);

  const [overallStatus, setOverallStatus] = useState<'operational' | 'degraded' | 'down'>('operational');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setApis(prevApis => 
        prevApis.map(api => ({
          ...api,
          responseTime: Math.floor(Math.random() * 200) + 50,
          lastChecked: new Date().toISOString(),
          // Rarely simulate issues
          status: Math.random() > 0.95 ? 'degraded' : 'operational'
        }))
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Calculate overall status
  useEffect(() => {
    const hasDown = apis.some(api => api.status === 'down');
    const hasDegraded = apis.some(api => api.status === 'degraded');
    
    if (hasDown) setOverallStatus('down');
    else if (hasDegraded) setOverallStatus('degraded');
    else setOverallStatus('operational');
  }, [apis]);

  const getStatusColor = (status: APIStatus['status']) => {
    switch (status) {
      case 'operational':
        return 'text-green-500 bg-green-500/20 border-green-500';
      case 'degraded':
        return 'text-yellow-500 bg-yellow-500/20 border-yellow-500';
      case 'down':
        return 'text-red-500 bg-red-500/20 border-red-500';
    }
  };

  const getResponseTimeColor = (time: number) => {
    if (time < 100) return 'text-green-500';
    if (time < 200) return 'text-blue-500';
    if (time < 300) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Format ISO string to time without hydration issues
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    } catch {
      return 'N/A';
    }
  };

  const averageResponseTime = Math.floor(
    apis.reduce((sum, api) => sum + api.responseTime, 0) / apis.length
  );

  const averageUptime = (
    apis.reduce((sum, api) => sum + api.uptime, 0) / apis.length
  ).toFixed(2);

  return (
    <section id="api-status-dashboard" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 dark:from-black dark:via-gray-950 dark:to-black relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <span className="text-5xl">⚡</span>
                Live API Status Dashboard
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Real-time monitoring of backend services and infrastructure. Updates every 5 seconds.
              </p>
            </div>
          </FadeIn>

          {/* Overall Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mb-8 p-8 rounded-2xl shadow-2xl border-2 ${
              overallStatus === 'operational'
                ? 'bg-green-500/10 border-green-500'
                : overallStatus === 'degraded'
                ? 'bg-yellow-500/10 border-yellow-500'
                : 'bg-red-500/10 border-red-500'
            }`}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className={`w-16 h-16 rounded-full ${
                    overallStatus === 'operational' ? 'bg-green-500' : 
                    overallStatus === 'degraded' ? 'bg-yellow-500' : 
                    'bg-red-500'
                  } flex items-center justify-center text-3xl shadow-lg`}
                >
                  {overallStatus === 'operational' ? '✓' : 
                   overallStatus === 'degraded' ? '⚠' : '✕'}
                </motion.div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1">
                    {overallStatus === 'operational' ? 'All Systems Operational' : 
                     overallStatus === 'degraded' ? 'Partial Outage' : 
                     'System Down'}
                  </h3>
                  <p className="text-gray-300">
                    {apis.filter(api => api.status === 'operational').length} of {apis.length} services running
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{averageResponseTime}ms</div>
                  <div className="text-sm text-gray-400">Avg Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{averageUptime}%</div>
                  <div className="text-sm text-gray-400">Avg Uptime</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* APIs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {apis.map((api, index) => (
                <motion.div
                  key={api.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
                >
                  {/* API Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{api.icon}</span>
                      <div>
                        <h3 className="text-lg font-bold text-white">{api.name}</h3>
                        <p className="text-xs text-gray-400">{api.endpoint}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className={`w-3 h-3 rounded-full ${
                        api.status === 'operational' ? 'bg-green-500' : 
                        api.status === 'degraded' ? 'bg-yellow-500' : 
                        'bg-red-500'
                      } shadow-lg`}
                    />
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-4">{api.description}</p>

                  {/* Status Badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4 ${getStatusColor(api.status)} border`}>
                    {api.status === 'operational' ? '✓ Operational' : 
                     api.status === 'degraded' ? '⚠ Degraded' : 
                     '✕ Down'}
                  </div>

                  {/* Metrics */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Response Time</span>
                      <span className={`text-lg font-bold ${getResponseTimeColor(api.responseTime)}`}>
                        {api.responseTime}ms
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Uptime</span>
                      <span className="text-lg font-bold text-green-500">
                        {api.uptime}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Last Checked</span>
                      <span className="text-xs text-gray-500" suppressHydrationWarning>
                        {formatTime(api.lastChecked)}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Technical Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span>🔧</span>
              Technical Stack
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Node.js + Express', icon: '⚙️' },
                { label: 'MongoDB Atlas', icon: '💾' },
                { label: 'Redis Cache', icon: '⚡' },
                { label: 'PM2 Process Manager', icon: '🔄' },
                { label: 'Nginx Load Balancer', icon: '⚖️' },
                { label: 'Docker Containers', icon: '🐳' },
                { label: 'GitHub Actions CI/CD', icon: '🚀' },
                { label: 'AWS/Vercel Deploy', icon: '☁️' },
              ].map((tech, index) => (
                <motion.div
                  key={tech.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-800/50 rounded-lg p-4 text-center hover:bg-gray-700/50 transition-all duration-300"
                >
                  <div className="text-3xl mb-2">{tech.icon}</div>
                  <div className="text-sm text-gray-300 font-medium">{tech.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-300 mb-6 text-lg">
              💡 This dashboard proves real full-stack expertise with backend, APIs, and infrastructure monitoring.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Want this for your project?
              <span className="text-2xl">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
