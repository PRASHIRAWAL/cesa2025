'use client'

import React, { useRef } from "react"
import Button from "./ButtonPrimary"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

const Hero = () => {
  const containerRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(".hero-heading", {
        opacity: 0,
        y: 60,
        duration: 1,
        delay: 4.4,
        ease: "power3.out",
      })

      // Paragraph animation
      gsap.from(".hero-paragraph", {
        opacity: 0,
        y: -40,
        duration: 1,
        delay: 4.8,
        ease: "power2.out",
      })

      // Buttons animation (staggered)
      gsap.from(".hero-button", {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: 5.2,
        ease: "back.out(1.7)",
        stagger: 0.2,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative h-[90vh] w-full overflow-hidden" ref={containerRef}>
      {/* Desktop Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/hero-desktop.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black/40 px-6 text-center">
        {/* Heading */}
        <h1
          className="hero-heading text-white font-extrabold leading-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          Code. Compete. Conquer. With CESA!
        </h1>

        {/* Paragraph */}
        <p
          className="hero-paragraph mt-4 max-w-2xl text-gray-200"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
        >
          A vibrant community for Computer Engineering students to innovate,
          learn, and grow.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <div className="hero-button">
            <Button text="View Event" variant="primary" route="/join" />
          </div>
          <div className="hero-button">
            <Button text="Know More" variant="secondary" route="/about" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
