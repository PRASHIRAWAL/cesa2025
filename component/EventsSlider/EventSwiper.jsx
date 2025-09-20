"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Pagination, Navigation } from "swiper/modules";

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
    description: `
Round 1: Spin the Wheel
Participants get 15 minutes to solve as many coding problems as possible. Each spin decides the problem to attempt. After solving, they must mark it complete before spinning again.

Round 2: Flip the Cards
Top 40% teams qualify. Each team picks a card revealing their coding challenge. After a set time, they may use points to purchase a Power Card, which could be an advantage (bonus points, extra time, hints) or a disadvantage (restrictions, handicaps) based purely on luck.

Rules & Judging:
- Submit complete, functional code for every problem.
- Problems follow predefined I/O specifications.
- Submissions are evaluated against test cases.
- Only correct, properly submitted solutions count toward scoring.
`
  }


];

export default function EventSwiper({ events = defaultEvents }) {
  const [active, setActive] = useState(null);

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={12}
        navigation={true}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1.2, spaceBetween: 14 },
          768: { slidesPerView: 2, spaceBetween: 18 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          1280: { slidesPerView: 3, spaceBetween: 30 },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {events.map((ev) => (
          <SwiperSlide key={ev.id}>
            <div
              onClick={() => setActive(ev)}
              className="relative border border-[#CF9EFF]/40 overflow-hidden 
                         h-[520px] sm:h-[340px] md:h-[500px] cursor-pointer 
                         rounded-2xl group bg-[#0b0613] 
                         shadow-[0_0_25px_rgba(168,85,247,0.4)] 
                         backdrop-blur-sm transition-all hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]"
            >
              <Image
                src={ev.image}
                alt={ev.title}
                height={900}
                width={900}
                className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                priority={ev.id === 1}
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
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

          {/* Content box */}
          <div className="relative z-[61] w-[95%] md:w-[80%] lg:w-[70%] 
                          rounded-2xl border border-[#A78BFA]/30 
                          bg-[#0C0414] text-white shadow-2xl 
                          overflow-hidden max-h-[90vh]">
            <div className="flex flex-col md:flex-row h-full">
              {/* Poster Left */}
              <div className="relative w-full md:w-1/2 flex items-center justify-center 
                              bg-[#0b0613] p-3 md:p-5 
                              shadow-[inset_0_0_40px_rgba(168,85,247,0.3)] 
                              backdrop-blur-sm">
                <Image
                  src={active.image}
                  alt={active.title}
                  width={1280}
                  height={720}
                  className="w-full h-auto max-h-[60vh] md:max-h-[80vh] object-contain rounded-xl"
                />
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-3 right-3 rounded-full bg-black/60 hover:bg-black/80 
                             border border-white/20 px-3 py-1 text-sm"
                >
                  Close
                </button>
              </div>

              {/* Details Right */}
              <div className="flex-1 p-5 md:p-8 overflow-y-auto">
                <h3 className="font-heading text-2xl md:text-3xl">{active.title}</h3>
                <div className="text-white/80 text-sm md:text-base mt-1">
                  {active.date} · {active.location}
                </div>
                <p className="text-white/80 text-sm md:text-base leading-6 mt-4">
                  {active.description}
                </p>
                <div className="pt-6 flex gap-4">
                  <button className="rounded-xl bg-[#1C1528] border border-[#A78BFA]/30 px-5 py-2 text-sm md:text-base hover:bg-[#261a36]">
                    Register
                  </button>
                  <button className="rounded-xl bg-transparent border border-[#A78BFA]/40 px-5 py-2 text-sm md:text-base hover:bg-white/10">
                    Add to Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
