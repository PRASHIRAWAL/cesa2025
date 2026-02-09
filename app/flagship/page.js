"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import Button from "@/component/ButtonPrimary";
import Footer from "@/component/Footer";
import flagshipEvents from "@/data/flagshipEvents";
import { leadership, domains } from "@/data/teamData";

const events = flagshipEvents;

const glassCard =
  "bg-[#0B0A18]/70 border border-[#60A5FA]/20 rounded-3xl backdrop-blur-xl";

const softGlow = {
  boxShadow:
    "0 0 20px rgba(96,165,250,0.15), 0 0 60px rgba(96,165,250,0.08)",
};

const FlagshipPage = () => {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen bg-[#02020A] text-white overflow-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 ">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/videos/flagshipBackground.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#02020A]/40 via-[#02020A]/85 to-[#02020A]" />
      </div>

      {/* Hero */}
      <section className="relative">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[85vh] flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-3xl text-center flex flex-col items-center"
    >
      <p className="text-xs tracking-[0.4em] uppercase text-white/60">
        CESA presents
      </p>

      <h1 className="mt-4 font-heading text-4xl sm:text-6xl lg:text-7xl leading-tight">
        PLETHORA 2026
      </h1>

      <p className="mt-4 text-lg text-white/75 font-paragraph">
        CESA Flagship Technical Event
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 max-w-md ">
        <div className={`${glassCard} px-4 py-3`} style={softGlow}>
          <div className="flex items-center justify-center gap-3 text-white/70">
            <Calendar size={28} className="text-[#93C5FD]" />
            <span>10–14 February 2026</span>
          </div>
        </div>

        <div className={`${glassCard} px-4 py-3`} style={softGlow}>
          <div className="flex items-center justify-center gap-3 text-white/70">
            <Clock size={28} className="text-[#93C5FD]" />
            <span>4:00 PM onwards</span>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button
          text="Download Brochure"
          route="/brochure/plethora-2026-brochure.pdf"
          variant="primaryBlue"
        />
        <Button
          text="Explore Events"
          variant="secondaryBlue"
          onClick={() => handleScrollTo("events-showcase")}
        />
      </div>
    </motion.div>
  </div>
</section>


      {/* Events Showcase */}
      <section id="events-showcase" className="py-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-heading text-3xl sm:text-5xl">
              Events Showcase
            </h2>
            <p className="max-w-xl text-white/60 font-paragraph">
              Four signature experiences curated for judges, faculty, sponsors,
              and aspiring technologists.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className={`${glassCard} overflow-hidden flex flex-col`}
                style={softGlow}
              >
                <div className="relative h-44">
                  <Image
                    src={event.poster}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02020A]/90 to-transparent" />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-heading text-lg">{event.name}</h3>
                  <p className="mt-2 text-sm text-white/70">
                    {event.tagline}
                  </p>
                  <p className="mt-3 text-xs text-white/50">{event.date}</p>

                  <div className="mt-auto pt-5">
                    <Button
                      text="View Details"
                      variant="secondaryBlue"
                      onClick={() => handleScrollTo(event.id)}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Events */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
          {events.map((event) => (
            <div
              key={event.id}
              id={event.id}
              className={`${glassCard} p-8 sm:p-10`}
              style={softGlow}
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl">
                    {event.name}
                  </h3>
                  <p className="mt-3 text-white/70 font-paragraph">
                    {event.overview}
                  </p>
                  <div className="mt-6">
                    <Button
                      text="Register"
                      variant="secondaryBlue"
                      route={event.registerUrl}
                      target="_blank"
                    />
                  </div>
                </div>

                <div className="mx-auto">
                  <div className="relative w-[260px] sm:w-[320px] aspect-[569/800]">
                    <Image
                      src={event.poster}
                      alt={event.name}
                      fill
                      className="object-cover rounded-3xl border border-[#60A5FA]/20"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brochure */}
      {/* <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div
            className={`${glassCard} p-10 text-center`}
            style={softGlow}
          >
            <h2 className="font-heading text-3xl sm:text-4xl">
              Download the PLETHORA 2026 Brochure
            </h2>
            <p className="mt-4 text-white/65 font-paragraph">
              Complete rules, schedules, prizes, and learning outcomes in one
              official document.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                text="Download Plethora 2026 Brochure"
                route="/brochure/plethora-2026-brochure.pdf"
                variant="primaryBlue"
              />
            </div>
          </div>
        </div>
      </section> */}

          {/* TEAM SECTION ADDED */}
         {/* TEAM SECTION */}
{/* <section className="relative py-24 overflow-hidden">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="font-heading text-3xl sm:text-5xl">
        The <span className="text-[#60A5FA]">Team Behind</span> PLETHORA
      </h2>
      <p className="mt-4 text-white/60 font-paragraph max-w-2xl mx-auto">
        The minds, builders, and coordinators powering CESA’s flagship
        technical experience.
      </p>
    </motion.div>

  <div className="relative w-full overflow-hidden">

      <div className="flex w-max team-marquee">


        {[...leadership, ...domains.flatMap((domain) => domain.members)].map(
          (member, index) => (
            <div
              key={`team-${index}`}
              className="min-w-[220px] mx-5 rounded-3xl
                         bg-[#0B0A18]/70
                         border border-[#60A5FA]/25
                         backdrop-blur-xl
                         px-6 py-6
                         text-center"
              style={{
                boxShadow:
                  "0 0 20px rgba(96,165,250,0.15), 0 0 60px rgba(96,165,250,0.08)",
              }}
            >
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 mb-4">
                  <Image
                    src={member.image?.default || member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full border border-[#60A5FA]/40"
                  />
                </div>

                <h3 className="text-white font-semibold">
                  {member.name}
                </h3>
                <p className="text-[#93C5FD] text-sm mt-1">
                  {member.role}
                </p>
              </div>
            </div>
          )
        )}

      
        {[...leadership, ...domains.flatMap((domain) => domain.members)].map(
          (member, index) => (
            <div
              key={`team-dup-${index}`}
              className="min-w-[220px] mx-5 rounded-3xl
                         bg-[#0B0A18]/70
                         border border-[#60A5FA]/25
                         backdrop-blur-xl
                         px-6 py-6
                         text-center"
              style={{
                boxShadow:
                  "0 0 20px rgba(96,165,250,0.15), 0 0 60px rgba(96,165,250,0.08)",
              }}
            >
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 mb-4">
                  <Image
                    src={member.image?.default || member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full border border-[#60A5FA]/40"
                  />
                </div>

                <h3 className="text-white font-semibold">
                  {member.name}
                </h3>
                <p className="text-[#93C5FD] text-sm mt-1">
                  {member.role}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  </div>
</section> */}

    
    </div>
  );
};

export default FlagshipPage;
