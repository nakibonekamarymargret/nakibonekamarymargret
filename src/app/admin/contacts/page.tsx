"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<
    {
      id: string;
      title: string;
      subtitle: string;
      period: string;
      description: string;
      technologies: string[];
      achievements: string[];
      projectUrl?: string;
      githubUrl?: string;
      imageUrl?: string;
      order: number;
      published: boolean;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<{
    id: string;
    title: string;
    subtitle: string;
    period: string;
    description: string;
    technologies: string[];
    achievements: string[];
    projectUrl?: string;
    githubUrl?: string;
    imageUrl?: string;
    order: number;
    published: boolean;
  } | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    period: "",
    description: "",
    technologies: "",
    achievements: "",
    projectUrl: "",
    githubUrl: "",
    imageUrl: "",
    order: 0,
    published: true,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/projects?includeUnpublished=true", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(",").map((t) => t.trim()),
      achievements: formData.achievements.split("\n").filter((a) => a.trim()),
    };

    try {
      const url = editingProject
        ? `/api/projects/${editingProject.id}`
        : "/api/projects";

      const method = editingProject ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      const data = await res.json();

      if (data.success) {
        fetchProjects();
        resetForm();
        alert(editingProject ? "Project updated!" : "Project created!");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchProjects();
        alert("Project deleted!");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    }
  };

  const handleEdit = (project: {
    id: string;
    title: string;
    subtitle: string;
    period: string;
    description: string;
    technologies: string[];
    achievements: string[];
    projectUrl?: string;
    githubUrl?: string;
    imageUrl?: string;
    order: number;
    published: boolean;
  }) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      subtitle: project.subtitle,
      period: project.period,
      description: project.description,
      technologies: project.technologies.join(", "),
      achievements: project.achievements.join("\n"),
      projectUrl: project.projectUrl || "",
      githubUrl: project.githubUrl || "",
      imageUrl: project.imageUrl || "",
      order: project.order,
      published: project.published,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      period: "",
      description: "",
      technologies: "",
      achievements: "",
      projectUrl: "",
      githubUrl: "",
      imageUrl: "",
      order: 0,
      published: true,
    });
    setEditingProject(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Projects</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              {editingProject ? "Edit Project" : "Add New Project"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  placeholder="Subtitle"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  className="border rounded px-3 py-2"
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Period (e.g., Sep 2023 - Jun 2024)"
                value={formData.period}
                onChange={(e) =>
                  setFormData({ ...formData, period: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                required
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                rows={3}
                required
              />

              <input
                type="text"
                placeholder="Technologies (comma separated)"
                value={formData.technologies}
                onChange={(e) =>
                  setFormData({ ...formData, technologies: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                required
              />

              <textarea
                placeholder="Achievements (one per line)"
                value={formData.achievements}
                onChange={(e) =>
                  setFormData({ ...formData, achievements: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                rows={3}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="url"
                  placeholder="Project URL"
                  value={formData.projectUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, projectUrl: e.target.value })
                  }
                  className="border rounded px-3 py-2"
                />
                <input
                  type="url"
                  placeholder="GitHub URL"
                  value={formData.githubUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, githubUrl: e.target.value })
                  }
                  className="border rounded px-3 py-2"
                />
              </div>

              <input
                type="url"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />

              <div className="flex items-center gap-4">
                <input
                  type="number"
                  placeholder="Order"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value),
                    })
                  }
                  className="border rounded px-3 py-2 w-24"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="w-4 h-4"
                  />
                  <span>Published</span>
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  {editingProject ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    {project.published ? (
                      <Eye className="w-4 h-4 text-green-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <p className="text-sm text-blue-600">{project.subtitle}</p>
                  <p className="text-sm text-gray-500">{project.period}</p>
                  <p className="text-gray-600 mt-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
