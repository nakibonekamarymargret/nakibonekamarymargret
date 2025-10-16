"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import { ChevronRight } from "lucide-react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import About from "./components/About";

const Portfolio = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize animations
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        className="pt-16 bg-[url('/bg3.jpeg')] bg-cover bg-center bg-no-repeat overflow-hidden relative"
      >
        {/* Semi-transparent dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className={`transform transition-all duration-1000 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}
            >
              {/* Changed text color to white for better contrast */}
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                <span
                  className={`inline-block transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  Software Engineer
                </span>
                <br />
                <span
                  className={`inline-block text-cyan-300 transform transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  & Data Analyst
                </span>
              </h1>
              <p
                className={`text-xl text-gray-200 mb-8 transform transition-all duration-1000 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
              >
                Detail-oriented Software Engineer with expertise in full-stack
                development, data analysis, and machine learning. Passionate
                about creating innovative solutions that drive business growth.
              </p>
              <div
                className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                {/* Updated button styles for contrast */}
                <button
                  // Note: Removed onClick to a shared function
                  className="group inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  View My Work
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button
                  // Note: Removed onClick to a shared function
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-white bg-transparent hover:bg-gray-50/20 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                >
                  Get In Touch
                </button>
              </div>
            </div>
            <div
              className={`flex justify-center lg:justify-end transform transition-all duration-1000 delay-300 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
            >
              <div className="relative">
                <div className="relative w-80 h-80 rounded-full overflow-hidden border-8 border-white shadow-xl transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                  <Image
                    src="/mary.png"
                    alt="Mary Nakiboneka"
                    fill
                    sizes="(max-width: 768px) 200px, 320px"
                    priority
                    className="object-cover"
                  />
                </div>

                {/* Floating animation elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-indigo-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />
      {/* Experience Section */}
      <Experience />
      {/* Projects Section */}
      <Projects />
      {/* Skills Section */}
      <Skills />
      {/* Contact Section */}
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;
