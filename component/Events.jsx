import React from "react";
import EventSwiper from "./EventsSlider/EventSwiper";
import Image from "next/image";
import Button from "./ButtonPrimary";

const Events = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0   flex justify-center items-center">
        <Image
          src="/EventsBack.png"
          alt="Events Background"
          height={1200}
          width={1200}
          priority
          className="object-contain"
        />
      </div>

      {/* Overlay (optional for readability) */}
      {/* <div className="absolute inset-0 bg-black/50 -z-10" /> */}

      {/* Content */}
      <h1 className="text-white text-center text-5xl font-bold font-heading py-10">
        Events
      </h1>
      <div className=" flex-col space-y-5 flex justify-center items-center">
        <EventSwiper />
        <Button text={'View More ->'} variant="secondary" />
      </div>
    </div>
  );
};

export default Events;
