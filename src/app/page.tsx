'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: '',
    companyName: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '')
    if (digits.length <= 3) {
      return digits.length > 0 ? `(${digits}` : ''
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, phone: formatPhone(e.target.value) })
  }

  const selectUserType = (type: string) => {
    setFormData({ ...formData, userType: type })
    emailRef.current?.focus()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email) {
      setError('Please enter your email address.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const { error: supabaseError } = await supabase
        .from('waitlist')
        .insert([
          {
            email: formData.email,
            name: formData.name || null,
            phone: formData.phone || null,
            interested_as: formData.userType || null,
            company_name: formData.companyName || null,
            source: 'landing_page'
          }
        ])

      if (supabaseError) {
        if (supabaseError.code === '23505') {
          setError('This email is already on the waitlist!')
        } else {
          setError('Something went wrong. Please try again.')
          console.error('Supabase error:', supabaseError)
        }
        setIsSubmitting(false)
        return
      }

      // Send welcome email via Edge Function
      try {
        await fetch('https://avnabpujihccqcbuanut.supabase.co/functions/v1/send-waitlist-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name || null,
            email: formData.email,
            phone: formData.phone || null,
            interested_as: formData.userType || null
          })
        })
      } catch (emailError) {
        console.log('Email send failed, but signup succeeded')
      }

      setIsSuccess(true)
    } catch (err) {
      setError('Connection error. Please try again.')
      console.error('Error:', err)
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="bg-gradient" />
      <div className="grain" />

      <nav className="nav">
        <div className="logo">Odori<span>.</span></div>
        <div className="nav-actions">
          <a className="btn-primary nav-btn" href="https://app.odori.io/signup" target="_blank" rel="noopener noreferrer">Get Started Free</a>
          <a className="nav-link" href="/jobs">Browse</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>Where Dance <em>Works</em></h1>
          <p className="subtitle">
            The professional network connecting dance teachers, choreographers, and studios.
            Find opportunities. Discover talent. Build your career.
          </p>

          <div className="hero-ctas">
            <a className="btn-primary hero-cta" href="https://app.odori.io/signup" target="_blank" rel="noopener noreferrer">Get Started Free →</a>
            <a className="btn-ghost hero-cta" href="/jobs">Browse Opportunities →</a>
          </div>
        </div>

      </section>

      <section className="signup-action">
        <div className="signup-action-content">
          <h3>Create Your Free Profile</h3>
          <p>Join the dance industry's professional network.</p>
          <div className="signup-buttons">
            <a className="btn-primary" href="https://app.odori.io/signup?type=talent" target="_blank" rel="noopener noreferrer">Sign Up as Talent</a>
            <a className="btn-primary" href="https://app.odori.io/signup?type=client" target="_blank" rel="noopener noreferrer">Sign Up as Studio</a>
            <p className="small">Already have an account? <a href="https://app.odori.io/login" target="_blank" rel="noopener noreferrer">Log In</a></p>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="features-header">
          <h2>A New Standard for Dance Hiring</h2>
          <p>Everything the industry has been missing, in one platform.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">◎</div>
            <h3>Video Portfolios</h3>
            <p>Showcase your teaching style with demo videos. Studios see how you work before they reach out—no more guesswork.</p>
          </div>

          <div className="feature-card">
            <div className="icon">◈</div>
            <h3>Real-Time Job Status</h3>
            <p>Never apply to a filled position again. When a job is taken, it disappears. Simple.</p>
          </div>

          <div className="feature-card">
            <div className="icon">◇</div>
            <h3>Response Rate Tracking</h3>
            <p>See which studios actually respond to applicants. No more ghosting. Full transparency.</p>
          </div>

          <div className="feature-card">
            <div className="icon">○</div>
            <h3>One Platform</h3>
            <p>Stop scrolling through 20 Facebook groups. Every opportunity in one searchable, filterable database.</p>
          </div>
        </div>
      </section>

      <section className="audiences" id="join">
        <div className="audiences-grid">
          <div className="audience-card">
            <h3>For Talent</h3>
            <p className="role">Teachers • Choreographers • Performers</p>
            <ul>
              <li>Build a professional video portfolio</li>
              <li>Search jobs by style, location, pay</li>
              <li>Apply directly to verified studios</li>
              <li>Track your application status</li>
              <li>Get discovered by studios searching for talent</li>
            </ul>
            <div className="audience-ctas">
              <a className="btn-primary" href="https://app.odori.io/signup?type=talent" target="_blank" rel="noopener noreferrer">Sign Up Free</a>
              <a className="btn-outline" href="/jobs">Browse Jobs</a>
            </div>
          </div>

          <div className="audience-card">
            <h3>For Studios</h3>
            <p className="role">Studio Owners • Directors • Production Companies</p>
            <ul>
              <li>Watch teaching demos before hiring</li>
              <li>Post jobs to qualified candidates only</li>
              <li>Search talent by style and experience</li>
              <li>Message and book directly</li>
              <li>Build your reputation with reviews</li>
            </ul>
            <div className="audience-ctas">
              <a className="btn-primary" href="https://app.odori.io/signup?type=client" target="_blank" rel="noopener noreferrer">Sign Up Free</a>
              <a className="btn-outline" href="/talent">Browse Talent</a>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter" id="join">
        <div className="newsletter-content">
          <h3>Stay in the Loop</h3>
          <p>Get updates on new features and opportunities</p>

          {!isSuccess ? (
            <div className="waitlist-form">
              {error && <div className="form-error show">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-row single">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      ref={emailRef}
                      placeholder="your@email.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>

              <p className="form-note">Join our growing community of dance professionals</p>
            </div>
          ) : (
            <div className="signup-success show">
              <div className="checkmark">✓</div>
              <h3>You're subscribed!</h3>
              <p>Thanks — we&apos;ll keep you updated on Odori.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo">Odori<span>.</span></div>
        <p>The Dance Industry Network</p>
        <p>© 2026 Odori. All rights reserved.</p>
        <div className="socials">
          <a href="https://www.facebook.com/share/1G1voHBStS/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://instagram.com/getodori" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://tiktok.com/@get.odori" target="_blank" rel="noopener noreferrer">TikTok</a>
        </div>
      </footer>
    </>
  )
}
