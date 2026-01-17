'use client'
import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
}

export default function TiltedPublicityCard() {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(0, springValues)
  const rotateY = useSpring(0, springValues)
  const scale = useSpring(1, springValues)

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()

    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2

    rotateX.set((offsetY / (rect.height / 2)) * -14)
    rotateY.set((offsetX / (rect.width / 2)) * 14)
  }

  function handleMouseEnter() {
    scale.set(1.08)
  }

  function handleMouseLeave() {
    scale.set(1)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <section
      id="events"
      className="bg-[#0C0414] min-h-screen flex items-center justify-center"
    >
      <figure
        ref={ref}
        className="[perspective:900px]"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
<motion.div
  className="relative w-[280px] h-[400px] rounded-3xl overflow-hidden
  bg-[linear-gradient(135deg,#0C0414_0%,#1A1025_100%)]
  [transform-style:preserve-3d]"
  style={{
    rotateX,
    rotateY,
    scale,
    boxShadow: `
      0 0 25px rgba(207, 158, 255, 0.15),
      0 0 60px rgba(207, 158, 255, 0.08)
    `
  }}
>
          {/* Repeated Background Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-[3.5rem] font-extrabold text-white/10 leading-none tracking-wide text-center">
              Publicity<br />Publicity<br />Publicity
            </div>
          </div>

          {/* Image */}
          <div className="absolute inset-0 flex items-end justify-center">
            <img
              src="/tanisha.png"
              alt="Tanisha"
              className="h-[90%] object-contain z-10"
            />
          </div>

          {/* Bottom Content */}
          <div
            className="absolute bottom-0 w-full px-6 pb-6 z-20
            bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          >
            <h2 className="text-white text-3xl font-extrabold leading-tight">
              Tanisha
            </h2>

            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              <p className="text-white/80 text-sm font-medium">
                Publicity Head
              </p>
            </div>
          </div>
        </motion.div>
      </figure>
    </section>
  )
}
