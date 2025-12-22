import { supabase } from './supabase'

// Revalidation time for ISR
export const revalidate = 60

// Types
export interface DanceStyle {
  id: string
  name: string
  category?: string
}

export interface AgeGroup {
  id: string
  name: string
}

export interface Job {
  id: string
  title: string
  description: string
  job_type: string
  status: string
  location_city?: string
  location_state?: string
  is_remote: boolean
  pay_rate_min?: number
  pay_rate_max?: number
  pay_rate_type: string
  show_pay_rate: boolean
  is_pay_negotiable?: boolean
  experience_level_required?: string
  years_experience_required?: number
  schedule_details?: string
  start_date?: string
  end_date?: string
  is_ongoing?: boolean
  published_at?: string
  application_deadline?: string
  max_applications?: number
  client_profiles?: {
    id?: string
    company_name?: string
    company_description?: string
    logo_url?: string
    response_rate?: number
    profiles?: {
      display_name?: string
    }
  }
  job_dance_styles?: Array<{
    dance_styles: DanceStyle
  }>
  job_age_groups?: Array<{
    age_groups: AgeGroup
  }>
}

export interface TalentProfile {
  id: string
  profile_id: string
  headline?: string
  years_experience?: number
  experience_level?: string
  primary_dance_style_id?: string
  available_for_work: boolean
  profile_completeness?: number
  open_to_full_time?: boolean
  open_to_part_time?: boolean
  open_to_substitute?: boolean
  open_to_gigs?: boolean
  open_to_virtual?: boolean
  teaching_philosophy?: string
  training?: string
  awards?: string
  notable_performances?: string
  website_url?: string
  instagram_url?: string
  youtube_url?: string
  tiktok_url?: string
  profiles?: {
    display_name?: string
    first_name?: string
    last_name?: string
    avatar_url?: string
    bio?: string
    location_city?: string
    location_state?: string
    profile_visible?: boolean
  }
  talent_dance_styles?: Array<{
    dance_styles: DanceStyle
    is_primary?: boolean
    proficiency_level?: string
  }>
  talent_age_groups?: Array<{
    age_groups: AgeGroup
  }>
  videos?: Array<{
    id: string
    title?: string
    thumbnail_url?: string
    video_url: string
    video_type?: string
    is_public?: boolean
  }>
}

// Get all dance styles for filters
export async function getDanceStyles(): Promise<DanceStyle[]> {
  const { data, error } = await supabase
    .from('dance_styles')
    .select('id, name, category')
    .order('category')
    .order('name')

  if (error) {
    console.error('Error fetching dance styles:', error)
    return []
  }

  return data || []
}

// Get public jobs listing
export async function getPublicJobs(filters?: {
  danceStyleId?: string
  location?: string
  jobType?: string
  experienceLevel?: string
}): Promise<Job[]> {
  let query = supabase
    .from('jobs')
    .select(`
      id,
      title,
      description,
      job_type,
      status,
      location_city,
      location_state,
      is_remote,
      pay_rate_min,
      pay_rate_max,
      pay_rate_type,
      show_pay_rate,
      experience_level_required,
      published_at,
      application_deadline,
      client_profiles(company_name, logo_url, response_rate),
      job_dance_styles(dance_styles(id, name))
    `)
    .eq('status', 'active')
    .order('published_at', { ascending: false })

  // Apply filters
  if (filters?.location) {
    query = query.or(`location_city.ilike.%${filters.location}%,location_state.ilike.%${filters.location}%`)
  }
  if (filters?.jobType) {
    query = query.eq('job_type', filters.jobType)
  }
  if (filters?.experienceLevel) {
    query = query.eq('experience_level_required', filters.experienceLevel)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching jobs:', error)
    return []
  }

  // Filter by dance style if specified
  let jobs = data || []
  if (filters?.danceStyleId && jobs.length > 0) {
    jobs = jobs.filter((job) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      job.job_dance_styles?.some((jds: any) => jds.dance_styles?.id === filters.danceStyleId)
    )
  }

  return jobs as unknown as Job[]
}

