"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Edit,
  Trash2,
  Star,
  TrendingUp,
  Briefcase,
  MapPin,
  Clock,
} from "lucide-react";

interface ExperienceData {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  location?: string;
  employmentType?: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  imageUrl?: string;
  companySize?: string;
  industry?: string;
  technologies?: string[];
  featured?: boolean;
  priority?: number;
}

const ExperienceTable = () => {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/experiences");
      const data = await res.json();
      if (data.success) {
        // Sort by current, featured, and priority
        const sorted = data.data.sort(
          (a: ExperienceData, b: ExperienceData) => {
            if (a.isCurrent && !b.isCurrent) return -1;
            if (!a.isCurrent && b.isCurrent) return 1;
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return (b.priority || 0) - (a.priority || 0);
          }
        );
        setExperiences(sorted);
      }
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleDelete = async (id: string, company: string) => {
    if (
      confirm(`Are you sure you want to delete the experience at "${company}"?`)
    ) {
      try {
        const res = await fetch(`/api/experiences?id=${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
          fetchExperiences();
        } else {
          alert("Failed to delete experience");
        }
      } catch (error) {
        console.error("Error deleting experience:", error);
        alert("Error deleting experience");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-gray-100 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading experiences...</p>
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
            <div className="text-gray-400 text-sm mb-1">Total Experiences</div>
            <div className="text-2xl font-bold text-white">
              {experiences.length}
            </div>
          </div>
          <div className="bg-[#1e293b] rounded-lg p-4 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Current Roles</div>
            <div className="text-2xl font-bold text-green-400">
              {experiences.filter((e) => e.isCurrent).length}
            </div>
          </div>
          <div className="bg-[#1e293b] rounded-lg p-4 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Featured</div>
            <div className="text-2xl font-bold text-yellow-400">
              {experiences.filter((e) => e.featured).length}
            </div>
          </div>
          <div className="bg-[#1e293b] rounded-lg p-4 border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">Industries</div>
            <div className="text-2xl font-bold text-blue-400">
              {new Set(experiences.map((e) => e.industry).filter(Boolean)).size}
            </div>
          </div>
        </div>

        {/* Experiences Table */}
        <div className="bg-[#1e293b] rounded-xl overflow-hidden shadow-lg border border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-[#111827] text-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Tech Stack
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {experiences.map((exp) => (
                  <tr
                    key={exp.id}
                    className="hover:bg-[#0f172a]/60 transition-colors"
                  >
                    {/* Position */}
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-3">
                        {exp.imageUrl && (
                          <img
                            src={exp.imageUrl}
                            alt={exp.company}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-700"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="font-semibold text-white">
                              {exp.title}
                            </div>
                            {exp.featured && (
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            )}
                            {exp.isCurrent && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-300 border border-green-700">
                                Current
                              </span>
                            )}
                          </div>
                          {exp.location && (
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <MapPin className="h-3 w-3" />
                              {exp.location}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="px-4 py-4">
                      <div>
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 font-medium"
                          >
                            {exp.company}
                          </a>
                        ) : (
                          <div className="font-medium text-white">
                            {exp.company}
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2 mt-1">
                          {exp.industry && (
                            <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-0.5 rounded">
                              {exp.industry}
                            </span>
                          )}
                          {exp.companySize && (
                            <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-0.5 rounded">
                              {exp.companySize}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-300">
                          {exp.startDate} -{" "}
                          {exp.isCurrent ? "Present" : exp.endDate}
                        </span>
                      </div>
                      {exp.priority !== undefined && exp.priority > 0 && (
                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                          <TrendingUp className="h-3 w-3" />
                          Priority: {exp.priority}
                        </div>
                      )}
                    </td>

                    {/* Tech Stack */}
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {exp.technologies && exp.technologies.length > 0 ? (
                          <>
                            {exp.technologies.slice(0, 2).map((tech, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300"
                              >
                                {tech}
                              </span>
                            ))}
                            {exp.technologies.length > 2 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-400">
                                +{exp.technologies.length - 2}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-gray-600 text-sm">—</span>
                        )}
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-4 py-4">
                      {exp.employmentType ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900/50 text-indigo-300 border border-indigo-700">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {exp.employmentType}
                        </span>
                      ) : (
                        <span className="text-gray-600 text-sm">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            router.push(`/admin/experiences/form?id=${exp.id}`)
                          }
                          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-colors"
                          title="Edit Experience"
                        >
                          <Edit className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(exp.id, exp.company)}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors"
                          title="Delete Experience"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {experiences.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="text-gray-500 text-6xl">💼</div>
                        <div className="text-gray-400 text-lg font-medium">
                          No experiences yet
                        </div>
                        <div className="text-gray-500 text-sm">
                          Add your first work experience to get started
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
        {experiences.length > 0 && (
          <div className="mt-4 flex items-center justify-end gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              Featured
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-300 border border-green-700">
                Current
              </span>
              Current Role
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceTable;
