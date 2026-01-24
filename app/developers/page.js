'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import TiltedMemberCard from '@/components/TiltedMemberCard'
import { developers } from '@/data/developersData'

export default function Developers() {
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
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CF9EFF] to-[#A855F7]">Developers</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mt-4">
            Meet the talented developers behind CESA. Passionate about technology and building amazing experiences.
          </p>
        </motion.div>

        {/* Developer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 justify-items-center">
          {developers.map((member) => (
            <TiltedMemberCard
              key={member.name}
              {...member}
            />
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-20">
          <Link href="/" className="text-[#CF9EFF] hover:text-white">
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  )
}
