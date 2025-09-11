import { ChevronRight } from "lucide-react";
import React from "react";
import AnimatedSection from "./AnimatedSection";

const Projects = () => {
  const projects = [
    {
      title: "Coffee Wilt Guard",
      subtitle: "Mobile App for Disease Detection",
      period: "Sep 2023 – Jun 2024",
      description:
        "Flutter mobile application using CNN for Coffee Wilt Disease detection, achieving 82% improved early detection among 50+ farmers.",
      technologies: ["Flutter", "CNN", "Python", "Roboflow", "Google Colab"],
      achievements: [
        "82% improved early detection",
        "100+ test cases executed",
        "35% reduction in pre-deployment bugs",
      ],
    },
    {
      title: "Fixdental Management System",
      subtitle: "Dental Clinic Management",
      period: "Early 2025 – Present",
      description:
        "Comprehensive dental clinic management system with React frontend, focusing on appointment scheduling and patient data management.",
      technologies: ["React", "JavaScript", "MySQL", "Node.js"],
      achievements: [
        "Streamlined clinic operations",
        "Enhanced patient booking",
        "Scalable architecture",
      ],
    },
    {
      title: "Medsave Backend",
      subtitle: "Node.js & Firebase Backend APIs",
      period: "May 2025 – August 2025",
      description:
        "Created backend APIs for Medsave platform using Node.js, Express, and Firebase, supporting user authentication, medical record management, and real-time updates.",
      technologies: ["Node.js", "Express", "Firebase", "REST API", "Postman"],
      achievements: [
        "Real-time data management with Firebase",
        "Secure API endpoints with JWT authentication",
        "Improved API response times by 25%",
      ],
    },
    {
      title: "HR Management System",
      subtitle: "Database & Frontend Development",
      period: "Jun 2023 – Aug 2023",
      description:
        "Designed MySQL database schema and user-friendly interfaces for HR processes including staff registration and leave tracking.",
      technologies: ["MySQL", "PHP", "HTML/CSS", "JavaScript"],
      achievements: [
        "30% increase in HR efficiency",
        "Improved data accuracy",
        "Streamlined record-keeping",
      ],
    },
  ];

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
          {projects.map((project, index) => (
            <AnimatedSection
              key={index}
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