// Get single job by ID
export async function getPublicJob(jobId: string): Promise<Job | null> {
  const { data, error } = await supabase
    .from('jobs')
    .select(`
      id,
      title,
      description,
      job_type,
      status,
      location_city,
      location_state,
      is_remote,
      pay_rate_min,
      pay_rate_max,
      pay_rate_type,
      show_pay_rate,
      is_pay_negotiable,
      experience_level_required,
      years_experience_required,
      schedule_details,
      start_date,
      end_date,
      is_ongoing,
      published_at,
      application_deadline,
      max_applications,
      client_profiles(
        id,
        company_name,
        company_description,
        logo_url,
        response_rate,
        profiles(display_name)
      ),
      job_dance_styles(dance_styles(id, name)),
      job_age_groups(age_groups(id, name))
    `)
    .eq('id', jobId)
    .eq('status', 'active')
    .single()

  if (error) {
    console.error('Error fetching job:', error)
    return null
  }

  return data as unknown as Job
}

// Get public talent listing
export async function getPublicTalent(filters?: {
  danceStyleId?: string
  location?: string
  experienceLevel?: string
}): Promise<TalentProfile[]> {
  let query = supabase
    .from('talent_profiles')
    .select(`
      id,
      profile_id,
      headline,
      years_experience,
      experience_level,
      available_for_work,
      profile_completeness,
      profiles!inner(
        display_name,
        first_name,
        last_name,
        avatar_url,
        location_city,
        location_state,
        profile_visible
      ),
      talent_dance_styles(
        dance_styles(id, name),
        is_primary
      )
    `)
    .eq('available_for_work', true)
    .eq('profiles.profile_visible', true)
    .order('profile_completeness', { ascending: false })

  const { data, error } = await query

  if (error) {
    console.error('Error fetching talent:', error)
    return []
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let talent: any[] = data || []

  // Apply filters
  if (filters?.location && talent.length > 0) {
    const locationLower = filters.location.toLowerCase()
    talent = talent.filter((t) => {
      const city = t.profiles?.location_city?.toLowerCase() || ''
      const state = t.profiles?.location_state?.toLowerCase() || ''
      return city.includes(locationLower) || state.includes(locationLower)
    })
  }

  if (filters?.danceStyleId && talent.length > 0) {
    talent = talent.filter((t) =>
      t.talent_dance_styles?.some((tds: any) => tds.dance_styles?.id === filters.danceStyleId)
    )
  }

  return talent as TalentProfile[]
}

// Get single talent profile by ID
export async function getPublicTalentProfile(profileId: string): Promise<TalentProfile | null> {
  const { data, error } = await supabase
    .from('talent_profiles')
    .select(`
      id,
      profile_id,
      headline,
      years_experience,
      experience_level,
      primary_dance_style_id,
      available_for_work,
      profile_completeness,
      open_to_full_time,
      open_to_part_time,
      open_to_substitute,
      open_to_gigs,
      open_to_virtual,
      teaching_philosophy,
      training,
      awards,
      notable_performances,
      website_url,
      instagram_url,
      youtube_url,
      tiktok_url,
      profiles!inner(
        display_name,
        first_name,
        last_name,
        avatar_url,
        bio,
        location_city,
        location_state,
        profile_visible
      ),
      talent_dance_styles(
        dance_styles(id, name, category),
        is_primary,
        proficiency_level
      ),
      talent_age_groups(age_groups(id, name)),
      videos(
        id,
        title,
        thumbnail_url,
        video_url,
        video_type,
        is_public
      )
    `)
    .eq('id', profileId)
    .eq('profiles.profile_visible', true)
    .single()

  if (error) {
    console.error('Error fetching talent profile:', error)
    return null
  }

  return data as unknown as TalentProfile
}
