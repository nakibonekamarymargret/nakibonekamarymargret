"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ProjectData } from "../../../types/interface";


const ProjectForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("id");

  const [project, setProject] = useState<ProjectData>({
    title: "",
    subtitle: "",
    period: "",
    description: "",
    technologies: [],
    achievements: [],
    projectUrl: "",
    githubUrl: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`/api/projects?id=${id}`)
        .then((res) => res.json())
        .then((data) => data.success && setProject(data.data));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProject((prev: ProjectData) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "technologies" | "achievements",
    index: number
  ) => {
    const newArr = [...project[field]];
    newArr[index] = e.target.value;
    setProject((prev) => ({ ...prev, [field]: newArr }));
  };

  const addArrayItem = (field: "technologies" | "achievements") => {
    setProject((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (
    field: "technologies" | "achievements",
    index: number
  ) => {
    const newArr = project[field].filter((_, i) => i !== index);
    setProject((prev) => ({ ...prev, [field]: newArr }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const body = id ? { ...project, id } : project;

    await fetch("/api/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    router.push("/admin/projects");
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white shadow-md rounded-xl">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        {id ? "Edit Project" : "Add New Project"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            name="title"
            value={project.title}
            onChange={handleChange}
            placeholder="Project Title"
            className="input-field"
          />
          <input
            name="subtitle"
            value={project.subtitle}
            onChange={handleChange}
            placeholder="Subtitle"
            className="input-field"
          />
          <input
            name="period"
            value={project.period}
            onChange={handleChange}
            placeholder="Period (e.g. 2023 - 2024)"
            className="input-field"
          />
        </div>

        <textarea
          name="description"
          value={project.description}
          onChange={handleChange}
          placeholder="Project Description"
          rows={4}
          className="input-field"
        />

        {/* Technologies */}
        <div>
          <h4 className="font-semibold mb-2 text-gray-700">Technologies</h4>
          <div className="space-y-2">
            {project.technologies.map((tech, i) => (
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
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addArrayItem("technologies")}
            className="text-blue-600 hover:text-blue-800 text-sm mt-2"
          >
            + Add Technology
          </button>
        </div>

        {/* Achievements */}
        <div>
          <h4 className="font-semibold mb-2 text-gray-700">Achievements</h4>
          <div className="space-y-2">
            {project.achievements.map((ach, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={ach}
                  onChange={(e) => handleArrayChange(e, "achievements", i)}
                  placeholder="Achievement"
                  className="input-field flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("achievements", i)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addArrayItem("achievements")}
            className="text-blue-600 hover:text-blue-800 text-sm mt-2"
          >
            + Add Achievement
          </button>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="projectUrl"
            value={project.projectUrl}
            onChange={handleChange}
            placeholder="Project URL"
            className="input-field"
          />
          <input
            name="githubUrl"
            value={project.githubUrl}
            onChange={handleChange}
            placeholder="GitHub URL"
            className="input-field"
          />
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {id ? "Update Project" : "Add Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
