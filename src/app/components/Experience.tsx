"use client";
import { ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";
import { ExperienceData } from "../types/interface";

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch experiences from API
  const fetchExperiences = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/experiences");
      const data = await res.json();
      if (data.success) setExperiences(data.data);
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
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Professional Experience
            </h2>
            <p className="text-lg text-gray-200">
              My work experiences that have shaped my career journey.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <AnimatedSection key={exp.id || index}>
              <div
                className="bg-white/90 rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Image / Avatar */}
                {exp.imageUrl && (
                  <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-gray-200">
                    <img
                      src={exp.imageUrl}
                      alt={exp.company}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                {/* Text content */}
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {exp.title}
                    </h3>
                    <p className="text-lg text-blue-600">{exp.company}</p>
                    <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {exp.startDate} – {exp.endDate}
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
