'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CodeIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

interface CodeExample {
  id: string;
  title: string;
  language: string;
  code: string;
  description: string;
  tech: string[];
}

const codeExamples: CodeExample[] = [
  {
    id: 'react-component',
    title: 'React Component',
    language: 'jsx',
    code: `import React, { useState } from 'react';

const UserProfile = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  
  const handleFollow = async () => {
    try {
      await fetch('/api/follow', {
        method: 'POST',
        body: JSON.stringify({ userId: user.id })
      });
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Failed to follow:', error);
    }
  };
  
  return (
    <div className="profile-card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <button onClick={handleFollow}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};

export default UserProfile;`,
    description: 'Modern React component with hooks and API integration',
    tech: ['React', 'Hooks', 'Async/Await']
  },
  {
    id: 'nodejs-api',
    title: 'Node.js API Endpoint',
    language: 'javascript',
    code: `const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// GET all users with pagination
router.get('/users', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-password')
      .sort({ createdAt: -1 });
    
    const count = await User.countDocuments();
    
    res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;`,
    description: 'RESTful API with authentication and pagination',
    tech: ['Node.js', 'Express', 'MongoDB']
  },
  {
    id: 'typescript-interface',
    title: 'TypeScript Interface',
    language: 'typescript',
    code: `interface User {
  id: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  roles: 'admin' | 'user' | 'guest';
  createdAt: Date;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

class UserService {
  async getUser(id: string): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(\`/api/users/\${id}\`);
      const user = await response.json();
      
      return {
        success: true,
        data: user,
        timestamp: Date.now()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        timestamp: Date.now()
      };
    }
  }
}`,
    description: 'TypeScript with interfaces and generic types',
    tech: ['TypeScript', 'OOP', 'Type Safety']
  },
  {
    id: 'nextjs-server',
    title: 'Next.js Server Action',
    language: 'typescript',
    code: `'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const FormSchema = z.object({
  title: z.string().min(5).max(100),
  content: z.string().min(20),
  published: z.boolean().default(false)
});

export async function createPost(formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    published: formData.get('published') === 'true'
  });
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { title, content, published } = validatedFields.data;
  
  await db.post.create({
    data: { title, content, published }
  });
  
  revalidatePath('/blog');
  redirect('/blog');
}`,
    description: 'Modern Next.js 14+ Server Actions with validation',
    tech: ['Next.js', 'Server Actions', 'Zod']
  }
];

export default function CodePreview() {
  const [selectedExample, setSelectedExample] = useState(codeExamples[0]);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Typing animation effect
  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < selectedExample.code.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode(selectedExample.code.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 10); // Typing speed

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [currentIndex, isTyping, selectedExample.code]);

  const handleExampleChange = (example: CodeExample) => {
    setSelectedExample(example);
    setDisplayedCode('');
    setCurrentIndex(0);
    setIsTyping(true);
  };

  const handleSkipAnimation = () => {
    setDisplayedCode(selectedExample.code);
    setCurrentIndex(selectedExample.code.length);
    setIsTyping(false);
  };

  // Syntax highlighting (simplified)
  const highlightSyntax = (code: string) => {
    const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'interface', 'type', 'async', 'await', 'import', 'export', 'from', 'try', 'catch'];
    const strings = /(['"`])(.*?)\1/g;
    
    let highlighted = code;
    
    // Highlight strings
    highlighted = highlighted.replace(strings, '<span class="text-green-400">$&</span>');
    
    // Highlight keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span class="text-purple-400 font-semibold">${keyword}</span>`);
    });
    
    return highlighted;
  };

  return (
    <section id="code-preview" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-950 dark:to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(96, 165, 250, 0.1) 2px, rgba(96, 165, 250, 0.1) 4px)`,
          backgroundSize: '100% 4px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-lg text-white shadow-lg">
                <CodeIcon />
              </div>
              Live Code Preview
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Watch me code in real-time. Full-stack development expertise across modern frameworks.
            </p>
          </motion.div>

          {/* Code Examples Tabs */}
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            {codeExamples.map((example) => (
              <button
                key={example.id}
                onClick={() => handleExampleChange(example)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedExample.id === example.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {example.title}
              </button>
            ))}
          </div>

          {/* Code Editor Mockup */}
          <motion.div
            key={selectedExample.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700"
          >
            {/* Editor Header */}
            <div className="bg-gray-800 px-6 py-4 flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-400 text-sm ml-4">
                  {selectedExample.title}.{selectedExample.language}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {selectedExample.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Code Display */}
            <div className="relative">
              <pre className="p-6 overflow-x-auto text-sm leading-relaxed">
                <code
                  className="text-gray-300 font-mono"
                  dangerouslySetInnerHTML={{
                    __html: highlightSyntax(displayedCode || selectedExample.code)
                  }}
                />
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-5 bg-blue-500 ml-1"
                  />
                )}
              </pre>

              {/* Skip Animation Button */}
              {isTyping && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleSkipAnimation}
                  className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Skip Animation
                </motion.button>
              )}
            </div>

            {/* Code Description */}
            <div className="bg-gray-800/50 px-6 py-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm">
                📝 {selectedExample.description}
              </p>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 mb-6">
              Want to see more of my code? Check out my GitHub repositories!
            </p>
            <a
              href="https://github.com/faranalam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              View All My Code on GitHub
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
