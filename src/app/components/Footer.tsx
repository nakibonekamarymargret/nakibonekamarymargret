import React from 'react'

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
          <div className="text-center">
            <p className="text-gray-400 hover:text-white transition-colors duration-300">
              © 2025 Mary Nakiboneka. Built with Next.js and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
