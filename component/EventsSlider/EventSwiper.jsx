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
    id: 4,
    title: "",
    date: "Sep 27, 5:00 PM - 7.00 PM",
    location: "Online",
    image: "/Poster/AiIntent.jpg",
    description:
      `Generative AI is revolutionizing how we create, design, and solve problems — driving smarter solutions and opening new career paths. This session will explore the future of AI, real-world applications of LLMs and NLP, and how autonomy and adaptability are reshaping industries.

The talk will be led by Laxmikant Tiwari who is the Co-Founder of MBreath, IIT Kharagpur alumnus, and Senior Manager at Linedata, with 6+ years of expertise in AI and Data Science. Learn from his journey and gain insights into building impactful careers in AI.`,
  },
   {
     id: 3,
     title: "Byte Of Fortune",
     date: "Sep 30, 4:00 PM",
     location: "M312 and M313",
     image: "/Poster/ByteFortune.jpg",
     description:
       `Round 1: Spin the Wheel
 Participants get 15 minutes to solve as many coding problems as possible. Each spin decides the problem to attempt. After solving, they must mark it complete before spinning again.

 Round 2: Flip the Cards
 Top 40% teams qualify. Each team picks a card revealing their coding challenge. After a set time, they may use points to purchase a Power Card, which could be an advantage (bonus points, extra time, hints) or a disadvantage (restrictions, handicaps) based purely on luck.

 Rules & Judging

 Submit complete, functional code for every problem.

 Problems follow predefined I/O specifications.

 Submissions are evaluated against test cases.

 Only correct, properly submitted solutions count toward scoring.`,
   },
  {
    id: 1,
    title: "Hackbuilt",
    date: "",
    location: "Auditorium",
    image: "/Poster/Hackbuild.jpg",
    description:
      "Hackbuild is an exciting hackathon conducted by GDG VIT in collaboration with CESA and CSI-VIT. This event brings together passionate developers, innovators, and problem-solvers to design impactful solutions across domains like App/Web Development, AI/ML, and Blockchain. With multiple competitive rounds, mentorship sessions, and a prize pool of over ₹40,000, Hackbuild provides participants with a real-world platform to showcase creativity, sharpen technical skills, and collaborate on innovative projects.",
  },
  {
    id: 2,
    title: "Alumini Unplugged",
    date: "Aug 16, 11:00 AM - 1.00 PM",
    location: "Online",
    image: "/Poster/Alumni.jpg",
    description:
      `Alumni Unplugged is an exclusive podcast conducted by CESA in collaboration with GDG VIT and CSI-VIT, streamed live on YouTube. The event is designed to bridge the gap between college life and the professional world by featuring inspiring alumni who share their journeys, challenges, and success stories.

It featured Ms. Aditi Ganji, Trainee DevOps Engineer at Seclore, who walked participants through her transition from campus to corporate life. The session covered practical advice on developing future-ready skills, building a strong professional profile, and cracking interviews to land dream jobs. Attendees also received actionable guidance on planning their career paths and staying ahead in a competitive tech landscape.

Couldn’t make it to the live session? Don’t worry — you can still catch all the valuable insights on our YouTube page or watch it directly here: https://www.youtube.com/live/p8m9Tm0ckaM?si=1jccGVQAiIJCzy1X`,
  },
];

export default function EventSwiper({ events = defaultEvents }) {
  const [active, setActive] = useState(null);

  function renderDescription(description) {
    if (!description) return null;
    const lines = description.split('\n');
    const elements = [];
    let currentList = [];

    function flushList() {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc ml-5 mb-2">
            {currentList.map((item, idx) => (
              <li key={idx}>{item.replace(/^-/,'').trim()}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
    }

    lines.forEach((rawLine) => {
      const line = rawLine.trim();
      if (line === '') {
        flushList();
        return;
      }
      if (line.startsWith('-')) {
        currentList.push(line);
        return;
      }
      flushList();
      if (line.includes('Round') || line.toLowerCase().includes('rules') || line.endsWith(':')) {
        elements.push(
          <h4 key={`h-${elements.length}`} className="font-heading text-[#CF9EFF] text-base md:text-lg mt-4 mb-2">
            {line.replace(/:$/, '')}
          </h4>
        );
        return;
      }
      elements.push(
        <p key={`p-${elements.length}`} className="mb-2">
          {line}
        </p>
      );
    });

    flushList();
    return elements;
  }

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
              className="relative border-2 border-[#CF9EFF] overflow-hidden 
                         h-[520px] sm:h-[340px] md:h-[500px] cursor-pointer 
                         rounded-3xl group bg-[#0b0613] 
                         transition-all duration-300"
              style={{
                boxShadow: '0 0 20px rgba(207, 158, 255, 0.15), 0 0 40px rgba(207, 158, 255, 0.1)',
                filter: 'drop-shadow(0 0 10px rgba(207, 158, 255, 0.2))'
              }}
            >
              <Image
                src={ev.image}
                alt={ev.title}
                height={900}
                width={700}
                className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                priority={ev.id === 1}
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {active && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setActive(null)}
          />

          {/* Content box */}
          <div className="relative z-[61] w-[95%] md:w-[80%] lg:w-[70%] 
                          rounded-3xl border-2 border-[#CF9EFF] 
                          bg-[#0C0414] text-white 
                          overflow-y-auto max-h-[90vh]"
               style={{
                 boxShadow: '0 0 25px rgba(207, 158, 255, 0.2), 0 0 50px rgba(207, 158, 255, 0.1)',
                 filter: 'drop-shadow(0 0 15px rgba(207, 158, 255, 0.25))',
                 WebkitOverflowScrolling: 'touch'
               }}>
            <div className="flex flex-col md:flex-row h-full">
              {/* Poster Left */}
              <div className="relative w-full md:w-1/2 flex items-center justify-center 
                              bg-[#0b0613] p-3 md:p-5 
                              shadow-[inset_0_0_40px_rgba(207,158,255,0.2)]">
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
                <div className="text-white/80 text-sm md:text-base leading-6 mt-4">
                  {renderDescription(active.description)}
                </div>
                <div className="pt-6 flex gap-4">
                  {(active?.title?.toLowerCase().includes('ai') || active?.image?.toLowerCase().includes('aiintent')) && (
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSdjXxFknibTxHg2nNzpsZStyssXO9YlLYZ7t33Z3PYlzPh9zg/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-[#1C1528] border border-[#CF9EFF]/30 px-5 py-2 text-sm md:text-base hover:bg-[#261a36] hover:border-[#CF9EFF]/60 hover:text-[#CF9EFF] transition-all duration-300"
                    >
                      Register
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
