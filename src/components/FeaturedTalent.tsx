import Link from 'next/link'

// Placeholder data - will be replaced with real profiles tomorrow
const FEATURED_TALENT = [
  {
    id: '1',
    name: 'Coming Soon',
    role: 'Guest Artist',
    styles: ['Hip-Hop', 'Commercial'],
    location: 'Los Angeles, CA',
  },
  {
    id: '2',
    name: 'Coming Soon',
    role: 'Choreographer',
    styles: ['Contemporary', 'Modern'],
    location: 'New York, NY',
  },
  {
    id: '3',
    name: 'Coming Soon',
    role: 'Master Teacher',
    styles: ['Ballet', 'Pointe'],
    location: 'Chicago, IL',
  },
  {
    id: '4',
    name: 'Coming Soon',
    role: 'Performer',
    styles: ['Jazz', 'Musical Theater'],
    location: 'Atlanta, GA',
  },
]

export default function FeaturedTalent() {
  return (
    <section className="featured-talent">
      <div className="featured-talent-content">
        {/* Section Header */}
        <div className="featured-talent-header">
          <h2>Talent Already on Odori</h2>
          <p>Discover the dance professionals ready to elevate your studio</p>
        </div>

        {/* Talent Grid */}
        <div className="talent-grid">
          {FEATURED_TALENT.map((talent) => (
            <Link
              key={talent.id}
              href="/talent"
              className="talent-card"
            >
              {/* Photo Placeholder */}
              <div className="talent-photo">
                <div className="talent-photo-placeholder" />
              </div>

              {/* Info */}
              <h3 className="talent-name">{talent.name}</h3>
              <p className="talent-role">{talent.role}</p>
              <p className="talent-styles">{talent.styles.join(' • ')}</p>
              <p className="talent-location">{talent.location}</p>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="featured-talent-cta">
          <Link href="/talent" className="browse-talent-link">
            Browse All Talent →
          </Link>
        </div>
      </div>
    </section>
  )
}
