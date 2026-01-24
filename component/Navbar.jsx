"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Events", href: "#events" },
  { name: "Team", href: "/team" },
];

export default function Navbar() {
  const router = useRouter();

  /* ---------------- MOBILE STATE ---------------- */
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);

  const navRef = useRef(null);
  const linksRef = useRef([]);
  const topLine = useRef(null);
  const bottomLine = useRef(null);

  const drawerTl = useRef(null);
  const iconTl = useRef(null);

  /* ---------------- DESKTOP STATE ---------------- */
  const [isScrolled, setIsScrolled] = useState(false);

  /* ---------------- MOBILE GSAP ---------------- */
  useEffect(() => {
    if (!navRef.current) return;

    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set(linksRef.current, { autoAlpha: 0, x: -20 });

    drawerTl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.12,
          duration: 0.35,
          ease: "power2.out",
        },
        "<"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLine.current, { rotate: 45, y: 4 })
      .to(bottomLine.current, { rotate: -45, y: -4 }, "<");
  }, []);

  /* ---------------- BURGER AUTO HIDE ---------------- */
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const curr = window.scrollY;
      setShowBurger(curr <= last || curr < 20);
      last = curr;
      setIsScrolled(curr > 100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- ACTIONS ---------------- */
  const toggleMobile = () => {
    if (isOpen) {
      drawerTl.current?.reverse();
      iconTl.current?.reverse();
    } else {
      drawerTl.current?.play();
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
    if (isOpen) toggleMobile();
  };

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <nav
        className={`hidden md:block fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-[85vw] mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/LogoCesa.png"
                width={140}
                height={140}
                alt="CESA Logo"
                priority
              />
            </Link>

            {/* Links */}
            <div className="flex gap-10 text-white items-center">
              {navLinks.map((link) =>
                link.href.startsWith("#") ? (
                  <button
                    key={link.name}
                    onClick={() => router.push(`/${link.href}`)}
                    className="text-2xl text-white/80 hover:text-[#CF9EFF] transition relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#CF9EFF] to-[#A855F7] group-hover:w-full transition-all duration-300" />
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-2xl text-white/80 hover:text-[#CF9EFF] transition relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#CF9EFF] to-[#A855F7] group-hover:w-full transition-all duration-300" />
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE DRAWER ================= */}
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
          {navLinks.map((link, i) => (
            <div key={link.name} ref={(el) => (linksRef.current[i] = el)}>
              <button
                onClick={() => navigate(link.href)}
                className="hover:text-[#CF9EFF] hover:bg-[#CF9EFF]/20 p-2 rounded-xl w-full text-left transition"
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

      {/* ================= BURGER BUTTON ================= */}
      <button
        onClick={toggleMobile}
        className="md:hidden fixed z-50 top-6 right-6 w-14 h-14 rounded-full flex items-center justify-center"
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
}
