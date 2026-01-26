import Upcoming from '@/component/Upcoming'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="relative">
      <Link 
        href="/"
        className="fixed top-6 left-6 z-50 rounded-xl bg-[#12091d] border border-[#392e4e] px-4 py-2 text-sm text-white/80 hover:bg-[#1e0f2b] hover:text-white transition flex items-center gap-2"
      >
        ← Back to Home
      </Link>
      <Upcoming/>
    </div>
  )
}

export default page
