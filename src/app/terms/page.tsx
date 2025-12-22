import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service | Odori',
  description: 'Terms of Service for Odori - The Dance Industry Network',
}

export default function TermsPage() {
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
          className="text-4xl font-light text-white mb-8"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Terms of Service
        </h1>

        <div className="prose prose-invert prose-gold max-w-none">
          <p className="text-gray-400 mb-8">
            Last Updated: December 21, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-4">
              By accessing or using Odori (&quot;the Platform&quot;), you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">2. Description of Service</h2>
            <p className="text-gray-300 mb-4">
              Odori is a professional networking platform connecting dance talent (teachers, choreographers,
              performers, instructors) with clients (dance studios, production companies, agencies, event planners).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">3. User Accounts</h2>
            <p className="text-gray-300 mb-4">
              You must provide accurate, complete information when creating an account. You are responsible
              for maintaining the security of your account and all activities under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">4. User Conduct</h2>
            <p className="text-gray-300 mb-4">You agree not to:</p>
            <ul className="text-gray-300 list-disc pl-6 space-y-2">
              <li>Post false, misleading, or fraudulent content</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Use the platform for any illegal purposes</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Scrape or collect user data without permission</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">5. Content Ownership</h2>
            <p className="text-gray-300 mb-4">
              You retain ownership of content you post. By posting content, you grant Odori a non-exclusive,
              royalty-free license to use, display, and distribute your content on the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">6. Subscriptions & Payments</h2>
            <p className="text-gray-300 mb-4">
              Paid subscriptions are billed monthly or annually. You may cancel at any time, but refunds
              are not provided for partial billing periods. Prices are subject to change with notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">7. Job Postings & Applications</h2>
            <p className="text-gray-300 mb-4">
              Odori facilitates connections between talent and clients but is not a party to any employment
              agreements. We do not guarantee job placement or the quality of applicants.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-300 mb-4">
              Odori is provided &quot;as is&quot; without warranties. We are not liable for any damages arising from
              your use of the platform, including lost profits, data loss, or business interruption.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">9. Termination</h2>
            <p className="text-gray-300 mb-4">
              We may suspend or terminate your account for violations of these terms. You may delete your
              account at any time through your account settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">10. Changes to Terms</h2>
            <p className="text-gray-300 mb-4">
              We may update these terms from time to time. Continued use of the platform after changes
              constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">11. Contact</h2>
            <p className="text-gray-300 mb-4">
              Questions about these terms? Contact us at{' '}
              <a href="mailto:support@odori.io" className="text-[#c9a227] hover:underline">
                support@odori.io
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
