import { getPublicTalent, getDanceStyles } from '@/lib/queries'
import PublicHeader from '@/components/layout/PublicHeader'
import Footer from '@/components/layout/Footer'
import TalentCard from '@/components/talent/TalentCard'
import { APP_URL } from '@/lib/supabase'

export const metadata = {
  title: 'Browse Dance Talent | Odori',
  description: 'Discover talented dance teachers, choreographers, and performers.',
}

export const revalidate = 60

export default async function PublicTalentPage() {
  const [talent, danceStyles] = await Promise.all([
    getPublicTalent(),
    getDanceStyles(),
  ])

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <PublicHeader />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-4xl font-light text-white mb-2"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Discover Dance Talent
            </h1>
            <p className="text-gray-400">
              {talent.length} professional{talent.length !== 1 ? 's' : ''} available
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
              <div className="border border-white/10 p-4 sticky top-24">
                <h2 className="text-white font-medium mb-4">Filters</h2>

                {/* Dance Style Filter */}
                <div className="mb-6">
                  <h3 className="text-sm text-gray-400 mb-2">Dance Style</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {danceStyles.slice(0, 10).map((style) => (
                      <label key={style.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 bg-white/5 border-white/10 rounded text-[#c9a227]"
                        />
                        <span className="text-sm text-gray-300">{style.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience Level Filter */}
                <div className="mb-6">
                  <h3 className="text-sm text-gray-400 mb-2">Experience Level</h3>
                  <div className="space-y-2">
                    {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((level) => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 bg-white/5 border-white/10 rounded text-[#c9a227]"
                        />
                        <span className="text-sm text-gray-300">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400 mb-3">
                    Looking to hire?
                  </p>
                  <a
                    href={`${APP_URL}/signup?type=client`}
                    className="block w-full py-2 bg-[#c9a227] text-black text-center font-medium hover:bg-[#e8d5a3] transition-colors"
                  >
                    Post a Job for Free
                  </a>
                </div>
              </div>
            </aside>

            {/* Talent Grid */}
            <div className="lg:col-span-3">
              {talent.length === 0 ? (
                <div className="text-center py-12 border border-white/10">
                  <p className="text-gray-400 mb-4">
                    No talent profiles available yet.
                  </p>
                  <p className="text-gray-500 text-sm mb-6">
                    Be one of the first to join!
                  </p>
                  <a
                    href={`${APP_URL}/signup?type=talent`}
                    className="inline-block px-6 py-2 bg-[#c9a227] text-black font-medium hover:bg-[#e8d5a3] transition-colors"
                  >
                    Create Your Profile
                  </a>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {talent.map((t) => (
                    <TalentCard key={t.id} talent={t} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
