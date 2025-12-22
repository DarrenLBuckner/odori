import Link from 'next/link'
import Image from 'next/image'
import { APP_URL } from '@/lib/supabase'

export default function PublicHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo_odori_transparent.png"
              alt="Odori"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/jobs"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Find Jobs
            </Link>
            <Link
              href="/talent"
              className="text-gray-300 hover:text-white transition-colors"
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
