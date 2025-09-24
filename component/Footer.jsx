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

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="text-white/80 font-semibold">Follow us</h4>
            <ul className="space-y-2 text-white/70 font-paragraph">
              <li>
                <a href="https://www.linkedin.com/company/cesa-vit/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@cesavit153" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/cesa.vit?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm font-paragraph">© {new Date().getFullYear()} CESA. All rights reserved.</p>
          <div className="flex items-center gap-4 text-white/70">
            <a href="https://www.linkedin.com/company/cesa-vit/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white">LinkedIn</a>
            <a href="https://www.youtube.com/@cesavit153" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white">YouTube</a>
            <a href="https://www.instagram.com/cesa.vit?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white">Instagram</a>
            <Link 
              href="/developers" 
              className="relative px-3 py-1 rounded-full bg-gradient-to-r from-[#CF9EFF]/10 to-[#A855F7]/10 border border-[#CF9EFF]/30 hover:border-[#CF9EFF] text-[#CF9EFF] hover:text-white transition-all duration-300 font-paragraph text-sm"
              style={{
                boxShadow: '0 0 15px rgba(207, 158, 255, 0.2)',
                textShadow: '0 0 10px rgba(207, 158, 255, 0.3)'
              }}
            >
              Developers
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#CF9EFF]/5 to-[#A855F7]/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
