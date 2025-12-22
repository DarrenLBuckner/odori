import Link from 'next/link'
import { Job } from '@/lib/queries'

const JOB_TYPE_LABELS: Record<string, string> = {
  full_time: 'Full Time',
  part_time: 'Part Time',
  substitute: 'Substitute',
  one_time: 'One Time',
  contract: 'Contract',
}

interface PublicJobCardProps {
  job: Job
}

export default function PublicJobCard({ job }: PublicJobCardProps) {
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
      month: 'short',
      day: 'numeric',
    })
  }

  const danceStyles = job.job_dance_styles?.map(jds => jds.dance_styles?.name).filter(Boolean) || []
  const location = job.is_remote ? 'Remote' :
    (job.location_city && job.location_state) ? `${job.location_city}, ${job.location_state}` : 'Location TBD'

  return (
    <Link href={`/jobs/${job.id}`} className="block">
      <div className="border border-white/10 p-6 hover:border-[#c9a227]/50 transition-colors group">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg text-white font-medium group-hover:text-[#c9a227] transition-colors">
              {job.title}
            </h3>
            <p className="text-gray-400 text-sm">
              {job.client_profiles?.company_name || 'Company'}
            </p>
          </div>
          {formatPay() && (
            <span className="text-[#c9a227] font-medium">
              {formatPay()}
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <span>📍</span> {location}
          </span>
          <span className="flex items-center gap-1">
            <span>💼</span> {JOB_TYPE_LABELS[job.job_type] || job.job_type}
          </span>
        </div>

        {/* Dance Styles */}
        {danceStyles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {danceStyles.slice(0, 3).map((style) => (
              <span
                key={style}
                className="px-2 py-1 bg-white/5 text-gray-300 text-xs"
              >
                {style}
              </span>
            ))}
            {danceStyles.length > 3 && (
              <span className="px-2 py-1 text-gray-500 text-xs">
                +{danceStyles.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10 text-xs text-gray-500">
          {job.published_at && <span>Posted {formatDate(job.published_at)}</span>}
          {job.client_profiles?.response_rate && job.client_profiles.response_rate > 0 && (
            <span className="text-green-400">
              ✓ {job.client_profiles.response_rate}% response rate
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
