"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExperienceData } from "@/app/types/interface";

const ExperienceList = () => {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const router = useRouter();

  // ✅ Fetch experiences from API
  const fetchExperiences = async () => {
        const res = await fetch("/api/experiences");
    const data = await res.json();
    if (data.success) setExperiences(data.data);
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  // ✅ Delete experience
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      await fetch(`/api/experiences?id=${id}`, { method: "DELETE" });
      fetchExperiences();
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-white">Experiences</h2>
            <p className="text-gray-400 text-sm">
              Hi Mary ❤️ manage your experiences — add, edit or remove them.
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/experiences/form")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-md text-sm font-medium shadow-md transition-all"
          >
            + Add Experience
          </button>
        </div>

        {/* Table */}
        <div className="bg-[#1e293b] rounded-xl overflow-hidden shadow-lg border border-gray-700">
          {experiences.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              No experiences found. Click “Add Experience” to create one.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-[#111827] text-gray-300 text-left">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold">Company</th>
                  <th className="px-6 py-3 text-sm font-semibold">Role</th>
                  <th className="px-6 py-3 text-sm font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {experiences.map((exp) => (
                  <tr
                    key={exp.id}
                    className="hover:bg-gray-800 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {exp.company}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <button
                        onClick={() =>
                          router.push(`/admin/experiences/form?id=${exp.id}`)
                        }
                        className="text-indigo-400 hover:text-indigo-300 mr-4 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id!)}
                        className="text-red-500 hover:text-red-400 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceList;
