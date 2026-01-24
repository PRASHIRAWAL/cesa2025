"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";

const mobileNavLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Events", href: "#events" },
  { name: "Team", href: "/team" },
];

export const Navbar = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);

  const navRef = useRef(null);
  const linksRef = useRef([]);
  const topLine = useRef(null);
  const bottomLine = useRef(null);

  const tl = useRef(null);
  const iconTl = useRef(null);
  /* Drawer animation */
  useEffect(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set(linksRef.current, { autoAlpha: 0, x: -20 });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 0.9,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.12,
          duration: 0.4,
          ease: "power2.out",
        },
        "<"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLine.current, { rotate: 45, y: 4 })
      .to(bottomLine.current, { rotate: -45, y: -4 }, "<");
  }, []);

  /* Auto hide burger */
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const curr = window.scrollY;
      setShowBurger(curr <= last || curr < 20);
      last = curr;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => {
    if (isOpen) {
      tl.current?.reverse();
      iconTl.current?.reverse();
    } else {
      tl.current?.play();
      iconTl.current?.play();
    }
    setIsOpen(!isOpen);
  };

  const navigate = (href) => {
    if (href.startsWith("#")) {
      router.push(`/${href}`);
    } else {
      router.push(href);
    }
    toggle();
  };

  return (
    <>
      {/* FULLSCREEN DRAWER */}
      <nav
        ref={navRef}
        className="md:hidden fixed inset-0 z-40 bg-black text-white px-8 py-28 flex flex-col justify-between"
      >
        <Image
          src="/LogoCesa.png"
          width={80}
          height={80}
          alt="CESA Logo"
          className="absolute top-8 left-8"
        />

        <div className="flex flex-col gap-8 text-4xl font-semibold">
          {mobileNavLinks.map((link, i) => (
            <div
              key={link.name}
              ref={(el) => (linksRef.current[i] = el)}
            >
              <button
                onClick={() => navigate(link.href)}
                className="hover:text-[#CF9EFF] transition cursor-pointer hover:bg-[#CF9EFF]/20 p-2 rounded-xl w-full text-left"
              >
                {link.name}
              </button>
            </div>
          ))}
        </div>

        <p className="text-sm text-white/50">
          Computer Engineering Student Association
        </p>
      </nav>

      {/* FLOATING BURGER */}
      <button
        onClick={toggle}
        className="md:hidden fixed z-50 top-6 right-6 w-14 h-14 rounded-full  flex items-center justify-center"
        style={{
          clipPath: showBurger
            ? "circle(50% at 50% 50%)"
            : "circle(0% at 50% 50%)",
        }}
      >
        <div className="flex flex-col gap-1.5">
          <span ref={topLine} className="w-6 h-0.5 bg-white rounded" />
          <span ref={bottomLine} className="w-6 h-0.5 bg-white rounded" />
        </div>
      </button>
    </>
  );
};
