import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Flower2,
  HeartHandshake,
  Landmark,
  MapPin,
  Mouse,
  Quote,
  ShieldCheck,
  Sparkles,
  Sunrise,
  Sunset,
  Users,
} from "lucide-react";
import { getEvents } from "../api/events";
import { getTempleHistories } from "../api/templeHistory";
import { getGalleryItems } from "../api/gallery";
import { getAnnouncements } from "../api/announcements";
import Reveal from "../components/common/Reveal";
import HeroPhoto from "../components/common/HeroPhoto";
import SectionHeading from "../components/common/SectionHeading";
import EventCard from "../components/common/EventCard";
import FocalImage from "../components/common/FocalImage";
import SkeletonCard from "../components/common/SkeletonCard";
import { parseLocalDateTime } from "../utils/datetime";

const TEMPLE_LOCATION = {
  lat: 7.684082,
  lng: 80.3433217,
  mapsUrl:
    "https://www.google.com/maps/place/Kalatuwagama+Rajamaha+Viharaya/@7.6818222,80.3455656,16.39z/data=!4m6!3m5!1s0x3afccd9e032d990b:0x6bf2ed7b00e69166!8m2!3d7.684082!4d80.3433217",
};

const HERO_FEATURES = [
  { icon: Flower2, label: "Spiritual Guidance" },
  { icon: BookOpen, label: "Daham Pasala Education" },
  { icon: Users, label: "Community Service" },
  { icon: ShieldCheck, label: "Preserving Our Heritage" },
];

const HERO_QUOTE = {
  text: "Be a lamp unto yourself.",
  author: "The Buddha",
};

const TESTIMONIALS = [
  {
    name: "Nimal Perera",
    role: "Devotee, 20+ years",
    quote:
      "Every visit to this temple brings a sense of calm I can't find anywhere else. The monks are always welcoming and the daily pooja is deeply moving.",
  },
  {
    name: "Kumari Silva",
    role: "Daham Pasala Parent",
    quote:
      "My daughter has grown so much through the Sunday Dhamma classes here — both in knowledge and in character. Grateful for these dedicated teachers.",
  },
  {
    name: "Ranjith Fernando",
    role: "Foundation Volunteer",
    quote:
      "Volunteering with the Daham Saviya Paramitha Padanama has shown me how much a small community can achieve when it works together.",
  },
];

const PARTICLE_POSITIONS = [
  { top: "15%", left: "8%", delay: "0s", size: "h-1.5 w-1.5" },
  { top: "25%", left: "92%", delay: "1.2s", size: "h-2 w-2" },
  { top: "60%", left: "5%", delay: "2.4s", size: "h-1 w-1" },
  { top: "70%", left: "88%", delay: "0.8s", size: "h-1.5 w-1.5" },
  { top: "45%", left: "95%", delay: "1.8s", size: "h-1 w-1" },
  { top: "80%", left: "12%", delay: "3s", size: "h-2 w-2" },
];

