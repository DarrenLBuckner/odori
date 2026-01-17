import Link from 'next/link'

export const metadata = {
  title: 'Unsubscribed | Odori',
  description: 'You have been unsubscribed from Odori emails.',
}

export default function UnsubscribePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="max-w-md text-center">

        {/* Logo */}
        <Link href="/" className="inline-block mb-8">
          <span className="font-serif text-3xl text-white">
            Odori<span className="text-[#c9a227]">.</span>
          </span>
        </Link>

        {/* Sad emoji */}
        <div className="text-6xl mb-6">😢</div>

        {/* Message */}
        <h1 className="text-2xl font-semibold text-white mb-4">
          We'll miss you!
        </h1>

        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
          You've been unsubscribed from Odori emails.
          No hard feelings — the dance world is busy, I get it.
        </p>

        <p className="text-gray-500 text-base mb-8">
          If you ever want back in, you know where to find us. 💛
        </p>

        {/* Signature */}
        <p className="text-gray-500 text-sm mb-8">
          — Kira
        </p>

        {/* CTA */}
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-block bg-[#c9a227] text-black font-semibold px-6 py-3 rounded-md hover:bg-[#b8922a] transition-colors"
          >
            Back to Odori
          </Link>

          <p className="text-gray-600 text-sm">
            Changed your mind?{' '}
            <Link href="/contact" className="text-[#c9a227] hover:underline">
              Let us know
            </Link>
          </p>
        </div>

      </div>
    </main>
  )
}
