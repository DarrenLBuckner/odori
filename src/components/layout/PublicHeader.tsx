'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { APP_URL } from '@/lib/supabase'

export default function PublicHeader() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span
              className="text-2xl text-white"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Odori<span className="text-[#c9a227]">.</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/jobs"
              className={`transition-colors ${
                pathname === '/jobs' || pathname?.startsWith('/jobs/')
                  ? 'text-[#c9a227] border-b-2 border-[#c9a227] pb-1'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Find Jobs
            </Link>
            <Link
              href="/talent"
              className={`transition-colors ${
                pathname === '/talent' || pathname?.startsWith('/talent/')
                  ? 'text-[#c9a227] border-b-2 border-[#c9a227] pb-1'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Browse Talent
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <a
              href={`${APP_URL}/login`}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Log In
            </a>
            <a
              href={`${APP_URL}/signup`}
              className="px-4 py-2 bg-[#c9a227] text-black font-medium hover:bg-[#e8d5a3] transition-colors"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
