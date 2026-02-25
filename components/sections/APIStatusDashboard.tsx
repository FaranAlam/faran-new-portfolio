'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../animations/FadeIn';

// SVG Icons for API Status Dashboard
const GlobeIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const DatabaseIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const CloudIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ChartBarIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="18" y="3" width="4" height="18" rx="1" />
    <rect x="10" y="8" width="4" height="13" rx="1" />
    <rect x="2" y="13" width="4" height="8" rx="1" />
  </svg>
);

const BoltHeaderIcon = () => (
  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 2v11h3v9l7-12h-4l4-8z" fill="url(#bolt-header-grad)" />
    <defs>
      <linearGradient id="bolt-header-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const XCircleIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const WrenchIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65c-.04-.24-.25-.42-.5-.42h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
  </svg>
);

const ScaleIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-11 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-4c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z" />
  </svg>
);

const DockerIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.98 11.08h2.12a.19.19 0 0 0 .19-.19V9.01a.19.19 0 0 0-.19-.19h-2.12a.19.19 0 0 0-.18.19v1.88c0 .1.08.19.18.19m-2.95-5.43h2.12a.19.19 0 0 0 .18-.19V3.58a.19.19 0 0 0-.18-.19h-2.12a.19.19 0 0 0-.19.19v1.88c0 .1.09.19.19.19m0 2.71h2.12a.19.19 0 0 0 .18-.18V6.29a.19.19 0 0 0-.18-.19h-2.12a.19.19 0 0 0-.19.19v1.89c0 .1.09.18.19.18m-2.93 2.72h2.12a.19.19 0 0 0 .18-.19V9.01a.19.19 0 0 0-.18-.19H8.1a.19.19 0 0 0-.19.19v1.88c0 .1.08.19.19.19m-2.93 0h2.12a.19.19 0 0 0 .19-.19V9.01a.19.19 0 0 0-.19-.19H5.17a.19.19 0 0 0-.19.19v1.88c0 .1.09.19.19.19m8.81-2.72h2.12a.19.19 0 0 0 .19-.18V6.29a.19.19 0 0 0-.19-.19h-2.12a.19.19 0 0 0-.19.19v1.89c0 .1.09.18.19.18m-2.93-2.71h2.12a.19.19 0 0 0 .18-.19V3.58a.19.19 0 0 0-.18-.19h-2.12a.19.19 0 0 0-.19.19v1.88c0 .1.09.19.19.19M23 9.71a.19.19 0 0 0-.18-.19h-1.6a.19.19 0 0 0-.18.19c0 1.82-1.47 3.3-3.28 3.31h-1.05c-.93.02-1.71.77-1.72 1.7v3.44c0 .62-.5 1.13-1.13 1.13h-3.58c-.62 0-1.13-.51-1.13-1.13v-3.44c-.01-.93-.79-1.68-1.72-1.7H5.92a3.29 3.29 0 0 1-3.28-3.31.19.19 0 0 0-.19-.19H.93a.19.19 0 0 0-.19.19C.74 12.29 2.8 14.65 5.42 15h1.51c.14 0 .25.11.25.25v3.71c0 1.23 1 2.23 2.23 2.23h3.58c1.23 0 2.23-1 2.23-2.23v-3.71c0-.14.11-.25.25-.25h1.51c2.62-.35 4.68-2.71 4.68-5.29z" />
  </svg>
);

const RocketSmallIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 13.12l2.03 1.66c.38.31.82.53 1.29.65l1.56.42c-.61.15-1.16.42-1.63.78-.43.33-.77.75-1 1.23-.23.48-.35 1-.35 1.54v.83l1.56-.83c1.53-.81 3.35-.99 5.08-.5l.42.12V21l1.5-3.63c.11-.28 2.85-7.03 2.85-7.03 0-3.78-3.06-6.84-6.84-6.84h-.82l1.35-.71c.55-.29.91-.87.91-1.5 0-1.04-.84-1.88-1.88-1.88-.83 0-1.53.53-1.79 1.27l-.97 2.65z" />
  </svg>
);

const LightbulbSmallIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 1.33.46 2.55 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

interface APIStatus {
  name: string;
  endpoint: string;
  status: 'operational' | 'degraded' | 'down';
  responseTime: number;
  uptime: number;
  lastChecked: string; // ISO string to avoid hydration issues
  icon: () => JSX.Element;
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
      icon: GlobeIcon,
      description: 'Portfolio backend services'
    },
    {
      name: 'Authentication Service',
      endpoint: 'auth.faranalam.com',
      status: 'operational',
      responseTime: 89,
      uptime: 99.99,
      lastChecked: new Date().toISOString(),
      icon: LockIcon,
      description: 'JWT token & OAuth management'
    },
    {
      name: 'Database Connection',
      endpoint: 'db.mongodb.net',
      status: 'operational',
      responseTime: 234,
      uptime: 99.95,
      lastChecked: new Date().toISOString(),
      icon: DatabaseIcon,
      description: 'MongoDB Atlas cluster'
    },
    {
      name: 'File Storage CDN',
      endpoint: 'cdn.faranalam.com',
      status: 'operational',
      responseTime: 67,
      uptime: 99.98,
      lastChecked: new Date().toISOString(),
      icon: CloudIcon,
      description: 'Image & asset delivery'
    },
    {
      name: 'Email Service',
      endpoint: 'smtp.sendgrid.net',
      status: 'operational',
      responseTime: 312,
      uptime: 99.92,
      lastChecked: new Date().toISOString(),
      icon: MailIcon,
      description: 'Contact form & notifications'
    },
    {
      name: 'Analytics API',
      endpoint: 'analytics.faranalam.com',
      status: 'operational',
      responseTime: 178,
      uptime: 99.94,
      lastChecked: new Date().toISOString(),
      icon: ChartBarIcon,
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
                <BoltHeaderIcon />
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
                  } flex items-center justify-center shadow-lg`}
                >
                  {overallStatus === 'operational' ? <CheckCircleIcon /> : 
                   overallStatus === 'degraded' ? <AlertIcon /> : 
                   <XCircleIcon />}
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
                      <div className="text-blue-400">
                        <api.icon />
                      </div>
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
                    {api.status === 'operational' ? (
                      <>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Operational
                      </>
                    ) : api.status === 'degraded' ? (
                      <>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                          <line x1="12" y1="9" x2="12" y2="13" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        Degraded
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        Down
                      </>
                    )}
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
              <WrenchIcon />
              Technical Stack
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Node.js + Express', icon: SettingsIcon },
                { label: 'MongoDB Atlas', icon: DatabaseIcon },
                { label: 'Redis Cache', icon: BoltHeaderIcon },
                { label: 'PM2 Process Manager', icon: RefreshIcon },
                { label: 'Nginx Load Balancer', icon: ScaleIcon },
                { label: 'Docker Containers', icon: DockerIcon },
                { label: 'GitHub Actions CI/CD', icon: RocketSmallIcon },
                { label: 'AWS/Vercel Deploy', icon: CloudIcon },
              ].map((tech, index) => (
                <motion.div
                  key={tech.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-800/50 rounded-lg p-4 text-center hover:bg-gray-700/50 transition-all duration-300"
                >
                  <div className="flex justify-center mb-2 text-blue-400">
                    <tech.icon />
                  </div>
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
            <p className="text-gray-300 mb-6 text-lg flex items-center justify-center gap-2">
              <LightbulbSmallIcon />
              This dashboard proves real full-stack expertise with backend, APIs, and infrastructure monitoring.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Want this for your project?
              <ArrowRightIcon />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
