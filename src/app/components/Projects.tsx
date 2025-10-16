"use client";

import { ChevronRight } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import AnimatedSection from "./AnimatedSection";
import { ProjectData } from "../types/interface";


const Projects = () => {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true);

  // Fetch projects from API
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success) setProjects(data.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);



  if (loading) {
    return (
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600">
              Showcasing my technical expertise through real-world applications
            </p>
          </div>
        </AnimatedSection>

        {/* Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <AnimatedSection
              key={project.id}
              className="group bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
            >
              <div className="p-8 relative overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-blue-600 mb-2">
                        {project.subtitle}
                      </p>
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors duration-300">
                        {project.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{project.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 transform hover:scale-110 transition-transform duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-1">
                      {project.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <ChevronRight className="h-3 w-3 text-blue-600 mr-2 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Project Links */}
                  {/* Project Links */}
                  {(project.projectUrl || project.githubUrl) && (
                    <div className="mt-4 flex gap-3">
                      {project.projectUrl && (
                        <a
                          href={
                            project.projectUrl.startsWith("http")
                              ? project.projectUrl
                              : `https://${project.projectUrl}`
                          }
                          target="_parent"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                          View Project →
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={
                            project.githubUrl.startsWith("http")
                              ? project.githubUrl
                              : `https://${project.githubUrl}`
                          }
                          target="_parent"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-600 hover:text-gray-800 underline"
                        >
                          GitHub →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
