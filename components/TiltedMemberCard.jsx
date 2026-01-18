'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useSpring } from 'motion/react'
import Image from 'next/image'
import { FiGithub } from 'react-icons/fi'
import { FaLinkedinIn } from 'react-icons/fa'
import { PiHandTap } from "react-icons/pi";

const springValues = {
  damping: 30,
  stiffness: 120,
  mass: 1.8,
}

export default function TiltedMemberCard({ name, role, image, links }) {
  const ref = useRef(null)

  const [isHovered, setIsHovered] = useState(false)
  const [showTapHint, setShowTapHint] = useState(false)
  const [canHover, setCanHover] = useState(true)

  const rotateX = useSpring(0, springValues)
  const rotateY = useSpring(0, springValues)
  const scale = useSpring(1, springValues)

  /* ---------------- DEVICE DETECTION ---------------- */
  useEffect(() => {
    const hoverCapable = window.matchMedia('(hover: hover)').matches
    setCanHover(hoverCapable)

    if (!hoverCapable) {
      const tappedBefore =
        localStorage.getItem('member-card-tapped') === 'true'

      if (!tappedBefore) {
        setShowTapHint(true)

        const timer = setTimeout(() => {
          setShowTapHint(false)
        }, 10000)

        return () => clearTimeout(timer)
      }
    }
  }, [])

  /* ---------------- DESKTOP TILT ---------------- */
  function handleMouseMove(e) {
    if (!ref.current || !canHover) return

    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    rotateX.set((y / (rect.height / 2)) * -12)
    rotateY.set((x / (rect.width / 2)) * 12)
  }

  function handleMouseEnter() {
    if (!canHover) return
    setIsHovered(true)
    scale.set(1.06)
  }

  function handleMouseLeave() {
    if (!canHover) return
    setIsHovered(false)
    scale.set(1)
    rotateX.set(0)
    rotateY.set(0)
  }

  /* ---------------- MOBILE TAP ---------------- */
  function handleTap() {
    if (canHover) return

    // Permanently disable tap hint
    if (showTapHint) {
      localStorage.setItem('member-card-tapped', 'true')
      setShowTapHint(false)
    }

    setIsHovered(prev => !prev)
    scale.set(isHovered ? 1 : 1.05)
  }

  return (
    <figure
      ref={ref}
      className="[perspective:900px] relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
    >
      {/* 📱 TAP HINT — ONE TIME ONLY */}
      {!canHover && showTapHint && (
        <motion.div
          className="absolute top-4 right-4 z-50 text-xs text-white/70 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1, 0] }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        >
          <PiHandTap size={15} className='text-white/70'/> Tap
        </motion.div>
      )}

      <motion.div
        className="relative w-[280px] h-[400px] rounded-3xl overflow-hidden
        bg-[linear-gradient(135deg,#0C0414_0%,#1A1025_100%)]
        [transform-style:preserve-3d]"
        style={{ rotateX, rotateY, scale }}
      >
        {/* ✨ BORDER GLOW */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
          style={{
            boxShadow: isHovered
              ? `
                inset 0 0 0 1px rgba(190,140,255,0.65),
                0 0 25px rgba(190,140,255,0.45),
                0 0 70px rgba(190,140,255,0.30)
              `
              : `
                inset 0 0 0 1px rgba(190,140,255,0.35),
                0 0 15px rgba(190,140,255,0.20)
              `,
          }}
        />

        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center text-[3.4rem] font-extrabold text-white/10 gap-1">
            <span>{role?.split(' ')[0]}</span>
            <span>{role?.split(' ')[0]}</span>
            <span>{role?.split(' ')[0]}</span>
          </div>
        </div>

        {/* Images */}
        <div className="absolute inset-0 flex items-end justify-center z-10">
          {image?.default && (
            <motion.div
              className="absolute bottom-0"
              animate={{
                opacity: isHovered ? 0 : 1,
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={image.default}
                alt={name}
                width={280}
                height={360}
                className="h-[90%] w-auto object-contain"
                priority
              />
            </motion.div>
          )}

          {image?.hover && (
            <motion.div
              className="absolute bottom-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.95,
              }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={image.hover}
                alt={name}
                width={280}
                height={360}
                className="h-[90%] w-auto object-contain"
              />
            </motion.div>
          )}
        </div>

        {/* Text */}
        <div className="absolute bottom-0 w-full px-6 pb-6 z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
          <h2 className="text-white text-3xl font-extrabold">{name}</h2>
          <p className="text-white/80 text-sm font-medium">{role}</p>
        </div>

        {/* Socials */}
        <div
          className="absolute bottom-2 right-2 z-30 flex"
          onClick={e => e.stopPropagation()}
        >
          <a href={links?.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="text-white/70 hover:text-white m-2" size={15} />
          </a>
          <a href={links?.github} target="_blank" rel="noopener noreferrer">
            <FiGithub className="text-white/70 hover:text-white m-2" size={15} />
          </a>
        </div>
      </motion.div>
    </figure>
  )
}
