'use client'

import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SvgLogo from './SvgLogo'

const WAIT_DURATION_MS = 2000   // Logo display time before expand
const EXPAND_DURATION_S = 1.2   // Circle expansion speed

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [expand, setExpand] = useState(false)

  useEffect(() => {
    // Start expand after logo wait
    const waitTimer = setTimeout(() => setExpand(true), WAIT_DURATION_MS)

    // Hide preloader after expand finishes
    const hideTimer = setTimeout(
      () => setIsVisible(false),
      WAIT_DURATION_MS + EXPAND_DURATION_S * 1000 + 200
    )

    return () => {
      clearTimeout(waitTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0C0414] text-white overflow-hidden"
        >
          {/* Centered Logo */}
          <div className="relative z-20 flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-3xl sm:text-4xl font-bold tracking-wider"
            >
              <SvgLogo />
            </motion.div>
          </div>

          {/* Expanding Circle Reveal */}
          <motion.div
            initial={{ scale: 0 }}
            animate={expand ? { scale: 50 } : { scale: 0 }}
            transition={{ duration: EXPAND_DURATION_S, ease: [0.76, 0, 0.24, 1] }}
            className="absolute w-40 h-40 rounded-full bg-white"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
