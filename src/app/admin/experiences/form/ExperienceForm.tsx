"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ExperienceData } from "@/app/types/interface";

const ExperienceForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const [experience, setExperience] = useState<ExperienceData>({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    imageUrl: "",
    achievements: [],
  });

  // ✅ Fetch existing experience for editing
  useEffect(() => {  
    if (id) {
      fetch(`/api/experiences?id=${id}`)
        .then((res) => res.json())
        .then((data) => data.success && setExperience(data.data))
        .catch((err) => console.error("Failed to fetch experience:", err));
    }
  }, [id]);

  // ✅ Handle simple inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setExperience((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle achievements array
  const handleAchievementChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newAchievements = [...experience.achievements];
    newAchievements[index] = e.target.value;
    setExperience((prev) => ({ ...prev, achievements: newAchievements }));
  };

  const addAchievement = () =>
    setExperience((prev) => ({
      ...prev,
      achievements: [...prev.achievements, ""],
    }));

  const removeAchievement = (index: number) =>
    setExperience((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = id ? "PUT" : "POST";
    const res = await fetch("/api/experiences", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id ? { ...experience, id } : experience),
    });

    const data = await res.json();
    if (data.success) {
      router.push("/admin/experiences");
    } else {
      alert("❌ Error saving experience");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6 text-gray-100">
        {id ? "Edit Experience" : "Add New Experience"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-slate-800 p-6 rounded-lg shadow-lg"
      >
        {/* Title / Role */}
        <div>
          <label className="block mb-1 font-medium text-gray-200">
            Title / Role
          </label>
          <input
            name="title"
            value={experience.title}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            className="w-full border border-gray-600 bg-slate-900 text-gray-100 p-2 rounded"
            required
          />
        </div>

        {/* Company */}
        <div>
          <label className="block mb-1 font-medium text-gray-200">
            Company
          </label>
          <input
            name="company"
            value={experience.company}
            onChange={handleChange}
            placeholder="Company name"
            className="w-full border border-gray-600 bg-slate-900 text-gray-100 p-2 rounded"
            required
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-200">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={experience.startDate}
              onChange={handleChange}
              className="w-full border border-gray-600 bg-slate-900 text-gray-100 p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-200">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={experience.endDate}
              onChange={handleChange}
              className="w-full border border-gray-600 bg-slate-900 text-gray-100 p-2 rounded"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-medium text-gray-200">
            Image URL
          </label>
          <input
            name="imageUrl"
            value={experience.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-600 bg-slate-900 text-gray-100 p-2 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-200">
            Description
          </label>
          <textarea
            name="description"
            value={experience.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe your role, projects, and key outcomes"
            className="w-full border border-gray-600 bg-slate-900 text-gray-100 p-2 rounded"
          />
        </div>

        {/* Achievements */}
        <div>
          <label className="block mb-1 font-medium text-gray-200">
            Achievements
          </label>
          {experience.achievements.map((ach, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={ach}
                onChange={(e) => handleAchievementChange(e, index)}
                className="w-full border border-gray-600 bg-slate-900 text-gray-100 p-2 rounded"
                placeholder="e.g. Increased conversion rate by 25%"
              />
              <button
                type="button"
                onClick={() => removeAchievement(index)}
                className="ml-2 text-red-500 hover:text-red-300 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addAchievement}
            className="text-indigo-400 hover:text-indigo-200 text-sm"
          >
            + Add Achievement
          </button>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-md font-medium"
          >
            {id ? "Update Experience" : "Create Experience"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExperienceForm;
