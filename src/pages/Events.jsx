import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { X, MapPin, Calendar, Clock } from "lucide-react";
import { getEvents } from "../api/events";
import Reveal from "../components/common/Reveal";
import HeroPhoto from "../components/common/HeroPhoto";
import SectionHeading from "../components/common/SectionHeading";
import EventCard from "../components/common/EventCard";
import SkeletonCard from "../components/common/SkeletonCard";
import FocalImage from "../components/common/FocalImage";
import { parseLocalDateTime } from "../utils/datetime";

export default function Events() {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("upcoming");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getEvents();
        setEvents(res.data || []);
      } catch (e) {
        /* graceful empty state */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const now = Date.now();
  const getTime = (e) =>
    parseLocalDateTime(e.eventDate || e.date)?.getTime() || 0;
  const upcoming = events
    .filter((e) => getTime(e) >= now)
    .sort((a, b) => getTime(a) - getTime(b));
  const past = events
    .filter((e) => getTime(e) < now)
    .sort((a, b) => getTime(b) - getTime(a));

  const list = tab === "upcoming" ? upcoming : past;

  return (
    <div>
      <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-gradient-hero pb-16 pt-32">
        <HeroPhoto />
        <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container-wide relative text-center">
          <Reveal>
            <span className="eyebrow border-white/30 bg-white/10 text-gold-300">
              {t("events.eyebrow")}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 font-display text-4xl font-semibold text-white sm:text-5xl">
              {t("events.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-xl text-white/75">
              {t("events.subtitle")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-wide">
          <Reveal className="flex justify-center">
            <div className="inline-flex rounded-full bg-white p-1.5 shadow-card dark:bg-ink-900">
              {["upcoming", "past"].map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                    tab === key
                      ? "bg-gradient-maroon text-white shadow-soft"
                      : "text-ink-900/55 dark:text-cream-100/55"
                  }`}
                >
                  {t(`common.${key}`)}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              [1, 2, 3].map((i) => <SkeletonCard key={i} className="h-80" />)
            ) : list.length === 0 ? (
              <p className="col-span-full text-center text-ink-900/50 dark:text-cream-100/50">
                {t(tab === "upcoming" ? "events.noUpcoming" : "events.noPast")}
              </p>
            ) : (
              list.map((event, i) => (
                <Reveal key={event.id} delay={(i % 6) * 0.07}>
                  <button
                    type="button"
                    onClick={() => setSelected(event)}
                    className="block w-full text-left"
                  >
                    <EventCard event={event} />
                  </button>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <div className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-ink-900">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-2 text-white hover:bg-black/60"
            >
              <X className="h-5 w-5" />
            </button>
            {selected.imageUrl && (
              <FocalImage
                src={selected.imageUrl}
                alt={selected.title}
                className="h-64 w-full object-cover"
              />
            )}
            <div className="p-8">
              <h3 className="font-display text-2xl font-semibold text-ink-900 dark:text-cream-50">
                {selected.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-ink-900/60 dark:text-cream-100/60">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {parseLocalDateTime(
                    selected.eventDate || selected.date,
                  )?.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {parseLocalDateTime(
                    selected.eventDate || selected.date,
                  )?.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
                {selected.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {selected.location}
                  </span>
                )}
              </div>
              {selected.description && (
                <p className="mt-5 leading-relaxed text-ink-900/65 dark:text-cream-100/65">
                  {selected.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
