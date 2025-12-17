import React from "react";
import { Heart, Code } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-indigo-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-2">
          <p className="text-gray-400 hover:text-white transition-colors duration-300">
            © 2025 Mary Margret Nakiboneka. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <span className="text-4">Designed & Built with</span>
            <Heart className="h-8 w-8 text-red-500 animate-pulse" />
            <span className="text-sm">by</span>
            <span className="text-4 font-sans uppercase font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300">
              Nakiboneka Mary Margret
            </span>
            <Code className="h-4 w-4 text-blue-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
