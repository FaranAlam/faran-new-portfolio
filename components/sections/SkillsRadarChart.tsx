'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';

interface Skill {
  name: string;
  level: number; // 0-100
  color: string;
}

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
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (maxRadius / 5) * i, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw grid lines from center
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.2)';
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

      ctx.fillStyle = hoveredSkill === skill.name ? skill.color : 'white';
      ctx.font = hoveredSkill === skill.name ? 'bold 15px sans-serif' : 'bold 13px sans-serif';
      ctx.fillText(skill.name, labelX, labelY);

      // Draw percentage
      ctx.font = '12px sans-serif';
      ctx.fillStyle = 'rgba(156, 163, 175, 0.8)';
      ctx.fillText(`${skill.level}%`, labelX, labelY + 18);
    });

  }, [activeCategory, hoveredSkill]);

  return (
    <section id="skills-radar-chart" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
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
                <span className="text-5xl">📊</span>
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
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md'
                }`}
              >
                {category === 'frontend' && '🎨 Frontend'}
                {category === 'backend' && '⚙️ Backend'}
                {category === 'tools' && '🛠️ Tools & DevOps'}
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
              className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700"
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
              { label: 'Average Proficiency', value: '89%', icon: '📈', color: 'from-blue-500 to-cyan-500' },
              { label: 'Years Experience', value: '2+', icon: '⏰', color: 'from-purple-500 to-pink-500' },
              { label: 'Technologies', value: '15+', icon: '🚀', color: 'from-green-500 to-teal-500' },
              { label: 'Projects Built', value: '13+', icon: '💼', color: 'from-orange-500 to-red-500' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg hover:scale-105 transition-all duration-300`}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
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
