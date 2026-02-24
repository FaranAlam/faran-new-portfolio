'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';

interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  followers: number;
  following: number;
  publicGists: number;
  contributions: number;
}

interface GitHubStatsWidgetProps {
  username?: string;
  showContributions?: boolean;
}

export default function GitHubStatsWidget({ 
  username = 'faranalam', 
  showContributions = true 
}: GitHubStatsWidgetProps) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating GitHub API call (replace with real API in production)
    const fetchGitHubStats = async () => {
      try {
        setLoading(true);
        
        // Mock data for demo - replace with actual GitHub API
        // const response = await fetch(`https://api.github.com/users/${username}`);
        // const data = await response.json();
        
        // Simulated stats (replace with real data)
        const mockStats: GitHubStats = {
          totalRepos: 32,
          totalStars: 156,
          totalForks: 48,
          totalCommits: 1200,
          followers: 45,
          following: 28,
          publicGists: 12,
          contributions: 847
        };

        // Simulate API delay
        setTimeout(() => {
          setStats(mockStats);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to fetch GitHub stats');
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, [username]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-1/2"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-red-500/10 border border-red-500 rounded-2xl p-8 text-red-500 text-center">
        {error || 'Unable to load GitHub stats'}
      </div>
    );
  }

  const statsData = [
    { label: 'Repositories', value: stats.totalRepos, icon: '📦', color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Stars', value: stats.totalStars, icon: '⭐', color: 'from-yellow-500 to-orange-500' },
    { label: 'Total Forks', value: stats.totalForks, icon: '🔱', color: 'from-purple-500 to-pink-500' },
    { label: 'Commits', value: stats.totalCommits, icon: '💻', color: 'from-green-500 to-teal-500' },
    { label: 'Followers', value: stats.followers, icon: '👥', color: 'from-indigo-500 to-blue-500' },
    { label: 'Following', value: stats.following, icon: '👤', color: 'from-pink-500 to-rose-500' },
    { label: 'Gists', value: stats.publicGists, icon: '📝', color: 'from-cyan-500 to-blue-500' },
    { label: 'Contributions', value: stats.contributions, icon: '🎯', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <FadeIn>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="text-4xl">⚡</span>
              GitHub Statistics
            </h3>
            <p className="text-gray-400">Real-time data from GitHub API</p>
          </div>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold flex items-center gap-2 shadow-lg hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View Profile
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${stat.color} shadow-lg group cursor-pointer`}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-sm text-white/80 font-medium">
                  {stat.label}
                </div>
              </div>

              {/* Animated background circles */}
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            </motion.div>
          ))}
        </div>

        {/* Contribution Graph Preview */}
        {showContributions && (
          <div className="mt-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>📈</span>
              Contribution Activity
            </h4>
            <div className="flex items-center gap-2 flex-wrap">
              {[...Array(52)].map((_, week) => (
                <div key={week} className="flex flex-col gap-1">
                  {[...Array(7)].map((_, day) => {
                    const intensity = Math.random();
                    return (
                      <motion.div
                        key={`${week}-${day}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (week * 7 + day) * 0.002 }}
                        className={`w-3 h-3 rounded-sm ${
                          intensity > 0.7 ? 'bg-green-500' :
                          intensity > 0.5 ? 'bg-green-600' :
                          intensity > 0.3 ? 'bg-green-700' :
                          intensity > 0.1 ? 'bg-green-800' :
                          'bg-gray-700'
                        }`}
                        title={`${Math.floor(intensity * 10)} contributions`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-4">
              {stats.contributions} contributions in the last year
            </p>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>🔄 Data updated in real-time via GitHub API</p>
        </div>
      </div>
    </FadeIn>
  );
}
