'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import { ExternalLink, Github } from 'lucide-react';

// SVG Icons for 3D Projects
const ECommerceIcon = () => (
  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none">
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" fill="url(#ecommerce-grad)" />
    <defs>
      <linearGradient id="ecommerce-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none">
    <path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z" fill="url(#analytics-grad)" />
    <defs>
      <linearGradient id="analytics-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
  </svg>
);

const AIRobotIcon = () => (
  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none">
    <path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zm-2 10H6V7h12v12z" fill="url(#ai-grad)" />
    <circle cx="9" cy="12" r="1.5" fill="#fff" />
    <circle cx="15" cy="12" r="1.5" fill="#fff" />
    <path d="M12 17c1.93 0 3.5-1.57 3.5-3.5h-7c0 1.93 1.57 3.5 3.5 3.5z" fill="#fff" />
    <defs>
      <linearGradient id="ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
    </defs>
  </svg>
);

const BankingIcon = () => (
  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none">
    <path d="M12 3L2 8v3h20V8l-10-5zM4 21h16v-2H4v2zM5 13h2v5H5v-5zm4 0h2v5H9v-5zm4 0h2v5h-2v-5zm4 0h2v5h-2v-5z" fill="url(#bank-grad)" />
    <defs>
      <linearGradient id="bank-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

const DevOpsIcon = () => (
  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="url(#devops-grad)" />
    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="url(#devops-grad)" />
    <circle cx="12" cy="12" r="2" fill="#fff" />
    <defs>
      <linearGradient id="devops-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#14b8a6" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
  </svg>
);

const MLBrainIcon = () => (
  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none">
    <path d="M13 3C9.23 3 6.19 5.95 6 9.66l-1.92.58c-1.33.4-2.08 1.8-1.68 3.13.4 1.32 1.8 2.08 3.13 1.67l.78-.23c.36 2.5 2.23 4.51 4.69 5.09V21h2v-1.1c2.46-.58 4.33-2.59 4.69-5.09l.78.23c1.33.4 2.73-.35 3.13-1.67.4-1.33-.35-2.73-1.68-3.13L18 9.66C17.81 5.95 14.77 3 11 3h2zm-2 16c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="url(#brain-grad)" />
    <path d="M11 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#fff" />
    <defs>
      <linearGradient id="brain-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
    </defs>
  </svg>
);

interface Project {
  id: number;
  title: string;
  description: string;
  shortDesc: string;
  icon: () => JSX.Element;
  tags: string[];
  liveLink?: string;
  githubLink?: string;
  impact: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard',
    shortDesc: 'Complete e-commerce platform',
    icon: ECommerceIcon,
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
    liveLink: 'https://ecom-demo.com',
    githubLink: 'https://github.com',
    impact: 'Handled 10K+ daily transactions'
  },
  {
    id: 2,
    title: 'SaaS Analytics Dashboard',
    description: 'Real-time analytics dashboard with data visualization, team collaboration, and custom reports',
    shortDesc: 'Analytics dashboard for teams',
    icon: AnalyticsIcon,
    tags: ['React', 'Chart.js', 'Node.js', 'MongoDB'],
    liveLink: 'https://analytics-demo.com',
    githubLink: 'https://github.com',
    impact: '500+ active users, 99.9% uptime'
  },
  {
    id: 3,
    title: 'AI Content Generator',
    description: 'AI-powered content generation tool with multiple templates, bulk processing, and API integration',
    shortDesc: 'AI content generation tool',
    icon: AIRobotIcon,
    tags: ['ChatGPT', 'React', 'Python', 'FastAPI'],
    liveLink: 'https://ai-content.com',
    githubLink: 'https://github.com',
    impact: 'Generated 50K+ pieces of content'
  },
  {
    id: 4,
    title: 'Mobile Banking App',
    description: 'Cross-platform mobile banking app with biometric auth, fund transfers, and transaction tracking',
    shortDesc: 'Secure mobile banking',
    icon: BankingIcon,
    tags: ['React Native', 'Firebase', 'Stripe', 'Node.js'],
    liveLink: 'https://banking-app.com',
    githubLink: 'https://github.com',
    impact: '100K+ downloads, 4.8⭐ rating'
  },
  {
    id: 5,
    title: 'DevOps CI/CD Pipeline',
    description: 'Automated deployment pipeline with Docker, Kubernetes, monitoring, and zero-downtime releases',
    shortDesc: 'Enterprise CI/CD infrastructure',
    icon: DevOpsIcon,
    tags: ['Docker', 'Kubernetes', 'Jenkins', 'AWS'],
    liveLink: 'https://pipeline-docs.com',
    githubLink: 'https://github.com',
    impact: '400+ deployments/month, 99.99% uptime'
  },
  {
    id: 6,
    title: 'Machine Learning API',
    description: 'ML-powered predictive API with model training, inference, and real-time predictions',
    shortDesc: 'ML prediction service',
    icon: MLBrainIcon,
    tags: ['Python', 'TensorFlow', 'FastAPI', 'AWS'],
    liveLink: 'https://ml-api.com',
    githubLink: 'https://github.com',
    impact: 'Sub-100ms latency, 99.5% accuracy'
  }
];

interface CardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      <div
        className="relative w-full h-80 cursor-pointer perspective"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        {/* Front of card */}
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="w-full h-full"
        >
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className="absolute w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl border border-gray-700 p-6 flex flex-col justify-between overflow-hidden group"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="relative z-10">
              <div className="mb-4"><project.icon /></div>
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-300 text-sm">{project.shortDesc}</p>
            </div>

            {/* Tags */}
            <div className="relative z-10 flex flex-wrap gap-2">
              {project.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-xs text-blue-300"
                >
                  {tag}
                </span>
              ))}
              <span className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-full text-xs text-gray-400">
                +{project.tags.length - 2} more
              </span>
            </div>

            {/* Hover indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </div>
        </motion.div>

        {/* Back of card */}
        <motion.div
          animate={{ rotateY: isFlipped ? 0 : 180 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="w-full h-full absolute inset-0"
        >
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-black rounded-2xl border border-purple-700 p-6 flex flex-col justify-between"
          >
            {/* Content */}
            <div>
              <h4 className="text-xl font-bold text-white mb-3">Project Details</h4>
              <p className="text-gray-200 text-sm mb-4">{project.description}</p>

              {/* Impact */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
                <p className="text-xs text-green-300 font-semibold">Impact</p>
                <p className="text-sm text-green-200">{project.impact}</p>
              </div>

              {/* Full tech stack */}
              <div className="mb-4">
                <p className="text-xs text-gray-400 font-semibold mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-xs text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-3">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-semibold transition-colors"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-semibold transition-colors"
                >
                  <Github size={16} />
                  Code
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ProjectCards3D() {
  return (
    <section id="project-cards-3d" className="py-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn>
          <div className="mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Featured <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">3D Projects</span>
            </h2>
            <p className="text-xl text-gray-400">
              Hover over cards to see project details and impact metrics
            </p>
          </div>
        </FadeIn>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6">
            Each project demonstrates expertise in different technologies and industries
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg text-white font-semibold transition-all transform hover:scale-105"
          >
            Start Your Project
          </a>
        </motion.div>
      </div>
    </section>
  );
}
