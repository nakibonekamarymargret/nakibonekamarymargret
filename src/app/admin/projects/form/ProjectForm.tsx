"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface EnhancedProjectData {
  title: string;
  subtitle: string;
  period: string;
  description: string;

  // Visual elements
  thumbnailUrl?: string;
  screenshots?: string[];
  videoUrl?: string;

  // Technical details
  technologies: string[];
  category?: string; // e.g., "Web App", "Mobile App", "AI/ML", "E-commerce"
  role?: string; // e.g., "Lead Developer", "Full Stack Developer"
  teamSize?: string; // e.g., "Solo", "2-5", "5+"

  // Impact & Results
  achievements: string[];
  metrics?: string[]; // e.g., "50% faster load time", "1000+ users"
  challenges?: string[]; // Problems you solved

  // Links
  projectUrl?: string;
  githubUrl?: string;
  liveDemo?: string;
  caseStudyUrl?: string;

  // Status & Visibility
  status?: string; // "Completed", "In Progress", "Maintained"
  featured?: boolean; // Highlight best projects
  priority?: number; // Display order
}

const categories = [
  "Web Application",
  "Mobile App",
  "E-commerce",
  "AI/ML",
  "API/Backend",
  "DevOps",
  "Data Science",
  "Blockchain",
  "Other",
];

const ProjectForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [project, setProject] = useState<EnhancedProjectData>({
    title: "",
    subtitle: "",
    period: "",
    description: "",
    technologies: [],
    achievements: [],
    metrics: [],
    challenges: [],
    screenshots: [],
    featured: false,
    priority: 0,
  });

  useEffect(() => {
    if (id) {
      fetch(`/api/projects?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setProject(data.data);
          }
        })
        .catch((error) => console.error("Error fetching project:", error));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setProject((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field:
      | "technologies"
      | "achievements"
      | "metrics"
      | "challenges"
      | "screenshots",
    index: number
  ) => {
    const newArr = [...(project[field] || [])];
    newArr[index] = e.target.value;
    setProject((prev) => ({ ...prev, [field]: newArr }));
  };

  const addArrayItem = (
    field:
      | "technologies"
      | "achievements"
      | "metrics"
      | "challenges"
      | "screenshots"
  ) => {
    setProject((prev) => ({ ...prev, [field]: [...(prev[field] || []), ""] }));
  };

  const removeArrayItem = (
    field:
      | "technologies"
      | "achievements"
      | "metrics"
      | "challenges"
      | "screenshots",
    index: number
  ) => {
    const newArr = (project[field] || []).filter((_, i) => i !== index);
    setProject((prev) => ({ ...prev, [field]: newArr }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const body = id ? { ...project, id } : project;

    try {
      const res = await fetch("/api/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/projects");
      }
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 bg-white shadow-md rounded-xl">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        {id ? "Edit Project" : "Add New Project"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              value={project.title}
              onChange={handleChange}
              placeholder="Project Title *"
              className="input-field"
              required
            />
            <input
              name="subtitle"
              value={project.subtitle}
              onChange={handleChange}
              placeholder="Tagline/Subtitle"
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="period"
              value={project.period}
              onChange={handleChange}
              placeholder="Period (e.g., Jan 2024 - Mar 2024)"
              className="input-field"
            />
            <select
              name="category"
              value={project.category}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              name="status"
              value={project.status}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Maintained">Actively Maintained</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="role"
              value={project.role}
              onChange={handleChange}
              placeholder="Your Role (e.g., Full Stack Developer)"
              className="input-field"
            />
            <input
              name="teamSize"
              value={project.teamSize}
              onChange={handleChange}
              placeholder="Team Size (e.g., Solo, 2-5 people)"
              className="input-field"
            />
          </div>

          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            placeholder="Project Description - What problem does it solve? *"
            rows={4}
            className="input-field"
            required
          />
        </section>

        {/* Visual Assets */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Visual Assets
          </h3>

          <input
            name="thumbnailUrl"
            value={project.thumbnailUrl}
            onChange={handleChange}
            placeholder="Thumbnail Image URL (main project image)"
            className="input-field"
          />

          <input
            name="videoUrl"
            value={project.videoUrl}
            onChange={handleChange}
            placeholder="Demo Video URL (YouTube, Vimeo, etc.)"
            className="input-field"
          />

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Screenshots URLs
            </label>
            {(project.screenshots || []).map((screenshot, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={screenshot}
                  onChange={(e) => handleArrayChange(e, "screenshots", i)}
                  placeholder="Screenshot URL"
                  className="input-field flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("screenshots", i)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("screenshots")}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              + Add Screenshot
            </button>
          </div>
        </section>

        {/* Technologies */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Technologies Used *
          </h3>
          <p className="text-sm text-gray-600">
            List all tech stack (React, Node.js, PostgreSQL, AWS, etc.)
          </p>

          <div className="space-y-2">
            {(project.technologies || []).map((tech, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={tech}
                  onChange={(e) => handleArrayChange(e, "technologies", i)}
                  placeholder="Technology name"
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
          </div>
          <button
            type="button"
            onClick={() => addArrayItem("technologies")}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            + Add Technology
          </button>
        </section>

        {/* Impact & Results */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Impact & Results
          </h3>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Key Achievements (What did you accomplish?)
            </label>
            {(project.achievements || []).map((achievement, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={achievement}
                  onChange={(e) => handleArrayChange(e, "achievements", i)}
                  placeholder="Built a scalable REST API..."
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
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Metrics & Numbers (Quantifiable results)
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Examples: &quot;50% faster load time&quot;, &quot;1000+ active users&quot;, &quot;Reduced
              costs by $10k/year&quot;
            </p>
            {(project.metrics || []).map((metric, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={metric}
                  onChange={(e) => handleArrayChange(e, "metrics", i)}
                  placeholder="30% performance improvement"
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
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Challenges Solved (Technical problems you overcame)
            </label>
            {(project.challenges || []).map((challenge, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={challenge}
                  onChange={(e) => handleArrayChange(e, "challenges", i)}
                  placeholder="Optimized database queries for large datasets..."
                  className="input-field flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("challenges", i)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("challenges")}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              + Add Challenge
            </button>
          </div>
        </section>

        {/* Links */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            Links
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="liveDemo"
              value={project.liveDemo}
              onChange={handleChange}
              placeholder="Live Demo URL (deployed site)"
              className="input-field"
            />
            <input
              name="githubUrl"
              value={project.githubUrl}
              onChange={handleChange}
              placeholder="GitHub Repository URL"
              className="input-field"
            />
            <input
              name="projectUrl"
              value={project.projectUrl}
              onChange={handleChange}
              placeholder="Project Website URL"
              className="input-field"
            />
            <input
              name="caseStudyUrl"
              value={project.caseStudyUrl}
              onChange={handleChange}
              placeholder="Case Study/Blog Post URL"
              className="input-field"
            />
          </div>
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
                checked={project.featured}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">
                Featured Project (show prominently)
              </span>
            </label>

            <input
              type="number"
              name="priority"
              value={project.priority}
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
            onClick={() => router.push("/admin/projects")}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {id ? "Update Project" : "Add Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
