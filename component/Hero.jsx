import React from "react"
import ButtonPrimary from "./ButtonPrimary"
import Button from "./ButtonPrimary"

const Hero = () => {
  return (
    <div className="relative h-[100vh] w-full overflow-hidden">
      {/* Desktop Background Video */}
      <video
        className="absolute top-0 left-0 w-full scale-110 h-full object-cover "
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/hero-desktop.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Mobile Background Video */}


      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black/10 px-6 text-center">
        <h1
          className="text-white font-extrabold leading-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          Code. Compete. Conquer. With CESA!
        </h1>

        <p
          className="mt-4 max-w-2xl text-gray-200"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
        >
          A vibrant community for Computer Engineering students to innovate, learn, and grow.
        </p>

        <div className="mt-6 space-x-6">
          <Button text="View Event" variant="primary" route="/join" />
<Button text="Know More" variant="secondary" route="/about" />

        </div>
      </div>

    </div>
  )
}

export default Hero
