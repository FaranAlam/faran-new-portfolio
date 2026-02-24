'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  shortDesc: string;
  image: string;
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
    image: '🛍️',
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
    image: '📊',
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
    image: '🤖',
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
    image: '🏦',
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
    image: '⚙️',
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
    image: '🧠',
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
              <div className="text-6xl mb-4">{project.image}</div>
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
