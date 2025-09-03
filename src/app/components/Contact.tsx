import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";

// ✅ Hook for intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible] as const;
};



// ✅ Contact component
const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600">
              Ready to collaborate on your next project or opportunity
            </p>
          </div>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <AnimatedSection>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: <Mail className="h-6 w-6 text-blue-600 mr-4" />,
                    text: "nakibonekamarymargret@gmail.com",
                  },
                  {
                    icon: <Phone className="h-6 w-6 text-blue-600 mr-4" />,
                    text: "+256 786 122063",
                  },
                  {
                    icon: <MapPin className="h-6 w-6 text-blue-600 mr-4" />,
                    text: "Mengo, Kampala, Uganda",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center group hover:translate-x-2 transition-transform duration-300"
                  >
                    <div className="group-hover:animate-bounce">
                      {item.icon}
                    </div>
                    <span className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Connect With Me
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="https://linkedin.com/in/nakiboneka-mary-9826aa225"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                  >
                    <Linkedin className="w-5 h-5 group-hover:animate-pulse" />
                  </a>
                  <a
                    href="https://github.com/nakibonekamarymargret"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                  >
                    <Github className="w-5 h-5 group-hover:animate-pulse" />
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* What I'm Looking For */}
          <AnimatedSection className="delay-300">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 transform hover:scale-105 transition-all duration-500 hover:shadow-xl">
                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  What I&apos;m Looking For
                </h3>
                <ul className="space-y-3 text-gray-600">
                  {[
                    "Data Analysis and Software Engineering roles",
                    "Freelance web and mobile development projects",
                    "Machine learning and AI implementation opportunities",
                    "Collaborative projects with innovative teams",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start group hover:translate-x-2 transition-transform duration-300"
                    >
                      <ChevronRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0 group-hover:animate-bounce" />
                      <span className="group-hover:text-blue-600 transition-colors duration-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <a
                    href="mailto:nakibonekamarymargret@gmail.com"
                    className="group inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Send Email
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
