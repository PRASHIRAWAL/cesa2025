'use client'

import { useEffect } from 'react';
import AboutUs from "@/component/AboutUs";
import EventsScrolling from "@/component/Events/EventsScrolling";
import Hero from "@/component/Hero";
import Upcoming from "@/component/Upcoming";
import Lenis from 'lenis';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    const onScroll = (e) => {
      console.log(e);
    };

    lenis.on('scroll', onScroll);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.off('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <section id="home" className="bg-[#02020A]">
        <Hero />
      </section>
      <section id="about" className="bg-[#02020A]">
        <AboutUs />
      </section>
      <section className="bg-[#0C0414]">
        <EventsScrolling />
      </section>
      <section id="events" className="bg-[#0C0414]">
        <Upcoming />
      </section>
    </>
  );
}
