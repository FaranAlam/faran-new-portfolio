'use client';

import { useState, useEffect } from 'react';
import { 
  MdAdd, 
  MdEdit, 
  MdDelete, 
  MdCheckCircle, 
  MdCancel, 
  MdSave 
} from 'react-icons/md';

interface EmailTemplate {
  _id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  category: string;
  variables: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [currentTemplate, setCurrentTemplate] = useState<Partial<EmailTemplate> | null>(null);
  const [previewMode, setPreviewMode] = useState<'html' | 'text'>('html');

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const response = await fetch('/api/email-templates');
      const data = await response.json();
      if (data.success) {
        setTemplates(data.templates);
      }
    } catch (error) {
      console.error('Failed to load templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTemplate?.name || !currentTemplate?.subject || !currentTemplate?.htmlContent || !currentTemplate?.category) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const url = '/api/email-templates';
      const method = currentTemplate._id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentTemplate),
      });

      const data = await response.json();
      
      if (data.success) {
        alert(`Template ${currentTemplate._id ? 'updated' : 'created'} successfully!`);
        setShowModal(false);
        setCurrentTemplate(null);
        loadTemplates();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Failed to save template:', error);
      alert('Failed to save template');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      const response = await fetch(`/api/email-templates?id=${id}`, { method: 'DELETE' });
      const data = await response.json();
      
      if (data.success) {
        alert('Template deleted successfully!');
        loadTemplates();
      }
    } catch (error) {
      console.error('Failed to delete template:', error);
    }
  };

  const toggleActive = async (template: EmailTemplate) => {
    try {
      await fetch('/api/email-templates', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: template._id, isActive: !template.isActive }),
      });
      loadTemplates();
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  const detectVariables = (html: string): string[] => {
    const regex = /\{\{(\w+)\}\}/g;
    const matches = html.matchAll(regex);
    return [...new Set([...matches].map(m => `{{${m[1]}}}`))];
  };

  const filteredTemplates = templates.filter(t => 
    !filterCategory || t.category === filterCategory
  );

  const stats = {
    total: templates.length,
    active: templates.filter(t => t.isActive).length,
    byCategory: templates.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  const categories = ['newsletter', 'welcome', 'notification', 'marketing', 'transactional'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Email Templates</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Create and manage email templates</p>
        </div>
        <button
          onClick={() => {
            setCurrentTemplate({
              name: '',
              subject: '',
              htmlContent: '',
              textContent: '',
              category: 'newsletter',
              variables: [],
              isActive: true,
            });
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-colors"
        >
          <MdAdd className="text-lg" /> Create Template
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl p-6 text-white shadow-lg">
          <p className="text-blue-100 text-sm font-medium">Total Templates</p>
          <p className="text-3xl font-bold mt-2">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-xl p-6 text-white shadow-lg">
          <p className="text-green-100 text-sm font-medium">Active</p>
          <p className="text-3xl font-bold mt-2">{stats.active}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-xl p-6 text-white shadow-lg">
          <p className="text-purple-100 text-sm font-medium">Categories</p>
          <p className="text-3xl font-bold mt-2">{Object.keys(stats.byCategory).length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat} className="capitalize">{cat}</option>
          ))}
        </select>
      </div>

      {/* Templates List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">Loading templates...</p>
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No templates found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTemplates.map((template) => (
              <div key={template._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{template.name}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded capitalize ${
                        template.category === 'newsletter' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' :
                        template.category === 'welcome' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                        template.category === 'notification' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                        template.category === 'marketing' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400' :
                        'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400'
                      }`}>
                        {template.category}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        template.isActive
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                      }`}>
                        {template.isActive ? (
                          <span className="flex items-center gap-1"><MdCheckCircle className="text-green-500" /> Active</span>
                        ) : (
                          <span className="flex items-center gap-1"><MdCancel className="text-red-500" /> Inactive</span>
                        )}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      <strong>Subject:</strong> {template.subject}
                    </p>
                    {template.variables.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Variables:</span>
                        {template.variables.map((v, idx) => (
                          <code key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-400 text-xs rounded font-mono">
                            {v}
                          </code>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Updated: {new Date(template.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => {
                        setCurrentTemplate(template);
                        setShowModal(true);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      <MdEdit className="text-lg" /> Edit
                    </button>
                    <button
                      onClick={() => toggleActive(template)}
                      className={`px-4 py-2 ${
                        template.isActive ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'
                      } text-white rounded-lg text-sm font-medium transition-colors`}
                    >
                      {template.isActive ? '⏸️ Deactivate' : '▶️ Activate'}
                    </button>
                    <button
                      onClick={() => handleDelete(template._id)}
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
      {showModal && currentTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-5xl w-full my-8">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentTemplate._id ? 'Edit Template' : 'Create New Template'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Template Name *
                  </label>
                  <input
                    type="text"
                    value={currentTemplate.name || ''}
                    onChange={(e) => setCurrentTemplate({ ...currentTemplate, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    value={currentTemplate.category || 'newsletter'}
                    onChange={(e) => setCurrentTemplate({ ...currentTemplate, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white capitalize"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="capitalize">{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject Line *
                </label>
                <input
                  type="text"
                  value={currentTemplate.subject || ''}
                  onChange={(e) => setCurrentTemplate({ ...currentTemplate, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Use {{variables}} for dynamic content"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    HTML Content * (Use {`{{variableName}}`} for placeholders)
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewMode('html')}
                      className={`px-3 py-1 rounded text-sm ${previewMode === 'html' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                    >
                      HTML
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode('text')}
                      className={`px-3 py-1 rounded text-sm ${previewMode === 'text' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                    >
                      Text
                    </button>
                  </div>
                </div>
                {previewMode === 'html' ? (
                  <textarea
                    value={currentTemplate.htmlContent || ''}
                    onChange={(e) => {
                      const html = e.target.value;
                      const variables = detectVariables(html);
                      setCurrentTemplate({ ...currentTemplate, htmlContent: html, variables });
                    }}
                    rows={15}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
                    required
                  />
                ) : (
                  <div 
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 min-h-[300px] overflow-auto"
                    dangerouslySetInnerHTML={{ __html: currentTemplate.htmlContent || '<p class="text-gray-500">No content yet</p>' }}
                  />
                )}
              </div>

              {currentTemplate.variables && currentTemplate.variables.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
                    Detected Variables:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentTemplate.variables.map((v, idx) => (
                      <code key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-400 text-sm rounded font-mono">
                        {v}
                      </code>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={currentTemplate.isActive !== false}
                  onChange={(e) => setCurrentTemplate({ ...currentTemplate, isActive: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1"><MdCheckCircle className="text-green-500" /> Active Template</span>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  {currentTemplate._id ? (
                    <><MdSave className="text-lg" /> Update Template</>
                  ) : (
                    <><MdCheckCircle className="text-lg" /> Create Template</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setCurrentTemplate(null);
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
