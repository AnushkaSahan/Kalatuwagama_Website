# Kalatuwagama Rajamaha Viharaya — Public Website

A premium, responsive public website for the temple, its Daham Pasala and its
community foundation. Built with React + Vite + Tailwind CSS, matching the
admin dashboard's brand identity (maroon `#6F1D1B` + gold accent).

## What's static vs. what's live

| Data | Source |
|---|---|
| Events (upcoming/past) | **Live** — `GET /api/events` |
| Monks (Chief + Resident) | **Live** — `GET /api/monks` |
| Temple History | **Live** — `GET /api/temple-history` |
| Gallery photos (grouped by event) | **Live** — `GET /api/gallery` |
| News / Announcements | **Live** — `GET /api/announcements` |
| Foundation Projects | **Live** — `GET /api/foundation-projects` |
| Daham Pasala Teachers | **Live** — `GET /api/teachers` |
| Donation bank details + QR | **Live** — `GET /api/donation-info` |
| Contact form submission | **Live** — `POST /api/contact-messages` |
| Volunteer registration | **Live** — posts to `POST /api/contact-messages` (subject "Volunteer Registration") since there's no dedicated volunteer endpoint yet — admin sees it in **Messages** |
| Hero copy, org descriptions, testimonials, class schedule, daily pooja times, service list | **Static** — edit directly in the page files |
| Students (individual names/guardians) | **Not exposed** — deliberately excluded from the public API for privacy. Only a placeholder aggregate figure is shown |

## Required backend change

The backend previously required a login for every API call. `SecurityConfig.java`
(included in this delivery) was updated to allow public, anonymous **GET**
access to the read-only content above, and public **POST** to the contact
form, while everything else still requires the admin JWT. Apply this file to
the backend and restart it, or the site will show empty states everywhere
(401 errors). CORS was also updated to allow both frontends (admin on
`localhost:5173`, this site on `localhost:5174`).

## Getting started

    npm install
    npm run dev       # http://localhost:5174

Create a `.env` if your backend isn't on localhost:8080:

    VITE_API_URL=http://your-backend-url

## Editing static content

- Hero video: drop an MP4 at `public/hero-video.mp4` and add a `<source>`
  inside the `<video>` tag in `src/pages/Home.jsx` (currently a gradient
  background only — no video was provided).
- Org card copy, testimonials, daily activities: `src/pages/Home.jsx`
- Services, pooja times: `src/pages/Temple.jsx`
- Class schedule: `src/pages/DahamPasala.jsx`
- Contact phone/email/WhatsApp, footer info: `src/components/layout/Footer.jsx`, `src/pages/Contact.jsx`
- All copy in both languages: `src/i18n/locales/en.json` and `si.json`

## Structure

    src/
      api/            one file per backend resource (axios calls)
      components/
        layout/       Navbar, Footer, Layout
        common/       EventCard, Lightbox, SectionHeading, Reveal, FocalImage...
      context/        ThemeContext (light/dark)
      i18n/           English + Sinhala translations
      pages/          Home, Temple, DahamPasala, Foundation, Gallery, Events,
                       Donations, Contact, NotFound
      utils/          focalPoint.js — reads the crop/position chosen in the
                       admin dashboard's image uploader, so photos display
                       identically here

## Notes

- Photos honor the admin's focal point/zoom automatically via the `?fp=x,y&z=zoom`
  query already on each image URL — no extra work needed.
- Dark mode + language switch are both fully wired (top-right of the navbar),
  persisted in localStorage.
- This is a real, working, responsive codebase, not a mockup. `npm run build`
  was verified to compile cleanly.
