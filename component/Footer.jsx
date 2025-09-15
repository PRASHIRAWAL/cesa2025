import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-[#0A0711] border-t border-[#A78BFA]/20">
      {/* Big background text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="font-heading text-[18rem] md:text-[24rem] leading-none tracking-tight text-white/5 select-none">
          CESA
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="font-heading text-white text-3xl">CESA</h3>
            <p className="font-paragraph text-white/70 max-w-sm">
              Computer Engineering Students' Association. Building, learning, and
              growing together.
            </p>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white/80 font-semibold mb-3">Explore</h4>
              <ul className="space-y-2 text-white/70 font-paragraph">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/events" className="hover:text-white">Events</Link></li>
                <li><Link href="/team" className="hover:text-white">Team</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white/80 font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-white/70 font-paragraph">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
                <li><a href="#" className="hover:text-white">Code of Conduct</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter / CTA */}
          <div className="space-y-3">
            <h4 className="text-white/80 font-semibold">Stay in the loop</h4>
            <p className="font-paragraph text-white/70">
              Get updates about upcoming events and announcements.
            </p>
            <form className="flex items-stretch gap-2 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-2xl bg-[#1C1528] text-white placeholder-white/40 border border-[#A78BFA]/30 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="rounded-2xl px-5 bg-gradient-to-r from-[#1C1528] to-[#2A1F3D] text-white border border-[#A78BFA]/30 hover:from-[#2A1F3D] hover:to-[#3B1E65] focus:ring-2 focus:ring-purple-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm font-paragraph">© {new Date().getFullYear()} CESA. All rights reserved.</p>
          <div className="flex items-center gap-4 text-white/70">
            <a href="#" aria-label="Twitter" className="hover:text-white">Twitter</a>
            <a href="#" aria-label="Instagram" className="hover:text-white">Instagram</a>
            <a href="#" aria-label="GitHub" className="hover:text-white">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
