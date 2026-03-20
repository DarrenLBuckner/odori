import { getPublicTalentProfile } from '@/lib/queries'
import { notFound } from 'next/navigation'
import PublicHeader from '@/components/layout/PublicHeader'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { APP_URL } from '@/lib/supabase'

const EXPERIENCE_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const talent = await getPublicTalentProfile(id)
  if (!talent) return { title: 'Profile Not Found | Odori' }

  const name = talent.profiles?.display_name ||
    `${talent.profiles?.first_name || ''} ${talent.profiles?.last_name || ''}`.trim() ||
    'Dance Professional'

  return {
    title: `${name} | Odori`,
    description: talent.headline || `Dance professional on Odori`,
  }
}

export const revalidate = 60

export default async function PublicTalentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const talent = await getPublicTalentProfile(id)

  if (!talent) {
    notFound()
  }

  const profile = talent.profiles
  const displayName = profile?.display_name ||
    `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() ||
    'Dance Professional'

  const location = (profile?.location_city && profile?.location_state)
    ? `${profile.location_city}, ${profile.location_state}`
    : null

  const danceStyles = talent.talent_dance_styles
    ?.map(tds => ({
      name: tds.dance_styles?.name,
      isPrimary: tds.is_primary,
      level: tds.proficiency_level,
    }))
    .filter(s => s.name) || []

  const ageGroups = talent.talent_age_groups
    ?.map(tag => tag.age_groups?.name)
    .filter(Boolean) || []

  const publicVideos = talent.videos?.filter(v => v.is_public) || []

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <PublicHeader />

      <main style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link href="/talent" className="text-gray-400 hover:text-white transition-colors text-sm mb-6 inline-block">
            ← Back to Talent
          </Link>

          {/* Profile Header */}
          <div className="border border-white/10 p-8 mb-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={displayName}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl text-gray-500">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1
                      className="text-3xl font-light text-white mb-1"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      {displayName}
                    </h1>
                    {talent.headline && (
                      <p className="text-xl text-gray-400 mb-2">
                        {talent.headline}
                      </p>
                    )}
                  </div>
                  {talent.available_for_work && (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm">
                      Available for Work
                    </span>
                  )}
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 mt-4 text-gray-400">
                  {location && (
                    <span>📍 {location}</span>
                  )}
                  {(talent.experience_level || talent.years_experience) && (
                    <span>
                      {talent.experience_level && EXPERIENCE_LABELS[talent.experience_level]}
                      {talent.years_experience && ` • ${talent.years_experience} years`}
                    </span>
                  )}
                </div>

                {/* Availability */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {talent.open_to_full_time && (
                    <span className="px-2 py-1 bg-white/5 text-gray-300 text-xs">Full Time</span>
                  )}
                  {talent.open_to_part_time && (
                    <span className="px-2 py-1 bg-white/5 text-gray-300 text-xs">Part Time</span>
                  )}
                  {talent.open_to_substitute && (
                    <span className="px-2 py-1 bg-white/5 text-gray-300 text-xs">Substitute</span>
                  )}
                  {talent.open_to_gigs && (
                    <span className="px-2 py-1 bg-white/5 text-gray-300 text-xs">Gigs</span>
                  )}
                  {talent.open_to_virtual && (
                    <span className="px-2 py-1 bg-white/5 text-gray-300 text-xs">Virtual</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bio */}
              {profile?.bio && (
                <div className="border border-white/10 p-6">
                  <h2 className="text-lg text-white font-medium mb-4">About</h2>
                  <p className="text-gray-300 whitespace-pre-wrap">{profile.bio}</p>
                </div>
              )}

              {/* Teaching Philosophy */}
              {talent.teaching_philosophy && (
                <div className="border border-white/10 p-6">
                  <h2 className="text-lg text-white font-medium mb-4">Teaching Philosophy</h2>
                  <p className="text-gray-300 whitespace-pre-wrap">{talent.teaching_philosophy}</p>
                </div>
              )}

              {/* Videos */}
              {publicVideos.length > 0 && (
                <div className="border border-white/10 p-6">
                  <h2 className="text-lg text-white font-medium mb-4">Videos</h2>
                  <div className="grid gap-4">
                    {publicVideos.map((video) => (
                      <div key={video.id} className="aspect-video bg-white/5 rounded overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          <a
                            href={video.video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#c9a227] hover:underline"
                          >
                            {video.title || 'Watch Video'} →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Training & Awards */}
              {(talent.training || talent.awards || talent.notable_performances) && (
                <div className="border border-white/10 p-6">
                  <h2 className="text-lg text-white font-medium mb-4">Background</h2>

                  {talent.training && (
                    <div className="mb-4">
                      <h3 className="text-sm text-gray-400 mb-2">Training</h3>
                      <p className="text-gray-300">{talent.training}</p>
                    </div>
                  )}

                  {talent.awards && (
                    <div className="mb-4">
                      <h3 className="text-sm text-gray-400 mb-2">Awards</h3>
                      <p className="text-gray-300">{talent.awards}</p>
                    </div>
                  )}

                  {talent.notable_performances && (
                    <div>
                      <h3 className="text-sm text-gray-400 mb-2">Notable Performances</h3>
                      <p className="text-gray-300">{talent.notable_performances}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact CTA */}
              <div className="border border-[#c9a227]/50 bg-[#c9a227]/5 p-6">
                <h2 className="text-lg text-white font-medium mb-4">Interested in {profile?.first_name || 'this talent'}?</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Create a free account to contact talent and post job opportunities.
                </p>
                <a
                  href={`${APP_URL}/signup?type=client`}
                  className="block w-full py-3 bg-[#c9a227] text-black text-center font-medium hover:bg-[#e8d5a3] transition-colors"
                >
                  Sign Up to Contact
                </a>
                <p className="text-center text-gray-500 text-sm mt-3">
                  Already have an account?{' '}
                  <a href={`${APP_URL}/login`} className="text-[#c9a227] hover:underline">
                    Log in
                  </a>
                </p>
              </div>

              {/* Dance Styles */}
              {danceStyles.length > 0 && (
                <div className="border border-white/10 p-6">
                  <h2 className="text-lg text-white font-medium mb-4">Dance Styles</h2>
                  <div className="space-y-2">
                    {danceStyles.map((style, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className={style.isPrimary ? 'text-[#c9a227]' : 'text-gray-300'}>
                          {style.name}
                          {style.isPrimary && ' ★'}
                        </span>
                        {style.level && (
                          <span className="text-gray-500 text-sm">
                            {EXPERIENCE_LABELS[style.level]}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Age Groups */}
              {ageGroups.length > 0 && (
                <div className="border border-white/10 p-6">
                  <h2 className="text-lg text-white font-medium mb-4">Teaches</h2>
                  <div className="flex flex-wrap gap-2">
                    {ageGroups.map((age) => (
                      <span key={age} className="px-2 py-1 bg-white/5 text-gray-300 text-sm">
                        {age}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              {(talent.website_url || talent.instagram_url || talent.youtube_url || talent.tiktok_url) && (
                <div className="border border-white/10 p-6">
                  <h2 className="text-lg text-white font-medium mb-4">Links</h2>
                  <div className="space-y-2">
                    {talent.website_url && (
                      <a href={talent.website_url} target="_blank" rel="noopener noreferrer" className="block text-[#c9a227] hover:underline">
                        🌐 Website
                      </a>
                    )}
                    {talent.instagram_url && (
                      <a href={talent.instagram_url} target="_blank" rel="noopener noreferrer" className="block text-[#c9a227] hover:underline">
                        📸 Instagram
                      </a>
                    )}
                    {talent.youtube_url && (
                      <a href={talent.youtube_url} target="_blank" rel="noopener noreferrer" className="block text-[#c9a227] hover:underline">
                        ▶️ YouTube
                      </a>
                    )}
                    {talent.tiktok_url && (
                      <a href={talent.tiktok_url} target="_blank" rel="noopener noreferrer" className="block text-[#c9a227] hover:underline">
                        🎵 TikTok
                      </a>
                    )}
                  </div>
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
