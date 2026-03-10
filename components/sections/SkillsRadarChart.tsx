'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';

interface Skill {
  name: string;
  level: number; // 0-100
  color: string;
}

// SVG Icons
const RadarChartIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1"/>
    <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"/>
    <path d="M12 7v10M7 12h10"/>
  </svg>
);

const FrontendRadarIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="3" width="16" height="7" rx="1"/>
    <path d="M7 10v8M12 10v8M17 10v8M4 20h16"/>
  </svg>
);

const BackendRadarIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v4m0 7v4M5.6 5.6l2.8 2.8m5.2 5.2l2.8 2.8M1 12h4m7 0h4M5.6 18.4l2.8-2.8m5.2-5.2l2.8-2.8"/>
  </svg>
);

const ToolsRadarIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 1 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);

// Stats Icons
const StatsChartIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline>
    <polyline points="12 12 20 7.5"></polyline>
    <polyline points="12 12 12 21"></polyline>
    <polyline points="12 12 4 7.5"></polyline>
  </svg>
);

const StatsClockIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const StatsRocketIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74.5 5 -2c.5 .5 1 1 2 1s1.5-.5 2-1c1.26 1.5 5 2 5 2s-.5 -3.74 -2 -5c.5 -.5 1.5 -1 2.5 -1s2 1 2.5 2.5M12 7l-2 -3 -2 3 3 2 2 -2z"/>
    <path d="M12 2v10M12 2c-3 0 -4 2 -4 5M12 2c3 0 4 2 4 5"/>
  </svg>
);

const StatsBriefcaseIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="9" y1="12" x2="9" y2="17"/>
    <line x1="15" y1="12" x2="15" y2="17"/>
  </svg>
);

const skillCategories = {
  frontend: [
    { name: 'React/Next.js', level: 95, color: '#61DAFB' },
    { name: 'TypeScript', level: 90, color: '#3178C6' },
    { name: 'Tailwind CSS', level: 92, color: '#06B6D4' },
    { name: 'HTML/CSS', level: 95, color: '#E34F26' },
    { name: 'JavaScript', level: 93, color: '#F7DF1E' },
  ],
  backend: [
    { name: 'Node.js', level: 88, color: '#339933' },
    { name: 'Express.js', level: 85, color: '#000000' },
    { name: 'MongoDB', level: 82, color: '#47A248' },
    { name: 'SQL/PostgreSQL', level: 80, color: '#336791' },
    { name: 'REST APIs', level: 90, color: '#FF6C37' },
  ],
  tools: [
    { name: 'Git/GitHub', level: 92, color: '#F05032' },
    { name: 'VS Code', level: 95, color: '#007ACC' },
    { name: 'Docker', level: 75, color: '#2496ED' },
    { name: 'Figma', level: 85, color: '#F24E1E' },
    { name: 'Postman', level: 88, color: '#FF6C37' },
  ],
};

