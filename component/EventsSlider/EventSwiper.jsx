"use client";

import React, { useState } from "react";
import Image from "next/image"; // ✅ FIX: import Next.js Image
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination } from "swiper/modules";

const defaultEvents = [
  {
    id: 1,
    title: "HackNight 2.0",
    date: "Fri, 7:00 PM",
    location: "Auditorium",
    image: "/Poster/Hackbuild.jpg",
    description:
      "A 12-hour coding sprint to innovate, collaborate, and build impactful projects. Open for all tech enthusiasts!",
  },
  {
    id: 2,
    title: "AI Bootcamp",
    date: "Oct 12, 10:00 AM",
    location: "Lab 3",
    image: "/Poster/Alumni.jpg",
    description:
      "Hands-on sessions on LLMs and computer vision with mentors from industry and academia.",
  },
  {
    id: 3,
    title: "Web Dev Jam",
    date: "Nov 2, 11:00 AM",
    location: "Innovation Hub",
    image: "/Poster/ByteFortune.jpg",
    description:
      "Build a full-stack project in a day. Teams will pitch and demo in the evening.",
  },
];

export default function EventSwiper({ events = defaultEvents }) {
  const [active, setActive] = useState(null);

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={12}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1.2, spaceBetween: 14 },
          768: { slidesPerView: 2, spaceBetween: 18 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          1280: { slidesPerView: 3, spaceBetween: 30 },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {events.map((ev) => (
          <SwiperSlide key={ev.id}>
            <div
              onClick={() => setActive(ev)}
              className="relative w-full h-[220px] sm:h-[240px] md:h-[900px] cursor-pointer  rounded-2xl group bg-[#0b0613]"
            >
              <Image
                src={ev.image}
                alt={ev.title}
                height={900}
                width={7}
                className="absolute inset-0 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={ev.id === 1}
              />
              {/* subtle vignette without cropping */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div>
                  <div className="text-white font-heading text-lg">{ev.title}</div>
                  <div className="text-white/80 text-xs">{ev.date} · {ev.location}</div>
                </div>
                <div className="text-xs px-2 py-1 rounded-lg border border-white/30 text-white/90 bg-black/30">Details</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal */}
      {active && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setActive(null)}
          />
          <div className="relative z-[61] w-[90%] max-w-2xl rounded-2xl border border-[#A78BFA]/30 bg-[#0C0414] text-white shadow-2xl overflow-hidden">
            <div className="relative w-full max-h-[60vh] flex items-center justify-center bg-[#0b0613]">
              <Image
                src={active.image}
                alt={active.title}
                width={1280}
                height={720}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 px-3 py-1 text-sm"
              >
                Close
              </button>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-heading text-2xl">{active.title}</h3>
              <div className="text-white/80 text-sm">
                {active.date} · {active.location}
              </div>
              <p className="text-white/80 text-sm leading-6">
                {active.description}
              </p>
              <div className="pt-3 flex gap-3">
                <button className="rounded-xl bg-[#1C1528] border border-[#A78BFA]/30 px-4 py-2 text-sm hover:bg[#261a36]">Register</button>
                <button className="rounded-xl bg-transparent border border-[#A78BFA]/40 px-4 py-2 text-sm hover:bg-white/10">Add to Calendar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