export default function Home() {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [history, setHistory] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const heroLines = t("home.heroTitle").split("\n");
  const lastLine = heroLines[heroLines.length - 1];
  const lastLineWords = lastLine.split(" ");
  const lastWord = lastLineWords.pop();
  const lastLineRest = lastLineWords.join(" ");

  useEffect(() => {
    (async () => {
      try {
        const [eventsRes, historyRes, galleryRes, newsRes] = await Promise.all([
          getEvents(),
          getTempleHistories(),
          getGalleryItems(),
          getAnnouncements(),
        ]);

        const now = Date.now();
        const upcoming = (eventsRes.data || [])
          .filter(
            (e) =>
              (parseLocalDateTime(e.eventDate || e.date)?.getTime() || 0) >=
              now,
          )
          .sort(
            (a, b) =>
              (parseLocalDateTime(a.eventDate || a.date)?.getTime() || 0) -
              (parseLocalDateTime(b.eventDate || b.date)?.getTime() || 0),
          )
          .slice(0, 3);
        setEvents(upcoming);

        const historyList = historyRes.data || [];
        setHistory(historyList[0] || null);

        const galleryList = [...(galleryRes.data || [])].sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
        );
        setPhotos(galleryList.slice(0, 6));

        const newsList = [...(newsRes.data || [])].sort(
          (a, b) =>
            (parseLocalDateTime(b.publishDate)?.getTime() || 0) -
            (parseLocalDateTime(a.publishDate)?.getTime() || 0),
        );
        setNews(newsList.slice(0, 3));
      } catch (error) {
        // Sections below degrade gracefully with empty states
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-hero">
        <HeroPhoto />

        {/* Ambient glow blobs */}
        <div className="pointer-events-none absolute -right-32 top-1/4 h-[480px] w-[480px] animate-float rounded-full bg-gold-500/[0.12] blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-[400px] w-[400px] rounded-full bg-primary-500/[0.10] blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-gold-500/[0.06] blur-3xl" />

        {/* Floating particles */}
        {PARTICLE_POSITIONS.map((p, i) => (
          <div
            key={i}
            className={`pointer-events-none absolute ${p.size} rounded-full bg-gold-400/40`}
            style={{
              top: p.top,
              left: p.left,
              animation: `particle-float 8s ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}

        <div className="container-wide relative z-10 flex min-h-screen flex-col justify-center pb-28 pt-24">
          <Reveal>
            <span className="eyebrow border-white/20 bg-white/[0.08] text-gold-300 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              {t("home.heroEyebrow")}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              {heroLines.slice(0, -1).map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
              {lastLineRest ? `${lastLineRest} ` : ""}
              <span className="text-gradient-gold">{lastWord}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-7 flex max-w-xs items-center gap-3 text-gold-400/50">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-400/50 to-gold-400/50" />
              <Flower2 className="h-4 w-4 shrink-0" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-400/50 to-gold-400/50" />
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {t("home.heroSubtitle")}
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/temple" className="btn-gold">
                <Landmark className="h-4 w-4" />
                {t("home.heroCtaPrimary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="btn-outline !border-white/25 !bg-white/[0.08] !text-white backdrop-blur-sm hover:!bg-white/[0.15]"
              >
                <Calendar className="h-4 w-4" />
                {t("home.heroCtaSecondary")}
              </Link>
            </div>
          </Reveal>

          {/* Feature pills */}
          <Reveal delay={0.42}>
            <div className="mt-14 flex max-w-2xl flex-wrap gap-3">
              {HERO_FEATURES.map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] py-2 pl-2 pr-4 backdrop-blur-sm transition-all duration-300 hover:border-gold-400/30 hover:bg-white/[0.09]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-300">
                    <feature.icon className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-medium leading-tight text-white/80">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Quote card */}
        <Reveal
          delay={0.5}
          className="absolute bottom-16 right-6 z-10 hidden max-w-xs lg:block xl:right-16"
        >
          <div className="rounded-2xl border border-white/10 bg-ink-950/50 p-6 shadow-deep backdrop-blur-md">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/15">
              <Quote className="h-4 w-4 text-gold-400" />
            </div>
            <p className="mt-3 font-display text-lg italic leading-snug text-white/90">
              &ldquo;{HERO_QUOTE.text}&rdquo;
            </p>
            <div className="mt-3 h-px bg-gradient-to-r from-gold-500/30 to-transparent" />
            <p className="mt-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300/70">
              — {HERO_QUOTE.author}
            </p>
          </div>
        </Reveal>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 sm:flex">
          <Mouse className="h-5 w-5 animate-bounce" strokeWidth={1.5} />
          <span className="text-[9px] uppercase tracking-[0.3em]">
            Scroll to Explore
          </span>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="section-pad bg-cream-50 dark:bg-[#0e0806]">
        <div className="container-wide">
          <SectionHeading
            eyebrow={t("home.introEyebrow")}
            title={t("home.introTitle")}
            subtitle={t("home.introText")}
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Landmark,
                titleKey: "org1Title",
                textKey: "org1Text",
                href: "/temple",
              },
              {
                icon: BookOpen,
                titleKey: "org2Title",
                textKey: "org2Text",
                href: "/daham-pasala",
              },
              {
                icon: HeartHandshake,
                titleKey: "org3Title",
                textKey: "org3Text",
                href: "/foundation",
              },
            ].map((org, i) => (
              <Reveal key={org.titleKey} delay={i * 0.12}>
                <Link
                  to={org.href}
                  className="card-premium group flex h-full flex-col p-8"
                >
                  {/* Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-maroon text-white shadow-maroon transition-all duration-300 group-hover:shadow-glow-maroon">
                    <org.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-ink-900 dark:text-cream-50">
                    {t(`home.${org.titleKey}`)}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-900/55 dark:text-cream-100/55">
                    {t(`home.${org.textKey}`)}
                  </p>
                  <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-primary-900 dark:text-gold-400">
                    {t("common.learnMore")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section className="section-pad section-alt bg-cream-100/60 dark:bg-white/[0.018]">
        <div className="container-wide">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              align="left"
              eyebrow={t("home.eventsEyebrow")}
              title={t("home.eventsTitle")}
              subtitle={t("home.eventsSubtitle")}
            />
            <Reveal>
              <Link
                to="/events"
                className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-primary-900 dark:text-gold-400 sm:flex"
              >
                {t("common.viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              [1, 2, 3].map((i) => <SkeletonCard key={i} className="h-80" />)
            ) : events.length === 0 ? (
              <p className="col-span-full text-center text-ink-900/40 dark:text-cream-100/40">
                {t("common.noData")}
              </p>
            ) : (
              events.map((event, i) => (
                <Reveal key={event.id} delay={i * 0.1}>
                  <EventCard event={event} />
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── TODAY'S ACTIVITIES ── */}
      <section className="section-pad bg-cream-50 dark:bg-[#0e0806]">
        <div className="container-wide">
          <SectionHeading
            eyebrow={t("home.todayEyebrow")}
            title={t("home.todayTitle")}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Sunrise, time: "5:30 AM", label: "Morning Pooja" },
              { icon: BookOpen, time: "9:00 AM", label: "Meditation Session" },
              { icon: Sunset, time: "6:30 PM", label: "Evening Pooja" },
              { icon: Calendar, time: "Sundays", label: "Daham Pasala" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <div className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-ink-900/[0.06] bg-white p-7 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-deep dark:border-white/[0.07] dark:bg-[#18100d]">
                  {/* Gradient top line on hover */}
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/12 text-gold-600 transition-all duration-300 group-hover:bg-gold-500/20 dark:bg-gold-500/10 dark:text-gold-400">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-semibold text-ink-900 dark:text-cream-50">
                      {item.time}
                    </p>
                    <p className="mt-1 text-sm text-ink-900/50 dark:text-cream-100/50">
                      {item.label}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HISTORY PREVIEW ── */}
      <section className="section-pad section-alt bg-cream-100/60 dark:bg-white/[0.018]">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-deep">
              {history?.imageUrl ? (
                <FocalImage
                  src={history.imageUrl}
                  alt={history.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-maroon text-white/20">
                  <Landmark className="h-16 w-16" />
                </div>
              )}
              {/* Corner accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow={t("home.historyEyebrow")}
              title={history?.title || t("home.historyTitle")}
            />
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-900/58 dark:text-cream-100/62">
              {history?.description ||
                "For generations, this temple has stood as a spiritual home for the Kalatuwagama community — a place of quiet devotion, learning, and service that continues to grow with each passing year."}
            </p>
            <Link to="/temple#history" className="btn-primary mt-8 inline-flex">
              {t("common.readMore")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <section className="section-pad bg-cream-50 dark:bg-[#0e0806]">
        <div className="container-wide">
          <SectionHeading
            eyebrow={t("home.galleryEyebrow")}
            title={t("home.galleryTitle")}
          />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} className="aspect-square" />
                ))
              : photos.map((photo, i) => (
                  <Reveal
                    key={photo.id}
                    delay={i * 0.05}
                    className="aspect-square"
                  >
                    <div className="group relative h-full w-full overflow-hidden rounded-2xl shadow-card">
                      <FocalImage
                        src={photo.imageUrl}
                        alt={photo.title || ""}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  </Reveal>
                ))}
          </div>
          <Reveal className="mt-10 flex justify-center">
            <Link to="/gallery" className="btn-outline">
              {t("common.seeGallery")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── NEWS ── */}
      {(loading || news.length > 0) && (
        <section className="section-pad section-alt bg-cream-100/60 dark:bg-white/[0.018]">
          <div className="container-wide">
            <SectionHeading
              align="left"
              eyebrow={t("home.newsEyebrow")}
              title={t("home.newsTitle")}
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {loading
                ? [1, 2, 3].map((i) => (
                    <SkeletonCard key={i} className="h-48" />
                  ))
                : news.map((item, i) => (
                    <Reveal key={item.id} delay={i * 0.1}>
                      <div className="card-premium group flex h-full flex-col p-6">
                        {/* Gold top line on hover */}
                        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600 dark:text-gold-400">
                          {(
                            parseLocalDateTime(item.publishDate) || new Date()
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <h3 className="mt-2 font-display text-lg font-semibold text-ink-900 dark:text-cream-50">
                          {item.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-900/55 line-clamp-3 dark:text-cream-100/55">
                          {item.description || item.content}
                        </p>
                      </div>
                    </Reveal>
                  ))}
            </div>
          </div>
        </section>
      )}

      {/* ── DONATIONS CTA ── */}
      <section className="section-pad bg-cream-50 dark:bg-[#0e0806]">
        <div className="container-wide">
          <Reveal>
            <div className="relative overflow-hidden rounded-4xl px-8 py-16 text-center shadow-deep sm:px-16"
              style={{
                background: "linear-gradient(135deg, #5c1815 0%, #6F1D1B 40%, #3f100f 100%)",
              }}
            >
              {/* Glowing blobs */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-52 w-52 rounded-full bg-gold-500/10 blur-3xl" />
              {/* Top shimmer line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

              <span className="eyebrow relative border-gold-400/30 bg-white/[0.08] text-gold-300 backdrop-blur-sm">
                {t("home.donationsEyebrow")}
              </span>
              <h2 className="relative mt-5 font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                {t("home.donationsTitle")}
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-white/65">
                {t("home.donationsText")}
              </p>
              <Link
                to="/donations"
                className="btn-gold relative mt-8 inline-flex"
              >
                {t("home.donationsCta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-pad section-alt bg-cream-100/60 dark:bg-white/[0.018]">
        <div className="container-wide">
          <SectionHeading
            eyebrow={t("home.testimonialsEyebrow")}
            title={t("home.testimonialsTitle")}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.12}>
                <div className="card-premium group flex h-full flex-col p-7">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/12 dark:bg-gold-500/10">
                    <Quote className="h-5 w-5 text-gold-500/60 dark:text-gold-400/60" />
                  </div>
                  <p className="mt-5 flex-1 text-sm italic leading-relaxed text-ink-900/65 dark:text-cream-100/65">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-3 border-t border-ink-900/[0.05] pt-4 dark:border-white/[0.05]">
                    {/* Avatar initial */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-maroon text-sm font-semibold text-white shadow-maroon">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink-900 dark:text-cream-50">
                        {item.name}
                      </p>
                      <p className="text-xs text-ink-900/45 dark:text-cream-100/45">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="section-pad bg-cream-50 dark:bg-[#0e0806]">
        <div className="container-wide">
          <SectionHeading
            eyebrow={t("home.mapEyebrow")}
            title={t("home.mapTitle")}
          />
          <Reveal className="mt-12">
            <div className="relative overflow-hidden rounded-3xl border border-ink-900/[0.06] shadow-deep dark:border-white/[0.07]">
              <iframe
                title="Temple map"
                src={`https://www.google.com/maps?q=${TEMPLE_LOCATION.lat},${TEMPLE_LOCATION.lng}&hl=en&z=16&output=embed`}
                className="h-[420px] w-full"
                style={{ border: 0 }}
                loading="lazy"
              />
              <a
                href={TEMPLE_LOCATION.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full border border-white/70 bg-white/95 px-5 py-3 text-sm font-semibold text-primary-900 shadow-soft backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-maroon"
              >
                <MapPin className="h-4 w-4 text-primary-900" />
                {t("common.getDirections")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
