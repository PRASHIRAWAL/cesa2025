'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const TeamPage = () => {
  const convener = { name: 'Dr. Suja Jayachandran', role: 'Convener' }

  const leadership = [
    { name: 'Tanisha Sharma', role: 'Chairperson' },
    { name: 'Swaroop Naik', role: 'Vice Chairperson' },
    { name: 'Diksha Parulekar', role: 'General Secretary' },
  ]

  const domains = [
    {
      title: 'Technical',
      members: [
        { name: 'Prashi Rawal', role: 'Technical Head' },
      ],
      coMembers: [
      ]
    },
    {
      title: 'Event',
      members: [
        { name: 'Ishika Bhute', role: 'Event Head' },
      ],
      coMembers: [
        { name: 'Soumitra Rajguru', role: 'Event Co-head' },
      ]
    },
    {
      title: 'Creative',
      members: [
        { name: 'Sudha Maurya', role: 'Creative Head' },
      ],
      coMembers: [
        { name: 'Siddhi Naik', role: 'Creative Co-head' },
      ]
    },
    {
      title: 'Publicity',
      members: [
        { name: 'Bhavika Yashwantrao', role: 'Publicity Head' },
      ],
      coMembers: [
        { name: 'Tejas Dhanvi', role: 'Publicity Co-head' },
      ]
    },
    {
      title: 'Media',
      members: [
        { name: 'Yash Salunkhe', role: 'Media Head' },
      ],
      coMembers: [
        { name: 'Ayush Kamble', role: 'Media Co-head' },
      ]
    },
    {
      title: 'Documentation',
      members: [
        { name: 'Devanshi Mahajan', role: 'Documentation Head' },
      ],
      coMembers: [
        { name: 'Mayuri Kamath', role: 'Documentation Co-head' },
      ]
    },
  ]

  const Card = ({ person, index }) => (
    <motion.div
      key={`${person.name}-${person.role}`}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: (index ?? 0) * 0.05, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div
        className="relative bg-[#1A1025] border-2 border-[#CF9EFF]/30 rounded-3xl p-8 overflow-hidden"
        style={{
          boxShadow: '0 20px 60px rgba(207, 158, 255, 0.15), 0 0 40px rgba(207, 158, 255, 0.1)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#CF9EFF]/10 via-transparent to-[#A855F7]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative mb-6">
          <div
            className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#CF9EFF]/20 to-[#A855F7]/20 border-2 border-[#CF9EFF]/40 flex items-center justify-center overflow-hidden"
            style={{ boxShadow: '0 0 30px rgba(207, 158, 255, 0.3), inset 0 0 20px rgba(207, 158, 255, 0.1)' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#1A1025] to-[#2A1F3D] rounded-full flex items-center justify-center">
              <span className="font-heading text-3xl text-[#CF9EFF]">
                {person.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mb-2">
          <h3 className="font-heading text-xl text-white mb-2">{person.name}</h3>
          <p className="font-paragraph text-[#CF9EFF]/80 text-sm">{person.role}</p>
        </div>

        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#CF9EFF]/5 via-transparent to-[#A855F7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  )

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
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CF9EFF] to-[#A855F7]">Team</span>
          </h1>
          <p className="font-paragraph text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Meet the core team of CESA.
          </p>
        </motion.div>

        {/* Convener */}
        <div className="mb-14">
          <div className="max-w-xl mx-auto">
            <Card person={convener} />
          </div>
        </div>

        {/* Leadership: Chairperson, Vice Chairperson, General Secretary */}
        <div className="mb-16">
          <div className="text-center mb-6">
            <h2 className="font-heading text-3xl md:text-4xl text-white inline-flex items-center gap-3">
              Leadership
              <span className="inline-block h-px w-16 bg-gradient-to-r from-[#CF9EFF] to-[#A855F7]"></span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {leadership.map((p, i) => (
              <Card key={`${p.name}-${p.role}`} person={p} index={i} />
            ))}
          </div>
        </div>

        {/* Domains */}
        <div className="space-y-14">
          {domains.map((domain, dIndex) => (
            <div key={domain.title}>
              <div className="text-center mb-6">
                <h3 className="font-heading text-2xl md:text-3xl text-white/90 inline-flex items-center gap-3">
                  {domain.title} Team
                  <span className="inline-block h-px w-12 bg-gradient-to-r from-[#CF9EFF] to-[#A855F7]"></span>
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
                {domain.members.map((p, i) => (
                  <Card key={`${p.name}-${p.role}`} person={p} index={i} />
                ))}
                {domain.coMembers.map((p, i) => (
                  <Card key={`${p.name}-${p.role}`} person={p} index={i + domain.members.length} />
                ))}
              </div>
            </div>
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

 export default TeamPage
