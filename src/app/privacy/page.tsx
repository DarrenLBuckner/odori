import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | Odori',
  description: 'Privacy Policy for Odori - The Dance Industry Network',
}

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>

        <div className="prose prose-invert prose-gold max-w-none">
          <p className="text-gray-400 mb-8">
            Last Updated: December 21, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">1. Information We Collect</h2>
            <p className="text-gray-300 mb-4">We collect information you provide directly:</p>
            <ul className="text-gray-300 list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> Name, email, password, phone number</li>
              <li><strong>Profile Information:</strong> Photos, videos, bio, location, dance styles, experience</li>
              <li><strong>Job Information:</strong> Job postings, applications, messages</li>
              <li><strong>Payment Information:</strong> Processed securely through Stripe</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">2. How We Use Your Information</h2>
            <ul className="text-gray-300 list-disc pl-6 space-y-2">
              <li>To provide and improve our services</li>
              <li>To connect talent with job opportunities</li>
              <li>To process payments and subscriptions</li>
              <li>To send service-related communications</li>
              <li>To ensure platform safety and prevent fraud</li>
              <li>To calculate and display response rates</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">3. Information Sharing</h2>
            <p className="text-gray-300 mb-4">We share your information with:</p>
            <ul className="text-gray-300 list-disc pl-6 space-y-2">
              <li><strong>Other Users:</strong> Your public profile is visible to logged-in users</li>
              <li><strong>Service Providers:</strong> Stripe (payments), Supabase (database), Vercel (hosting), Resend (emails)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect rights</li>
            </ul>
            <p className="text-gray-300 mt-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">4. Profile Visibility</h2>
            <p className="text-gray-300 mb-4">
              Talent profiles are visible to studios and production companies searching for talent.
              You can control your profile visibility in your account settings. Response rates are
              calculated and displayed on studio profiles to promote transparency.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">5. Data Security</h2>
            <p className="text-gray-300 mb-4">
              We implement industry-standard security measures including encryption, secure
              authentication, and regular security audits. However, no system is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">6. Your Rights</h2>
            <p className="text-gray-300 mb-4">You have the right to:</p>
            <ul className="text-gray-300 list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">7. Cookies</h2>
            <p className="text-gray-300 mb-4">
              We use essential cookies for authentication and session management. We may use
              analytics cookies to understand how users interact with our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-gray-300 mb-4">
              Odori is not intended for users under 18. We do not knowingly collect information
              from children. If you believe a child has provided us information, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-300 mb-4">
              We may update this privacy policy from time to time. We will notify you of
              significant changes via email or platform notification.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl text-white mb-4">10. Contact Us</h2>
            <p className="text-gray-300 mb-4">
              For privacy-related questions or to exercise your rights, contact us at{' '}
              <a href="mailto:privacy@odori.io" className="text-[#c9a227] hover:underline">
                privacy@odori.io
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
