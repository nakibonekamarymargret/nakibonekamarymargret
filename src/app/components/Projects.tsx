"use client";

import { ChevronRight, ExternalLink, Video, Award } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import { RxDoubleArrowUp, RxDoubleArrowDown } from "react-icons/rx";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";

interface ProjectData {
  id?: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  thumbnailUrl?: string;
  screenshots?: string[];
  videoUrl?: string;
  technologies: string[];
  category?: string;
  role?: string;
  teamSize?: string;
  achievements: string[];
  metrics?: string[];
  challenges?: string[];
  projectUrl?: string;
  githubUrl?: string;
  liveDemo?: string;
  caseStudyUrl?: string;
  status?: string;
  featured?: boolean;
  priority?: number;
}

const ProjectCard = ({ project }: { project: ProjectData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden">
      {/* Featured Badge */}
      {project.featured && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-4 py-1 flex items-center gap-1">
          <Award className="h-3 w-3" />
          FEATURED PROJECT
        </div>
      )}

      {/* Thumbnail Image */}
      {project.thumbnailUrl && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          {project.status && (
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800">
              {project.status}
            </span>
          )}
        </div>
      )}

      <div className="p-6 relative">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="text-sm text-blue-600 font-medium mb-2">
                    {project.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-3">
              {project.period && (
                <span className="px-3 py-1 bg-gray-100 rounded-full">
                  📅 {project.period}
                </span>
              )}
              {project.role && (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                  👤 {project.role}
                </span>
              )}
              {project.teamSize && (
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full">
                  👥 {project.teamSize}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-blue-600 rounded"></span>
              <span>Tech Stack</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 transform hover:scale-110 transition-transform duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Expandable Content */}
          <div
            className={`transition-all duration-500 overflow-hidden ${
              isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="text-sm font-semibold text-green-900 mb-2 flex items-center gap-2">
                  📊 Impact & Results
                </h4>
                <ul className="space-y-1">
                  {project.metrics.map((metric) => (
                    <li
                      key={metric}
                      className="flex items-center text-sm text-green-800"
                    >
                      <ChevronRight className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
                      <span className="font-medium">{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Achievements */}
            {project.achievements && project.achievements.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-purple-600 rounded"></span>
                  <span>Key Achievements</span>
                </h4>
                <ul className="space-y-1">
                  {project.achievements.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex items-start text-sm text-gray-700"
                    >
                      <ChevronRight className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  🎯 Challenges Solved
                </h4>
                <ul className="space-y-1">
                  {project.challenges.map((challenge) => (
                    <li
                      key={challenge}
                      className="text-sm text-gray-600 italic"
                    >
                      • {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-200">
            {project.liveDemo && (
              <a
                href={
                  project.liveDemo.startsWith("http")
                    ? project.liveDemo
                    : `https://${project.liveDemo}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={
                  project.githubUrl.startsWith("http")
                    ? project.githubUrl
                    : `https://${project.githubUrl}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <FaGithub className="h-4 w-4" />
                GitHub
              </a>
            )}
            {project.videoUrl && (
              <a
                href={
                  project.videoUrl.startsWith("http")
                    ? project.videoUrl
                    : `https://${project.videoUrl}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Video className="h-4 w-4" />
                Video
              </a>
            )}
            {project.caseStudyUrl && (
              <a
                href={
                  project.caseStudyUrl.startsWith("http")
                    ? project.caseStudyUrl
                    : `https://${project.caseStudyUrl}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 text-sm font-medium"
              >
                📝 Case Study
              </a>
            )}
          </div>

          {/* View More/Less Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm mb-4 transition-colors duration-200"
          >
            {isExpanded ? (
              <>
                <RxDoubleArrowUp className="h-4 w-4" />
                View Less
              </>
            ) : (
              <>
                <RxDoubleArrowDown className="h-4 w-4" />
                View More
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success) {
        const sorted = data.data.sort((a: ProjectData, b: ProjectData) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.priority || 0) - (a.priority || 0);
        });
        setProjects(sorted);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const categories = [
    "all",
    ...new Set(projects.map((p) => p.category).filter(Boolean)),
  ];
  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

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
    <section
      id="projects"
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Showcasing my technical expertise through real-world applications
            that deliver measurable results
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  if (cat) {
                    setFilter(cat);
                  }
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat === "all" ? "All Projects" : cat}
              </button>
            ))}
          </div>
        )}

        {/* Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
