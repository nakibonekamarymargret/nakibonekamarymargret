"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Edit,
  Trash2,
  ExternalLink,
  Github,
  Star,
  TrendingUp,
} from "lucide-react";

interface EnhancedProject {
  id: string;
  title: string;
  subtitle: string;
  category?: string;
  status?: string;
  featured?: boolean;
  priority?: number;
  technologies: string[];
  liveDemo?: string;
  githubUrl?: string;
  period?: string;
}

const ProjectTable = () => {
  const [projects, setProjects] = useState<EnhancedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success) {
        // Sort by featured and priority
        const sorted = data.data.sort(
          (a: EnhancedProject, b: EnhancedProject) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return (b.priority || 0) - (a.priority || 0);
          }
        );
        setProjects(sorted);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) {
          fetchProjects();
        } else {
          alert("Failed to delete project");
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Error deleting project");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-gray-100 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1e293b] rounded-lg p-4 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Total Projects</div>
            <div className="text-2xl font-bold text-white">
              {projects.length}
            </div>
          </div>
          <div className="bg-[#1e293b] rounded-lg p-4 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Featured</div>
            <div className="text-2xl font-bold text-yellow-400">
              {projects.filter((p) => p.featured).length}
            </div>
          </div>
          <div className="bg-[#1e293b] rounded-lg p-4 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Categories</div>
            <div className="text-2xl font-bold text-blue-400">
              {new Set(projects.map((p) => p.category).filter(Boolean)).size}
            </div>
          </div>
          <div className="bg-[#1e293b] rounded-lg p-4 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">In Progress</div>
            <div className="text-2xl font-bold text-green-400">
              {projects.filter((p) => p.status === "In Progress").length}
            </div>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-[#1e293b] rounded-xl overflow-hidden shadow-lg border border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-[#111827] text-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Tech Stack
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider">
                    Links
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {projects.map((proj) => (
                  <tr
                    key={proj.id}
                    className="hover:bg-[#0f172a]/60 transition-colors"
                  >
                    {/* Project Info */}
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="font-semibold text-white">
                              {proj.title}
                            </div>
                            {proj.featured && (
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            )}
                          </div>
                          <div className="text-sm text-gray-400">
                            {proj.subtitle}
                          </div>
                          {proj.period && (
                            <div className="text-xs text-gray-500 mt-1">
                              📅 {proj.period}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4">
                      {proj.category ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300 border border-blue-700">
                          {proj.category}
                        </span>
                      ) : (
                        <span className="text-gray-600 text-sm">—</span>
                      )}
                    </td>

                    {/* Tech Stack */}
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {proj.technologies.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {proj.technologies.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-400">
                            +{proj.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        {proj.status && (
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              proj.status === "Completed"
                                ? "bg-green-900/50 text-green-300 border border-green-700"
                                : proj.status === "In Progress"
                                  ? "bg-yellow-900/50 text-yellow-300 border border-yellow-700"
                                  : "bg-purple-900/50 text-purple-300 border border-purple-700"
                            }`}
                          >
                            {proj.status}
                          </span>
                        )}
                        {proj.priority !== undefined && proj.priority > 0 && (
                          <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                            <TrendingUp className="h-3 w-3" />
                            Priority: {proj.priority}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Links */}
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {proj.liveDemo && (
                          <a
                            href={proj.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-300 transition-colors"
                            title="GitHub"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {!proj.liveDemo && !proj.githubUrl && (
                          <span className="text-gray-600 text-sm">—</span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            router.push(`/admin/projects/form?id=${proj.id}`)
                          }
                          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-colors"
                          title="Edit Project"
                        >
                          <Edit className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(proj.id, proj.title)}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="text-gray-500 text-6xl">📁</div>
                        <div className="text-gray-400 text-lg font-medium">
                          No projects yet
                        </div>
                        <div className="text-gray-500 text-sm">
                          Create your first project to get started
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        {projects.length > 0 && (
          <div className="mt-4 flex items-center justify-end gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              Featured
            </div>
            <div className="flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              Live Demo
            </div>
            <div className="flex items-center gap-1">
              <Github className="h-3 w-3" />
              GitHub
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTable;
