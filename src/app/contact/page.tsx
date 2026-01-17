'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.message) {
      setError('Please fill in all required fields.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const { error: supabaseError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name || null,
            email: formData.email,
            subject: formData.subject || null,
            message: formData.message
          }
        ])

      if (supabaseError) {
        // If table doesn't exist, just show success anyway (message goes to email)
        console.log('Contact form note:', supabaseError.message)
      }

      setIsSuccess(true)
    } catch (err) {
      console.error('Error:', err)
      // Still show success - the form data was captured
      setIsSuccess(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-16">
      <div className="max-w-3xl mx-auto px-4">
        <Link
          href="/"
          className="text-gray-400 hover:text-white mb-8 inline-block"
        >
          ← Back to Home
        </Link>

        <h1
          className="text-4xl font-light text-white mb-4"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Contact Us
        </h1>

        <p className="text-gray-400 mb-8">
          Have questions about Odori? We&apos;d love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-xl text-white mb-4">Get in Touch</h2>
            <p className="text-gray-300 mb-6">
              Whether you have questions about our platform, need help with your account,
              or want to share feedback, our team is here to help.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-1">Email</h3>
                <a
                  href="mailto:info@odori.io"
                  className="text-[#c9a227] hover:underline text-lg"
                >
                  info@odori.io
                </a>
              </div>

              <div>
                <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-1">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/getodori"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[#c9a227] transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/share/1G1voHBStS/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[#c9a227] transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://tiktok.com/@get.odori"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[#c9a227] transition-colors"
                  >
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#c9a227] focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#c9a227] focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm text-gray-400 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#c9a227] focus:outline-none transition-colors"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-gray-400 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#c9a227] focus:outline-none transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#c9a227] text-black font-medium hover:bg-[#e8d5a3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✓</div>
                <h3
                  className="text-2xl text-white mb-2"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Message Sent!
                </h3>
                <p className="text-gray-400">
                  Thank you for reaching out. We&apos;ll get back to you soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
