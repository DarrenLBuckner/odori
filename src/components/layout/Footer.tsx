import Link from 'next/link'
import Image from 'next/image'
import { APP_URL } from '@/lib/supabase'

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/logo_odori_transparent.png"
              alt="Odori"
              width={100}
              height={33}
              className="h-6 w-auto mb-4"
            />
            <p className="text-gray-500 text-sm">
              Where Talent Meets Opportunity
            </p>
          </div>

          {/* For Talent */}
          <div>
            <h4 className="text-white font-medium mb-4">For Talent</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/jobs" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Find Jobs
                </Link>
              </li>
              <li>
                <a href={`${APP_URL}/signup?type=talent`} className="text-gray-400 hover:text-white text-sm transition-colors">
                  Create Profile
                </a>
              </li>
            </ul>
          </div>

          {/* For Studios */}
          <div>
            <h4 className="text-white font-medium mb-4">For Studios</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/talent" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Browse Talent
                </Link>
              </li>
              <li>
                <a href={`${APP_URL}/signup?type=client`} className="text-gray-400 hover:text-white text-sm transition-colors">
                  Post a Job
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Odori. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
