import Link from 'next/link'

export const metadata = {
  title: 'About Us | Odori',
  description: 'Our story - Odori is a dance hiring platform built for the dance world.',
}

export default function AboutPage() {
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
          Our Story
        </h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            I&apos;m Kira Sophia, a dance teacher and choreographer, and I co-founded Odori
            to make it easier for dance studios and dance professionals to find each other.
          </p>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Studios often hire through scattered Facebook posts and last-minute DMs when
            they need dance teachers, choreographers, substitute instructors, or guest artists.
            Meanwhile, talented artists miss opportunities because posts get buried or
            they&apos;re outside the &quot;right&quot; circle.
          </p>

          <p className="text-gray-300 mb-8 leading-relaxed">
            Odori is a dance hiring platform built for the dance world — a more professional
            way to post opportunities, search talent, and connect faster with less chaos.
          </p>

          <p
            className="text-2xl text-white mb-12"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Less chaos. More connection. More opportunity.
          </p>

          {/* CTA Section */}
          <div className="border border-white/10 p-8 text-center">
            <h2
              className="text-2xl text-white mb-4"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Ready to Join?
            </h2>
            <p className="text-gray-400 mb-6">
              Whether you&apos;re a dance professional looking for opportunities or a studio
              searching for talent, Odori is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.odori.io/signup?type=talent"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#c9a227] text-black font-medium hover:bg-[#e8d5a3] transition-colors"
              >
                Sign Up as Talent
              </a>
              <a
                href="https://app.odori.io/signup?type=client"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/30 text-white hover:border-[#c9a227] hover:text-[#c9a227] transition-colors"
              >
                Sign Up as Studio
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
