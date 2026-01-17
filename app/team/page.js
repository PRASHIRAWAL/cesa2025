'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import TiltedMemberCard from '@/components/TiltedMemberCard'
import { convener, leadership, domains } from '@/data/teamData'

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#02020A] py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl text-white font-extrabold">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CF9EFF] to-[#A855F7]">Team</span>
          </h1>
        </motion.div>

        {/* Convener */}
        <div className="flex justify-center mb-20">
          <TiltedMemberCard {...convener} />
        </div>

        {/* Leadership */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          {leadership.map((member) => (
            <TiltedMemberCard
              key={member.name}
              {...member}
            />
          ))}
        </div>

        {/* Domains */}
        {domains.map((domain) => (
          <div key={domain.title} className="mb-24">
            <h2 className="text-center text-3xl text-white mb-10">
              {domain.title} Team
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-12 justify-items-center">
              {domain.members.map((member) => (
                <TiltedMemberCard
                  key={member.name}
                  {...member}
                />
              ))}
              {domain.coMembers && domain.coMembers.map((member) => (
                <TiltedMemberCard
                  key={member.name}
                  {...member}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Back */}
        <div className="text-center mt-20">
          <Link href="/" className="text-[#CF9EFF] hover:text-white">
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  )
}
