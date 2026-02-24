"use client";

import FadeIn from "../animations/FadeIn";
import StaggerContainer from "../animations/StaggerContainer";
import StaggerItem from "../animations/StaggerItem";

export default function BlogPreview() {
  const blogPosts = [
    {
      title: "Getting Started with Next.js 15",
      excerpt: "Learn how to build modern web applications with Next.js 15, exploring the latest features and best practices.",
      date: "Feb 20, 2026",
      category: "Web Development",
      readTime: "5 min read",
      image: "📝"
    },
    {
      title: "Mastering TypeScript in 2026",
      excerpt: "A comprehensive guide to TypeScript covering advanced types, generics, and real-world patterns.",
      date: "Feb 18, 2026",
      category: "Programming",
      readTime: "8 min read",
      image: "💻"
    },
    {
      title: "Building Scalable APIs with Node.js",
      excerpt: "Best practices for designing and implementing RESTful APIs that can scale with your business.",
      date: "Feb 15, 2026",
      category: "Backend",
      readTime: "10 min read",
      image: "🚀"
    },
  ];

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Blog Posts</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Thoughts, tutorials, and insights on web development, programming, and technology.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                {/* Featured Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center text-6xl">
                  {post.image}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">{post.date}</span>
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <a
              href="/blog"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              View All Posts
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
