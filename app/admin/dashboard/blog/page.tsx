'use client';

import { useState, useEffect } from 'react';
import { 
  MdAdd, 
  MdSearch, 
  MdEdit, 
  MdDelete, 
  MdPublish, 
  MdUnpublished, 
  MdFolder, 
  MdVisibility, 
  MdFavorite, 
  MdCalendarToday, 
  MdSave, 
  MdCheckCircle 
} from 'react-icons/md';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image?: string;
  author: string;
  status: 'draft' | 'published';
  featured: boolean;
  views: number;
  likes: number;
  createdAt: string;
  publishedAt?: string;
}

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPost?.title || !currentPost?.slug || !currentPost?.content || !currentPost?.category) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const url = '/api/blog';
      const method = currentPost._id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentPost),
      });

      const data = await response.json();
      
      if (data.success) {
        alert(`Post ${currentPost._id ? 'updated' : 'created'} successfully!`);
        setShowModal(false);
        setCurrentPost(null);
        loadPosts();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Failed to save post:', error);
      alert('Failed to save post');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
      const data = await response.json();
      
      if (data.success) {
        alert('Post deleted successfully!');
        loadPosts();
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const togglePublish = async (post: BlogPost) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      await fetch('/api/blog', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: post._id, status: newStatus }),
      });
      loadPosts();
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  const toggleFeatured = async (post: BlogPost) => {
    try {
      await fetch('/api/blog', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: post._id, featured: !post.featured }),
      });
      loadPosts();
    } catch (error) {
      console.error('Failed to toggle featured:', error);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    const matchesCategory = !filterCategory || post.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    draft: posts.filter(p => p.status === 'draft').length,
    featured: posts.filter(p => p.featured).length,
  };

  const categories = [...new Set(posts.map(p => p.category))];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Create and manage blog posts</p>
        </div>
        <button
          onClick={() => {
            setCurrentPost({
              title: '',
              slug: '',
              excerpt: '',
              content: '',
              category: '',
              tags: [],
              status: 'draft',
              featured: false,
            });
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-colors"
        >
          <MdAdd className="text-lg" /> Create New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl p-6 text-white shadow-lg">
          <p className="text-blue-100 text-sm font-medium">Total Posts</p>
          <p className="text-3xl font-bold mt-2">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-xl p-6 text-white shadow-lg">
          <p className="text-green-100 text-sm font-medium">Published</p>
          <p className="text-3xl font-bold mt-2">{stats.published}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 dark:from-yellow-600 dark:to-yellow-700 rounded-xl p-6 text-white shadow-lg">
          <p className="text-yellow-100 text-sm font-medium">Drafts</p>
          <p className="text-3xl font-bold mt-2">{stats.draft}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-xl p-6 text-white shadow-lg">
          <p className="text-purple-100 text-sm font-medium">Featured</p>
          <p className="text-3xl font-bold mt-2">{stats.featured}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No posts found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredPosts.map((post) => (
              <div key={post._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{post.title}</h3>
                      {post.featured && (
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs font-semibold rounded">
                          ⭐ Featured
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        post.status === 'published'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400'
                      }`}>
                        {post.status}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1"><MdFolder className="text-purple-500" /> {post.category}</span>
                      <span className="flex items-center gap-1"><MdVisibility className="text-blue-500" /> {post.views} views</span>
                      <span className="flex items-center gap-1"><MdFavorite className="text-red-500" /> {post.likes} likes</span>
                      <span className="flex items-center gap-1"><MdCalendarToday className="text-gray-500" /> {new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    {post.tags.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {post.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => {
                        setCurrentPost(post);
                        setShowModal(true);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <MdEdit className="text-lg" /> Edit
                    </button>
                    <button
                      onClick={() => togglePublish(post)}
                      className={`px-4 py-2 ${
                        post.status === 'published' ? 'bg-gray-600 hover:bg-gray-700' : 'bg-green-600 hover:bg-green-700'
                      } text-white rounded-lg text-sm font-medium transition-colors`}
                    >
                      {post.status === 'published' ? (
                        <><MdUnpublished className="text-lg" /> Unpublish</>
                      ) : (
                        <><MdPublish className="text-lg" /> Publish</>
                      )}
                    </button>
                    <button
                      onClick={() => toggleFeatured(post)}
                      className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      {post.featured ? '⭐ Unfeature' : '⭐ Feature'}
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <MdDelete className="text-lg" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && currentPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full my-8">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentPost._id ? 'Edit Post' : 'Create New Post'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={currentPost.title || ''}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setCurrentPost({ ...currentPost, title, slug });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={currentPost.slug || ''}
                    onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={currentPost.excerpt || ''}
                  onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Brief summary (auto-generated from content if empty)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content * (Markdown supported)
                </label>
                <textarea
                  value={currentPost.content || ''}
                  onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                  rows={10}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    value={currentPost.category || ''}
                    onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., Web Development"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={currentPost.tags?.join(', ') || ''}
                    onChange={(e) => setCurrentPost({ ...currentPost, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="react, nextjs, tutorial"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={currentPost.image || ''}
                    onChange={(e) => setCurrentPost({ ...currentPost, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="/images/blog/post.jpg"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentPost.featured || false}
                    onChange={(e) => setCurrentPost({ ...currentPost, featured: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">⭐ Featured Post</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={currentPost.status === 'draft'}
                    onChange={() => setCurrentPost({ ...currentPost, status: 'draft' })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1"><MdUnpublished className="text-yellow-500" /> Draft</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={currentPost.status === 'published'}
                    onChange={() => setCurrentPost({ ...currentPost, status: 'published' })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1"><MdPublish className="text-green-500" /> Published</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  {currentPost._id ? (
                    <><MdSave className="text-lg" /> Update Post</>
                  ) : (
                    <><MdCheckCircle className="text-lg" /> Create Post</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setCurrentPost(null);
                  }}
                  className="px-6 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
