import Link from 'next/link'
import Image from 'next/image'
import { TalentProfile } from '@/lib/queries'

const EXPERIENCE_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
}

interface TalentCardProps {
  talent: TalentProfile
}

export default function TalentCard({ talent }: TalentCardProps) {
  const profile = talent.profiles
  const displayName = profile?.display_name ||
    `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() ||
    'Dance Professional'

  const location = (profile?.location_city && profile?.location_state)
    ? `${profile.location_city}, ${profile.location_state}`
    : null

  const primaryStyles = talent.talent_dance_styles
    ?.filter(tds => tds.is_primary)
    .map(tds => tds.dance_styles?.name)
    .filter(Boolean) || []

  const allStyles = talent.talent_dance_styles
    ?.map(tds => tds.dance_styles?.name)
    .filter(Boolean) || []

  const displayStyles = primaryStyles.length > 0 ? primaryStyles : allStyles.slice(0, 3)

  return (
    <Link href={`/talent/${talent.id}`} className="block">
      <div className="border border-white/10 p-6 hover:border-[#c9a227]/50 transition-colors group">
        {/* Profile Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
            {profile?.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={displayName}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl text-gray-500">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg text-white font-medium group-hover:text-[#c9a227] transition-colors truncate">
              {displayName}
            </h3>
            {talent.headline && (
              <p className="text-gray-400 text-sm truncate">
                {talent.headline}
              </p>
            )}
            {location && (
              <p className="text-gray-500 text-sm">
                📍 {location}
              </p>
            )}
          </div>

          {/* Availability Badge */}
          {talent.available_for_work && (
            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs flex-shrink-0">
              Available
            </span>
          )}
        </div>

        {/* Dance Styles */}
        {displayStyles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {displayStyles.map((style) => (
              <span
                key={style}
                className="px-2 py-1 bg-[#c9a227]/10 text-[#c9a227] text-xs"
              >
                {style}
              </span>
            ))}
            {allStyles.length > displayStyles.length && (
              <span className="px-2 py-1 text-gray-500 text-xs">
                +{allStyles.length - displayStyles.length} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10 text-xs">
          <span className="text-gray-500">
            {talent.experience_level && (EXPERIENCE_LABELS[talent.experience_level] || talent.experience_level)}
            {talent.years_experience && ` • ${talent.years_experience} years`}
          </span>
          <span className="text-[#c9a227]">
            View Profile →
          </span>
        </div>
      </div>
    </Link>
  )
}
