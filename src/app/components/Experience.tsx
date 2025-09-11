"use client";
import { ChevronRight } from "lucide-react";
import React from "react";
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";

const Experience = () => {
  const experiences = [
    {
      title: "Software Developer Graduate Trainee",
      company: "Service Cops - School Pay",
      period: "Feb 2025 – Apr 2025",
      description:
        "Developed robust backend APIs using Spring Boot and Java, integrated React frontends, and optimized client-server communication with Axios.",
      image: "/schoolpay.png",
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
      image: "/servicecops.png",
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
      image: "/autofore.png",
      achievements: [
        "Enhanced user interface consistency",
        "Improved user experience",
        "Ensured seamless data flow",
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="py-20 bg-[url('/bg1.jpeg')] bg-cover bg-center bg-no-repeat overflow-hidden relative"
    >
      {/* Semi-transparent overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Professional Experience
            </h2>
            <p className="text-lg text-gray-200">
              Recent graduate trainee positions and internship experience
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <AnimatedSection key={index}>
              <div
                className="bg-white/90 rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Image for each experience card */}
                <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-gray-200">
                  <Image
                    src={exp.image}
                    alt={exp.company}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text content */}
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {exp.title}
                    </h3>
                    <p className="text-lg text-blue-600">{exp.company}</p>
                    <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{exp.description}</p>
                  <div className="flex flex-col items-start space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <div
                        key={i}
                        className="flex items-center text-sm text-gray-600 w-full"
                      >
                        <ChevronRight className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                        <span className="text-left">{achievement}</span>
                      </div>
                    ))}
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

export default Experience;
