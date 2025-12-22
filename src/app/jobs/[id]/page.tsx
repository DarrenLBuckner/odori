import { getPublicJob } from '@/lib/queries'
import { notFound } from 'next/navigation'
import PublicHeader from '@/components/layout/PublicHeader'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { APP_URL } from '@/lib/supabase'

const JOB_TYPE_LABELS: Record<string, string> = {
  full_time: 'Full Time',
  part_time: 'Part Time',
  substitute: 'Substitute',
  one_time: 'One Time',
  contract: 'Contract',
}

const EXPERIENCE_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job = await getPublicJob(id)
  if (!job) return { title: 'Job Not Found | Odori' }

  return {
    title: `${job.title} | Odori`,
    description: job.description.slice(0, 160),
  }
}

export const revalidate = 60

export default async function PublicJobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job = await getPublicJob(id)

  if (!job) {
    notFound()
  }

  const formatPay = () => {
    if (!job.show_pay_rate || !job.pay_rate_min) return null

    const typeLabel = job.pay_rate_type === 'hourly' ? '/hr' :
                      job.pay_rate_type === 'per_class' ? '/class' :
                      job.pay_rate_type === 'weekly' ? '/week' :
                      job.pay_rate_type === 'monthly' ? '/month' : ''

    if (job.pay_rate_max && job.pay_rate_max !== job.pay_rate_min) {
      return `$${job.pay_rate_min} - $${job.pay_rate_max}${typeLabel}`
    }
    return `$${job.pay_rate_min}${typeLabel}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const danceStyles = job.job_dance_styles?.map(jds => jds.dance_styles?.name).filter(Boolean) || []
  const ageGroups = job.job_age_groups?.map(jag => jag.age_groups?.name).filter(Boolean) || []
  const location = job.is_remote ? 'Remote' :
    `${job.location_city || ''}, ${job.location_state || ''}`.trim()

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <PublicHeader />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link href="/jobs" className="text-gray-400 hover:text-white transition-colors text-sm mb-6 inline-block">
            ← Back to Jobs
          </Link>

          {/* Header Card */}
          <div className="border border-white/10 p-8 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1
                  className="text-3xl font-light text-white mb-2"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  {job.title}
                </h1>
                <p className="text-xl text-gray-400">
                  {job.client_profiles?.company_name}
                </p>
              </div>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-gray-300">
                <span>📍</span>
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span>💼</span>
                <span>{JOB_TYPE_LABELS[job.job_type]}</span>
              </div>
              {formatPay() && (
                <div className="flex items-center gap-2 text-[#c9a227]">
                  <span>💰</span>
                  <span>{formatPay()}{job.is_pay_negotiable ? ' (Negotiable)' : ''}</span>
                </div>
              )}
              {job.client_profiles?.response_rate && job.client_profiles.response_rate > 0 && (
                <div className="flex items-center gap-2 text-green-400">
                  <span>✓</span>
                  <span>{job.client_profiles.response_rate}% response rate</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="border border-white/10 p-6">
                <h2 className="text-lg text-white font-medium mb-4">Job Description</h2>
                <div className="text-gray-300 whitespace-pre-wrap">
                  {job.description}
                </div>
              </div>

              {/* Schedule */}
              {job.schedule_details && (
                <div className="border border-white/10 p-6">
                  <h2 className="text-lg text-white font-medium mb-4">Schedule</h2>
                  <p className="text-gray-300">{job.schedule_details}</p>
                  {job.start_date && (
                    <p className="text-gray-400 text-sm mt-2">
                      Starts: {formatDate(job.start_date)}
                      {job.is_ongoing ? ' (Ongoing)' : job.end_date ? ` - ${formatDate(job.end_date)}` : ''}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply CTA */}
              <div className="border border-[#c9a227]/50 bg-[#c9a227]/5 p-6">
                <h2 className="text-lg text-white font-medium mb-4">Interested?</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Create a free profile to apply for this position and get discovered by top studios.
                </p>
                <a
                  href={`${APP_URL}/signup?type=talent&redirect=/jobs/${job.id}`}
                  className="block w-full py-3 bg-[#c9a227] text-black text-center font-medium hover:bg-[#e8d5a3] transition-colors"
                >
                  Sign Up to Apply
                </a>
                <p className="text-center text-gray-500 text-sm mt-3">
                  Already have an account?{' '}
                  <a href={`${APP_URL}/login?redirect=/jobs/${job.id}`} className="text-[#c9a227] hover:underline">
                    Log in
                  </a>
                </p>
              </div>

              {/* Requirements */}
              <div className="border border-white/10 p-6">
                <h2 className="text-lg text-white font-medium mb-4">Requirements</h2>

                {danceStyles.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm text-gray-400 mb-2">Dance Styles</h3>
                    <div className="flex flex-wrap gap-2">
                      {danceStyles.map((style) => (
                        <span key={style} className="px-2 py-1 bg-white/5 text-gray-300 text-sm">
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {ageGroups.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm text-gray-400 mb-2">Age Groups</h3>
                    <div className="flex flex-wrap gap-2">
                      {ageGroups.map((age) => (
                        <span key={age} className="px-2 py-1 bg-white/5 text-gray-300 text-sm">
                          {age}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {job.experience_level_required && (
                  <div>
                    <h3 className="text-sm text-gray-400 mb-2">Experience Level</h3>
                    <p className="text-gray-300">{EXPERIENCE_LABELS[job.experience_level_required]}</p>
                    {job.years_experience_required && (
                      <p className="text-gray-400 text-sm">{job.years_experience_required}+ years required</p>
                    )}
                  </div>
                )}
              </div>

              {/* Posted Info */}
              {job.published_at && (
                <p className="text-center text-gray-500 text-sm">
                  Posted {formatDate(job.published_at)}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
