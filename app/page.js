'use client'
import AboutUs from "@/component/AboutUs";
import Events from "@/component/Events";
import Hero from "@/component/Hero";
import LanyardHeads from "@/component/LanyardHeads";
import Upcoming from "@/component/Upcoming";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="bg-[#0C0414]">
        <Hero />
      </section>
      <section className="bg-[#0C0414]">
        <AboutUs/>
      </section>
      <section className="bg-[#0C0414]">
        <Events/>
      </section>
      <section className="bg-[#0C0414]">
        <Upcoming/>
      </section>
    </>
  );
}
