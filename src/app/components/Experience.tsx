"use client";
import { ChevronRight } from "lucide-react";
import React from "react";
import AnimatedSection from "./AnimatedSection";

const Experience = () => {
  const experiences = [
    {
      title: "Software Developer Graduate Trainee",
      company: "Service Cops - School Pay",
      period: "Feb 2025 – Apr 2025",
      description:
        "Developed robust backend APIs using Spring Boot and Java, integrated React frontends, and optimized client-server communication with Axios.",
      achievements: [
        "Improved system usability and user engagement",
        "Reduced page load times",
        "Enhanced data processing efficiency",
      ],
    },
    {
      title: "Junior Developer Graduate Trainee",
      company: "Service Cops - School Pay",
      period: "Sep 2024 – Dec 2024",
      description:
        "Refactored frontend code for better performance and accessibility, collaborated on user-centered design improvements.",
      achievements: [
        "Improved responsiveness across devices",
        "Enhanced user experience",
        "Better code maintainability",
      ],
    },
    {
      title: "Mobile Developer Graduate Trainee",
      company: "AutoFore App",
      period: "Jul 2024 – Sep 2024",
      description:
        "Designed UI screens using Flutter, collaborated with cross-functional teams for seamless system integration.",
      achievements: [
        "Enhanced user interface consistency",
        "Improved user experience",
        "Ensured seamless data flow",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Professional Experience
            </h2>
            <p className="text-lg text-gray-600">
              Recent graduate trainee positions and internship experience
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <AnimatedSection
              key={index}
              className="transform transition-all duration-700 hover:shadow-xl hover:scale-[1.02]"
            >
              <div
                className="bg-white rounded-lg shadow-md p-8"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {exp.title}
                    </h3>
                    <p className="text-lg text-blue-600">{exp.company}</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 animate-pulse">
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{exp.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {exp.achievements.map((achievement, i) => (
                    <div
                      key={i}
                      className="flex items-center text-sm text-gray-600 group"
                    >
                      <ChevronRight className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
