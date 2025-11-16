"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface ExperienceData {
  // Basic Info
  title: string;
  company: string;
  companyUrl?: string;
  location?: string; // "Remote", "Kampala, Uganda", "Hybrid"
  employmentType?: string; // "Full-time", "Part-time", "Contract", "Freelance"

  // Dates
  startDate: string;
  endDate: string;
  isCurrent?: boolean; // Currently working here

  // Visual
  imageUrl?: string; // Company logo
  companySize?: string; // "1-10", "11-50", "51-200", "200+"
  industry?: string; // "Tech", "Finance", "Healthcare", etc.

  // Content
  description: string;
  achievements: string[];

  // Technical Details
  technologies?: string[]; // Tech stack used in this role
  responsibilities?: string[]; // Day-to-day duties

  // Impact & Metrics
  metrics?: string[]; // Quantifiable results
  projects?: string[]; // Key projects worked on

  // Skills Developed
  skillsGained?: string[]; // New skills learned

  // Display
  featured?: boolean;
  priority?: number;
}

const employmentTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship",
];

const companySizes = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "500+ employees",
];

const ExperienceForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [experience, setExperience] = useState<ExperienceData>({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    achievements: [],
    technologies: [],
    responsibilities: [],
    metrics: [],
    projects: [],
    skillsGained: [],
    isCurrent: false,
    featured: false,
    priority: 0,
  });

  useEffect(() => {
    if (id) {
      fetch(`/api/experiences?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setExperience(data.data);
          }
        })
        .catch((error) => console.error("Error fetching experience:", error));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setExperience((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ExperienceData,
    index: number
  ) => {
    const currentArray = experience[field];
    if (Array.isArray(currentArray)) {
      const newArr = [...currentArray];
      newArr[index] = e.target.value;
      setExperience((prev) => ({ ...prev, [field]: newArr }));
    }
  };

  const addArrayItem = (field: keyof ExperienceData) => {
    const currentArray = experience[field];
    if (Array.isArray(currentArray)) {
      setExperience((prev) => ({
        ...prev,
        [field]: [...currentArray, ""],
      }));
    } else {
      setExperience((prev) => ({
        ...prev,
        [field]: [""],
      }));
    }
  };

  const removeArrayItem = (field: keyof ExperienceData, index: number) => {
    const currentArray = experience[field];
    if (Array.isArray(currentArray)) {
      const newArr = currentArray.filter((_, i) => i !== index);
      setExperience((prev) => ({ ...prev, [field]: newArr }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const body = id ? { ...experience, id } : experience;

    try {
      const res = await fetch("/api/experiences", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/experiences");
      }
    } catch (error) {
      console.error("Error submitting experience:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 bg-white shadow-md rounded-xl">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        {id ? "Edit Experience" : "Add New Experience"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Position Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              value={experience.title}
              onChange={handleChange}
              placeholder="Job Title (e.g., Senior Full Stack Developer) *"
              className="input-field"
              required
            />
            <input
              name="company"
              value={experience.company}
              onChange={handleChange}
              placeholder="Company Name *"
              className="input-field"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="companyUrl"
              value={experience.companyUrl}
              onChange={handleChange}
              placeholder="Company Website"
              className="input-field"
            />
            <input
              name="location"
              value={experience.location}
              onChange={handleChange}
              placeholder="Location (e.g., Remote, Kampala)"
              className="input-field"
            />
            <select
              name="employmentType"
              value={experience.employmentType}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Employment Type</option>
              {employmentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="industry"
              value={experience.industry}
              onChange={handleChange}
              placeholder="Industry (e.g., Fintech, E-commerce)"
              className="input-field"
            />
            <select
              name="companySize"
              value={experience.companySize}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Company Size</option>
              {companySizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Dates */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Duration
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="startDate"
              value={experience.startDate}
              onChange={handleChange}
              placeholder="Start Date (e.g., Jan 2023) *"
              className="input-field"
              required
            />
            <input
              name="endDate"
              value={experience.endDate}
              onChange={handleChange}
              placeholder="End Date (e.g., Dec 2024)"
              className="input-field"
              disabled={experience.isCurrent}
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isCurrent"
              checked={experience.isCurrent}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">I currently work here</span>
          </label>
        </section>

        {/* Visual */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Company Logo
          </h3>

          <input
            name="imageUrl"
            value={experience.imageUrl}
            onChange={handleChange}
            placeholder="Company Logo URL"
            className="input-field"
          />
        </section>

        {/* Description */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Role Overview
          </h3>

          <textarea
            name="description"
            value={experience.description}
            onChange={handleChange}
            placeholder="Brief description of your role and what the company does *"
            rows={4}
            className="input-field"
            required
          />
        </section>

        {/* Responsibilities */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Key Responsibilities
          </h3>
          <p className="text-sm text-gray-600">
            What were your day-to-day duties?
          </p>

          {(experience.responsibilities || []).map((resp, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={resp}
                onChange={(e) => handleArrayChange(e, "responsibilities", i)}
                placeholder="Led a team of 5 developers..."
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={() => removeArrayItem("responsibilities", i)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("responsibilities")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            + Add Responsibility
          </button>
        </section>

        {/* Achievements */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Key Achievements *
          </h3>
          <p className="text-sm text-gray-600">
            What did you accomplish in this role?
          </p>

          {(experience.achievements || []).map((achievement, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={achievement}
                onChange={(e) => handleArrayChange(e, "achievements", i)}
                placeholder="Reduced deployment time by 60%..."
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={() => removeArrayItem("achievements", i)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("achievements")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            + Add Achievement
          </button>
        </section>

        {/* Metrics */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Quantifiable Results
          </h3>
          <p className="text-sm text-gray-600">
            Numbers speak louder than words!
          </p>

          {(experience.metrics || []).map((metric, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={metric}
                onChange={(e) => handleArrayChange(e, "metrics", i)}
                placeholder="Increased user retention by 45%"
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={() => removeArrayItem("metrics", i)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("metrics")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            + Add Metric
          </button>
        </section>

        {/* Technologies */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Technologies Used
          </h3>
          <p className="text-sm text-gray-600">
            What tech stack did you work with?
          </p>

          {(experience.technologies || []).map((tech, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={tech}
                onChange={(e) => handleArrayChange(e, "technologies", i)}
                placeholder="React, Node.js, AWS, Docker..."
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={() => removeArrayItem("technologies", i)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("technologies")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            + Add Technology
          </button>
        </section>

        {/* Projects */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Notable Projects
          </h3>
          <p className="text-sm text-gray-600">
            Key projects you worked on in this role
          </p>

          {(experience.projects || []).map((project, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={project}
                onChange={(e) => handleArrayChange(e, "projects", i)}
                placeholder="Built real-time analytics dashboard..."
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={() => removeArrayItem("projects", i)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("projects")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            + Add Project
          </button>
        </section>

        {/* Skills Gained */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Skills Developed
          </h3>
          <p className="text-sm text-gray-600">
            New skills or expertise gained
          </p>

          {(experience.skillsGained || []).map((skill, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={skill}
                onChange={(e) => handleArrayChange(e, "skillsGained", i)}
                placeholder="Team leadership, Cloud architecture..."
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={() => removeArrayItem("skillsGained", i)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("skillsGained")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            + Add Skill
          </button>
        </section>

        {/* Display Settings */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Display Settings
          </h3>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={experience.featured}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Featured Experience</span>
            </label>

            <input
              type="number"
              name="priority"
              value={experience.priority}
              onChange={handleChange}
              placeholder="Priority (0-10)"
              className="input-field w-32"
              min="0"
              max="10"
            />
          </div>
        </section>

        {/* Submit */}
        <div className="flex gap-4 justify-end pt-4 border-t">
          <button
            type="button"
            onClick={() => router.push("/admin/experiences")}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {id ? "Update Experience" : "Add Experience"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExperienceForm;
