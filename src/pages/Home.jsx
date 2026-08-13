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
          .filter((e) => new Date(e.eventDate || e.date).getTime() >= now)
          .sort(
            (a, b) =>
              new Date(a.eventDate || a.date) - new Date(b.eventDate || b.date),
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
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
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
      {/* ---------------- HERO ---------------- */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-hero">
        <HeroPhoto />
        <div className="pointer-events-none absolute -right-32 top-1/4 h-[420px] w-[420px] animate-float rounded-full bg-gold-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-primary-500/10 blur-3xl" />

        <div className="container-wide relative z-10 flex min-h-screen flex-col justify-center pb-28 pt-24">
          <Reveal>
            <span className="eyebrow border-primary-400/40 bg-white/10 text-gold-300">
              <Sparkles className="h-3.5 w-3.5" />
              {t("home.heroEyebrow")}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              {heroLines.slice(0, -1).map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
              {lastLineRest ? `${lastLineRest} ` : ""}
              <span className="text-gold-400">{lastWord}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-7 flex max-w-md items-center gap-3 text-gold-400/60">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-400/50 to-gold-400/50" />
              <Flower2 className="h-4 w-4 shrink-0" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-400/50 to-gold-400/50" />
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
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
                className="btn-outline !border-white/30 !bg-white/10 !text-white hover:!bg-white/20"
              >
                <Calendar className="h-4 w-4" />
                {t("home.heroCtaSecondary")}
              </Link>
            </div>
          </Reveal>

          {/* Feature pills */}
          <Reveal delay={0.4}>
            <div className="mt-14 flex max-w-2xl flex-wrap gap-3">
              {HERO_FEATURES.map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] py-2 pl-2 pr-4 backdrop-blur-sm"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-300">
                    <feature.icon className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-medium leading-tight text-white/85">
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
          <div className="rounded-2xl border border-white/15 bg-ink-950/40 p-6 shadow-soft backdrop-blur-md">
            <Quote className="h-6 w-6 text-gold-400/70" />
            <p className="mt-3 font-display text-lg italic leading-snug text-white/90">
              "{HERO_QUOTE.text}"
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wider text-gold-300/80">
              — {HERO_QUOTE.author}
            </p>
          </div>
        </Reveal>

        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 sm:flex">
          <Mouse className="h-5 w-5 animate-bounce" strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-[0.3em]">
            Scroll to Explore
          </span>
        </div>
      </section>

      {/* ---------------- INTRO ---------------- */}
      <section className="section-pad">
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
              <Reveal key={org.titleKey} delay={i * 0.1}>
                <Link
                  to={org.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/5 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft dark:border-white/10 dark:bg-ink-900"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-maroon text-white shadow-soft">
                    <org.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-ink-900 dark:text-cream-50">
                    {t(`home.${org.titleKey}`)}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-900/60 dark:text-cream-100/60">
                    {t(`home.${org.textKey}`)}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-900 dark:text-gold-400">
                    {t("common.learnMore")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- UPCOMING EVENTS ---------------- */}
      <section className="section-pad bg-cream-100/60 dark:bg-white/[0.02]">
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
              <p className="col-span-full text-center text-ink-900/50 dark:text-cream-100/50">
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

      {/* ---------------- TODAY'S ACTIVITIES ---------------- */}
      <section className="section-pad">
        <div className="container-wide">
          <SectionHeading
            eyebrow={t("home.todayEyebrow")}
            title={t("home.todayTitle")}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Sunrise, time: "5:30 AM", label: "Morning Pooja" },
              { icon: BookOpen, time: "9:00 AM", label: "Meditation Session" },
              { icon: Sunset, time: "6:30 PM", label: "Evening Pooja" },
              { icon: Calendar, time: "Sundays", label: "Daham Pasala" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-ink-900/5 bg-white p-6 text-center shadow-card dark:border-white/10 dark:bg-ink-900">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-400">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="font-display text-lg font-semibold text-ink-900 dark:text-cream-50">
                    {item.time}
                  </p>
                  <p className="text-sm text-ink-900/55 dark:text-cream-100/55">
                    {item.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- HISTORY PREVIEW ---------------- */}
      <section className="section-pad bg-cream-100/60 dark:bg-white/[0.02]">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft">
              {history?.imageUrl ? (
                <FocalImage
                  src={history.imageUrl}
                  alt={history.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-maroon text-white/30">
                  <Landmark className="h-16 w-16" />
                </div>
              )}
            </div>
          </Reveal>
          <div>
            <SectionHeading
              align="left"
              eyebrow={t("home.historyEyebrow")}
              title={history?.title || t("home.historyTitle")}
            />
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-900/60 dark:text-cream-100/60">
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

      {/* ---------------- GALLERY PREVIEW ---------------- */}
      <section className="section-pad">
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
                    <div className="group h-full w-full overflow-hidden rounded-2xl">
                      <FocalImage
                        src={photo.imageUrl}
                        alt={photo.title || ""}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
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

      {/* ---------------- NEWS ---------------- */}
      {(loading || news.length > 0) && (
        <section className="section-pad bg-cream-100/60 dark:bg-white/[0.02]">
          <div className="container-wide">
            <SectionHeading
              align="left"
              eyebrow={t("home.newsEyebrow")}
              title={t("home.newsTitle")}
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {loading
                ? [1, 2, 3].map((i) => (
                    <SkeletonCard key={i} className="h-44" />
                  ))
                : news.map((item, i) => (
                    <Reveal key={item.id} delay={i * 0.1}>
                      <div className="flex h-full flex-col rounded-2xl border border-ink-900/5 bg-white p-6 shadow-card dark:border-white/10 dark:bg-ink-900">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gold-600 dark:text-gold-400">
                          {new Date(
                            item.createdAt || Date.now(),
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

      {/* ---------------- DONATIONS ---------------- */}
      <section className="section-pad">
        <div className="container-wide">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-maroon px-8 py-16 text-center shadow-soft sm:px-16">
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl" />
              <span className="eyebrow border-gold-400/40 bg-white/10 text-gold-300">
                {t("home.donationsEyebrow")}
              </span>
              <h2 className="relative mt-5 font-display text-3xl font-semibold text-white sm:text-4xl">
                {t("home.donationsTitle")}
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-white/75">
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

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="section-pad bg-cream-100/60 dark:bg-white/[0.02]">
        <div className="container-wide">
          <SectionHeading
            eyebrow={t("home.testimonialsEyebrow")}
            title={t("home.testimonialsTitle")}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded-2xl border border-ink-900/5 bg-white p-7 shadow-card dark:border-white/10 dark:bg-ink-900">
                  <Quote className="h-7 w-7 text-gold-500/50" />
                  <p className="mt-4 flex-1 text-sm italic leading-relaxed text-ink-900/70 dark:text-cream-100/70">
                    "{item.quote}"
                  </p>
                  <div className="mt-5 border-t border-ink-900/5 pt-4 dark:border-white/10">
                    <p className="font-semibold text-ink-900 dark:text-cream-50">
                      {item.name}
                    </p>
                    <p className="text-xs text-ink-900/50 dark:text-cream-100/50">
                      {item.role}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- MAP ---------------- */}
      <section className="section-pad">
        <div className="container-wide">
          <SectionHeading
            eyebrow={t("home.mapEyebrow")}
            title={t("home.mapTitle")}
          />
          <Reveal className="mt-12">
            <div className="relative overflow-hidden rounded-3xl shadow-soft">
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
                className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary-900 shadow-soft transition-transform hover:-translate-y-0.5"
              >
                <MapPin className="h-4 w-4" />
                {t("common.getDirections")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
