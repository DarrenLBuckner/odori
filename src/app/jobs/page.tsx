import { getPublicJobs, getDanceStyles } from '@/lib/queries'
import PublicHeader from '@/components/layout/PublicHeader'
import Footer from '@/components/layout/Footer'
import PublicJobCard from '@/components/jobs/PublicJobCard'
import { APP_URL } from '@/lib/supabase'

export const metadata = {
  title: 'Find Dance Jobs | Odori',
  description: 'Browse dance teaching, choreography, and performance opportunities.',
}

export const revalidate = 60

export default async function PublicJobsPage() {
  const [jobs, danceStyles] = await Promise.all([
    getPublicJobs(),
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
              Find Your Next Opportunity
            </h1>
            <p className="text-gray-400">
              {jobs.length} job{jobs.length !== 1 ? 's' : ''} available
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

                {/* Job Type Filter */}
                <div className="mb-6">
                  <h3 className="text-sm text-gray-400 mb-2">Job Type</h3>
                  <div className="space-y-2">
                    {['Full Time', 'Part Time', 'Substitute', 'Contract'].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 bg-white/5 border-white/10 rounded text-[#c9a227]"
                        />
                        <span className="text-sm text-gray-300">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400 mb-3">
                    Ready to apply?
                  </p>
                  <a
                    href={`${APP_URL}/signup?type=talent`}
                    className="block w-full py-2 bg-[#c9a227] text-black text-center font-medium hover:bg-[#e8d5a3] transition-colors"
                  >
                    Create Free Profile
                  </a>
                </div>
              </div>
            </aside>

            {/* Job Listings */}
            <div className="lg:col-span-3">
              {jobs.length === 0 ? (
                <div className="text-center py-12 border border-white/10">
                  <p className="text-gray-400 mb-4">
                    No jobs available at the moment.
                  </p>
                  <p className="text-gray-500 text-sm mb-6">
                    Check back soon or create a profile to get notified of new opportunities.
                  </p>
                  <a
                    href={`${APP_URL}/signup?type=talent`}
                    className="inline-block px-6 py-2 bg-[#c9a227] text-black font-medium hover:bg-[#e8d5a3] transition-colors"
                  >
                    Create Free Profile
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <PublicJobCard key={job.id} job={job} />
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
