import React, { useState } from "react";
import EventSwiper from "./EventsSlider/EventSwiper";
import Image from "next/image";

const eventsData = [
  {
    id: 1,
    title: 'Tech Symposium',
    date: 'Oct 10, 2025',
    location: 'Main Hall',
    description: 'A gathering of tech enthusiasts to discuss the latest trends in technology, featuring keynote speakers and interactive sessions.'
  },
  {
    id: 2,
    title: 'Robotics Workshop',
    date: 'Oct 15, 2025',
    location: 'Lab 3',
    description: 'Hands-on workshop on building and programming robots. Open to all skill levels.'
  },
  {
    id: 3,
    title: 'AI Hackathon',
    date: 'Oct 20, 2025',
    location: 'Innovation Center',
    description: '24-hour hackathon focused on artificial intelligence solutions. Prizes for top teams!'
  },
];

const Events = () => {
  const [activeEvent, setActiveEvent] = useState(null);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#12001a] px-4">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Event Cards */}
        
        
        <div className="flex justify-center items-end h-full ">
          <div className="grid grid-cols-2 gap-4">
            {/* Left big image */}
            <div className=" justify-center items-center flex shadow-2xl shadow-purple-950">
              <img
                src="/e1.jpg"
                alt="Event 1"
                className="w-full h-[80%]  object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Right two stacked images */}
            <div className="grid grid-rows-2 gap-4">
              <img
                src="/e2.jpg"
                alt="Event 2"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
              <img
                src="/e3.jpg"
                alt="Event 3"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Right: Empty or future content */}
        <div className="flex flex-col gap-8">
          <h1 className="text-5xl font-heading text-white mb-4">Events</h1>
          {eventsData.map(event => (
            <div
              key={event.id}
              className="group cursor-pointer bg-[#1A1025] border-2 border-[#A78BFA] rounded-2xl shadow-lg p-6 transition-transform hover:scale-105 hover:border-purple-300 relative"
              onClick={() => setActiveEvent(event)}
            >

              <div className="relative z-10">
                <div className="text-2xl font-heading text-white mb-2">{event.title}</div>
                <div className="text-purple-300 font-semibold mb-1">{event.date} · {event.location}</div>
                <div className="text-white/80 font-paragraph text-sm">{event.description.slice(0, 60)}...</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for event details */}
      {activeEvent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-[#1a0030] to-[#2d0050] border-2 border-pink-500 rounded-3xl shadow-lg p-8 max-w-md w-full relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-white bg-purple-700 hover:bg-pink-500 rounded-full px-3 py-1 font-bold shadow"
              onClick={() => setActiveEvent(null)}
            >
              ×
            </button>
            <div className="text-3xl font-heading text-white mb-2">{activeEvent.title}</div>
            <div className="text-purple-300 font-semibold mb-2">{activeEvent.date} · {activeEvent.location}</div>
            <div className="text-white/90 font-paragraph text-base mb-4">{activeEvent.description}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
