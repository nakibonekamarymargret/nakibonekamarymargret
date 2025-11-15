"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Project {
  id: string;
  title: string;
  subtitle: string;
}
 
const ProjectTable = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    if (data.success) setProjects(data.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);
 
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      fetchProjects();
    }
  }; 

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="bg-[#1e293b] rounded-xl overflow-hidden shadow-lg">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-[#111827] text-gray-300 text-left">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold">Title</th>
                <th className="px-6 py-3 text-sm font-semibold">Subtitle</th>
                <th className="px-6 py-3 text-sm font-semibold text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-[#0f172a]/60 transition">
                  <td className="px-6 py-4">{proj.title}</td>
                  <td className="px-6 py-4 text-gray-400">{proj.subtitle}</td>
                  <td className="px-6 py-4 flex justify-end gap-3">
                    <button
                      onClick={() =>
                        router.push(`/admin/projects/form?id=${proj.id}`)
                      }
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-6 text-center text-gray-500 italic"
                  >
                    No projects added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;