export default function SkillsRadarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeCategory, setActiveCategory] = useState<'frontend' | 'backend' | 'tools'>('frontend');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode from document
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 40;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const skills = skillCategories[activeCategory];
    const numSkills = skills.length;
    const angleStep = (Math.PI * 2) / numSkills;

    // Draw concentric circles (grid)
    ctx.strokeStyle = isDarkMode ? 'rgba(100, 116, 139, 0.3)' : 'rgba(100, 116, 139, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (maxRadius / 5) * i, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw grid lines from center
    ctx.strokeStyle = isDarkMode ? 'rgba(100, 116, 139, 0.2)' : 'rgba(100, 116, 139, 0.15)';
    skills.forEach((_, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const x = centerX + Math.cos(angle) * maxRadius;
      const y = centerY + Math.sin(angle) * maxRadius;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
    });

    // Draw skill polygon
    ctx.beginPath();
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
    ctx.lineWidth = 2;

    skills.forEach((skill, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const radius = (skill.level / 100) * maxRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw skill points and labels
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    skills.forEach((skill, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const radius = (skill.level / 100) * maxRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      // Draw point
      ctx.beginPath();
      ctx.arc(x, y, hoveredSkill === skill.name ? 8 : 5, 0, Math.PI * 2);
      ctx.fillStyle = skill.color;
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw label
      const labelRadius = maxRadius + 30;
      const labelX = centerX + Math.cos(angle) * labelRadius;
      const labelY = centerY + Math.sin(angle) * labelRadius;

      ctx.fillStyle = hoveredSkill === skill.name ? skill.color : (isDarkMode ? 'white' : '#1f2937');
      ctx.font = hoveredSkill === skill.name ? 'bold 15px sans-serif' : 'bold 13px sans-serif';
      ctx.fillText(skill.name, labelX, labelY);

      // Draw percentage
      ctx.font = '12px sans-serif';
      ctx.fillStyle = isDarkMode ? 'rgba(156, 163, 175, 0.8)' : 'rgba(107, 114, 128, 0.8)';
      ctx.fillText(`${skill.level}%`, labelX, labelY + 18);
    });

  }, [activeCategory, hoveredSkill, isDarkMode]);

  return (
    <section id="skills-radar-chart" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-lg text-white shadow-lg"><RadarChartIcon /></div>
                Skills Proficiency Radar
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                Visual representation of my technical expertise across frontend, backend, and development tools
              </p>
            </div>
          </FadeIn>

          {/* Category Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {(Object.keys(skillCategories) as Array<keyof typeof skillCategories>).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md'
                }`}
              >
                {category === 'frontend' && (
                  <>
                    <div className={`p-2 rounded-lg ${activeCategory === category ? 'bg-white/20' : 'bg-blue-100 dark:bg-blue-900'}`}>
                      <div className={activeCategory === category ? 'text-white' : 'text-blue-600 dark:text-blue-400'}>
                        <FrontendRadarIcon />
                      </div>
                    </div>
                    Frontend
                  </>
                )}
                {category === 'backend' && (
                  <>
                    <div className={`p-2 rounded-lg ${activeCategory === category ? 'bg-white/20' : 'bg-green-100 dark:bg-green-900'}`}>
                      <div className={activeCategory === category ? 'text-white' : 'text-green-600 dark:text-green-400'}>
                        <BackendRadarIcon />
                      </div>
                    </div>
                    Backend
                  </>
                )}
                {category === 'tools' && (
                  <>
                    <div className={`p-2 rounded-lg ${activeCategory === category ? 'bg-white/20' : 'bg-purple-100 dark:bg-purple-900'}`}>
                      <div className={activeCategory === category ? 'text-white' : 'text-purple-600 dark:text-purple-400'}>
                        <ToolsRadarIcon />
                      </div>
                    </div>
                    Tools & DevOps
                  </>
                )}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Radar Chart Canvas */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700"
            >
              <canvas
                ref={canvasRef}
                width={500}
                height={500}
                className="w-full h-auto"
              />
            </motion.div>

            {/* Skills List */}
            <motion.div
              key={`${activeCategory}-list`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {skillCategories[activeCategory].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                    hoveredSkill === skill.name ? 'scale-105 border-2' : 'border-2 border-transparent'
                  }`}
                  style={{
                    borderColor: hoveredSkill === skill.name ? skill.color : 'transparent'
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: skill.color }}
                      />
                      {skill.name}
                    </h3>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {skill.level}%
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`
                      }}
                    />
                  </div>

                  {/* Experience Badge */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {skill.level >= 90 ? '🏆 Expert' : 
                       skill.level >= 80 ? '🌟 Advanced' : 
                       skill.level >= 70 ? '⭐ Proficient' : '📚 Learning'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: 'Average Proficiency', value: '89%', icon: <StatsChartIcon />, color: 'from-blue-500 to-cyan-500' },
              { label: 'Years Experience', value: '2+', icon: <StatsClockIcon />, color: 'from-purple-500 to-pink-500' },
              { label: 'Technologies', value: '15+', icon: <StatsRocketIcon />, color: 'from-green-500 to-teal-500' },
              { label: 'Projects Built', value: '13+', icon: <StatsBriefcaseIcon />, color: 'from-orange-500 to-red-500' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg hover:scale-105 transition-all duration-300`}
              >
                <div className="mb-2 text-white">{stat.icon}</div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
