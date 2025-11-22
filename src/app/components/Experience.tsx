"use client";

import {
  ChevronRight,
  MapPin,
  Briefcase,
  Award,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { RxDoubleArrowUp, RxDoubleArrowDown } from "react-icons/rx";

interface ExperienceData {
  id?: string;
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
  description: string;
  achievements: string[];
  technologies?: string[];
  responsibilities?: string[];
  metrics?: string[];
  projects?: string[];
  skillsGained?: string[];
  featured?: boolean;
  priority?: number;
}

const ExperienceCard = ({
  exp,
  index,
}: {
  exp: ExperienceData;
  index: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="bg-white/95 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] overflow-hidden backdrop-blur-sm border border-gray-200"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Featured Badge */}
      {exp.featured && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-4 py-1 flex items-center gap-1">
          <Award className="h-3 w-3" />
          FEATURED EXPERIENCE
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Company Logo */}
          {exp.imageUrl && (
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-gray-200 flex-shrink-0">
              <img
                src={exp.imageUrl}
                alt={exp.company}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {/* Title & Company */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {exp.title}
            </h3>
            {exp.companyUrl ? (
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
              >
                {exp.company}
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <p className="text-lg text-blue-600 font-medium">{exp.company}</p>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
          </span>
          {exp.isCurrent && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Current Role
            </span>
          )}
          {exp.location && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              <MapPin className="h-3 w-3" />
              {exp.location}
            </span>
          )}
          {exp.employmentType && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              <Briefcase className="h-3 w-3" />
              {exp.employmentType}
            </span>
          )}
        </div>

        {/* Company Details */}
        {(exp.industry || exp.companySize) && (
          <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-600">
            {exp.industry && (
              <span className="bg-gray-50 px-2 py-1 rounded">
                🏢 {exp.industry}
              </span>
            )}
            {exp.companySize && (
              <span className="bg-gray-50 px-2 py-1 rounded">
                👥 {exp.companySize}
              </span>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-gray-700 mb-4 leading-relaxed">{exp.description}</p>

        {/* Technologies */}
        {exp.technologies && exp.technologies.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1 h-4 bg-blue-600 rounded"></span>
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
{/*  */}

        {/* Expandable Content */}
        <div
          className={`transition-all duration-500 overflow-hidden ${
            isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {/* Metrics */}
          {exp.metrics && exp.metrics.length > 0 && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="text-sm font-semibold text-green-900 mb-2 flex items-center gap-2">
                📊 Impact & Results
              </h4>
              <ul className="space-y-1">
                {exp.metrics.map((metric, i) => (
                  <li
                    key={i}
                    className="flex items-center text-sm text-green-800"
                  >
                    <TrendingUp className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
                    <span className="font-medium">{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Achievements */}
          {exp.achievements && exp.achievements.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-1 h-4 bg-purple-600 rounded"></span>
                Key Achievements
              </h4>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li
                    key={i}
                    className="flex items-start text-sm text-gray-700"
                  >
                    <ChevronRight className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Notable Projects */}
          {exp.projects && exp.projects.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                🚀 Notable Projects
              </h4>
              <ul className="space-y-1">
                {exp.projects.map((project, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-600 pl-4 border-l-2 border-blue-200"
                  >
                    {project}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills Gained */}
          {exp.skillsGained && exp.skillsGained.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                💡 Skills Developed
              </h4>
              <div className="flex flex-wrap gap-2">
                {exp.skillsGained.map((skill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm mb-4 transition-colors duration-200 mt-2 border border-0"
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
  );
};

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExperiences = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/experiences");
      const data = await res.json();
      if (data.success) {
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
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  if (loading) {
    return (
      <section id="experience" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">Loading experiences...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="experience"
      className="py-20 bg-[url('/bg1.jpeg')] bg-cover bg-center bg-no-repeat overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Professional Experience
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            My career journey showcasing impactful roles and measurable
            achievements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id || index} exp={exp} index={index} />
          ))}
        </div>

        {experiences.length === 0 && (
          <div className="text-center py-12 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-gray-300 text-lg">
              No experiences to display yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
