"use client"
import React, { useEffect, useState } from "react";
  import {
    Menu,
    X,
   
  } from "lucide-react";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true); // triggers animation after mount
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "experience",
        "projects",
        "skills",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" },
  ];
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };
   return (
    <div>
      <nav
        className={`fixed top-0 w-full bg-black/50 z-50 backdrop-blur-lg transform transition-all duration-500
           ${isLoaded ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6  lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1
                className={`text-3xl font-sans font-bold bg-linear-to-r from-blue-400 to-indigo-900 bg-clip-text font-extrabold text-transparent transform transition-all duration-700 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
              >
                Mary Margret Nakiboneka
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 cursor-pointer py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 relative
                      ${activeSection === item.id
                        ? "text-blue-400 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-400 after:left-0 after:bottom-0"
                        : "text-gray-200 hover:text-blue-400 hover:bg-white/10 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-400 after:left-0 after:bottom-0 after:transition-all hover:after:w-full"
                      } ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-gray-500 hover:bg-gray-100/10"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/50 border-b border-gray-700">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                    activeSection === item.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-200 hover:bg-gray-100/10 hover:text-white"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar
