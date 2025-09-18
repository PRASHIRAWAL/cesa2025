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

export default function Home() {
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
