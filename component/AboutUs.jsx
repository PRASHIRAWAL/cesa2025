import MagicBento from '@/components/MagicBento'
import React from 'react'

const AboutUs = () => {
  return (
    <div className="bg-[#0C0414] flex justify-center py-16 px-4">
      <div className="relative w-full md:w-[95vw]">
        {/* Background Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="rounded-full h-[100vw] w-[100vw] max-h-[1200px] max-w-[1200px] bg-[radial-gradient(circle,rgba(168,85,247,0.35)_0%,transparent_70%)] blur-3xl" />
        </div>

        {/* Foreground Card */}
        <div className="relative -top-17 z-10 w-full border-2 border-[#CF9EFF]  bg-[#060010]  rounded-3xl">
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
    </div>
  )
}

export default AboutUs
