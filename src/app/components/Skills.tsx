import {
  Award,
  BarChart3,
  Code,
  Database,
  Smartphone,
  Server,
} from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { SkillData, Certificates } from "../types/interface";

interface GroupedSkills {
  [category: string]: SkillData[];
}

const Skills = () => {
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [certificates, setCertificates] = useState<Certificates[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    try {
      const [skillsRes, certsRes] = await Promise.all([
        fetch("/api/skills"),
        fetch("/api/certificates"),
      ]);

      const skillsData = await skillsRes.json();
      const certsData = await certsRes.json();

      if (skillsData.success) setSkills(skillsData.data);
      if (certsData.success) setCertificates(certsData.data);
    } catch (error) {
      console.error("Error loading data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  // Group skills by category
  const groupedSkills: GroupedSkills = skills.reduce(
    (acc: GroupedSkills, skill: SkillData) => {
      const category = skill.category as string;
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    },
    {} as GroupedSkills
  );

  // Map category to icon
  const getCategoryIcon = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (
      lowerCategory.includes("programming") ||
      lowerCategory.includes("language")
    ) {
      return <Code className="w-6 h-6" />;
    }
    if (
      lowerCategory.includes("data") ||
      lowerCategory.includes("analysis") ||
      lowerCategory.includes("ml")
    ) {
      return <BarChart3 className="w-6 h-6" />;
    }
    if (
      lowerCategory.includes("database") ||
      lowerCategory.includes("backend")
    ) {
      return <Database className="w-6 h-6" />;
    }
    if (lowerCategory.includes("mobile") || lowerCategory.includes("web")) {
      return <Smartphone className="w-6 h-6" />;
    }
    return <Server className="w-6 h-6" />;
  };

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Loading skills...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="skills"
      className="py-20 bg-[url('/bg4.jpeg')] bg-cover bg-center bg-no-repeat overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-black/100 opacity-80"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Technical Skills
            </h2>
            <p className="text-lg text-gray-200">
              Comprehensive technical expertise across multiple domains
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(groupedSkills).map(
            ([category, categorySkills], index) => (
              <AnimatedSection
                key={category}
                className="group bg-white/10 rounded-lg shadow-md p-6 transform transition-all duration-700 hover:scale-105 hover:shadow-xl backdrop-blur-sm"
              >
                <div style={{ transitionDelay: `${index * 150}ms` }}>
                  <div className="flex items-center mb-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg mr-3 group-hover:bg-blue-700 group-hover:rotate-12 transition-all duration-300">
                      {getCategoryIcon(category)}
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {category}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {categorySkills.map((skill, i) => (
                      <div
                        key={skill.id}
                        className="flex items-center text-sm text-gray-300 group/skill hover:text-blue-400 transition-colors duration-200"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 flex-shrink-0 group-hover/skill:animate-ping"></div>
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )
          )}
        </div>

        {/* Certifications - Now Dynamic */}
        {certificates && certificates.length > 0 && (
          <div className="mt-12 text-center">
            <AnimatedSection>
              <div className="bg-white/10 rounded-lg shadow-md p-8 transform hover:scale-105 transition-all duration-500 hover:shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-blue-400 mr-2 animate-pulse" />
                  <h3 className="text-xl font-semibold text-white">
                    Certifications
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-200">
                  {certificates.map((cert, i) => (
                    <div
                      key={cert.id}
                      className="flex items-center justify-center p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-300 transform hover:scale-105"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      {cert.name}
                      {cert.institute && (
                        <span className="text-xs text-gray-400 ml-1">
                          ({cert.institute})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
