import React, { useState } from "react";

const eventsData = [
  {
    id: 1,
    title: "Tech Symposium",
    date: "Oct 10, 2025",
    location: "Main Hall",
    description:
      "A gathering of tech enthusiasts to discuss the latest trends in technology, featuring keynote speakers and interactive sessions.",
  },
  {
    id: 2,
    title: "Robotics Workshop",
    date: "Oct 15, 2025",
    location: "Lab 3",
    description:
      "Hands-on workshop on building and programming robots. Open to all skill levels.",
  },
  {
    id: 3,
    title: "AI Hackathon",
    date: "Oct 20, 2025",
    location: "Innovation Center",
    description:
      "24-hour hackathon focused on artificial intelligence solutions. Prizes for top teams!",
  },
  {
    id: 4,
    title: "Cybersecurity Seminar",
    date: "Oct 25, 2025",
    location: "Auditorium",
    description:
      "Expert talks and workshops on cybersecurity trends, challenges, and best practices.",
  },
  {
    id: 5,
    title: "Tech Expo",
    date: "Oct 30, 2025",
    location: "Exhibition Hall",
    description:
      "Showcasing cutting-edge projects and innovations from students and startups.",
  },
];

const Events = () => {
  const [activeEvent, setActiveEvent] = useState(null);

  return (
    <div className="min-h-screen w-full flex flex-col items-center overflow-y-auto bg-[#12001a] px-4 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white mb-10 text-center">
        Events
      </h1>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {eventsData.map((event) => (
          <div
            key={event.id}
            className="group cursor-pointer bg-[#1A1025] border-2 border-[#A78BFA] rounded-2xl shadow-lg p-5 sm:p-6 transition-transform duration-300 ease-in-out hover:scale-105 hover:border-purple-400 relative"
            onClick={() => setActiveEvent(event)}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-heading text-white mb-2">
              {event.title}
            </h2>
            <p className="text-purple-300 font-semibold mb-2 text-sm sm:text-base">
              {event.date} · {event.location}
            </p>
            <p className="text-white/80 text-sm md:text-base">
              {event.description.slice(0, 70)}...
            </p>
          </div>
        ))}
      </div>

      {/* Modal for event details */}
      {activeEvent && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-gradient-to-br from-[#1a0030] to-[#2d0050] border-2 border-pink-500 rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white bg-purple-700 hover:bg-pink-500 rounded-full px-2 sm:px-3 py-1 font-bold shadow-lg transition-colors"
              onClick={() => setActiveEvent(null)}
            >
              ×
            </button>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading text-white mb-3">
              {activeEvent.title}
            </h2>
            <p className="text-purple-300 font-semibold mb-4 text-sm sm:text-base">
              {activeEvent.date} · {activeEvent.location}
            </p>
            <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
              {activeEvent.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
