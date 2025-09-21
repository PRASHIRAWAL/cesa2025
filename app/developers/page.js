'use client'

import React from 'react'
import { motion } from "framer-motion"
import Link from 'next/link'

const Developers = () => {
  const developers = [
    {
      name: "Rohit Soneji",
      role: "Full Stack Developer & UI Designer",
      image: "/api/placeholder/300/300",
      linkedin: "https://www.linkedin.com/in/rohit-soneji-9483a5344/",
      github: "https://github.com/SwiftByte6"
    },
    {
      name: "Atharva Sheramkar",
      role: "Frontend Developer", 
      image: "/api/placeholder/300/300",
      linkedin: "https://www.linkedin.com/in/atharva-sheramkar-93a930351/",
      github: "https://github.com/sarahchen"
    },
    {
      name: "Maitrey Bharambe",
      role: "Backend Developer",
      image: "/api/placeholder/300/300", 
      linkedin: "https://www.linkedin.com/in/maitrey-bharambe-677088331?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ",
      github: "https://github.com/Maitrey-Bharambe"
    }
  ]

  return (
    <div className="min-h-screen bg-[#02020A] py-16 px-4">
      {/* Background Effects */}
      <div className="absolute left-0 top-[20%] flex items-center justify-center pointer-events-none">
        <div className="rounded-full h-[80vw] w-[80vw] max-h-[500px] max-w-[500px] bg-[radial-gradient(circle,rgba(168,85,247,0.35)_0%,transparent_70%)] blur-3xl" />
      </div>
      <div className="absolute right-0 top-[40%] flex items-center justify-center pointer-events-none">
        <div className="rounded-full h-[60vw] w-[60vw] max-h-[400px] max-w-[400px] bg-[radial-gradient(circle,rgba(207,158,255,0.25)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-16"
        >
          <h1 className="font-heading text-5xl md:text-7xl text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CF9EFF] to-[#A855F7]">Developers</span>
          </h1>
          <p className="font-paragraph text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Meet the talented developers behind CESA. Passionate about technology and building amazing experiences.
          </p>
        </motion.div>

        {/* Developer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {developers.map((dev, index) => (
            <motion.div
              key={dev.name}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: [0.25, 1, 0.5, 1] 
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Card Container */}
              <div 
                className="relative bg-[#1A1025] border-2 border-[#CF9EFF]/30 rounded-3xl p-8 overflow-hidden"
                style={{ 
                  boxShadow: '0 20px 60px rgba(207, 158, 255, 0.15), 0 0 40px rgba(207, 158, 255, 0.1)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#CF9EFF]/10 via-transparent to-[#A855F7]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 right-4 w-20 h-20 border border-[#CF9EFF] rounded-full" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 border border-[#A855F7] rounded-full" />
                </div>

                {/* Profile Image */}
                <div className="relative mb-6">
                  <div 
                    className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#CF9EFF]/20 to-[#A855F7]/20 border-2 border-[#CF9EFF]/40 flex items-center justify-center overflow-hidden"
                    style={{
                      boxShadow: '0 0 30px rgba(207, 158, 255, 0.3), inset 0 0 20px rgba(207, 158, 255, 0.1)'
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-[#1A1025] to-[#2A1F3D] rounded-full flex items-center justify-center">
                      <span className="font-heading text-3xl text-[#CF9EFF]">
                        {dev.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Name Overlay */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#1A1025] border border-[#CF9EFF]/40 rounded-full px-4 py-1">
                    <span className="font-heading text-sm text-white whitespace-nowrap">
                      {dev.name}
                    </span>
                  </div>
                </div>

                {/* Role */}
                <div className="text-center mb-6">
                  <h3 className="font-heading text-xl text-white mb-2">{dev.name}</h3>
                  <p className="font-paragraph text-[#CF9EFF]/80 text-sm">{dev.role}</p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  <a
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link relative p-3 rounded-full bg-[#0A0711] border border-[#CF9EFF]/30 hover:border-[#CF9EFF] transition-all duration-300"
                    style={{
                      boxShadow: '0 0 20px rgba(207, 158, 255, 0.1)'
                    }}
                  >
                    <svg className="w-5 h-5 text-[#CF9EFF] group-hover/link:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#CF9EFF]/10 to-[#A855F7]/10 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                  </a>
                  
                  <a
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link relative p-3 rounded-full bg-[#0A0711] border border-[#CF9EFF]/30 hover:border-[#CF9EFF] transition-all duration-300"
                    style={{
                      boxShadow: '0 0 20px rgba(207, 158, 255, 0.1)'
                    }}
                  >
                    <svg className="w-5 h-5 text-[#CF9EFF] group-hover/link:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#CF9EFF]/10 to-[#A855F7]/10 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                  </a>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#CF9EFF]/5 via-transparent to-[#A855F7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back to Home */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mt-16"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 font-button text-[#CF9EFF] hover:text-white transition-colors duration-300 group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Developers
