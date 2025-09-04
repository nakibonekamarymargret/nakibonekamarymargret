import React from "react";
import AnimatedSection from "./AnimatedSection";
import { Code, BarChart3, Users } from "lucide-react";

const About = () => {
  const skills = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Full-Stack Development",
      description:
        "Proficient in React, Spring Boot, Flutter, and modern web technologies",
      delay: "0ms",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Data Analysis & ML",
      description:
        "Experience with Python, machine learning algorithms, and data visualization",
      delay: "200ms",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description:
        "Strong communication skills and experience in agile development environments",
      delay: "400ms",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Me</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
               Software Engineering  with a strong foundation in
              data analysis, machine learning, and full-stack development. Ready
              to contribute to data-driven projects and innovative software
              solutions.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((item, index) => (
            <AnimatedSection key={index} className="transition-delay-[200ms]">
              <div
                className="text-center p-6 rounded-lg bg-gray-50 transform transition-all duration-700 hover:scale-105 hover:shadow-lg group"
                style={{ transitionDelay: item.delay }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg mb-4 group-hover:bg-blue-700 transition-colors duration-300 group-hover:animate-pulse">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
