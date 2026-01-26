import EventSwiper from '@/component/EventsSlider/EventSwiper'
import Upcoming from '@/component/Upcoming'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="relative min-h-screen bg-[#0A0711] py-10 pt-20">
      <Link 
        href="/"
        className="fixed hidden md:flex top-6 left-6 z-50 rounded-xl bg-[#12091d] border border-[#392e4e] px-4 py-2 text-sm text-white/80 hover:bg-[#1e0f2b] hover:text-white transition  items-center gap-2"
      >
        ← Back to Home
      </Link>
      <Upcoming/>
      <EventSwiper/>
    </div>
  )
}

export default page
