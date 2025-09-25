import React, { useState } from "react";
import EventSwiper from "@/component/EventsSlider/EventSwiper";
import Image from "next/image";
import {motion} from 'framer-motion'
import Upcoming from "./Upcoming";



const Events = () => {

  return (
    <div id="events" className="min-h-screen w-full relative flex flex-col items-center  md:px-4 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white mb-10 text-center">
        Events
      </h1>
 
      <EventSwiper/>
      
        <motion.div
      // Default animation state
      animate={{ rotate: 360 }}
      // Animation state while hovering
      whileHover={{
        transition: {
          duration: 0.5, // Faster speed on hover
          repeat: Infinity,
          ease: "linear",
        },
      }}
      
      transition={{
        duration: 5, // Slower default speed
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute bottom-0 right-0 hidden md:block cursor-pointer"
    >
      <Image
        src={'/CircularDisc.png'}
        width={200}
        height={200}
        alt="Spinning Neon Disc" // Added alt text for accessibility
      />
    </motion.div>
 
    </div>
  );
};

export default Events;
