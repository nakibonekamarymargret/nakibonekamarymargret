import { Award, BarChart3, Code, Database, Smartphone } from "lucide-react";
import React from "react";
import AnimatedSection from "./AnimatedSection";

const Skills = () => {
  const skillCategories = [
    {
      category: "Programming Languages",
      icon: <Code className="w-6 h-6" />,
      skills: ["Python", "Java", "JavaScript (React)", "SQL", "Dart", "PHP"],
    },
    {
      category: "Data Analysis & ML",
      icon: <BarChart3 className="w-6 h-6" />,
      skills: [
        "Machine Learning",
        "CNN",
        "Data Modeling",
        "Statistical Analysis",
        "Data Visualization",
        "Predictive Analysis",
      ],
    },
    {
      category: "Databases & Tools",
      icon: <Database className="w-6 h-6" />,
      skills: [
        "MySQL",
        "PostgreSQL",
        "Git/GitHub",
        "Spring Boot",
        "Power BI",
        "Google Colab",
      ],
    },
    {
      category: "Mobile & Web",
      icon: <Smartphone className="w-6 h-6" />,
      skills: [
        "Flutter",
        "React",
        "Tailwind CSS",
        "Responsive Design",
        "UI/UX Design",
        "API Integration",
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Technical Skills
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive technical expertise across multiple domains
            </p>
          </div>
        </AnimatedSection>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <AnimatedSection
              key={index}
              className="group bg-white rounded-lg shadow-md p-6 transform transition-all duration-700 hover:scale-105 hover:shadow-xl"
            >
              <div style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="flex items-center mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg mr-3 group-hover:bg-blue-700 group-hover:rotate-12 transition-all duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {category.category}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {category.skills.map((skill, i) => (
                    <div
                      key={i}
                      className="flex items-center text-sm text-gray-600 group/skill hover:text-blue-600 transition-colors duration-200"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 flex-shrink-0 group-hover/skill:animate-ping"></div>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-12 text-center">
          <AnimatedSection>
            <div className="bg-white rounded-lg shadow-md p-8 transform hover:scale-105 transition-all duration-500 hover:shadow-xl">
              <div className="flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-blue-600 mr-2 animate-pulse" />
                <h3 className="text-xl font-semibold text-gray-900">
                  Certifications
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                {[
                  "UI/UX Design (Coursera)",
                  "PHP Development (Sololearn)",
                  "Responsive Web Design (FreeCodeCamp)",
                  "React Development (FreeCodeCamp)",
                  "JavaScript Algorithms (FreeCodeCamp)",
                  "Machine Learning (MITx)",
                ].map((cert, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-300 transform hover:scale-105"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Skills;
