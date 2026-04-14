"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  MdAdd, 
  MdEdit, 
  MdDelete, 
  MdRocket, 
  MdCheckCircle 
} from 'react-icons/md';

interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: string;
}

export default function PortfolioManagementPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Web Development",
    image: "",
    tags: "",
    githubUrl: "",
    liveUrl: "",
    featured: false,
  });

  // Check auth status
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      loadProjects();
    }
  }, [status]);

  const loadProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagsArray = formData.tags.split(",").map(t => t.trim()).filter(t => t);
    
    try {
      if (editingProject) {
        // Update existing project
        const response = await fetch("/api/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _id: editingProject._id,
            ...formData,
            tags: tagsArray,
          }),
        });

        const data = await response.json();
        
        if (data.success) {
          await loadProjects(); // Reload projects
          alert("Project updated successfully!");
        } else {
          alert("Failed to update project: " + data.message);
        }
      } else {
        // Add new project
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            tags: tagsArray,
          }),
        });

        const data = await response.json();
        
        if (data.success) {
          await loadProjects(); // Reload projects
          alert("Project created successfully!");
        } else {
          alert("Failed to create project: " + data.message);
        }
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "Web Development",
        image: "",
        tags: "",
        githubUrl: "",
        liveUrl: "",
        featured: false,
      });
      setShowModal(false);
      setEditingProject(null);
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Error saving project");
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      image: project.image,
      tags: project.tags.join(", "),
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      featured: project.featured,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`/api/projects?id=${id}`, {
          method: "DELETE",
        });

        const data = await response.json();
        
        if (data.success) {
          await loadProjects(); // Reload projects
          alert("✅ Project deleted successfully!");
        } else {
          alert("❌ Failed to delete project: " + data.message);
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Error deleting project");
      }
    }
  };

  const toggleFeatured = async (id: string) => {
    const project = projects.find(p => p._id === id);
    if (!project) return;

    try {
      const response = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: id,
          featured: !project.featured,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        await loadProjects(); // Reload projects
      } else {
        alert("❌ Failed to update project: " + data.message);
      }
    } catch (error) {
      console.error("Error toggling featured:", error);
      alert("Error updating project");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Portfolio Management</h1>
          <p className="text-gray-600 mt-2">Add, edit, and manage your projects</p>
        </div>
        <button
          onClick={() => {
            setEditingProject(null);
            setFormData({
              title: "",
              description: "",
              category: "Web Development",
              image: "",
              tags: "",
              githubUrl: "",
              liveUrl: "",
              featured: false,
            });
            setShowModal(true);
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
        >
          <MdAdd className="text-lg" /> Add New Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-4xl font-bold text-blue-600">{projects.length}</div>
          <div className="text-sm text-gray-600 mt-1">Total Projects</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-4xl font-bold text-yellow-600">
            {projects.filter(p => p.featured).length}
          </div>
          <div className="text-sm text-gray-600 mt-1">Featured Projects</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-4xl font-bold text-green-600">
            {new Set(projects.map(p => p.category)).size}
          </div>
          <div className="text-sm text-gray-600 mt-1">Categories</div>
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition">
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <MdRocket className="text-6xl text-gray-300" />
                )}
                {project.featured && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ⭐ Featured
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Category */}
                <div className="mb-4">
                  <span className="text-xs text-gray-500">{project.category}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                  >
                    <MdEdit className="text-lg" /> Edit
                  </button>
                  <button
                    onClick={() => toggleFeatured(project._id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm"
                    title="Toggle Featured"
                  >
                    ⭐
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                    title="Delete"
                  >
                    <MdDelete className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingProject(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Web Development</option>
                  <option>Mobile App</option>
                  <option>UI/UX Design</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Live URL</label>
                <input
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://project-demo.com"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  Mark as Featured Project
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingProject ? "Update Project" : "Add Project"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProject(null);
                  }}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Note */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-sm border border-green-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><MdCheckCircle className="text-green-600" /> Database Integration Active</h3>
        <p className="text-gray-600 text-sm">
          Projects are now stored in MongoDB and persist permanently. All create, update, and delete
          operations are saved to the database in real-time.
        </p>
      </div>
    </div>
  );
}
