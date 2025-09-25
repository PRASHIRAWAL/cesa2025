'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router=useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-md ' : 'bg-transparent'
    }`}>
      <div className="md:max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/LogoCesa.png" 
                width={140} 
                height={140} 
                alt="cesa-logo" 
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex text-white space-x-8 items-center">
            <button onClick={() => router.push('/#home')} className="navlink text-2xl text-white/80 hover:text-[#CF9EFF] transition-all duration-300 cursor-pointer relative group">
              Home
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#CF9EFF] to-[#A855F7] group-hover:w-full transition-all duration-300"></div>
            </button>
            <button onClick={() => router.push('/#about')} className="navlink text-2xl text-white/80 hover:text-[#CF9EFF] transition-all duration-300 cursor-pointer relative group">
              About Us
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#CF9EFF] to-[#A855F7] group-hover:w-full transition-all duration-300"></div>
            </button>
            <button onClick={() => router.push('/#events')} className="navlink text-2xl text-white/80 hover:text-[#CF9EFF] transition-all duration-300 cursor-pointer relative group">
              Events
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#CF9EFF] to-[#A855F7] group-hover:w-full transition-all duration-300"></div>
            </button>
            <Link href="/team" className="navlink text-2xl text-white/80 hover:text-[#CF9EFF] transition-all duration-300 cursor-pointer relative group">
              Team
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#CF9EFF] to-[#A855F7] group-hover:w-full transition-all duration-300"></div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white  focus:outline-none "
              aria-label="Toggle menu"
            >
              <svg className="h-9 w-9" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border border-white/10 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
            <button onClick={() => {router.push('/#home'); setOpen(false);}} className="navlink block px-3 py-2 rounded-md text-3xl font-medium text-white hover:bg-[#CF9EFF]/20 hover:text-[#CF9EFF] cursor-pointer transition-all duration-300 text-left">Home</button>
            <button onClick={() => {router.push('/#about'); setOpen(false);}} className="navlink block px-3 py-2 rounded-md text-3xl font-medium text-white hover:bg-[#CF9EFF]/20 hover:text-[#CF9EFF] cursor-pointer transition-all duration-300 text-left">About Us</button>
            <button onClick={() => {router.push('/#events'); setOpen(false);}} className="navlink block px-3 py-2 rounded-md text-3xl font-medium text-white hover:bg-[#CF9EFF]/20 hover:text-[#CF9EFF] cursor-pointer transition-all duration-300 text-left">Events</button>
            <Link href="/team" className="navlink block px-3 py-2 rounded-md text-3xl font-medium text-white hover:bg-[#CF9EFF]/20 hover:text-[#CF9EFF] cursor-pointer transition-all duration-300" onClick={() => setOpen(false)}>Team</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
