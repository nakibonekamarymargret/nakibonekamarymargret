"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ExperienceTable from "./Table";

const ExperienceList = () => {
  const router = useRouter();


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
            <ExperienceTable />
          
      </div>
    </div>
  );
};

export default ExperienceList;
