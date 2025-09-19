'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full  fixed top-0 left-0 z-50 ">
      <div className="max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="hidden md:flex text-white space-x-8">
            <Link href="/" className="navlink text-2xl hover:text-purple-700 transition-colors">Home</Link>
            <Link href="/about" className="navlink text-2xl hover:text-purple-700 transition-colors">About Us</Link>
            <Link href="/team" className="navlink text-2xl hover:text-purple-700 transition-colors">Team</Link>
            <Link href="/events" className="navlink text-2xl hover:text-purple-700 transition-colors">Events</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-purple-700 focus:outline-none focus:bg-purple-700"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
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
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
            <Link href="/" className="navlink block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-100">Home</Link>
            <Link href="/about" className="navlink block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-100">About Us</Link>
            <Link href="/team" className="navlink block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-100">Team</Link>
            <Link href="/events" className="navlink block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-100">Events</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
