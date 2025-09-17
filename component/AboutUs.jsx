import MagicBento from '@/components/MagicBento'
import React from 'react'
import { easeIn, motion } from "framer-motion"

const AboutUs = () => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 5.3,
        duration: 1,             // 👈 smooth duration
        ease: [0.25, 1, 0.5, 1], // 👈 smooth cubic-bezier (easeOutExpo style)
      }}

      className=" flex justify-center relative py-16 bg-black px-4">
     {/* <div className="absolute left-0 top-[0%]  flex items-center justify-center pointer-events-none">
          <div className="rounded-full h-[100vw] w-[100vw] max-h-[600px] max-w-[600px] bg-[radial-gradient(circle,rgba(168,85,247,0.35)_0%,transparent_70%)] blur-3xl" />
        </div>
        <div className="absolute  right-0 top-[0%] flex items-center justify-center pointer-events-none">
          <div className="rounded-full h-[100vw] w-[100vw]  max-h-[600px] max-w-[600px] bg-[radial-gradient(circle,rgba(168,85,247,0.35)_0%,transparent_70%)] blur-3xl" />
        </div> */}
      <div className="relative w-full md:w-[75vw]">
        {/* Background Glow */}
        {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="rounded-full h-[100vw] w-[100vw] max-h-[1200px] max-w-[1200px] bg-[radial-gradient(circle,rgba(168,85,247,0.35)_0%,transparent_70%)] blur-3xl" />
        </div> */}
        

        {/* Foreground Card */}
        <div className="relative  -top-16 z-10  bg-[#1A1025] border-2 border-[#CF9EFF]   rounded-3xl"
        style={{ boxShadow: '0 0 50px 25px rgba(168,85,247,0.35)' }}>
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default AboutUs
