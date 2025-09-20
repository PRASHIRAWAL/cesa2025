'use client'
import AboutUs from "@/component/AboutUs";
import Events from "@/component/Events";
import Hero from "@/component/Hero";
import LanyardHeads from "@/component/LanyardHeads";
import SvgLogo from "@/component/SvgLogo";
import Upcoming from "@/component/Upcoming";
import Image from "next/image";
import Preloader from "@/component/Preloader";
import EventsScrolling from "@/component/Events/EventsScrolling";
import Lenis from "lenis";

export default function Home() {
  const lenis = new Lenis({
  autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
  console.log(e);
});
  return (
    <>
      <section className="bg-[#02020A]">
        <Hero />
      </section>
      <section className="bg-[#02020A]">
        <AboutUs/>
      </section>
     
       <section className="bg-[#0C0414]">
        <EventsScrolling/>
      </section>
      <section className="bg-[#0C0414]">
        <Upcoming/>
      </section>
      
  
    </>
  );
}
