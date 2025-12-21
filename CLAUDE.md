# Odori-main

## Project Overview
**Odori** is a professional networking platform for the dance industry. This repo is the public-facing frontend where dancers, choreographers, and instructors find opportunities, and studios discover talent.

**Live URL:** https://odori.io
**Status:** Landing page live, full app in development

---

## Architecture

| Repo | Purpose | URL |
|------|---------|-----|
| Odori-main (this repo) | Public frontend | odori.io |
| Odori-backend | Admin portal, dashboards, approval workflows | admin.odori.io |

Both repos share the same **Supabase** database.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (email + Google OAuth)
- **Payments:** Stripe
- **Video Hosting:** Cloudinary
- **Deployment:** Vercel

---

## Reference Projects

This follows patterns established in:
- **Guyana Home Hub** (guyanahomehub.com) - frontend architecture
- **Portal Home Hub** (portalhomehub.com) - backend/admin architecture

---

## User Types

| Type | Description |
|------|-------------|
| **Talent** | Dancers, choreographers, instructors seeking work |
| **Client** | Studios, production companies, agencies hiring talent |
| **Admin** | Platform administrators (in Odori-backend) |

---

## Core Features (MVP)

1. **User Profiles**
   - Bio, headshots, location
   - Dance styles (multi-select)
   - Experience level
   - Training/credentials

2. **Video Portfolios**
   - Teaching demos
   - Performance clips
   - Choreography samples

3. **Job Postings**
   - Posted by Clients
   - Filterable by style, location, pay
   - Real-time status (Active/Filled)

4. **Application System**
   - Talent applies to jobs
   - Status tracking (Submitted → Reviewed → Interviewing → Hired/Rejected)

5. **Search & Discovery**
   - Studios search talent by style, location, experience
   - Talent searches jobs with filters

6. **Messaging**
   - In-platform direct messages
   - Between Talent and Clients only

7. **Response Rate Tracking**
   - Track studio response rates to applications
   - Display on studio profiles (transparency feature)

---

## Folder Structure (Planned)

```
Odori-main/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── signup/
│   │   └── callback/
│   ├── (public)/
│   │   ├── jobs/
│   │   ├── talent/
│   │   └── studios/
│   ├── dashboard/
│   │   ├── talent/
│   │   └── client/
│   ├── api/
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── forms/
│   └── layout/
├── lib/
│   ├── supabase.ts
│   ├── stripe.ts
│   └── cloudinary.ts
├── contexts/
│   └── AuthContext.tsx
├── types/
│   └── database.ts
├── public/
└── CLAUDE.md (this file)
```

---

## Database Tables (Supabase)

```
users
profiles (extends users - talent or client specific fields)
talent_profiles (dance styles, experience, videos)
client_profiles (studio info, locations)
jobs
applications
messages
reviews
subscriptions
```

---

## Subscription Tiers

**Talent:**
- Free: 1 video, 5 applications/month
- Pro ($19/mo): Unlimited videos, unlimited applications
- Elite ($39/mo): Featured placement, analytics

**Clients (Studios):**
- Free: 1 job, limited views
- Professional ($49/mo): Unlimited jobs, video access
- Enterprise ($149/mo): Multi-location, team accounts

---

## Environment Variables Needed

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Owners

- **Darren Buckner** - Technical lead, founder
- **Kira Buckner** - Product vision, dance industry expert

---

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Run linter
```
